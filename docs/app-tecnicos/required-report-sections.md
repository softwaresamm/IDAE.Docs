---
sidebar_position: 14
release_version: "2.0.3"
release_module: "App Técnicos"
---

# Obligatoriedad de Recomendaciones, Compromisos y Repuestos Ejecutados

Este documento describe cómo configurar en el App Técnicos la obligatoriedad de las secciones **Recomendaciones**, **Compromisos** y **Repuestos ejecutados** al reportar un servicio, mediante tres columnas del servicio de la programación (`mob_bandejaServicios`).

Funciona igual que la obligatoriedad de archivos adjuntos (`requiredAttachments`): cada instalación decide, con un valor `'true'` o `'false'`, si la sección debe diligenciarse antes de reportar. La obligatoriedad solo aplica cuando la sección está visible en la configuración de secciones del reporte.

## Referencias

- [SO-2252: Configurar como obligatorios los campos de compromisos, recomendaciones y repuestos ejecutados al reportar una OT](https://softwaresamm.atlassian.net/browse/SO-2252)
- [SO-2295: Exponer obligatoriedad de recomendaciones, compromisos y repuestos en servicios de reporte](https://softwaresamm.atlassian.net/browse/SO-2295)
- [SO-2296: Exigir recomendaciones, compromisos, repuestos y checklist según configuración del servicio (Utilitario)](https://softwaresamm.atlassian.net/browse/SO-2296)

## Información de Versiones

### Versión de Lanzamiento

:::info **v2.0.3**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima                           | Descripción                                     |
| ------------- | ---------------------------------------- | ----------------------------------------------- |
| App Técnicos  | >= 2.0.3                                 | Aplicación móvil del técnico                    |
| BASE DE DATOS | Scripts `SO_2252_1.sql` y `SO_2252_2.sql` | `fn_bandejaServicios_core` y `mob_informacion_basica` |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- El App Técnicos actualizado a la versión mínima indicada.
- Acceso a la base de datos SAMM con permisos para modificar funciones y procedimientos almacenados.
- Los scripts del ticket SO-2295 (`sammapi/capadatos/sps/SO-2252/SO_2252_1.sql` y `SO_2252_2.sql`) ejecutados en la base de datos.
- Las secciones `recomendaciones`, `compromisos` y/o `repuestosInstalados` visibles en la configuración de secciones del reporte.

:::important Importante
Los scripts usan `CREATE OR ALTER` y reemplazan la definición de `fn_bandejaServicios_core` y `mob_informacion_basica`. Si la instalación tiene personalizaciones en estos objetos, guarde una copia de su versión actual y agregue solo las columnas nuevas.
:::

## Configuración

### Paso 1: Ubicar las columnas de obligatoriedad

El servicio de la programación devuelve tres columnas nuevas, de tipo texto, con valor `'false'` por defecto:

| Columna                       | Sección (clave)       | Qué exige con `'true'`                              |
| ----------------------------- | --------------------- | --------------------------------------------------- |
| `requiredRecommendations`     | `recomendaciones`     | Texto en Recomendaciones (los espacios no cuentan)  |
| `requiredCommitments`         | `compromisos`         | Texto en Compromisos (los espacios no cuentan)      |
| `requiredInstalledSpareParts` | `repuestosInstalados` | Al menos un repuesto ejecutado/instalado            |

Las columnas están en las dos consultas del `UNION ALL` de `fn_bandejaServicios_core` (servicios con OT y programaciones tipo "no disponible") y en `mob_informacion_basica`.

```sql title="Columnas en fn_bandejaServicios_core"
,'false' as requiredChecklist
,'false' as requiredRecommendations --SO-2252: recommendations required to report (only when the section is visible)
,'false' as requiredCommitments --SO-2252: commitments required to report (only when the section is visible)
,'false' as requiredInstalledSpareParts --SO-2252: at least one installed/executed spare part required (only applies with OT)
```

### Paso 2: Habilitar la obligatoriedad

Cambie a `'true'` el valor de las columnas que deban ser obligatorias y ejecute el `CREATE OR ALTER` del objeto.

```sql title="Ejemplo: recomendaciones y repuestos ejecutados obligatorios"
,'true' as requiredRecommendations
,'false' as requiredCommitments
,'true' as requiredInstalledSpareParts
```

:::tip Consejo
Escriba el valor siempre en minúsculas y entre comillas simples, igual que `requiredAttachments` y `requiredChecklist`. Si la columna no existe (por ejemplo, en un procedimiento personalizado que no se actualizó), la app la toma como **opcional**.
:::

:::note Nota
Las columnas deben existir en las dos consultas del `UNION ALL` de `fn_bandejaServicios_core`; si se elimina de una de ellas, la función falla por diferencia en el número de columnas.
:::

### Paso 3: Verificar el valor devuelto

```sql title="Verificación de las columnas"
EXEC [dbo].[mob_bandejaServicios]
	@p_id_usuario = 1,
	@p_eid = '1';
```

Confirme que `requiredRecommendations`, `requiredCommitments` y `requiredInstalledSpareParts` devuelven el valor configurado.

## Casos Especiales

:::note Comportamientos Predefinidos
La obligatoriedad depende de que la sección esté visible y, en el caso de repuestos, de que el servicio tenga OT.
:::

| Caso                                   | Campo/Valor                         | Descripción                                                                                         |
| -------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| Sección oculta                         | Clave ausente en `secciones`        | No se exige, aunque la columna esté en `'true'`.                                                    |
| No disponibilidad (sin OT)             | `id_ot = 0`                         | Recomendaciones y Compromisos **sí** se exigen (se muestran en Información General). Repuestos no aplica, porque la sección no se muestra sin OT. |
| Procedimiento personalizado sin columna | Columna inexistente                | Se toma como opcional.                                                                              |
| Programación editada                   | Padre inactivo                      | La programación nueva (hija de una programación inactiva) vuelve a mostrarse en la bandeja (SO-2295). |

## Resultado Esperado

Una vez completada la configuración:

1. **Campos marcados como obligatorios**: Recomendaciones y Compromisos se muestran como campos obligatorios en Información General.
2. **Repuestos ejecutados resaltados**: la sección de repuestos ejecutados se resalta en rojo con el mensaje *Registre al menos un repuesto* mientras no tenga repuestos.
3. **Reporte bloqueado**: al intentar reportar con una sección obligatoria vacía, la app muestra el mensaje correspondiente y no permite continuar:
   - *Debe registrar recomendaciones antes de continuar*
   - *Debe registrar compromisos antes de continuar*
   - *Debe registrar al menos un repuesto ejecutado antes de continuar*
4. **Reporte permitido**: con las secciones diligenciadas, o con las columnas en `'false'`, el servicio se reporta normalmente.

## Resolución de Problemas

### La app permite reportar sin diligenciar la sección

Verifique que:

- La columna correspondiente esté en `'true'` en la consulta que aplica (servicio con OT o "no disponible").
- La sección esté visible en la configuración de secciones del reporte (`recomendaciones`, `compromisos`, `repuestosInstalados`).
- Para repuestos ejecutados, el servicio tenga OT asociada.
- El App Técnicos esté en la versión mínima indicada y la bandeja se haya sincronizado después del cambio.

### La app exige una sección cuando no debería

Confirme que:

- La columna esté en `'false'` en la consulta que aplica.
- No exista una versión personalizada de `mob_bandejaServicios` o `fn_bandejaServicios_core` con el valor en `'true'`.

### Error al ejecutar `mob_bandejaServicios`

Revise que:

- Las tres columnas existan en las dos consultas del `UNION ALL` de `fn_bandejaServicios_core`.
- Los procedimientos `bloquehome` personalizados que hacen `INSERT INTO ... EXEC mob_bandejaServicios` sobre una tabla de columnas fijas incluyan las columnas nuevas.

## QA — Pruebas

### Escenario 1: Secciones obligatorias vacías

**Precondición:** las tres columnas en `'true'` y las secciones visibles, en un servicio con OT.

1. Abra el servicio en la app sin diligenciar Recomendaciones, Compromisos ni repuestos ejecutados.
2. Intente reportar.

**Resultado esperado:** la app **no permite reportar** y muestra el mensaje de la primera sección pendiente.

### Escenario 2: Secciones obligatorias diligenciadas

1. Diligencie Recomendaciones y Compromisos y agregue un repuesto ejecutado.
2. Reporte el servicio.

**Resultado esperado:** el servicio **se reporta correctamente**.

### Escenario 3: No disponibilidad

**Precondición:** programación tipo "no disponible" (`NumOT` = `Sin OT`) con las columnas en `'true'`.

1. Abra la programación sin diligenciar Recomendaciones ni Compromisos e intente reportar.

**Resultado esperado:** la app exige Recomendaciones y Compromisos; repuestos ejecutados no se muestra ni bloquea.

## Errores Conocidos

No aplica para esta funcionalidad.
