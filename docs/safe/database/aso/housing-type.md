---
sidebar_position: 7
title: aso.housingType
description: "Catálogo de tipos de vivienda."
tags: [database, aso]
---

# aso.housingType

## Descripción

Catálogo de tipos de vivienda.

**Módulo**: Asociados  
**Nombre en base de datos**: `[aso].[housingType]`

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
    aso_housingType {
        int id PK
    }
    aso_associate
    aso_housingType ||--o{ aso_associate : "id_housingType"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`aso.associate`](../aso/associate.md) | id_housingType | `FK__aso__associate__id_housingType` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `aso.housingType_act` | Procedimiento |
| `aso.housingType_ins_bulk` | Procedimiento |
| `aso.housingType_sel` | Procedimiento |
| `aso.housingType_typ` | Tipo tabla |
| `aso.housingType_upd_bulk` | Procedimiento |
| `aso.housingType_view` | Vista |
| `aso.housingType_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
