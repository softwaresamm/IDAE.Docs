---
sidebar_position: 1
release_version: "7.1.25.0"
release_module: "SAMM New"
---

# Encuesta Obligatoria para Firmar el Reporte

Este documento describe cómo configurar la opción **Obligatoria** al crear una encuesta de evaluación, que permite al administrador decidir si la encuesta de satisfacción debe estar diligenciada antes de firmar el reporte técnico. Antes de esta mejora no existía un parámetro para definirlo: la validación aplicaba sin distinguir si la encuesta era obligatoria, lo que afectaba a los clientes que no manejan encuesta de satisfacción en su proceso. Con la nueva configuración, el sistema exige la encuesta para firmar el reporte únicamente cuando esta se define como obligatoria.

## Referencias

- [SO-2251: Exigir encuesta para firmar el reporte solo cuando es obligatoria](https://softwaresamm.atlassian.net/browse/SO-2251)
- [SO-2216 / HU-57: Validar llenado de encuesta de satisfacción antes de firmar el reporte técnico](https://softwaresamm.atlassian.net/browse/SO-2216)
- [SO-2249: Agregar columna obligatoria](https://softwaresamm.atlassian.net/browse/SO-2249)

## Información de Versiones

### Versión de Lanzamiento

:::info **SR 6.0.0.16 · SN 7.1.25.0 · SA 1.2.35.3**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción            |
| ------------- | -------------- | ---------------------- |
| SR            | >= 6.0.0.16    | Servicio / Reporte     |
| SAMMNEW       | >= 7.1.25.0    | Aplicación web         |
| SAMMAPI       | >= 1.2.35.3    | API principal          |
| SAMM LOGICA   | >= 5.6.28.0    | Lógica de negocio      |
| SAMM CORE     | >= 2.0.30.1    | Core del sistema       |
| CAPA DE DATOS | >= 2.1.22.1    | Capa de acceso a datos |
| BASE DE DATOS | >= C2.1.22.1   | Base de datos          |

:::note Nota
El componente `recursos` no aplica versión mínima para esta funcionalidad.
:::

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Todas las aplicaciones actualizadas a las versiones mínimas indicadas en la tabla anterior
- Un usuario con perfil administrador que tenga acceso al menú `configuracion > servicio > evaluaciones` en SAMM New

:::important Importante
La opción **Obligatoria** solo está disponible para el usuario administrador que tenga el menú `configuracion > servicio > evaluaciones`.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Ingresar a Evaluaciones

Con el perfil administrador, ingrese al menú `configuracion > servicio > evaluaciones`.

### Paso 2: Definir si la encuesta es obligatoria

Al crear la encuesta, seleccione en la opción **Obligatoria**:

- **Sí**: el reporte no se puede firmar hasta que la encuesta esté diligenciada.
- **No**: el reporte se puede firmar sin diligenciar la encuesta.

Video de la configuración: [https://youtu.be/-jvFc5-Td2Y](https://youtu.be/-jvFc5-Td2Y)

## Casos Especiales

:::note Comportamientos Predefinidos
La validación se aplica tanto cuando el reporte se firma desde la aplicación como cuando se firma a través del enlace enviado al cliente.
:::

| Caso                      | Configuración                       | Descripción                                                                                   |
| ------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------- |
| Encuesta obligatoria      | **Obligatoria** en Sí               | Si la encuesta no ha sido diligenciada, el sistema informa que es obligatoria y permite diligenciarla |
| Encuesta no obligatoria   | **Obligatoria** en No               | El reporte se firma sin necesidad de diligenciar la encuesta                                  |
| Firma por enlace          | **Obligatoria** en Sí               | La validación también aplica cuando el reporte se firma a través del enlace enviado al cliente |
| Clientes sin encuesta     | Sin encuesta o **Obligatoria** en No | La restricción no los afecta                                                                  |

## Resultado Esperado

Una vez completada la configuración:

1. **Opción disponible**: al crear la encuesta en `configuracion > servicio > evaluaciones`, el administrador puede seleccionar **Obligatoria** en Sí o No.
2. **Encuesta obligatoria exigida**: con **Obligatoria** en Sí, el sistema no permite firmar el reporte hasta que la encuesta esté diligenciada.
3. **Firma sin encuesta**: con **Obligatoria** en No, el reporte se puede firmar sin diligenciar la encuesta.
4. **Sin afectar a quienes no la usan**: los clientes que no manejan encuesta de satisfacción no se ven afectados.

## Resolución de Problemas

### La opción Obligatoria no aparece

Verifique que:

- Esté ingresando con un usuario con perfil administrador
- El usuario tenga el menú `configuracion > servicio > evaluaciones`
- Las aplicaciones estén actualizadas a las versiones mínimas indicadas

### El sistema permite firmar sin diligenciar la encuesta

Confirme que:

- La opción **Obligatoria** de la encuesta esté en **Sí**
- Las aplicaciones estén actualizadas a las versiones mínimas indicadas

### El sistema exige la encuesta y el cliente no la maneja

Revise que:

- La opción **Obligatoria** de la encuesta esté en **No**

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Encuesta obligatoria sin diligenciar

**Criterio de aceptación:** Si la encuesta es obligatoria y no ha sido diligenciada, el sistema debe informar al usuario que es obligatoria y permitirle diligenciarla antes de firmar el reporte.

**Precondiciones:** Usuario administrador con acceso a `configuracion > servicio > evaluaciones`. Una OT con reporte técnico pendiente de firma.

| Paso | Acción                                                                                         | Resultado esperado                                                                  |
| ---- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1    | Ingresar a `configuracion > servicio > evaluaciones` y crear la encuesta con **Obligatoria** en Sí | La encuesta queda guardada como obligatoria                                         |
| 2    | Abrir el reporte técnico de la OT e intentar firmarlo sin diligenciar la encuesta              | **El sistema informa que la encuesta es obligatoria** y permite diligenciarla       |
| 3    | Diligenciar la encuesta y firmar el reporte                                                    | El reporte se firma correctamente                                                   |

### Escenario 2: Encuesta no obligatoria

**Criterio de aceptación:** La restricción debe ser parametrizable, de modo que no afecte a los clientes que no manejan encuesta de satisfacción en su proceso.

**Precondiciones:** Usuario administrador con acceso a `configuracion > servicio > evaluaciones`. Una OT con reporte técnico pendiente de firma.

| Paso | Acción                                                                                          | Resultado esperado                                                       |
| ---- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1    | Ingresar a `configuracion > servicio > evaluaciones` y crear la encuesta con **Obligatoria** en No | La encuesta queda guardada como no obligatoria                           |
| 2    | Abrir el reporte técnico de la OT y firmarlo sin diligenciar la encuesta                        | **El reporte se firma correctamente sin exigir la encuesta**             |

### Escenario 3: Firma a través del enlace enviado al cliente

**Criterio de aceptación:** La validación debe aplicarse también cuando el reporte se firma a través del enlace enviado al cliente.

**Precondiciones:** Encuesta con **Obligatoria** en Sí. Una OT con reporte técnico y enlace de firma enviado al cliente.

| Paso | Acción                                                                  | Resultado esperado                                                                |
| ---- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1    | Abrir el enlace de firma enviado al cliente sin diligenciar la encuesta | El cliente visualiza el reporte                                                   |
| 2    | Intentar guardar la firma sin diligenciar la encuesta                   | **El sistema informa que la encuesta es obligatoria** y no guarda la firma        |
| 3    | Diligenciar la encuesta y guardar la firma                              | La firma se guarda correctamente                                                  |