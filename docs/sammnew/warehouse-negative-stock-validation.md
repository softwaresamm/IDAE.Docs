---
sidebar_position: 7
release_version: "7.1.26.0"
release_module: "SAMM New"
---

# Validación y Restricción del Parámetro Permitir Salidas en Rojo según Existencias en Bodega

Este documento describe la validación que realiza SAMM New al cambiar el parámetro **Permitir salidas en rojo** de una bodega a **NO**: antes de guardar el cambio, el sistema verifica que la bodega no tenga existencias negativas. Antes de esta mejora, el sistema no validaba las existencias y permitía cambiar el parámetro a **NO** aunque la bodega quedara con cantidades negativas, lo que generaba inconsistencias en el inventario. Con este ajuste, si la bodega tiene cantidades negativas, el usuario debe ajustarlas hasta que sean iguales o mayores a cero antes de poder deshabilitar las salidas en rojo.

## Referencias

- [SO-464: Validación y restricción del parámetro "permitir salidas en rojo" según existencias en bodega](https://softwaresamm.atlassian.net/browse/SO-464)

## Información de Versiones

### Versión de Lanzamiento

:::info **SN 7.1.26.0**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción            |
| ------------- | -------------- | ---------------------- |
| SAMMNEW       | >= 7.1.26.0    | Aplicación web         |
| SAMMAPI       | >= 1.2.36.0    | API principal          |
| SAMM LOGICA   | >= 5.6.28.0    | Lógica de negocio      |
| SAMM CORE     | >= 2.0.31.0    | Core del sistema       |
| CAPA DE DATOS | >= 2.1.23.0    | Capa de acceso a datos |
| BASE DE DATOS | >= C2.1.23.0   | Base de datos          |

:::note Nota
El componente `recursos` no aplica versión mínima para esta funcionalidad.
:::

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Todas las aplicaciones actualizadas a las versiones mínimas indicadas en la tabla anterior
- Un usuario con permisos para administrar la configuración de bodegas
- Acceso a la bodega configurado en el usuario
- Acceso al menú `configuracion > inventario > bodegas` en SAMM New

:::important Importante
Mientras la bodega tenga al menos un producto con existencia negativa, el parámetro **Permitir salidas en rojo** no se puede cambiar a **NO**. Realice primero los ajustes de inventario necesarios para que todas las existencias sean iguales o mayores a cero.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Ingresar a la configuración de bodegas

Ingrese a `configuracion > inventario > bodegas` y seleccione la bodega que desea configurar.

### Paso 2: Parametrizar Salidas en rojo

En la configuración de la bodega, defina en **Salidas en rojo** la opción que aplique en cada caso:

| Opción | Comportamiento                                                                                                                                  |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **SÍ** | La bodega permite salidas en rojo. Se puede guardar aunque existan existencias negativas                                                         |
| **NO** | La bodega no permite salidas en rojo. Antes de guardar, el sistema valida que todas las existencias de la bodega sean iguales o mayores a cero |

:::tip Consejo
Antes de cambiar el parámetro a **NO**, revise las existencias de la bodega e identifique los productos con saldo negativo para ajustarlos previamente.
:::

## Video de la Configuración

Video de la configuración: [https://www.youtube.com/watch?v=DZhXj3usLzo](https://www.youtube.com/watch?v=DZhXj3usLzo)

## Casos Especiales

:::note Comportamientos Predefinidos
La validación se realiza sobre las existencias de toda la bodega y aplica solo al cambio del parámetro **Permitir salidas en rojo** hacia **NO**.
:::

| Caso                                | Configuración / Condición                         | Descripción                                                                                       |
| ----------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Existencias negativas               | Cambio a **NO** con uno o varios saldos negativos | El sistema muestra una notificación, solicita ajustar las existencias y no guarda el cambio        |
| Un solo producto negativo           | Cambio a **NO**                                   | Basta un producto con existencia negativa para impedir el cambio, aunque los demás estén correctos |
| Existencias en cero                 | Cambio a **NO** con saldos iguales a cero         | El sistema permite el cambio, porque ninguna existencia es negativa                               |
| Mantener en SÍ                      | Parámetro en **SÍ** con existencias negativas     | El sistema permite guardar la configuración sin aplicar la restricción                            |
| Valor tras la validación            | Cambio a **NO** rechazado                         | El parámetro conserva el valor **SÍ**                                                              |
| Otras configuraciones de la bodega  | Cambio a **NO** rechazado                         | La restricción aplica únicamente al parámetro **Permitir salidas en rojo**                         |

## Resultado Esperado

Una vez completada la configuración:

1. **Validación al deshabilitar salidas en rojo**: al cambiar el parámetro a **NO**, el sistema verifica que la bodega no tenga existencias negativas.
2. **Notificación clara**: si existen cantidades negativas, el usuario recibe un mensaje que le indica ajustar las existencias antes de cambiar la configuración.
3. **Inventario consistente**: el parámetro no se puede establecer en **NO** mientras exista al menos un producto con saldo negativo en la bodega.
4. **Cambio permitido con existencias válidas**: cuando todas las existencias son iguales o mayores a cero, el parámetro se guarda en **NO** y se conserva al volver a ingresar.

## Resolución de Problemas

### No se permite cambiar el parámetro a NO

Verifique que:

- El usuario tenga configurado el acceso a la bodega
- Ningún producto de la bodega tenga existencia negativa
- Los ajustes de inventario realizados hayan quedado aplicados en la bodega correcta
- Las aplicaciones estén actualizadas a las versiones mínimas indicadas

### El sistema permite cambiar a NO aunque la bodega tiene existencias negativas

Confirme que:

- SAMM New esté en la versión `7.1.26.0` o superior
- La base de datos esté en la versión `C2.1.23.0` o superior
- Las existencias consultadas correspondan a la misma bodega que se está configurando

### El parámetro no conserva el valor NO después de guardar

Revise que:

- El cambio se haya guardado correctamente y no se haya mostrado la notificación de existencias negativas
- Al volver a ingresar, esté consultando la misma bodega

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Validación al cambiar el parámetro a NO

**Criterio de aceptación:** Como usuario que administra la configuración de bodegas, debería recibir una validación al cambiar el parámetro Permitir salidas en rojo a NO, para verificar que no existan existencias negativas en la bodega.

**Precondiciones:** Usuario con acceso a la configuración de bodegas. Bodegas con existencias negativas.

| Paso | Acción                                                                                                                                                                  | Resultado esperado                                                                                                                                          |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Ingresar a la configuración de una bodega que tenga uno o varios productos con existencias negativas. Cambiar el parámetro **Permitir salidas en rojo** de SÍ a NO e intentar guardar los cambios | El sistema identifica que existen cantidades negativas en la bodega, muestra una notificación indicando que se deben ajustar las existencias y **restringe el cambio del parámetro a NO** |
| 2    | Ingresar a una bodega donde todos los productos tengan existencias iguales o superiores a cero, excepto uno que presente una cantidad negativa. Intentar cambiar el parámetro a NO | El sistema identifica el producto con existencia negativa e **impide establecer el parámetro en NO**, aunque los demás productos tengan cantidades correctas |
| 3    | Ingresar a una bodega que tenga varios productos con cantidades negativas. Intentar cambiar el parámetro **Permitir salidas en rojo** a NO                               | El sistema identifica las existencias negativas e impide realizar el cambio de configuración hasta que todas las cantidades sean iguales o superiores a cero |
| 4    | Ingresar a una bodega con diferentes productos y verificar las existencias de cada uno. Intentar cambiar el parámetro a NO cuando al menos un producto tenga cantidad negativa | El sistema realiza la validación sobre las existencias de **toda la bodega** y no permite el cambio mientras exista al menos un producto con saldo negativo |

### Escenario 2: Notificación de existencias negativas

**Criterio de aceptación:** Como usuario del sistema, debería recibir una notificación cuando la bodega presente existencias negativas, para identificar la necesidad de ajustar las cantidades antes de deshabilitar el parámetro.

**Precondiciones:** Bodega con productos con cantidades inferiores a cero.

| Paso | Acción                                                                                                                                         | Resultado esperado                                                                                                                                          |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Ingresar a la configuración de una bodega que presente productos con cantidades inferiores a cero e intentar deshabilitar el parámetro **Permitir salidas en rojo** | El sistema muestra **un mensaje claro** que informa la existencia de cantidades negativas en la bodega y solicita realizar los ajustes correspondientes antes de cambiar la configuración |

### Escenario 3: Restricción del cambio a NO con existencias negativas

**Criterio de aceptación:** Como usuario del sistema, debería tener restringido el cambio del parámetro a NO mientras existan cantidades negativas en la bodega, para evitar inconsistencias en el inventario.

**Precondiciones:** Bodega con existencias negativas.

| Paso | Acción                                                                                                                                                        | Resultado esperado                                                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Ingresar a una bodega con existencias negativas, intentar cambiar el parámetro a NO y verificar nuevamente su valor después de la validación                   | El sistema **mantiene el parámetro Permitir salidas en rojo en SÍ** y no guarda el cambio solicitado                                                 |
| 2    | Ingresar a una bodega que tenga productos con existencias negativas y guardar la configuración manteniendo el parámetro **Permitir salidas en rojo** en SÍ      | El sistema permite conservar el parámetro en SÍ, sin aplicar la restricción correspondiente al cambio hacia NO                                       |
| 3    | Ingresar a la configuración de una bodega con existencias negativas, modificar otros parámetros permitidos e intentar cambiar **Permitir salidas en rojo** a NO | El sistema restringe **únicamente** el cambio del parámetro **Permitir salidas en rojo** a NO, sin modificar ni afectar las demás configuraciones de la bodega |

### Escenario 4: Cambio a NO con existencias iguales o superiores a cero

**Criterio de aceptación:** Como usuario que administra la configuración de bodegas, debería poder establecer el parámetro en NO cuando todas las existencias sean iguales o superiores a cero, para garantizar que la configuración cumpla con las condiciones requeridas.

**Precondiciones:** Usuario con acceso a la configuración de bodegas.

| Paso | Acción                                                                                                                                                                                          | Resultado esperado                                                                                                  |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1    | Ingresar a la configuración de una bodega donde todos los productos tengan existencias superiores a cero. Cambiar el parámetro a NO y guardar los cambios                                         | **El sistema permite cambiar el parámetro a NO** y guarda correctamente la configuración de la bodega               |
| 2    | Ingresar a una bodega donde los productos tengan existencias positivas o iguales a cero. Cambiar el parámetro **Permitir salidas en rojo** a NO y guardar                                        | El sistema permite realizar el cambio, dado que ninguna existencia presenta cantidades negativas                    |
| 3    | Ingresar a una bodega que presente productos con existencias negativas. Realizar los ajustes correspondientes hasta que todas las cantidades sean iguales o superiores a cero. Intentar nuevamente cambiar el parámetro a NO | El sistema permite cambiar el parámetro a NO después de verificar que todas las existencias de la bodega cumplen la condición requerida |
| 4    | Ingresar a una bodega sin existencias negativas, cambiar el parámetro a NO, guardar los cambios, salir del formulario y volver a ingresar                                                         | El sistema **conserva el parámetro Permitir salidas en rojo en NO** y presenta correctamente la configuración guardada |