---
sidebar_position: 6
title: mov.movementType
description: "Catálogo de tipos de movimiento."
tags: [database, mov]
---

# mov.movementType

## Descripción

Catálogo de tipos de movimiento.

**Módulo**: Movimientos  
**Nombre en base de datos**: `[mov].[movementType]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(80) | ✗ | - | - | - |

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

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`mov.associateOtherDiscount`](../mov/associate-other-discount.md) | id_movementType | `FK__mov__associateOtherDiscount__id_movementType` |
| [`mov.movement`](../mov/movement.md) | id_movementType | `FK__mov__movement__id_movementType` |
| [`mov.otherDiscount`](../mov/other-discount.md) | id_movementType | `FK__mov__otherDiscount__id_movementType` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `mov.movementType_act` | Procedimiento |
| `mov.movementType_ins_bulk` | Procedimiento |
| `mov.movementType_sel` | Procedimiento |
| `mov.movementType_typ` | Tipo tabla |
| `mov.movementType_upd_bulk` | Procedimiento |
| `mov.movementType_view` | Vista |
| `mov.movementType_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
