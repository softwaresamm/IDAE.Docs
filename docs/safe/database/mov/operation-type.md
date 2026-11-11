---
sidebar_position: 7
title: mov.operationType
description: "Catálogo de tipos de operación."
tags: [database, mov]
---

# mov.operationType

## Descripción

Catálogo de tipos de operación.

**Módulo**: Movimientos  
**Nombre en base de datos**: `[mov].[operationType]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(80) | ✗ | - | - | - |
| bankOperationCode | NVARCHAR(4) | ✓ | - | - | - |
| id_affects | INT | ✓ | - | - | - |

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

## Diagrama ER

Tabla y sus relaciones directas (sin las columnas de auditoría).

```mermaid
erDiagram
    mov_operationType {
        int id PK
    }
    mov_associateOtherDiscount
    mov_movement
    mov_otherDiscount
    mov_operationType |o--o{ mov_associateOtherDiscount : "id_operationType"
    mov_operationType ||--o{ mov_movement : "id_operationType"
    mov_operationType |o--o{ mov_otherDiscount : "id_operationType"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`mov.associateOtherDiscount`](../mov/associate-other-discount.md) | id_operationType | `FK__mov__associateOtherDiscount__id_operationType` |
| [`mov.movement`](../mov/movement.md) | id_operationType | `FK__mov__movement__id_operationType` |
| [`mov.otherDiscount`](../mov/other-discount.md) | id_operationType | `FK__mov__otherDiscount__id_operationType` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `mov.operationType_act` | Procedimiento |
| `mov.operationType_ins_bulk` | Procedimiento |
| `mov.operationType_sel` | Procedimiento |
| `mov.operationType_typ` | Tipo tabla |
| `mov.operationType_upd_bulk` | Procedimiento |
| `mov.operationType_view` | Vista |
| `mov.operationType_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
