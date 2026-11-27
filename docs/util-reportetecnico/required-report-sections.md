---
sidebar_position: 5
release_version: "4.6.0"
release_module: "Utilitario Reporte Técnico"
---

# Obligatoriedad de Recomendaciones, Compromisos, Repuestos y Lista de Chequeo

Este documento describe cómo configurar en el Utilitario de Reporte Técnico la obligatoriedad de las secciones **Recomendaciones**, **Compromisos**, **Repuestos instalados** y **Lista de chequeo**, mediante columnas del servicio de la programación (`mob_bandejaServicios`) y de la información básica de la OT (`mob_informacion_basica`).

Funciona igual que la [obligatoriedad de archivos adjuntos](./required-attachments.md) y queda alineado con el App Técnicos: con el valor `'true'` y la sección visible, el botón **Guardar** se deshabilita hasta que la sección esté completa.

## Referencias

- [SO-2296: Exigir recomendaciones, compromisos, repuestos y checklist según configuración del servicio](https://softwaresamm.atlassian.net/browse/SO-2296)
- [SO-2295: Exponer obligatoriedad de recomendaciones, compromisos y repuestos en servicios de reporte](https://softwaresamm.atlassian.net/browse/SO-2295)
- [SO-2252: Configurar como obligatorios los campos de compromisos, recomendaciones y repuestos ejecutados (App Técnicos)](https://softwaresamm.atlassian.net/browse/SO-2252)

## Información de Versiones

### Versión de Lanzamiento

:::info **V.4.6.0**
:::

### Versiones Requeridas

| Aplicación                 | Versión Mínima                            | Descripción                                           |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| Utilitario Reporte Técnico | >= V.4.6.0                                | Utilitario web de reporte                             |
| BASE DE DATOS              | Scripts `SO_2252_1.sql` y `SO_2252_2.sql` | `fn_bandejaServicios_core` y `mob_informacion_basica` |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- El Utilitario de Reporte Técnico actualizado a la versión mínima indicada.
- Acceso a la base de datos SAMM con permisos para modificar funciones y procedimientos almacenados.
- Los scripts del ticket SO-2295 (`sammapi/capadatos/sps/SO-2252/SO_2252_1.sql` y `SO_2252_2.sql`) ejecutados en la base de datos.
- Las secciones a exigir visibles en la configuración de secciones del reporte.

:::important Importante
El utilitario lee `mob_bandejaServicios` cuando el reporte tiene programación y `mob_informacion_basica` cuando se reporta una OT sin programación. Configure las columnas en **ambos** objetos para obtener el mismo comportamiento en los dos casos.
:::

## Configuración

### Paso 1: Ubicar las columnas de obligatoriedad

| Columna                       | Sección (clave)       | Qué exige con `'true'`                                    |
| ----------------------------- | --------------------- | --------------------------------------------------------- |
| `requiredRecommendations`     | `recomendaciones`     | Texto en Recomendaciones (los espacios no cuentan)        |
| `requiredCommitments`         | `compromisos`         | Texto en Compromisos (los espacios no cuentan)            |
| `requiredInstalledSpareParts` | `repuestosInstalados` | Al menos un repuesto instalado                            |
| `requiredChecklist`           | `chequeo`             | Que la OT tenga una lista de chequeo asignada             |

Todas son texto con valor `'false'` por defecto. `mob_informacion_basica` incorpora también `requiredChecklist`, que antes solo existía en la bandeja.

```sql title="Columnas en mob_informacion_basica"
,'false' as requiredChecklist --SO-2252: checklist required to report when the OT has none assigned (same rule as mob_bandejaServicios, SO-2149)
,'false' as requiredRecommendations
,'false' as requiredCommitments
,'false' as requiredInstalledSpareParts
```

### Paso 2: Habilitar la obligatoriedad

Cambie a `'true'` las columnas que deban ser obligatorias, en `fn_bandejaServicios_core` (ambas consultas del `UNION ALL`) y en `mob_informacion_basica`, y ejecute el `CREATE OR ALTER` de cada objeto.

```sql title="Ejemplo: recomendaciones y compromisos obligatorios"
,'true' as requiredRecommendations
,'true' as requiredCommitments
```

:::tip Consejo
Si la columna no existe en un procedimiento personalizado, el utilitario la toma como **opcional**.
:::

### Paso 3: Verificar el valor devuelto

```sql title="Verificación"
EXEC [dbo].[mob_bandejaServicios] @p_id_usuario = 1, @p_eid = '1';
EXEC [dbo].[mob_informacion_basica] @p_id_usuario = 1, @p_id_ot = 1;
```

## Casos Especiales

:::note Comportamientos Predefinidos
La obligatoriedad depende de que la sección esté visible y, para repuestos y lista de chequeo, de que el reporte tenga OT.
:::

| Caso                         | Campo/Valor                  | Descripción                                                                                                       |
| ---------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Sección oculta               | Clave ausente en `secciones` | No se exige, aunque la columna esté en `'true'`.                                                                  |
| No disponibilidad (sin OT)   | `ot=0`                       | Recomendaciones y Compromisos **sí** se exigen. Repuestos y lista de chequeo no aplican, porque no se muestran sin OT. |
| OT sin lista de chequeo      | `requiredChecklist = 'true'` | Se muestra el aviso de lista no asignada y Guardar queda deshabilitado.                                           |
| Columna inexistente          | —                            | Se toma como opcional.                                                                                            |

## Resultado Esperado

Una vez completada la configuración:

1. **Recomendaciones y Compromisos obligatorios**: el campo se marca como obligatorio y se resalta mientras esté vacío.
2. **Repuestos instalados obligatorios**: la sección muestra un borde naranja y la etiqueta **Obligatorio** mientras no tenga repuestos.
3. **Lista de chequeo sin asignar**: si es obligatoria y la OT no tiene ninguna, se muestra el aviso *Este servicio requiere una lista de chequeo, pero la OT no tiene ninguna asignada. Comuníquese con el coordinador para asignarla.*
4. **Guardar deshabilitado**: el botón **Guardar** queda deshabilitado mientras falte alguna sección obligatoria visible.

## Resolución de Problemas

### Guardar está habilitado aunque la sección esté vacía

Verifique que:

- La columna esté en `'true'` en el objeto que usa el reporte: `mob_bandejaServicios` (con programación) o `mob_informacion_basica` (sin programación).
- La sección esté visible en la configuración de secciones del reporte.
- Para repuestos y lista de chequeo, el reporte tenga OT.

### Guardar está deshabilitado y no hay nada pendiente

Confirme que:

- La OT tenga una lista de chequeo asignada si `requiredChecklist` está en `'true'`.
- Los textos de Recomendaciones y Compromisos no tengan solo espacios.

## QA — Pruebas

### Escenario 1: Reporte con programación

**Precondición:** columnas en `'true'` en `fn_bandejaServicios_core` y secciones visibles.

1. Abra `/report/form?ot=<ot>&prog=<programación>` sin diligenciar las secciones.

**Resultado esperado:** las secciones se marcan como obligatorias y **Guardar** está deshabilitado hasta completarlas.

### Escenario 2: No disponibilidad

**Precondición:** programación tipo "no disponible" con las columnas en `'true'`.

1. Abra `/report/form?ot=0&prog=<programación>`.

**Resultado esperado:** se exigen Recomendaciones y Compromisos; repuestos, lista de chequeo y adjuntos no se muestran ni bloquean.

### Escenario 3: OT sin programación

**Precondición:** columnas en `'true'` en `mob_informacion_basica`.

1. Reporte una OT sin programación.

**Resultado esperado:** mismo comportamiento que el escenario 1.

## Errores Conocidos

No aplica para esta funcionalidad.
