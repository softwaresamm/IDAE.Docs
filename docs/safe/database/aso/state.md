---
sidebar_position: 12
title: aso.state
description: "Catálogo de estados del asociado."
tags: [database, aso]
---

# aso.state

## Descripción

Catálogo de estados del asociado.

**Módulo**: Asociados  
**Nombre en base de datos**: `[aso].[state]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |

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
| [`aso.associate`](../aso/associate.md) | id_state | `FK__aso__associate__id_state` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `aso.state_act` | Procedimiento |
| `aso.state_ins_bulk` | Procedimiento |
| `aso.state_sel` | Procedimiento |
| `aso.state_typ` | Tipo tabla |
| `aso.state_upd_bulk` | Procedimiento |
| `aso.state_view` | Vista |
| `aso.state_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
