---
sidebar_position: 1
release_version: "7.1.17.0"
release_module: "SAMM New - Comercial"
---

# Opciones para Agrupar Ítems

Este documento describe cómo configurar y utilizar la funcionalidad de **Opciones para Agrupar Ítems** en cotizaciones de SAMM New, que permite crear múltiples agrupaciones de ítems dentro de una misma cotización, presentando al cliente distintas alternativas de configuración sin necesidad de generar versiones adicionales de la oferta.

## Referencias

- [SO-745 / OTT-3773: Habilitar un cuadro resumen al final de la cotización que totalice cada opción de configuración de equipos, aplicable a cotizaciones de alquiler y venta](https://softwaresamm.atlassian.net/browse/SO-745)

## Información de Versiones

### Versión de Lanzamiento

:::info **SN 7.1.17.0**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción            |
| ------------- | --------------- | ----------------------- |
| SAMMAPI       | >= 1.2.33.1     | API principal            |
| SAMMNEW       | >= 7.1.17.0     | Aplicación web           |
| SAMM LOGICA   | >= 5.6.26.7     | Lógica de negocio        |
| SAMM CORE     | >= 2.0.27.0     | Core del sistema         |
| CAPA DE DATOS | >= 2.1.18.0     | Capa de acceso a datos   |
| BASE DE DATOS | >= C2.1.18.0    | Base de datos            |

:::note
El componente `recursos` no aplica versión mínima para esta funcionalidad.
:::

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Acceso al menú `configuracion > comercial > opciones` en SAMM New
- Una cotización de alquiler o venta en la cual se desee aplicar la agrupación
- Los ítems o temparios que se van a distribuir entre las distintas opciones ya identificados

:::important Importante
Un mismo ítem **no puede pertenecer a más de una opción simultáneamente**. Si un ítem debe aparecer en varias opciones, es necesario duplicarlo tantas veces como opciones lo requieran antes de asignarlo.
:::

## Configuración

### Paso 1: Habilitar las Opciones Disponibles

Ingrese al menú `configuracion > comercial > opciones`. Desde allí se define **cuántas opciones** estarán disponibles para agrupar ítems dentro de la cotización. No existe un límite máximo; la cantidad se define a partir de 1 en adelante según la necesidad comercial.

:::tip Consejo
Configure únicamente la cantidad de opciones que realmente va a utilizar en la cotización para mantener el cuadro resumen final ordenado y claro para el cliente.
:::

### Paso 2: Agregar los Ítems

Agregue los ítems a la cotización de la misma manera en que se hacía anteriormente, incluyendo todos los que formarán parte de las distintas opciones a presentar al cliente.

:::warning
Si un mismo ítem debe formar parte de más de una opción, **duplíquelo** las veces que sea necesario antes de continuar, ya que cada ítem solo puede quedar asociado a una única opción.
:::

### Paso 3: Selección y Agrupación de Ítems

Seleccione los ítems que formarán parte de la opción deseada. En la sección de **opciones**, despliegue la opción a la que se van a asignar los ítems seleccionados y finalice haciendo clic en el botón **Aceptar**, ubicado en la parte derecha de la pantalla.

Una vez realizado esto, se creará automáticamente una línea con el nombre de la opción dentro del listado de ítems, y bajo esa línea se agruparán todos los ítems asignados.

:::tip Consejo
En la linea de la opcion  se puede cambiar el nombre de la opcion segun se desee 
:::
#### Agrupación de Ítems dentro de Temparios

Cuando los ítems a agrupar provienen de un tempario, despliegue el contenido del tempario y seleccione los ítems que están dentro de él de forma individual, para garantizar que la agrupación quede correctamente asociada a la opción deseada.

:::tip Consejo
Verifique el despliegue de cada tempario antes de finalizar la selección; agrupar el tempario completo sin desplegarlo puede impedir que los ítems internos queden correctamente asignados a la opción.
:::


En caso de tener dudas consultar el siguiente video https://youtu.be/xGhnASoYLyY


## Resultado Esperado

Una vez completada la configuración:

1. **Agrupación visible por opción**: los ítems seleccionados aparecen agrupados bajo una línea con el nombre de la opción correspondiente dentro de la cotización.
2. **Cuadro resumen final**: al finalizar la cotización se muestra un cuadro resumen que totaliza cada opción de configuración de equipos de forma independiente.
3. **Aplicación en alquiler y venta**: el comportamiento es consistente tanto en cotizaciones de alquiler como de venta.

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

### Los ítems de un tempario no quedan agrupados correctamente

Revise que:

- El tempario haya sido desplegado antes de realizar la selección
- Los ítems se hayan seleccionado individualmente dentro del tempario desplegado
- La opción de destino haya sido correctamente seleccionada antes de dar clic en Aceptar

## QA — Pruebas

### Escenario 1: Creación de múltiples opciones en una cotización de venta

1. Configurar 2 opciones en `configuracion > comercial > opciones`.
2. Agregar 4 ítems a la cotización.
3. Duplicar 1 ítem para que aparezca en ambas opciones.
4. Asignar 2 ítems (uno de ellos duplicado) a la Opción 1 y 3 ítems (incluyendo el otro duplicado) a la Opción 2.
5. **Resultado esperado**: el listado de ítems muestra dos agrupaciones separadas con sus respectivos ítems, y el cuadro resumen final totaliza cada opción de forma independiente.

### Escenario 2: Agrupación de ítems provenientes de un tempario en cotización de alquiler

1. Agregar un tempario a la cotización.
2. Desplegar el contenido del tempario.
3. Seleccionar 2 ítems internos del tempario y asignarlos a la Opción 1.
4. Seleccionar los ítems restantes del tempario y asignarlos a la Opción 2.
5. **Resultado esperado**: cada subconjunto de ítems del tempario queda correctamente agrupado bajo su opción correspondiente, sin mezclarse entre sí, y el cuadro resumen refleja los totales por opción.

## Información del Servicio

No aplica para esta funcionalidad.

## Casos Especiales

No aplica para esta funcionalidad.

## Errores Conocidos

No aplica para esta funcionalidad.