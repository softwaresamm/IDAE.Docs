---
sidebar_position: 2
release_version: "0.15.0"
release_module: "SAFE"
---

# Migrar las Cuotas de los Créditos y Mostrarlas en el Detalle del Crédito

Este documento describe cómo consultar el plan de cuotas de un crédito en SAFE y cómo se migraron las cuotas del sistema anterior (`app_febancol`). Cada cuota tiene un estado (**PENDIENTE** o **PAGADA**), de modo que el analista identifica qué cuotas faltan por pagar sin consultar el sistema anterior. Antes de esta mejora, los créditos ya se habían migrado del sistema anterior, pero su plan de cuotas no.

## Referencias

- [SO-2263: Migrar las cuotas de los créditos y mostrarlas en el detalle del crédito](https://softwaresamm.atlassian.net/browse/SO-2263)
- [SO-2258: Migración de créditos, líneas de crédito y catálogos](https://softwaresamm.atlassian.net/browse/SO-2258)

## Información de Versiones

### Versión de Lanzamiento

:::info **v0.15.0**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción     |
| ---------- | -------------- | --------------- |
| SAFE       | >= v0.15.0     | Plataforma SAFE |

## Requisitos Previos

Antes de consultar las cuotas, asegúrese de tener:

- La aplicación actualizada a la versión mínima indicada en la tabla anterior.
- Los créditos migrados en `cre.loan` (`Migration/30_loan.sql`).
- La base `pro_safe` actualizada con `UTIL.DBUpgrader`, incluidas las migraciones `31_installmentState.sql` y `32_loanInstallment.sql`.
- Acceso de lectura a la base legada `app_febancol` desde el servidor de `pro_safe` durante la migración.
- Un usuario de SAFE con acceso al módulo de **Créditos**.

:::important Importante
La migración de cuotas resuelve cada crédito por su código (`CodigoCredito` → `cre.loan.code`). Por eso debe ejecutarse **después** de la migración de créditos: si un crédito no existe en `cre.loan`, sus cuotas se omiten.
:::

## Información del Servicio

:::note Información
Devuelve el plan de cuotas de un crédito, ordenado por número de cuota y con el nombre del estado de cada una. El frontend lo consume a través de la ruta `/api/loans/{id}/installments`. Retorna las cuotas correspondientes al crédito consultado, incluyendo sus valores y estados, sin mezclar información de otros créditos.
:::

### Parámetros del Servicio

| Parámetro    | Valor    | Descripción                                          |
| ------------ | -------- | ---------------------------------------------------- |
| `idLoan`     | Ruta     | Id del crédito (`cre.loan.id`)                       |
| `pageNumber` | Consulta | Página solicitada (opcional)                         |
| `pageSize`   | Consulta | Cuotas por página (opcional; sin él, devuelve todas) |

### Request

```bash title="Cuotas de un crédito"
curl --location 'https://[servidor]/safe/api/loan-installment/all/id-loan/42081?pageNumber=1&pageSize=25' \
--header 'Authorization: Bearer [TOKEN]'
```

### Response

```json title="Respuesta (resumida)"
{
  "data": {
    "items": [
      {
        "id": 257114,
        "idLoan": 42081,
        "loanCode": "2411-0036",
        "idInstallmentState": 2,
        "installmentStateName": "PAGADA",
        "number": 1,
        "dueDate": "2025-03-15T00:00:00",
        "capitalAmount": 5000000,
        "interestAmount": 2788500,
        "lifeInsurance": 77760,
        "capitalBalance": 55000000,
        "accumulatedInterest": 6438900,
        "periodDays": 90
      }
    ],
    "totalRecords": 13,
    "totalPages": 1
  }
}
```

:::tip Consejo
`capitalBalance` es el saldo de capital del crédito **después** de pagar la cuota, y `accumulatedInterest` es el interés programado acumulado (no el interés efectivamente pagado). El significado de cada columna está en el [diccionario de datos de `cre.loanInstallment`](./database/cre/loan-installment.md).
:::

## Configuración

### Paso 1: Migrar las cuotas

Ejecute `UTIL.DBUpgrader` con `RUN_MIGRATION=1`. Las migraciones de cuotas corren en este orden:

1. `31_installmentState.sql`: crea el catálogo de estados (1 **PENDIENTE**, 2 **PAGADA**).
2. `32_loanInstallment.sql`: consolida las cuotas de las dos tablas del sistema anterior en `cre.loanInstallment`.

| Origen legado | Créditos que cubre                                         | Cómo se define el estado                                                                              |
| ------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `SOL_CUOTAS`  | Pago en primas y cuotas fijas                              | Indicador `Cancelada` de la cuota, que el sistema anterior actualizaba con los pagos                  |
| `SIM_CUOTA`   | Cuota fija mensual (solo créditos EN PROCESO o FINALIZADA) | **PAGADA** si el saldo de capital de la cuota es mayor o igual al saldo de capital actual del crédito |

:::tip Consejo
La migración es idempotente: se puede ejecutar varias veces y actualiza las cuotas existentes por crédito y número de cuota, sin duplicarlas.
:::

```sql title="Verificar la migración de un crédito"
SELECT number, dueDate, capitalAmount, interestAmount, capitalBalance, installmentState_name
FROM cre.loanInstallment_view
WHERE loan_code = '2411-0036'
ORDER BY number;
```

### Paso 2: Consultar las cuotas de un crédito

1. Ingrese a **Créditos** (`/loans/list`).
2. Busque el crédito y haga clic en **Ver detalles** (ícono del ojo).
3. En la ventana **Detalle del crédito**, abra la pestaña **Cuotas**.

La pestaña **Detalle** conserva la información del crédito que ya se mostraba (condiciones, fechas, saldos, liquidación e indicadores).

:::tip Consejo
Después de actualizar, ingrese al detalle de un crédito migrado y confirme que se visualiza la pestaña **Cuotas**.
:::

## Video

- [Video: Migrar las cuotas de los créditos y mostrarlas en el detalle del crédito](https://www.youtube.com/watch?v=aErlosDd20I)

## Casos Especiales

:::note Comportamientos Predefinidos
Algunas cuotas del sistema anterior no se migran o se muestran de una forma particular.
:::

| Caso                                            | Campo/Valor                         | Descripción                                                                                       |
| ----------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| Créditos con pago en primas o de cuotas fijas   | `SOL_CUOTAS`                        | Las cuotas se migran desde la tabla `SOL_CUOTAS`                                                  |
| Créditos de cuota fija mensual                  | `SIM_CUOTA`                         | Las cuotas se migran desde la tabla `SIM_CUOTA`                                                   |
| Cuota cancelada en el sistema anterior          | Estado `PAGADA`                     | La cuota se presenta con estado **PAGADA**                                                        |
| Saldo cubierto por los pagos                    | Estado `PAGADA`                     | Aunque la cuota no figure como cancelada, se presenta como **PAGADA** si su saldo fue cubierto por los pagos |
| Cuota sin cancelar y con saldo                  | Estado `PENDIENTE`                  | La cuota se presenta con estado **PENDIENTE**                                                     |
| Cuota 0 en créditos de primas o cuotas fijas    | `number = 0`                        | Periodo inicial de solo intereses (capital en 0); el sistema anterior la registraba como pagada   |
| Crédito sin cuotas                              | Pestaña **Cuotas** vacía            | Se muestra "Este crédito no tiene cuotas registradas."                                            |
| Cuotas pendientes en créditos FINALIZADOS       | `installmentState_name = PENDIENTE` | Se migran tal como venían en `SOL_CUOTAS` (3 casos en la migración inicial)                       |
| Cuotas de créditos que no existen en `cre.loan` | —                                   | No se migran (registros huérfanos del sistema anterior)                                           |
| `SOL_CUOTAS_ANTERIOR`, `SO_PROXIMACUOTA`        | —                                   | No se migran: son una copia de respaldo y una caché; la próxima cuota es la primera **PENDIENTE** |

## Resultado Esperado

Una vez completada la migración:

1. **Pestaña Cuotas**: Como analista de crédito, debería ver en el detalle de un crédito una pestaña "Cuotas" con número, fecha, capital, interés, seguro, total de la cuota (capital + interés + seguro), saldo de capital y estado de cada cuota, ordenadas por número, para conocer el plan de pagos del crédito sin consultar el sistema anterior.
2. **Estado de cada cuota**: Como analista de crédito, debería ver como **PAGADA** cada cuota que el sistema anterior tenía cancelada (o cuyo saldo ya fue cubierto por los pagos), y como **PENDIENTE** las demás, para identificar de inmediato qué cuotas faltan por pagar.
3. **Todos los tipos de pago**: Como analista de crédito, debería ver las cuotas tanto en créditos de cuota fija mensual como en créditos con pago en primas o de cuotas fijas, para consultar cualquier crédito migrado de la misma forma, sin importar su tipo de pago.
4. **Crédito sin cuotas**: Como analista de crédito, debería ver un mensaje que indique que el crédito no tiene cuotas registradas cuando no las tenga, para distinguir un crédito sin plan de pagos de un error de consulta.
5. **Paginación**: la tabla permite cambiar la página y la cantidad de cuotas por página (10, 25, 50 o 100).

## Resolución de Problemas

### La pestaña Cuotas no muestra cuotas para un crédito

Verifique que:

- El crédito existe en `cre.loan` (la migración de créditos omite los de asociado o línea de crédito inexistentes).
- La migración `32_loanInstallment.sql` se ejecutó después de `30_loan.sql`.
- El crédito tiene cuotas en `SOL_CUOTAS` o `SIM_CUOTA` del sistema anterior; en `SIM_CUOTA` solo se migran los créditos EN PROCESO o FINALIZADA.

### Un crédito muestra el mensaje de que no tiene cuotas registradas

Confirme que:

- El crédito tenga cuotas en `SOL_CUOTAS` o en `SIM_CUOTA` en el sistema anterior
- El crédito exista en el sistema nuevo

### Aparece "No fue posible cargar las cuotas del crédito"

Confirme que:

- El backend de SAFE está en la versión que incluye el endpoint `loan-installment/all/id-loan/{idLoan}`.
- La sesión del usuario sigue activa (el endpoint requiere token).
- La base tiene la vista `cre.loanInstallment_view`.

### El estado de una cuota no coincide con lo esperado

Revise que:

- El saldo de capital del crédito (`cre.loan.capitalBalance`) está actualizado: para los créditos de cuota fija mensual, el estado se calcula comparándolo con el saldo de cada cuota.
- Para los créditos de primas o cuotas fijas, el estado es el que tenía la cuota en `SOL_CUOTAS` del sistema anterior.

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Acceso al listado y al detalle del crédito

**Precondiciones:** Usuario autorizado y créditos registrados.

| Paso | Acción                                                                                                         | Resultado esperado                                                                                                              |
| ---- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Verificar el ingreso a la plataforma web con un usuario autorizado                                             | **La plataforma carga correctamente** y permite el acceso sin presentar errores                                                 |
| 2    | Verificar el ingreso al formulario donde se encuentra el listado de créditos                                   | El formulario carga correctamente y permite visualizar los créditos y las opciones disponibles                                  |
| 3    | Ingresar al módulo de créditos y verificar que se visualicen los registros disponibles                         | El sistema muestra correctamente el listado de créditos, presentando la información correspondiente a cada registro             |
| 4    | Verificar que en la grilla de créditos se encuentre disponible el icono de visualización de detalle (ojo)      | El sistema muestra el icono de visualización en los registros de créditos y permite identificar la opción para consultar su detalle |
| 5    | Seleccionar el icono de visualización de un crédito y verificar que se presenten las pestañas de detalle y cuotas | El sistema permite acceder al detalle del crédito y muestra las pestañas correspondientes a la información general y al listado de cuotas |
| 6    | Ingresar al detalle de un crédito registrado y verificar la información presentada                             | El sistema muestra correctamente la información correspondiente al crédito seleccionado, sin presentar datos de otros créditos   |
| 7    | Ingresar al detalle de un crédito y consultar la información de las cuotas para verificar la proyección de pagos | El sistema presenta correctamente la proyección de pagos, incluyendo los valores y las fechas correspondientes a cada cuota      |

### Escenario 2: Pestaña Cuotas, campos y orden

**Precondiciones:** Crédito migrado con cuotas.

| Paso | Acción                                                                                                                     | Resultado esperado                                                                                                                   |
| ---- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Ingresar al listado de créditos, seleccionar un crédito migrado y acceder a su detalle. Verificar la disponibilidad de la pestaña "Cuotas" | **El sistema presenta la pestaña "Cuotas"** dentro del detalle del crédito y permite consultar la información del plan de pagos      |
| 2    | Ingresar al detalle de un crédito que tenga cuotas migradas y consultar la pestaña "Cuotas"                                | El sistema muestra para cada cuota los siguientes campos: número, fecha, capital, interés, seguro, total de la cuota, saldo de capital y estado |
| 3    | Consultar las cuotas de un crédito que tenga varios registros migrados                                                     | El sistema presenta las cuotas ordenadas de forma ascendente según su número, desde la primera hasta la última cuota                 |

### Escenario 3: Migración de cuotas por fuente y tipo de pago

**Precondiciones:** Créditos con cuotas en `SOL_CUOTAS` y en `SIM_CUOTA`.

| Paso | Acción                                                                                                         | Resultado esperado                                                                                                                       |
| ---- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Identificar créditos que tengan información de cuotas en la tabla `SOL_CUOTAS` y consultar sus registros en el sistema nuevo | El sistema migra y presenta correctamente las cuotas correspondientes a los créditos existentes en el sistema nuevo, conservando la información de cada cuota |
| 2    | Identificar créditos con información de cuotas en la tabla `SIM_CUOTA` y consultar sus registros en el sistema nuevo | El sistema migra y presenta correctamente las cuotas de los créditos de cuota fija mensual, conservando la información de cada cuota     |
| 3    | Consultar créditos que tengan cuotas provenientes de `SOL_CUOTAS` y `SIM_CUOTA`                                | **El sistema consolida la información de ambas fuentes** en una única estructura de cuotas, permitiendo consultarlas desde la misma pestaña, sin importar su origen |
| 4    | Consultar un crédito cuyo tipo de pago sea en primas y que tenga cuotas registradas en `SOL_CUOTAS`            | El sistema presenta correctamente el plan de pagos del crédito, incluyendo la información y el estado de cada cuota                     |
| 5    | Consultar un crédito de cuotas fijas con registros en `SOL_CUOTAS`                                             | El sistema presenta correctamente las cuotas migradas, con sus respectivos valores y estados                                             |
| 6    | Consultar un crédito de cuota fija mensual con registros en `SIM_CUOTA`                                        | El sistema presenta correctamente las cuotas migradas, con sus respectivos valores y estados                                             |

### Escenario 4: Estado de las cuotas

**Precondiciones:** Créditos con cuotas canceladas, cubiertas por pagos y pendientes.

| Paso | Acción                                                                                                                                         | Resultado esperado                                                                                                    |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1    | Consultar un crédito que tenga cuotas marcadas como canceladas en el sistema anterior                                                          | El sistema presenta las cuotas canceladas con estado **PAGADA**                                                       |
| 2    | Identificar una cuota que no figure explícitamente como cancelada, pero cuyo saldo haya sido cubierto completamente por los pagos realizados. Consultar el crédito en el sistema nuevo | El sistema presenta la cuota con estado **PAGADA**, teniendo en cuenta que su saldo ya fue cubierto por los pagos     |
| 3    | Consultar un crédito que tenga cuotas sin cancelar y con saldo pendiente de pago                                                               | El sistema presenta las cuotas correspondientes con estado **PENDIENTE**                                              |
| 4    | Consultar un crédito que tenga cuotas pagadas y pendientes de pago                                                                             | El sistema identifica correctamente cada cuota y presenta su estado correspondiente (PAGADA o PENDIENTE), sin asignar estados incorrectos |

### Escenario 5: Exclusiones de la migración y próxima cuota

**Precondiciones:** Acceso a los registros de `SOL_CUOTAS`, `SIM_CUOTA`, `SOL_CUOTAS_ANTERIOR` y `SO_PROXIMACUOTA`.

| Paso | Acción                                                                                                                                                         | Resultado esperado                                                                                                                         |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Identificar registros de cuotas en `SOL_CUOTAS` o `SIM_CUOTA` que correspondan a créditos que no existen en el sistema nuevo. Ejecutar o validar el resultado de la migración | El sistema no migra las cuotas correspondientes a créditos que no existen en el sistema nuevo                                              |
| 2    | Verificar que la migración no utilice la información almacenada en la tabla `SOL_CUOTAS_ANTERIOR`                                                              | El proceso de migración no toma registros de `SOL_CUOTAS_ANTERIOR` ni genera cuotas a partir de esta tabla de respaldo                     |
| 3    | Verificar que la migración no utilice los registros almacenados en `SO_PROXIMACUOTA`                                                                           | El proceso no migra información de `SO_PROXIMACUOTA`. La próxima cuota se determina a partir de la primera cuota que tenga estado PENDIENTE |
| 4    | Consultar un crédito que tenga varias cuotas, algunas PAGADAS y otras PENDIENTES. Verificar cuál se identifica como próxima cuota                              | **El sistema identifica como próxima cuota el primer registro con estado PENDIENTE**, respetando el orden ascendente del número de cuota    |

### Escenario 6: Crédito sin cuotas, endpoint y aislamiento entre créditos

**Precondiciones:** Un crédito sin cuotas y dos créditos con planes de pago registrados.

| Paso | Acción                                                                                                                       | Resultado esperado                                                                                                                       |
| ---- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Ingresar al detalle de un crédito que no tenga cuotas migradas ni registros asociados en la estructura consolidada           | **El sistema muestra un mensaje indicando que el crédito no tiene cuotas registradas**, diferenciando esta situación de un error de consulta |
| 2    | Consultar el endpoint de cuotas utilizando el identificador de un crédito que tenga cuotas migradas                          | El backend retorna las cuotas correspondientes al crédito consultado, incluyendo sus valores y estados, sin mezclar información de otros créditos |
| 3    | Consultar las cuotas de dos créditos diferentes que tengan planes de pago registrados                                        | El sistema muestra únicamente las cuotas asociadas al crédito seleccionado, sin presentar información perteneciente a otros créditos      |
