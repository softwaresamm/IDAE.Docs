---
sidebar_position: 2
title: mov.discount
description: "Descuentos aplicados (archivos de descuento)."
tags: [database, mov]
---

# mov.discount

## Descripción

Descuentos aplicados (archivos de descuento).

**Módulo**: Movimientos  
**Nombre en base de datos**: `[mov].[discount]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |
| applicationDate | DATETIME2(0) | ✗ | - | - | - |
| user | NVARCHAR(20) | ✗ | - | - | - |
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
    mov_discount {
        int id PK
    }
    mov_movement
    mov_discount |o--o{ mov_movement : "id_discount"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`mov.movement`](../mov/movement.md) | id_discount | `FK__mov__movement__id_discount` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `mov.discount_act` | Procedimiento |
| `mov.discount_ins_bulk` | Procedimiento |
| `mov.discount_sel` | Procedimiento |
| `mov.discount_typ` | Tipo tabla |
| `mov.discount_upd_bulk` | Procedimiento |
| `mov.discount_view` | Vista |
| `mov.discount_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
