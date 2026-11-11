---
sidebar_position: 4
title: com.group
description: "Catálogo de grupos."
tags: [database, com]
---

# com.group

## Descripción

Catálogo de grupos.

**Módulo**: Organización  
**Nombre en base de datos**: `[com].[group]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |
| file | NVARCHAR(50) | ✓ | - | - | - |

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
    com_group {
        int id PK
    }
    com_company
    com_group |o--o{ com_company : "id_group"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`com.company`](../com/company.md) | id_group | `FK__com__company__id_group` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `com.group_act` | Procedimiento |
| `com.group_ins_bulk` | Procedimiento |
| `com.group_sel` | Procedimiento |
| `com.group_typ` | Tipo tabla |
| `com.group_upd_bulk` | Procedimiento |
| `com.group_view` | Vista |
| `com.group_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
