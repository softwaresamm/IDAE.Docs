---
sidebar_position: 1
release_version: "7.1.25.0"
release_module: "SAMM New"
---

# Asesores Ven Solo Sus Cotizaciones

Este documento describe cómo configurar el parámetro **Asesores ven solo sus cotizaciones** (`CotSoloMisCotizaciones`) en SAMM New, que permite al administrador decidir si los asesores visualizan únicamente las cotizaciones en las que son el asesor asignado. Antes de esta mejora, el listado de cotizaciones del asesor se filtraba por clientes asociados (`CotClientesAsociados`) y por jerarquía de sucursales (`administrarContactosXJerarquia`), ambos a través de los contactos, y no existía un parámetro para restringirlo directamente por asesor. Con la nueva configuración, el administrador puede elegir si lo activa o no.

## Referencias

- [SO-2242 / OTT-3973: Agregar configuración para que el asesor vea solo sus cotizaciones](https://softwaresamm.atlassian.net/browse/SO-2242)
- [SO-2243 / OTT-3973: Crear parámetro CotSoloMisCotizaciones en gen_config](https://softwaresamm.atlassian.net/browse/SO-2243)

## Información de Versiones

### Versión de Lanzamiento

:::info **SN 7.1.25.0 · SA 1.2.35.3**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción            |
| ------------- | -------------- | ---------------------- |
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
- Un usuario con perfil administrador
- Acceso al menú `configuracion > aplicacion > parametros generales` en SAMM New

:::important Importante
El parámetro **Asesores ven solo sus cotizaciones** debe ser configurado por el usuario administrador y aplica a usuarios comerciales no administrativos.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Ingresar a los Parámetros generales

Con el perfil administrador, ingrese a `configuracion > aplicacion > parametros generales` y abra la pestaña **Documentos**.

### Paso 2: Activar el parámetro Asesores ven solo sus cotizaciones

En la pestaña **Documentos**, deje la opción **Asesores ven solo sus cotizaciones** en **Sí**. Este parámetro corresponde a `CotSoloMisCotizaciones` (módulo `documentos`) en la tabla `gen_config`.

Video de la configuración: [https://www.youtube.com/watch?v=NOjWoijBGmY](https://www.youtube.com/watch?v=NOjWoijBGmY)

## Casos Especiales

:::note Comportamientos Predefinidos
El parámetro `CotSoloMisCotizaciones` filtra directamente por el asesor asignado a la cotización (`id_usuario_asesor`).
:::

| Caso                  | Configuración                                      | Descripción                                                                                                                            |
| --------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Parámetro activo      | `CotSoloMisCotizaciones` activo                    | El asesor ve solo las cotizaciones donde es el asesor asignado                                                                         |
| Filtros por contactos | `CotSoloMisCotizaciones` activo                    | Se omiten los filtros por clientes asociados (`CotClientesAsociados`) y por jerarquía de sucursales (`administrarContactosXJerarquia`) |
| Jefe de asesores      | `CotSoloMisCotizaciones` activo y jerarquía activa | El usuario ve sus cotizaciones y las de los asesores que dirige                                                                        |
| Parámetro desactivado | `CotSoloMisCotizaciones` desactivado               | El listado de cotizaciones se visualiza igual que antes de la mejora                                                                   |
| Tipo de usuario       | `CotSoloMisCotizaciones` activo                    | Aplica a usuarios comerciales no administrativos                                                                                       |

## Resultado Esperado

Una vez completada la configuración:

1. **Parámetro disponible**: en `configuracion > aplicacion > parametros generales`, pestaña **Documentos**, el administrador puede activar o desactivar **Asesores ven solo sus cotizaciones**.
2. **Asesor sin cotizaciones ajenas**: con el parámetro activo, el asesor ve solo las cotizaciones donde es el asesor asignado.
3. **Seguimiento del jefe a su equipo**: con la jerarquía activa, el jefe de asesores ve sus cotizaciones y las de sus asesores.
4. **Sin afectar a quienes no lo usan**: con el parámetro desactivado, el listado se ve igual que antes.

## Resolución de Problemas

### El parámetro Asesores ven solo sus cotizaciones no aparece

Verifique que:

- Esté ingresando con un usuario con perfil administrador
- Esté en `configuracion > aplicacion > parametros generales`, pestaña **Documentos**
- Las aplicaciones estén actualizadas a las versiones mínimas indicadas

### El asesor visualiza cotizaciones de otros asesores

Confirme que:

- El parámetro **Asesores ven solo sus cotizaciones** esté en **Sí**
- El usuario sea un usuario comercial no administrativo
- Las cotizaciones consultadas no pertenezcan a los asesores que dirige el usuario, en caso de tener la jerarquía activa

### El jefe no visualiza las cotizaciones de sus asesores

Revise que:

- La jerarquía esté activa
- Los asesores estén a cargo del usuario
- El parámetro **Asesores ven solo sus cotizaciones** esté en **Sí**

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Activar o desactivar el parámetro

**Criterio de aceptación:** Como administrador, debería poder activar o desactivar "Asesores ven solo sus cotizaciones" en Parámetros generales → Documentos, para controlar qué ven los asesores.

**Precondiciones:** Usuario autorizado con perfil administrador.

| Paso | Acción                                                                                                                                              | Resultado esperado                                                           |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1    | Verificar el ingreso a la plataforma web con un usuario autorizado                                                                                  | El usuario ingresa correctamente a la plataforma sin presentar errores       |
| 2    | Ingresar a Parámetros generales, acceder a la pestaña Documentos y verificar la visualización del parámetro **Asesores ven solo sus cotizaciones** | El parámetro se visualiza correctamente y puede consultarse su configuración |
| 3    | Cambiar el parámetro a Sí y luego a No                                                                                                              | **El parámetro se puede activar y desactivar** sin errores                   |

### Escenario 2: El asesor ve solo sus cotizaciones

**Criterio de aceptación:** Como asesor, debería ver solo las cotizaciones donde soy el asesor asignado cuando el parámetro está activo, para no ver cotizaciones ajenas.

**Precondiciones:** Parámetro **Asesores ven solo sus cotizaciones** en Sí. Asesor con cotizaciones creadas.

| Paso | Acción                                                                              | Resultado esperado                                                                                    |
| ---- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1    | Verificar el ingreso al formulario de Cotización desde la plataforma                | El formulario carga correctamente y permite visualizar las opciones disponibles sin presentar errores |
| 2    | Ingresar al formulario de Cotizaciones con un asesor que tenga cotizaciones creadas | **El sistema muestra solo las cotizaciones donde el asesor es el asesor asignado**                    |

### Escenario 3: El jefe ve sus cotizaciones y las de sus asesores

**Criterio de aceptación:** Como jefe de asesores con jerarquía activa, debería ver mis cotizaciones y las de mis asesores, para dar seguimiento a mi equipo.

**Precondiciones:** Parámetro **Asesores ven solo sus cotizaciones** en Sí y jerarquía activa. Usuario con asesores a cargo.

| Paso | Acción                                                                           | Resultado esperado                                                                                    |
| ---- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1    | Ingresar al formulario de Cotizaciones con un usuario que tenga asesores a cargo | El sistema muestra las cotizaciones propias del jefe y las creadas por los asesores que tiene a cargo |

### Escenario 4: Parámetro desactivado y usuario administrador

**Criterio de aceptación:** Como administrador, debería ver igual que hoy el listado cuando el parámetro está desactivado, para no afectar a quienes no lo usan.

**Precondiciones:** Usuario administrador con acceso a Parámetros generales, pestaña Documentos.

| Paso | Acción                                                                                                                         | Resultado esperado                                                                                                         |
| ---- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| 1    | Configurar **Asesores ven solo sus cotizaciones** en No e ingresar al formulario de Cotizaciones como administrador            | **El listado se visualiza igual que antes de la mejora**, sin afectar a quienes no lo usan                                 |
| 2    | Configurar **Asesores ven solo sus cotizaciones** en Sí e ingresar nuevamente al formulario de Cotizaciones como administrador | El administrador sigue viendo todas las cotizaciones, porque el parámetro aplica a usuarios comerciales no administrativos |