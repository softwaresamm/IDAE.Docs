---
sidebar_position: 5
title: mov.movementState
description: "Catálogo de estados de movimiento."
tags: [database, mov]
---

# mov.movementState

## Descripción

Catálogo de estados de movimiento.

**Módulo**: Movimientos  
**Nombre en base de datos**: `[mov].[movementState]`

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
| [`mov.movement`](../mov/movement.md) | id_movementState | `FK__mov__movement__id_movementState` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `mov.movementState_act` | Procedimiento |
| `mov.movementState_ins_bulk` | Procedimiento |
| `mov.movementState_sel` | Procedimiento |
| `mov.movementState_typ` | Tipo tabla |
| `mov.movementState_upd_bulk` | Procedimiento |
| `mov.movementState_view` | Vista |
| `mov.movementState_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
