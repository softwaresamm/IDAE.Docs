---
sidebar_position: 8
title: mov.otherDiscount
description: "Catálogo de otros descuentos."
tags: [database, mov]
---

# mov.otherDiscount

## Descripción

Catálogo de otros descuentos.

**Módulo**: Movimientos  
**Nombre en base de datos**: `[mov].[otherDiscount]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |
| code | NVARCHAR(10) | ✗ | - | - | - |
| isMandatory | BIT | ✗ | - | - | - |
| amount | INT | ✓ | - | - | - |
| numberOfInstallments | INT | ✓ | - | - | - |
| goesToContributions | BIT | ✗ | - | - | - |
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
| id_movementType | [`mov.movementType`](../mov/movement-type.md).id | `FK__mov__otherDiscount__id_movementType` |
| id_operationType | [`mov.operationType`](../mov/operation-type.md).id | `FK__mov__otherDiscount__id_operationType` |

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`mov.associateOtherDiscount`](../mov/associate-other-discount.md) | id_otherDiscount | `FK__mov__associateOtherDiscount__id_otherDiscount` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `mov.otherDiscount_act` | Procedimiento |
| `mov.otherDiscount_ins_bulk` | Procedimiento |
| `mov.otherDiscount_sel` | Procedimiento |
| `mov.otherDiscount_typ` | Tipo tabla |
| `mov.otherDiscount_upd_bulk` | Procedimiento |
| `mov.otherDiscount_view` | Vista |
| `mov.otherDiscount_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
