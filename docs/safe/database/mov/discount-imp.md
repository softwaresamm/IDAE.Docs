---
sidebar_position: 3
title: mov.discountImp
description: "Descuentos importados."
tags: [database, mov]
---

# mov.discountImp

## Descripción

Descuentos importados.

**Módulo**: Movimientos  
**Nombre en base de datos**: `[mov].[discountImp]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |
| document | NVARCHAR(50) | ✗ | - | - | - |
| code | NVARCHAR(50) | ✗ | - | - | - |
| amount | INT | ✗ | - | - | - |
| date | DATETIME2(0) | ✗ | - | - | - |
| type | INT | ✗ | - | - | - |
| insideFile | NVARCHAR(80) | ✗ | - | - | - |
| outsideFile | NVARCHAR(80) | ✗ | - | - | - |

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

## Diagrama ER

Tabla y sus relaciones directas (sin las columnas de auditoría).

```mermaid
erDiagram
    mov_discountImp {
        int id PK
    }
    mov_movement
    mov_discountImp |o--o{ mov_movement : "id_discountImp"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`mov.movement`](../mov/movement.md) | id_discountImp | `FK__mov__movement__id_discountImp` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `mov.discountImp_act` | Procedimiento |
| `mov.discountImp_ins_bulk` | Procedimiento |
| `mov.discountImp_sel` | Procedimiento |
| `mov.discountImp_typ` | Tipo tabla |
| `mov.discountImp_upd_bulk` | Procedimiento |
| `mov.discountImp_view` | Vista |
| `mov.discountImp_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
