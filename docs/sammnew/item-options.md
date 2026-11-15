---
sidebar_position: 1
release_version: "7.1.25.0"
release_module: SAMM New 
---

# Opciones para Agrupar Ítems

Este documento describe cómo configurar y utilizar la funcionalidad de **Opciones para Agrupar Ítems** en cotizaciones de SAMM New, que permite crear múltiples agrupaciones de ítems dentro de una misma cotización, presentando al cliente distintas alternativas de configuración sin necesidad de generar versiones adicionales de la oferta. Además, describe el **permiso para controlar la visualización y configuración de opciones** por perfil.

## Referencias

- [SO-745 / OTT-3773: Habilitar un cuadro resumen al final de la cotización que totalice cada opción de configuración de equipos, aplicable a cotizaciones de alquiler y venta](https://softwaresamm.atlassian.net/browse/SO-745)
- [SO-2197: Permisos de opciones de control](https://softwaresamm.atlassian.net/browse/SO-2197)

## Información de Versiones

### Versión de Lanzamiento

:::info **SN 7.1.25.0**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción            |
| ------------- | -------------- | ---------------------- |
| SAMMAPI       | >= 1.2.35.3    | API principal          |
| SAMMNEW       | >= 7.1.25.0    | Aplicación web         |
| SAMM LOGICA   | >= 5.6.28.0    | Lógica de negocio      |
| SAMM CORE     | >= 2.0.30.1    | Core del sistema       |
| CAPA DE DATOS | >= 2.1.22.1    | Capa de acceso a datos |
| BASE DE DATOS | >= C2.1.22.1   | Base de datos          |

:::note Nota
El componente `recursos` no aplica versión mínima para esta funcionalidad.
:::

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Acceso al menú `configuracion > comercial > opciones` en SAMM New
- Un perfil con los permisos **Ver Opciones** y **Configurar Opciones** asignados (ver [Paso 4: Permisos de Opciones](#paso-4-permisos-de-opciones))

:::important Importante
Un mismo ítem **no puede pertenecer a más de una opción simultáneamente**. Si un ítem debe aparecer en varias opciones, es necesario duplicarlo tantas veces como opciones lo requieran antes de asignarlo.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Habilitar las Opciones Disponibles

Ingrese al menú `configuracion > comercial > opciones`. Desde allí se define **cuántas opciones** estarán disponibles para agrupar ítems dentro de la cotización. No existe un límite máximo; la cantidad se define a partir de 1 en adelante según la necesidad comercial.

:::tip Consejo
Configure únicamente la cantidad de opciones que realmente va a utilizar en la cotización para mantener el cuadro resumen final ordenado y claro para el cliente.
:::

### Paso 2: Agregar los Ítems

Agregue los ítems a la cotización de la misma manera en que se hacía anteriormente, incluyendo todos los que formarán parte de las distintas opciones a presentar al cliente.

:::warning Aviso
Si un mismo ítem debe formar parte de más de una opción, **duplíquelo** las veces que sea necesario antes de continuar, ya que cada ítem solo puede quedar asociado a una única opción.
:::

### Paso 3: Selección y Agrupación de Ítems

Seleccione los ítems que formarán parte de la opción deseada. En la sección de **opciones**, despliegue la opción a la que se van a asignar los ítems seleccionados y finalice haciendo clic en el botón **Aceptar**, ubicado en la parte derecha de la pantalla.

Una vez realizado esto, se creará automáticamente una línea con el nombre de la opción dentro del listado de ítems, y bajo esa línea se agruparán todos los ítems asignados.

:::tip Consejo
En la línea de la opción se puede cambiar el nombre de la opción según se desee.
:::

### Paso 4: Permisos de Opciones

La sección **Opciones** estaba disponible para todos los perfiles y documentos sin control de acceso. A partir de la versión **SN 7.1.25.0** se controla por perfil con dos permisos independientes:

| Permiso                 | Efecto                                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Ver Opciones**        | Permite ver la sección de opciones en los documentos con ítems. Sin este permiso la sección no se muestra. |
| **Configurar Opciones** | Permite crear, modificar y asignar opciones. Con solo **Ver Opciones** la sección queda en modo lectura.   |

:::note Nota
Los perfiles existentes conservan el acceso habilitado, por lo que no es necesario reconfigurarlos para mantener el comportamiento anterior.
:::

### Paso 5: Asignar el permiso Configurar Opciones

1. Ingrese a la configuración de permisos del perfil que desea modificar.
2. Marque (o desmarque) el permiso **Configurar Opciones**.
3. Guarde los cambios.
4. Cierre sesión y vuelva a ingresar con un usuario de ese perfil para que el cambio se aplique.

Video del permiso **Configurar Opciones**: [https://www.youtube.com/watch?v=jz92AflXmZs](https://www.youtube.com/watch?v=jz92AflXmZs)

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Agrupación visible por opción**: los ítems seleccionados aparecen agrupados bajo una línea con el nombre de la opción correspondiente dentro de la cotización.
2. **Cuadro resumen final**: al finalizar la cotización se muestra un cuadro resumen que totaliza cada opción de configuración de equipos de forma independiente.
3. **Aplicación en alquiler y venta**: el comportamiento es consistente tanto en cotizaciones de alquiler como de venta.
4. **Control por permiso**: con **Configurar Opciones** marcado, el desplegable de opciones se muestra en los ítems; al desmarcarlo y volver a iniciar sesión, deja de mostrarse.

### Criterios de Aceptación

1. Se puede asignar el permiso **Ver Opciones** a un perfil.
2. Se puede asignar el permiso **Configurar Opciones** a un perfil.
3. Si el perfil no tiene **Ver Opciones**, no se muestra la sección de opciones en los documentos con ítems.
4. Si el perfil solo tiene **Ver Opciones**, la sección se muestra en modo solo lectura.
5. Los perfiles existentes conservan el acceso habilitado.

## Resolución de Problemas

### Un ítem no aparece agrupado bajo la opción esperada

Verifique que:

- El ítem haya sido seleccionado correctamente antes de desplegar la opción de destino
- Se haya hecho clic en el botón **Aceptar** después de seleccionar la opción
- El ítem no esté duplicado por error en otra opción, generando confusión en el listado

### Un mismo ítem parece requerido en varias opciones

Confirme que:

- El ítem fue duplicado previamente para cada opción en la que debía aparecer
- Cada duplicado fue asignado a una única opción distinta
- No se intentó asignar un mismo ítem original a más de una opción directamente

### El desplegable de opciones no se muestra o no cambió tras modificar el permiso

Revise que:

- El perfil tenga marcado el permiso **Configurar Opciones** (y **Ver Opciones**)
- Se haya cerrado sesión y vuelto a ingresar después de cambiar el permiso

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Creación de múltiples opciones en una cotización de venta

**Precondiciones:** Acceso a `configuracion > comercial > opciones` y una cotización de venta.

| Paso | Acción                                                                                                        | Resultado esperado                                                                   |
| ---- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1    | Configurar 2 opciones en `configuracion > comercial > opciones`                                               | Las 2 opciones quedan disponibles                                                    |
| 2    | Agregar 4 ítems a la cotización                                                                               | Los 4 ítems aparecen en el listado                                                   |
| 3    | Duplicar 1 ítem para que aparezca en ambas opciones                                                           | El ítem duplicado aparece en el listado                                              |
| 4    | Asignar 2 ítems (uno de ellos duplicado) a la Opción 1 y 3 ítems (incluyendo el otro duplicado) a la Opción 2 | **El listado de ítems muestra dos agrupaciones separadas** con sus respectivos ítems |
| 5    | Revisar el cuadro resumen final                                                                               | El cuadro resumen **totaliza cada opción de forma independiente**                    |

### Escenario 2: Permiso Configurar Opciones marcado

**Precondiciones:** Perfil de prueba y un usuario de ese perfil.

| Paso | Acción                                                           | Resultado esperado                                                                          |
| ---- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1    | Marcar el permiso **Configurar Opciones** en el perfil de prueba | El permiso queda guardado en el perfil                                                      |
| 2    | Cerrar sesión e ingresar nuevamente con un usuario de ese perfil | El ingreso se realiza correctamente                                                         |
| 3    | Abrir una cotización y ubicarse en los ítems                     | **Se muestra el desplegable de opciones** en los ítems y es posible asignarlos a una opción |

### Escenario 3: Permiso Configurar Opciones desmarcado

**Precondiciones:** Perfil de prueba y un usuario de ese perfil.

| Paso | Acción                                                              | Resultado esperado                                           |
| ---- | ------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1    | Desmarcar el permiso **Configurar Opciones** en el perfil de prueba | El cambio queda guardado en el perfil                        |
| 2    | Cerrar sesión e ingresar nuevamente con un usuario de ese perfil    | El ingreso se realiza correctamente                          |
| 3    | Abrir una cotización y ubicarse en los ítems                        | **El desplegable de opciones ya no se muestra** en los ítems |
