---
sidebar_position: 1
title: Diccionario de Datos
description: "Diccionario de datos de SAFE"
tags: [database, schema, diccionario]
---

# Diccionario de Datos - SAFE

Diccionario de datos de la base de datos `pro_safe` de SAFE (fondo de empleados). Los objetos viven en `IDAE.SAFE.DBObjects` y la base se reconstruye desde cero con `UTIL.DBUpgrader`; los datos históricos se migran desde la base legada `app_febancol`.

## Estadísticas

- **Total de tablas**: 32
- **Módulos**: 5
- **Base de datos**: SQL Server (`pro_safe`)

## Convenciones

- Esquema por dominio y nombres en inglés camelCase; las llaves foráneas se llaman `id_<tabla>`.
- Todas las tablas tienen `id` (INT IDENTITY, PK), `uid`/`eid` (multiempresa), auditoría (`id_user_creator`, `id_user_modifier`, `dateCreation`, `dateModification`) e `isActive` (borrado lógico).
- Por cada tabla existen las vistas `<tabla>_view` (columnas de las FK expandidas) y `<tabla>_view_base` (solo el nombre de cada FK), el tipo `<tabla>_typ` y los procedimientos `_sel`, `_act`, `_ins_bulk` y `_upd_bulk`.
- El orden de columnas de la tabla y de `<tabla>_typ` debe coincidir con el orden de propiedades del `...Object.cs` del backend (los parámetros tipo tabla se enlazan por posición).
- `isWebCreated` / `isWebUpdated` vienen de `CreaWeb` / `ActuWeb` del sistema legado.

## Módulos

### Asociados (`aso`)

Asociados del fondo y sus catálogos de información personal y laboral.

- [aso.academicLevel](./aso/academic-level.md) - Catálogo de niveles académicos.
- [aso.associate](./aso/associate.md) - Asociados del fondo: datos personales, laborales, financieros y de contacto.
- [aso.bank](./aso/bank.md) - Catálogo de bancos.
- [aso.contractType](./aso/contract-type.md) - Catálogo de tipos de contrato laboral.
- [aso.eps](./aso/eps.md) - Catálogo de EPS (entidades promotoras de salud).
- [aso.gender](./aso/gender.md) - Catálogo de géneros.
- [aso.housingType](./aso/housing-type.md) - Catálogo de tipos de vivienda.
- [aso.maritalStatus](./aso/marital-status.md) - Catálogo de estados civiles.
- [aso.payrollType](./aso/payroll-type.md) - Catálogo de tipos de nómina.
- [aso.pensionFund](./aso/pension-fund.md) - Catálogo de fondos de pensiones.
- [aso.position](./aso/position.md) - Catálogo de cargos.
- [aso.state](./aso/state.md) - Catálogo de estados del asociado.

### Organización (`com`)

Empresas, áreas, ciudades y grupos.

- [com.area](./com/area.md) - Catálogo de áreas.
- [com.city](./com/city.md) - Catálogo de ciudades.
- [com.company](./com/company.md) - Empresas a las que pertenecen los asociados.
- [com.group](./com/group.md) - Catálogo de grupos.

### Movimientos (`mov`)

Movimientos (transacciones) de los asociados y descuentos.

- [mov.associateOtherDiscount](./mov/associate-other-discount.md) - Otros descuentos asignados a cada asociado.
- [mov.discount](./mov/discount.md) - Descuentos aplicados (archivos de descuento).
- [mov.discountImp](./mov/discount-imp.md) - Descuentos importados.
- [mov.movement](./mov/movement.md) - Movimientos (transacciones) de los asociados.
- [mov.movementState](./mov/movement-state.md) - Catálogo de estados de movimiento.
- [mov.movementType](./mov/movement-type.md) - Catálogo de tipos de movimiento.
- [mov.operationType](./mov/operation-type.md) - Catálogo de tipos de operación.
- [mov.otherDiscount](./mov/other-discount.md) - Catálogo de otros descuentos.

### Créditos (`cre`)

Líneas de crédito, préstamos de los asociados y sus catálogos.

- [cre.creditLine](./cre/credit-line.md) - Líneas de crédito (modalidades) con sus condiciones: tasa, plazos, forma de pago y requisitos.
- [cre.interestRateType](./cre/interest-rate-type.md) - Catálogo de tipos de tasa de interés (1 ANTICIPADOS, 2 VENCIDOS). Conserva los ids del sistema legado.
- [cre.loan](./cre/loan.md) - Créditos (solicitudes de préstamo) de los asociados: condiciones, fechas, saldos, intereses y liquidación.
- [cre.loanPurpose](./cre/loan-purpose.md) - Catálogo de destinos (finalidad) del crédito. Conserva los ids del sistema legado.
- [cre.loanState](./cre/loan-state.md) - Catálogo de estados del crédito. Conserva los ids del sistema legado, que no son consecutivos (99 RECHAZADA, 999 CANCELADA POR EL ASOCIADO, 9999 FINALIZADA).
- [cre.paymentType](./cre/payment-type.md) - Catálogo de formas de pago de las líneas de crédito. Conserva los ids del sistema legado.

### Usuarios (`use`)

Usuarios y perfiles de la plataforma.

- [use.profile](./use/profile.md) - Perfiles de usuario.
- [use.user](./use/user.md) - Usuarios de la plataforma.

---

**Nota**: Este diccionario se regenera con la skill `data-dictionary` de IDAE.ClaudeConfig; las descripciones se mantienen en `data-dictionary/products/safe.json`.
