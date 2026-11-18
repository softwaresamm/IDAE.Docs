---
sidebar_position: 12
release_version: "2.3.9.0"
release_module: "App Técnicos"
---

# Reportar Actividades sin OT ni Programación desde la APP

Este documento describe la nueva opción **Reportar sin servicio** de la aplicación móvil de técnicos, que permite reportar actividades que no tienen Orden de Trabajo (OT) ni programación asociada directamente desde el menú de la APP. Antes de esta funcionalidad no era posible reportar desde la APP las actividades que no tuvieran OT; con esta mejora el técnico puede registrarlas desde la aplicación y consultarlas luego en la plataforma web.

## Referencias

- [SO-2247: Permitir reportar actividades sin OT ni programación desde el menú de la app](https://softwaresamm.atlassian.net/browse/SO-2247)
- [SO-2256: Permitir registrar gastos desde la pantalla de reportar servicio (actividad relacionada)](https://softwaresamm.atlassian.net/browse/SO-2256)

## Información de Versiones

### Versión de Lanzamiento

:::info **SA v1.2.35.3 · APP v2.3.9.0**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción                  |
| ------------- | -------------- | ---------------------------- |
| APP           | >= 2.3.9.0     | Aplicación móvil de técnicos |
| SAMMAPI       | >= 1.2.35.3    | API principal                |
| SAMM LOGICA   | >= 5.6.28.0    | Lógica de negocio            |
| SAMM CORE     | >= 2.0.30.1    | Core del sistema             |
| CAPA DE DATOS | >= 2.1.22.1    | Capa de acceso a datos       |
| BASE DE DATOS | >= C2.1.22.1   | Base de datos                |

:::note Nota
El componente recursos no aplica versión mínima para esta funcionalidad.
:::

## Requisitos Previos

Antes de usar la funcionalidad, asegúrese de tener:

- Todas las aplicaciones actualizadas a las versiones mínimas indicadas en la tabla anterior
- La aplicación móvil actualizada a la versión `APP V.2.3.9.0` o superior
- Un usuario autorizado para ingresar a la aplicación móvil
- Técnicos habilitados, actividades y canales de servicio configurados en la plataforma

:::important Importante
La opción **Reportar sin servicio** solo aparece en el menú si la aplicación móvil está en la versión `APP V.2.3.9.0` o superior y la API en la versión `SAMMAPI >= 1.2.35.3`.
:::

## Información del Servicio

:::note Información
La funcionalidad usa el servicio de SAMMAPI (versión `1.2.35.3` o superior) para cargar los técnicos, las actividades y los canales de servicio del formulario, y para registrar el reporte sin servicio.
:::

## Configuración

### Paso 1: Actualizar la aplicación móvil

Esta funcionalidad no requiere parámetros, scripts ni permisos adicionales. La opción aparece en el menú de la APP una vez que la aplicación está actualizada a la versión `APP V.2.3.9.0`.

:::tip Consejo
Después de actualizar, despliegue el menú de la aplicación y confirme que se visualiza la opción **Reportar sin servicio**.
:::

## Casos Especiales

:::note Comportamientos Predefinidos
Los reportes generados sin OT ni programación tienen un comportamiento definido en la plataforma web.
:::

| Caso                           | Campo/Valor         | Descripción                                                                       |
| ------------------------------ | ------------------- | --------------------------------------------------------------------------------- |
| Reporte sin servicio en la web | `ID = 0`            | El reporte se visualiza en el formulario de Programación con el identificador `0` |
| Campos obligatorios sin llenar | Campos obligatorios | La aplicación informa los campos pendientes y no genera el reporte                |
| Pulsaciones consecutivas       | Opción de envío     | La aplicación evita generar registros duplicados para una misma solicitud         |

## Resultado Esperado

Una vez actualizada la aplicación:

1. **Opción visible en el menú**: El técnico visualiza la opción **Reportar sin servicio** al desplegar el menú de la APP.
2. **Formulario completo**: El formulario muestra las secciones Información general, Técnicos, Actividades y Canal de servicio con los datos configurados.
3. **Reporte registrado**: Al diligenciar los campos obligatorios, la aplicación registra el reporte sin servicio y muestra la confirmación.
4. **Reporte visible en la web**: El reporte se consulta en el formulario de Programación de la plataforma web con `ID = 0` y conserva la información registrada desde la APP.

:::tip Video de apoyo
Para ver el proceso completo de reportar sin OT desde la APP, consulte el video de apoyo: https://www.youtube.com/shorts/anS1R0bxpnU
:::

## Resolución de Problemas

### La opción Reportar sin servicio no aparece en el menú

Verifique que:

- La aplicación móvil esté en la versión `APP V.2.3.9.0` o superior
- La API esté en la versión `SAMMAPI >= 1.2.35.3`
- El usuario haya cerrado e iniciado sesión después de actualizar la aplicación

### Las secciones Técnicos, Actividades o Canal de servicio aparecen vacías

Confirme que:

- Existan técnicos habilitados en la plataforma
- Existan actividades configuradas para el reporte
- Existan canales de servicio configurados en la plataforma
- El dispositivo tenga conexión con la API

### El reporte no se genera

Revise que:

- Todos los campos obligatorios del formulario estén diligenciados
- El dispositivo tenga conexión con la API
- La versión de la API sea compatible con la funcionalidad

### El reporte no se visualiza en la plataforma web

Revise que:

- La consulta se haga en el formulario de Programación
- Se busque el registro con `ID = 0`
- La aplicación haya mostrado la confirmación del reporte

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Acceso y visualización de la opción Reportar sin servicio

**Precondiciones:** Usuario autorizado y aplicación móvil en la versión `APP V.2.3.9.0` o superior.

| Paso | Acción                                                | Resultado esperado                                                                                |
| ---- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1    | Iniciar la aplicación móvil con un usuario autorizado | La aplicación abre correctamente, sin presentar errores ni cierres inesperados                    |
| 2    | Ingresar a la bandeja de servicios                    | La bandeja carga correctamente y muestra las órdenes de trabajo asignadas al usuario              |
| 3    | Desplegar el menú de la aplicación                    | La opción **Reportar sin servicio** se muestra en el menú y permite acceder al formulario         |
| 4    | Seleccionar la opción **Reportar sin servicio**       | El formulario carga correctamente con las secciones y campos configurados, sin errores de visualización |
| 5    | Verificar las secciones del formulario                | Se visualizan las secciones Información general, Técnicos, Actividades y Canal de servicio con sus componentes |

### Escenario 2: Carga y selección de técnicos, actividades y canales

**Precondiciones:** Formulario **Reportar sin servicio** abierto; técnicos, actividades y canales configurados en la plataforma.

| Paso | Acción                                        | Resultado esperado                                                                         |
| ---- | --------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1    | Revisar la sección Técnicos                   | Se muestran los usuarios habilitados, sin usuarios deshabilitados ni registros duplicados  |
| 2    | Revisar la sección Actividades                | Se muestran las actividades disponibles y se permite consultar las opciones                |
| 3    | Revisar la sección Canal de servicio          | Se muestran los canales de servicio configurados en la plataforma                          |
| 4    | Seleccionar uno o varios técnicos habilitados | La aplicación permite la selección y la conserva durante el diligenciamiento del formulario |
| 5    | Seleccionar las actividades disponibles       | La aplicación permite seleccionar las actividades y refleja las opciones elegidas          |
| 6    | Seleccionar un canal de servicio              | La aplicación permite seleccionar el canal y conserva la opción elegida al generar el reporte |

### Escenario 3: Validaciones y generación del reporte

**Precondiciones:** Formulario **Reportar sin servicio** abierto.

| Paso | Acción                                                                          | Resultado esperado                                                                                  |
| ---- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1    | Intentar realizar el reporte sin diligenciar uno o varios campos obligatorios   | La aplicación identifica los campos pendientes, informa al usuario y no genera el reporte           |
| 2    | Diligenciar los campos obligatorios y seleccionar la opción para realizar el reporte | La aplicación registra el reporte sin servicio y presenta la confirmación al usuario           |
| 3    | Pulsar varias veces seguidas la opción de envío                                 | La aplicación evita registros duplicados para una misma solicitud y presenta una respuesta controlada |

### Escenario 4: Visualización del reporte en la plataforma web

**Precondiciones:** Reporte sin servicio generado desde la aplicación móvil.

| Paso | Acción                                                            | Resultado esperado                                                                     |
| ---- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 1    | Ingresar a la plataforma web y abrir el formulario de Programación | El formulario carga correctamente                                                     |
| 2    | Consultar el reporte generado desde la aplicación móvil          | El reporte se visualiza con el identificador `ID = 0`, según el comportamiento definido |
| 3    | Revisar la información del reporte                               | La información registrada desde la aplicación móvil se conserva y se visualiza correctamente |

### Escenario 5: Compatibilidad con versiones de API y de Android

**Precondiciones:** Acceso a ambientes con versiones de API anteriores y dispositivos con distintas versiones de Android.

| Paso | Acción                                                                          | Resultado esperado                                                                                                                              |
| ---- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Usar la opción **Reportar sin servicio** con una versión de API anterior a la actual | La funcionalidad mantiene el comportamiento esperado o presenta un mensaje controlado; no hay cierres inesperados ni pérdida de información |
| 2    | Usar el formulario en dispositivos con diferentes versiones de Android          | El menú, el formulario, las secciones y el registro del reporte funcionan correctamente en las versiones de Android soportadas                   |
