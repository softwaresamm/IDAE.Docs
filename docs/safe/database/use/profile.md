---
sidebar_position: 1
title: use.profile
description: "Perfiles de usuario."
tags: [database, use]
---

# use.profile

## Descripción

Perfiles de usuario.

**Módulo**: Usuarios  
**Nombre en base de datos**: `[use].[profile]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |
| description | NVARCHAR(MAX) | ✓ | - | - | - |

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
    use_profile {
        int id PK
    }
    use_user
    use_profile ||--o{ use_user : "id_profile"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`use.user`](../use/user.md) | id_profile | `FK__use__user__id_profile` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `use.profile_act` | Procedimiento |
| `use.profile_ins_bulk` | Procedimiento |
| `use.profile_sel` | Procedimiento |
| `use.profile_typ` | Tipo tabla |
| `use.profile_upd_bulk` | Procedimiento |
| `use.profile_view` | Vista |
| `use.profile_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
