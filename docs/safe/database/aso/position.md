---
sidebar_position: 11
title: aso.position
description: "Catálogo de cargos."
tags: [database, aso]
---

# aso.position

## Descripción

Catálogo de cargos.

**Módulo**: Asociados  
**Nombre en base de datos**: `[aso].[position]`

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
| isWebUpdated | BIT | ✗ | Actualizado desde la web (legado: ActuWeb) |
| isWebCreated | BIT | ✗ | Creado desde la web (legado: CreaWeb) |

## Diagrama ER

Tabla y sus relaciones directas (sin las columnas de auditoría).

```mermaid
erDiagram
    aso_position {
        int id PK
    }
    aso_associate
    aso_position |o--o{ aso_associate : "id_position"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`aso.associate`](../aso/associate.md) | id_position | `FK__aso__associate__id_position` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `aso.position_act` | Procedimiento |
| `aso.position_ins_bulk` | Procedimiento |
| `aso.position_sel` | Procedimiento |
| `aso.position_typ` | Tipo tabla |
| `aso.position_upd_bulk` | Procedimiento |
| `aso.position_view` | Vista |
| `aso.position_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
