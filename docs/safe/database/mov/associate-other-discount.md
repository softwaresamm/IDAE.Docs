---
sidebar_position: 1
title: mov.associateOtherDiscount
description: "Otros descuentos asignados a cada asociado."
tags: [database, mov]
---

# mov.associateOtherDiscount

## Descripción

Otros descuentos asignados a cada asociado.

**Módulo**: Movimientos  
**Nombre en base de datos**: `[mov].[associateOtherDiscount]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |
| amount | INT | ✓ | - | - | - |
| id_associate | INT | ✗ | FK | - | Referencia a aso.associate |
| id_otherDiscount | INT | ✗ | FK | - | Referencia a mov.otherDiscount |
| id_operationType | INT | ✓ | FK | - | Referencia a mov.operationType |
| id_movementType | INT | ✓ | FK | - | Referencia a mov.movementType |

### Columnas Estándar

| Columna | Tipo | Nulo | Descripción |
|---------|------|------|-------------|
| id | INT | ✗ | Clave primaria auto-incremental |
| uid | NVARCHAR(500) | ✗ | Control multiempresa (User ID) |
| eid | NVARCHAR(50) | ✗ | Control multiempresa (Entity ID) |
| id_user_creator | INT | ✓ | Usuario que creó el registro |
| id_user_modifier | INT | ✓ | Usuario que modificó el registro por última vez |
| dateCreation | DATETIME2(0) | ✓ | Fecha y hora de creación |
| dateModification | DATETIME2(0) | ✓ | Fecha y hora de última modificación |
| isActive | BIT | ✗ | Registro activo (borrado lógico) |
| isWebUpdated | BIT | ✗ | Actualizado desde la web (legado: ActuWeb) |
| isWebCreated | BIT | ✗ | Creado desde la web (legado: CreaWeb) |

## Relaciones

### Relaciones Salientes (Foreign Keys)

| Columna | Referencia | Constraint |
|---------|------------|------------|
| id_associate | [`aso.associate`](../aso/associate.md).id | `FK__mov__associateOtherDiscount__id_associate` |
| id_movementType | [`mov.movementType`](../mov/movement-type.md).id | `FK__mov__associateOtherDiscount__id_movementType` |
| id_operationType | [`mov.operationType`](../mov/operation-type.md).id | `FK__mov__associateOtherDiscount__id_operationType` |
| id_otherDiscount | [`mov.otherDiscount`](../mov/other-discount.md).id | `FK__mov__associateOtherDiscount__id_otherDiscount` |

### Relaciones Entrantes

*Ninguna tabla referencia a esta tabla.*

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `mov.associateOtherDiscount_act` | Procedimiento |
| `mov.associateOtherDiscount_ins_bulk` | Procedimiento |
| `mov.associateOtherDiscount_sel` | Procedimiento |
| `mov.associateOtherDiscount_sel_by_idAssociate` | Procedimiento |
| `mov.associateOtherDiscount_typ` | Tipo tabla |
| `mov.associateOtherDiscount_upd_bulk` | Procedimiento |
| `mov.associateOtherDiscount_view` | Vista |
| `mov.associateOtherDiscount_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
