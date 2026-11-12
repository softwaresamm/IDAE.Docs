---
sidebar_position: 6
title: aso.gender
description: "Catálogo de géneros."
tags: [database, aso]
---

# aso.gender

## Descripción

Catálogo de géneros.

**Módulo**: Asociados  
**Nombre en base de datos**: `[aso].[gender]`

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
    aso_gender {
        int id PK
    }
    aso_associate
    aso_gender |o--o{ aso_associate : "id_gender"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`aso.associate`](../aso/associate.md) | id_gender | `FK__aso__associate__id_gender` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `aso.gender_act` | Procedimiento |
| `aso.gender_ins_bulk` | Procedimiento |
| `aso.gender_sel` | Procedimiento |
| `aso.gender_typ` | Tipo tabla |
| `aso.gender_upd_bulk` | Procedimiento |
| `aso.gender_view` | Vista |
| `aso.gender_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
