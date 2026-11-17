---
sidebar_position: 2
release_version: "0.15.0"
release_module: "SAFE"
---

# Cuotas de los Créditos

Este documento describe cómo consultar el plan de cuotas de un crédito en SAFE y cómo se migraron las cuotas del sistema anterior (`app_febancol`). Cada cuota tiene un estado (**PENDIENTE** o **PAGADA**), de modo que el analista identifica qué cuotas faltan por pagar sin consultar el sistema anterior.

## Referencias

- [SO-2263: Migrar las cuotas de los créditos y mostrarlas en el detalle del crédito](https://softwaresamm.atlassian.net/browse/SO-2263)
- [SO-2258: Migración de créditos, líneas de crédito y catálogos](https://softwaresamm.atlassian.net/browse/SO-2258)

## Información de Versiones

### Versión de Lanzamiento

:::info **v0.15.0**
:::

### Versiones Requeridas

| Aplicación       | Versión Mínima | Descripción                                                                        |
| ---------------- | -------------- | ---------------------------------------------------------------------------------- |
| SAFE FrontendWeb | >= 0.15.0      | Pestaña **Cuotas** en el detalle del crédito                                       |
| SAFE Backend     | >= 0.15.0      | Endpoint de cuotas por crédito                                                     |
| SAFE DB Objects  | >= 0.15.0      | Tabla `cre.loanInstallment`, catálogo `cre.installmentState` y migraciones 31 y 32 |

## Requisitos Previos

Antes de consultar las cuotas, asegúrese de tener:

- Los créditos migrados en `cre.loan` (`Migration/30_loan.sql`).
- La base `pro_safe` actualizada con `UTIL.DBUpgrader`, incluidas las migraciones `31_installmentState.sql` y `32_loanInstallment.sql`.
- Acceso de lectura a la base legada `app_febancol` desde el servidor de `pro_safe` durante la migración.
- Un usuario de SAFE con acceso al módulo de **Créditos**.

:::important Importante
La migración de cuotas resuelve cada crédito por su código (`CodigoCredito` → `cre.loan.code`). Por eso debe ejecutarse **después** de la migración de créditos: si un crédito no existe en `cre.loan`, sus cuotas se omiten.
:::

## Información del Servicio

:::note Información
Devuelve el plan de cuotas de un crédito, ordenado por número de cuota y con el nombre del estado de cada una. El frontend lo consume a través de la ruta `/api/loans/{id}/installments`.
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

## Casos Especiales

:::note Comportamientos Predefinidos
Algunas cuotas del sistema anterior no se migran o se muestran de una forma particular.
:::

| Caso                                            | Campo/Valor                         | Descripción                                                                                       |
| ----------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| Cuota 0 en créditos de primas o cuotas fijas    | `number = 0`                        | Periodo inicial de solo intereses (capital en 0); el sistema anterior la registraba como pagada   |
| Crédito sin cuotas                              | Pestaña **Cuotas** vacía            | Se muestra "Este crédito no tiene cuotas registradas."                                            |
| Cuotas pendientes en créditos FINALIZADOS       | `installmentState_name = PENDIENTE` | Se migran tal como venían en `SOL_CUOTAS` (3 casos en la migración inicial)                       |
| Cuotas de créditos que no existen en `cre.loan` | —                                   | No se migran (registros huérfanos del sistema anterior)                                           |
| `SOL_CUOTAS_ANTERIOR`, `SO_PROXIMACUOTA`        | —                                   | No se migran: son una copia de respaldo y una caché; la próxima cuota es la primera **PENDIENTE** |

## Resultado Esperado

Una vez completada la migración:

1. **Pestaña Cuotas**: el detalle de cada crédito muestra sus cuotas ordenadas por número, con N°, fecha, capital, interés, seguro, total de la cuota (capital + interés + seguro), saldo de capital y estado.
2. **Estado de cada cuota**: las cuotas pagadas se ven como **PAGADA** y las demás como **PENDIENTE**.
3. **Todos los tipos de pago**: los créditos de cuota fija mensual, de pago en primas y de cuotas fijas muestran sus cuotas de la misma forma.
4. **Paginación**: la tabla permite cambiar la página y la cantidad de cuotas por página (10, 25, 50 o 100).

## Resolución de Problemas

### La pestaña Cuotas no muestra cuotas para un crédito

Verifique que:

- El crédito existe en `cre.loan` (la migración de créditos omite los de asociado o línea de crédito inexistentes).
- La migración `32_loanInstallment.sql` se ejecutó después de `30_loan.sql`.
- El crédito tiene cuotas en `SOL_CUOTAS` o `SIM_CUOTA` del sistema anterior; en `SIM_CUOTA` solo se migran los créditos EN PROCESO o FINALIZADA.

### Aparece "No fue posible cargar las cuotas del crédito"

Confirme que:

- El backend de SAFE está en la versión que incluye el endpoint `loan-installment/all/id-loan/{idLoan}`.
- La sesión del usuario sigue activa (el endpoint requiere token).
- La base tiene la vista `cre.loanInstallment_view`.

### El estado de una cuota no coincide con lo esperado

Revise que:

- El saldo de capital del crédito (`cre.loan.capitalBalance`) está actualizado: para los créditos de cuota fija mensual, el estado se calcula comparándolo con el saldo de cada cuota.
- Para los créditos de primas o cuotas fijas, el estado es el que tenía la cuota en `SOL_CUOTAS` del sistema anterior.
