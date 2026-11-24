---
sidebar_position: 2
release_version: "0.15.0"
release_module: "SAFE"
---

# Pagar Cuotas de Créditos desde los Movimientos del Asociado

Este documento describe cómo pagar una o varias cuotas de uno o varios créditos de un asociado al registrar sus movimientos. En la misma operación en que se registran los otros descuentos (aportes, ahorros, auxilios…), se pueden seleccionar cuotas pendientes de los créditos del asociado. El pago se aplica al crédito y cada movimiento generado queda enlazado a la cuota que pagó, de modo que es posible trazar qué movimiento pagó cada cuota.

## Referencias

- [SO-2279: Permitir pagar cuotas de créditos del asociado al registrar movimientos](https://softwaresamm.atlassian.net/browse/SO-2279)

## Información de Versiones

### Versión de Lanzamiento

:::info **FEB V.0.15.0**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción                                                     |
| ------------- | -------------- | --------------------------------------------------------------- |
| SAFE          | >= v0.15.0     | Plataforma SAFE (frontend y API)                                |
| BASE DE DATOS | SO-2279        | Objetos de `mov.movement` actualizados (columnas, tipo, SP y vistas) |

## Requisitos Previos

Antes de usar la funcionalidad, asegúrese de tener:

- La aplicación y la base de datos actualizadas a las versiones indicadas en la tabla anterior
- Un usuario autorizado para ingresar a la plataforma
- Un asociado con al menos un crédito en estado **EN PROCESO** con cuotas pendientes

:::important Importante
Solo se listan y se pagan los créditos en estado **EN PROCESO**. Un crédito recién creado queda en estado **REGISTRADA** y no aparece para pago: primero debe cambiarse su estado a **EN PROCESO** desde **Cartera y Créditos > Créditos**, con la acción de cambiar estado.
:::

## Configuración

### Paso 1: Actualizar la base de datos

La tabla de movimientos (`mov.movement`) incorpora las columnas `id_loan` e `id_loanInstallment` para enlazar cada movimiento con el crédito y la cuota que pagó. Ejecute, en este orden, los scripts del repositorio `IDAE.SAFE.DBObjects`:

```sql title="Orden de ejecución de los objetos de mov.movement"
-- 1. Columnas, llaves foráneas e índice
--    Tables/mov.movement/DDL/Alter.sql
-- 2. Eliminar los procedimientos que dependen del tipo tabla
DROP PROCEDURE IF EXISTS [mov].[movement_ins_bulk];
DROP PROCEDURE IF EXISTS [mov].[movement_upd_bulk];
-- 3. Recrear el tipo tabla, los procedimientos y las vistas
--    Types/mov.movement/mov.movement_typ.sql
--    StoredProcedures/mov.movement/mov.movement_ins_bulk.sql
--    StoredProcedures/mov.movement/mov.movement_upd_bulk.sql
--    Views/mov.movement/mov.movement_view.sql
--    Views/mov.movement/mov.movement_view_base.sql
```

:::note Información
El detalle de las columnas y relaciones está en el diccionario de datos: [mov.movement](./database/mov/movement.md) y [cre.loanInstallment](./database/cre/loan-installment.md).
:::

### Paso 2: Pasar el crédito a EN PROCESO

1. Ingrese a **Cartera y Créditos > Créditos** y ubique el crédito del asociado.
2. Use la acción de cambiar estado y seleccione **EN PROCESO**.

### Paso 3: Registrar el pago de las cuotas

1. Ingrese a **Cartera y Créditos > Movimientos > Nuevo** desde el asociado (`/movements/new?associateId=<id>`).
2. Seleccione la **Fecha** del movimiento.
3. Si aplica, seleccione los **Otros descuentos** a registrar, como hasta ahora.
4. En la sección **Créditos**, seleccione las cuotas a pagar de cada crédito. Las cuotas se pagan **completas y en orden**:
   - al marcar una cuota se marcan también todas las anteriores;
   - al desmarcar una cuota se desmarcan también todas las siguientes.
5. Si el pago se toma de los ahorros del asociado, active **Pagar con ahorros** en el crédito. La sección muestra los **ahorros disponibles para pagar cuotas** y avisa si no alcanzan.
6. Presione **Crear**. Los otros descuentos y los pagos de cuotas se guardan en una sola transacción: se guarda todo o nada.

:::tip Consejo
Se puede registrar solo el pago de cuotas, sin seleccionar otros descuentos.
:::

## Casos Especiales

:::note Comportamientos Predefinidos
Por cada cuota pagada se generan movimientos separados de capital e interés, con la misma convención de signos que el aplicativo anterior y los datos migrados.
:::

| Caso                           | Tipo de operación         | Tipo de movimiento | Descripción                                                                                                   |
| ------------------------------ | ------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------- |
| Capital de la cuota            | Cuota Capital (45)        | DEBITO             | Disminuye el saldo de capital del crédito. En cartera, CREDITO aumenta la deuda (otorgamiento) y DEBITO la disminuye |
| Interés de la cuota            | Cuota Interes (46)        | CREDITO            | Acumula el interés pagado del crédito                                                                         |
| Pago con ahorros               | TRASLADO A PRESTAMO (16)  | DEBITO             | Un movimiento por cuota por el total (capital + interés); disminuye los ahorros del asociado                   |
| Cuota con capital o interés en 0 | —                       | —                  | No se genera el movimiento de valor 0                                                                         |
| Movimiento que pagó una cuota  | —                         | —                  | No se puede editar ni eliminar desde Movimientos ni desde la API                                              |

:::important Identificación de catálogos
Las operaciones (45, 46, 16), los tipos de movimiento (1 DEBITO, 2 CREDITO), el estado de movimiento (2 CAUSADO) y los estados de crédito (4 EN PROCESO, 9999 FINALIZADA) se identifican **por su id** en la API. Renombrarlos desde **Preferencias** no afecta el pago de cuotas. Desactivarlos o eliminarlos sí lo afecta, porque los movimientos se seguirían generando con esos ids.
:::

:::note Campo "afecta a" del tipo de operación
El tipo de operación tiene el campo `id_affects`, que indica qué saldo afecta: 1 AHORROS, 2 APORTES, 3 CAPITAL CARTERA, 4 INTERES CARTERA, etc. Este campo **no se muestra en Preferencias > Tipo de Operación**. El pago de cuotas no lo usa; lo usaba el aplicativo anterior para actualizar saldos y será relevante cuando se implemente el recálculo de saldos.
:::

## Resultado Esperado

Una vez registrado el pago:

1. **Movimientos enlazados**: por cada cuota se crean los movimientos de capital e interés (y de traslado de ahorros si aplica), con el crédito y la cuota que pagaron y el código del crédito como referencia.
2. **Cuotas pagadas**: las cuotas seleccionadas quedan en estado **PAGADA**.
3. **Crédito actualizado**: disminuye el saldo de capital, aumenta el interés pagado, disminuyen las cuotas pendientes, se registra la fecha del último pago y la próxima cuota pasa a ser la siguiente pendiente.
4. **Crédito finalizado**: si no quedan cuotas pendientes, el crédito pasa a estado **FINALIZADA**.
5. **Ahorros descontados**: si se pagó con ahorros, se descuenta el total trasladado de los ahorros del asociado.
6. **Movimientos de solo lectura**: en el listado de movimientos, los que pagaron una cuota no muestran las acciones de editar y eliminar, y su detalle indica el pago de crédito.

## Resolución de Problemas

### El crédito no aparece en la sección Créditos

Verifique que:

- El crédito esté en estado **EN PROCESO** (un crédito **REGISTRADA** o **APROBADA** no se lista)
- El crédito tenga cuotas en estado **PENDIENTE**
- El crédito pertenezca al asociado del movimiento

### No se puede activar "Pagar con ahorros" o el pago es rechazado por ahorros insuficientes

Revise que:

- El asociado tenga ahorros disponibles mayores a $0 (se muestran en la sección **Créditos**)
- El total de las cuotas a pagar con ahorros no supere los ahorros disponibles

:::warning Saldo de ahorros
El pago con ahorros valida contra el saldo de ahorros guardado en el asociado (`aso.associate.totalSavings`), que proviene de la migración. La aplicación **aún no actualiza ese saldo** al registrar movimientos de ahorro, por lo que un asociado creado desde la web tiene ahorros en $0 aunque tenga movimientos de ahorro registrados.
:::

### No se puede editar o eliminar un movimiento

Confirme si el movimiento pagó una cuota de crédito (su detalle muestra **Pago de crédito**). Estos movimientos son de solo lectura para no descuadrar el estado del crédito; aún no existe una reversión del pago.

### Error al pagar: la cuota ya no está pendiente

Confirme que otra persona no haya pagado la misma cuota mientras se diligenciaba el formulario. Recargue la página para ver las cuotas pendientes actualizadas.
