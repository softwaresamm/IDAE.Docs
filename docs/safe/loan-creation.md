---
sidebar_position: 3
release_version: "0.15.0"
release_module: "SAFE"
---

# Creación de Créditos y Cambio de Estado

Este documento describe cómo crear un crédito desde SAFE web, cómo se proyectan sus cuotas y cómo se cambia su estado. Antes de este cambio SAFE solo mostraba los créditos migrados del sistema anterior (`app_febancol`). Ahora el analista registra el crédito, revisa la proyección de capital, interés y saldo de cada cuota, y lo guarda en estado **REGISTRADA** con su plan de pagos. El cálculo es el mismo del sistema anterior (VB6).

## Referencias

- [SO-2267: Crear créditos con proyección de cuotas y cambiar su estado en SAFE web](https://softwaresamm.atlassian.net/browse/SO-2267)
- [SO-2263: Migrar las cuotas de los créditos y mostrarlas en el detalle del crédito](https://softwaresamm.atlassian.net/browse/SO-2263)
- [SO-2258: Migración de créditos, líneas de crédito y catálogos](https://softwaresamm.atlassian.net/browse/SO-2258)

## Información de Versiones

### Versión de Lanzamiento

:::info **v0.15.0**
:::

### Versiones Requeridas

| Aplicación       | Versión Mínima | Descripción                                                                                                   |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------- |
| SAFE FrontendWeb | >= 0.15.0      | Pantalla **Nuevo crédito** y acción **Cambiar estado** en la lista de créditos                                |
| SAFE Backend     | >= 0.15.0      | Endpoints de proyección, creación y cambio de estado del crédito                                              |
| SAFE DB Objects  | >= 0.15.0      | Columna `cre.loan.id_paymentType`, tabla `cre.loanParameter`, SP `cre.loanParameter_next_code` y migración 33 |

## Requisitos Previos

Antes de crear créditos, asegúrese de tener:

- La base `pro_safe` actualizada con `UTIL.DBUpgrader`, incluidos los objetos de `cre.loan` (columna `id_paymentType`) y de `cre.loanParameter`.
- Los parámetros de crédito cargados en `cre.loanParameter`, ya sea con la migración `Migration/33_loanParameter.sql` (desde `PARAMETRO` del sistema anterior) o con `DML/08_loanParameter.sql`.
- Las líneas de crédito configuradas en **Configuración → Catálogos de Créditos → Línea de Crédito**, con su forma de pago, tasa, plazo máximo y marcadas como **Activa**.
- Un usuario de SAFE con acceso al módulo de **Créditos**.

:::important Importante
Si `cre.loanParameter` no tiene un registro activo para la empresa, SAFE no puede proyectar ni crear créditos y muestra el error _The loan parameters are not configured for this company_.
:::

## Información del Servicio

:::note Información
La pantalla **Nuevo crédito** usa dos endpoints. `simulate` proyecta las cuotas sin guardar nada y `create` guarda el crédito y sus cuotas en una sola transacción. Ambos reciben el mismo cuerpo. El frontend los consume a través de `/api/loans/simulate` y `/api/loans`.
:::

### Parámetros del Servicio

| Parámetro            | Valor  | Descripción                                                                              |
| -------------------- | ------ | ---------------------------------------------------------------------------------------- |
| `idAssociate`        | Cuerpo | Asociado titular del crédito                                                             |
| `idCreditLine`       | Cuerpo | Línea de crédito                                                                         |
| `idPaymentType`      | Cuerpo | Forma de pago: `1` cuota fija mensual, `2` pago con primas, `4` mensual y primas (mixto) |
| `idLoanPurpose`      | Cuerpo | Destino del crédito (opcional)                                                           |
| `requestedAmount`    | Cuerpo | Monto total del crédito; en el mixto incluye la parte en primas                          |
| `requestedTerm`      | Cuerpo | Plazo en meses                                                                           |
| `requestDate`        | Cuerpo | Fecha de la solicitud (`yyyy-MM-dd`)                                                     |
| `firstDueDate`       | Cuerpo | Fecha de la primera cuota (opcional; sin ella se calcula con el día de pago)             |
| `bonusPaymentAmount` | Cuerpo | Valor pagado con primas; solo para el mixto                                              |
| `isPayrollDeduction` | Cuerpo | Descontar por nómina                                                                     |

### Request

```bash title="Proyectar las cuotas de un crédito mensual"
curl --location 'https://[servidor]/safe/api/loan/simulate' \
--header 'Authorization: Bearer [TOKEN]' \
--header 'Content-Type: application/json' \
--data '{
  "idAssociate": 7,
  "idCreditLine": 3,
  "idPaymentType": 1,
  "requestedAmount": 10000000,
  "requestedTerm": 12,
  "requestDate": "2026-11-17",
  "isPayrollDeduction": true
}'
```

### Response

```json title="Proyección (resumida)"
{
  "status": 200,
  "data": {
    "rate": 0.01916667,
    "installmentAmount": 940764,
    "advanceInterest": 0,
    "totalInterest": 1273410,
    "pendingInstallments": 12,
    "firstDueDate": "2026-12-15T00:00:00",
    "endDate": "2027-11-15T00:00:00",
    "installments": [
      {
        "number": 1,
        "dueDate": "2026-12-15T00:00:00",
        "capitalAmount": 761875,
        "interestAmount": 178889,
        "capitalBalance": 9238125,
        "accumulatedInterest": 178889,
        "periodDays": 28,
        "idInstallmentState": 1
      }
    ]
  }
}
```

:::tip Campos importantes

- `rate` es la tasa mensual en fracción: la tasa anual de la línea dividida entre 1.200.
- `installmentAmount` es la cuota mensual. En el pago con primas es el valor de la primera prima (capital + interés).
- `advanceInterest` es el interés anticipado de la cuota 0 (primas y mixto).
  :::

Los otros endpoints son:

| Método | Ruta                               | Uso                                                            |
| ------ | ---------------------------------- | -------------------------------------------------------------- |
| `POST` | `/safe/api/loan/create`            | Crea el crédito con sus cuotas. Responde `201` con el crédito. |
| `PUT`  | `/safe/api/loan/{id}/state`        | Cambia el estado. Cuerpo: `idLoanState` y `rejectionReason`.   |
| `GET`  | `/safe/api/loan-parameter/current` | Devuelve los parámetros de crédito activos de la empresa.      |

## Configuración

### Paso 1: Cargar los parámetros de crédito

`cre.loanParameter` guarda el día de pago de las cuotas y el consecutivo del código de crédito. La migración toma `DiaPago`, `PeriodoActual` y `CreditoActual` de la tabla `PARAMETRO` del sistema anterior.

```sql title="Verificar los parámetros de crédito"
SELECT [dueDay], [currentPeriod], [currentLoanNumber]
FROM [cre].[loanParameter]
WHERE [isActive] = 1;
```

:::tip Consejo
Si no se ejecuta la migración, `DML/08_loanParameter.sql` crea un registro con día de pago 30 y sin consecutivo. Ajuste `dueDay` al día de pago real del fondo.
:::

### Paso 2: Registrar el crédito

En **Créditos**, haga clic en **Nuevo crédito** y diligencie el formulario:

| Campo                    | Obligatorio   | Observación                                                                                      |
| ------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| Asociado                 | Sí            | Búsqueda por documento o nombre (mínimo 3 caracteres)                                            |
| Forma de pago            | Sí            | Cuota fija mensual, pago con primas o mensual y primas. **Cuotas fijas** aún no está disponible. |
| Monto                    | Sí            | En el mixto es el monto total                                                                    |
| Plazo (meses)            | Sí            |                                                                                                  |
| Línea de crédito         | Sí            | Filtrada por forma de pago y plazo (ver Paso 3)                                                  |
| Destino                  | No            |                                                                                                  |
| Valor a pagar con primas | Solo en mixto | Por defecto el 20 % del monto total; nunca más del 20 %                                          |
| Fecha de solicitud       | Sí            | Por defecto, hoy                                                                                 |
| Fecha primera cuota      | No            | Si se deja vacía, es el día de pago del mes de la solicitud o del siguiente si ya pasó           |
| Descontar por nómina     | —             | Marcado por defecto                                                                              |

:::tip Consejo
También puede abrir el formulario con el asociado ya seleccionado: `/loans/new?associateId={id}`.
:::

### Paso 3: Elegir la línea de crédito

La lista de líneas depende de lo que ya se diligenció, igual que el área depende de la empresa:

1. **Forma de pago**: aparecen las líneas configuradas con esa forma de pago. En el mixto aparecen además las líneas de cuota mensual, como en el sistema anterior.
2. **Plazo**: solo aparecen las líneas cuyo **plazo máximo** es igual o mayor al plazo escrito. El plazo mínimo de la línea no se tiene en cuenta.
3. **Disponibilidad**: solo aparecen las líneas marcadas como disponibles.

Las líneas se ordenan por el plazo máximo más cercano al plazo escrito y, entre ellas, por la menor tasa. Si después cambia la forma de pago o el plazo y la línea elegida ya no aplica, la línea se borra y debe escoger otra.

### Paso 4: Proyectar las cuotas

Haga clic en **Proyectar cuotas**. SAFE valida la solicitud y muestra el resumen (tasa, valor de la cuota, número de cuotas, intereses anticipados, total de intereses, primera y última cuota) y el plan de cuotas. Esta acción **no guarda nada**.

El cálculo usa tasas nominales y meses de 30 días (año de 360), como el sistema anterior:

| Forma de pago      | Cálculo                                                                                                                                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cuota fija mensual | Cuota fija (sistema francés) redondeada hacia arriba al peso. El primer mes cobra interés por los días entre la solicitud y la primera cuota (máximo 30); los siguientes, 30 días. La última cuota ajusta el capital para dejar el saldo en 0. |
| Pago con primas    | Primas en junio y diciembre, en el día de pago. Número de primas = plazo ÷ 6, con capital en partes iguales. El interés es anticipado: la cuota 0 lleva el interés hasta la primera prima y cada prima lleva el del semestre siguiente.        |
| Mensual y primas   | El valor en primas se calcula como pago con primas y el resto como cuota fija mensual, con la misma tasa y plazo. Queda **un solo crédito** con un plan ordenado por fecha y un saldo total.                                                   |

:::note Información
El seguro de vida no se calcula y el tipo de tasa (anticipada o vencida) de la línea no se usa por ahora.
:::

### Paso 5: Crear el crédito

El botón **Crear crédito** se habilita solo cuando la proyección corresponde a los datos actuales del formulario; si cambia cualquier dato, debe proyectar de nuevo. Al crear:

- El crédito queda en estado **REGISTRADA**, con código **AAMM-NNNN**.
  - AAMM son el año y el mes actuales.
  - NNNN es un consecutivo que se reinicia cada mes, continuando desde el código más alto ya existente de ese mes.
- El monto y el plazo aprobados son iguales a los solicitados.
- Se guardan todas las cuotas en estado **PENDIENTE**, salvo la cuota 0 (primas y mixto), que queda **PAGADA** como en el sistema anterior.
- Si algo falla, no se guarda ni el crédito ni sus cuotas.

### Paso 6: Cambiar el estado de un crédito

En la lista de créditos, en **Acciones**, haga clic en **Cambiar estado** y seleccione el nuevo estado.

:::important Importante
Por ahora se permite pasar de cualquier estado a cualquier otro, y lo puede hacer cualquier usuario con acceso al módulo. El flujo de estados con reglas se definirá en otro requerimiento. Cambiar el estado no modifica montos, saldos ni cuotas, y no genera movimientos ni descuentos.
:::

## Casos Especiales

:::note Comportamientos Predefinidos
Algunas formas de pago y estados tienen reglas propias.
:::

| Caso                        | Campo/Valor                    | Descripción                                                                                          |
| --------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Pago con primas o mixto     | `requestedTerm`                | El plazo debe ser múltiplo de 6 para que el número de primas sea exacto y no queden saldos negativos |
| Mixto                       | `bonusPaymentAmount`           | Mayor a 0 y máximo el 20 % del monto total                                                           |
| Cuotas fijas (plazo fijo)   | `idPaymentType = 3`            | No disponible para crear créditos                                                                    |
| Rechazar un crédito         | `idLoanState = 99` (RECHAZADA) | Exige el motivo del rechazo y lo guarda en el crédito                                                |
| Aprobar un crédito          | `idLoanState = 3` (APROBADA)   | Guarda la fecha de aprobación con la fecha actual                                                    |
| Vencimiento en meses cortos | `dueDate`                      | Si el día de pago no existe en el mes (p. ej. 30 de febrero), la cuota vence el último día del mes   |

## Resultado Esperado

Una vez creado el crédito:

1. **Crédito registrado**: aparece en la lista de créditos en estado **REGISTRADA**, con su código AAMM-NNNN y su forma de pago.
2. **Plan de cuotas**: la pestaña **Cuotas** del detalle muestra las cuotas proyectadas, con saldo final en 0 (ver [Cuotas de los Créditos](./loan-installments.md)).
3. **Cambio de estado**: la acción **Cambiar estado** actualiza el estado en la lista; al rechazar, el detalle muestra el motivo.

Para el detalle de las tablas consulte el diccionario de datos: [`cre.loan`](./database/cre/loan.md) y [`cre.loanParameter`](./database/cre/loan-parameter.md).

## Resolución de Problemas

### No aparece ninguna línea de crédito

Verifique que:

- Exista al menos una línea disponible con la forma de pago elegida (o de cuota mensual, si el crédito es mixto).
- El plazo escrito no supere el plazo máximo de las líneas.
- Las líneas tengan marcado **Activa** en **Configuración → Catálogos de Créditos → Línea de Crédito**.

### El botón Crear crédito está deshabilitado

Confirme que:

- Proyectó las cuotas con el botón **Proyectar cuotas**.
- No cambió ningún dato del formulario después de proyectar; si lo hizo, vuelva a proyectar.

### Aparece "The loan parameters are not configured for this company"

Revise que:

- `cre.loanParameter` tenga un registro activo para la empresa (Paso 1).
- Se haya ejecutado `Migration/33_loanParameter.sql` o `DML/08_loanParameter.sql`.

### El plazo es rechazado en un crédito con primas o mixto

Verifique que:

- El plazo sea múltiplo de 6 (6, 12, 18, 24…).
- El plazo no supere el plazo máximo de la línea elegida.
