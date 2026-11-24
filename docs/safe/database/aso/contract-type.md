---
sidebar_position: 4
title: aso.contractType
description: "Catálogo de tipos de contrato laboral."
tags: [database, aso]
---

# aso.contractType

## Descripción

Catálogo de tipos de contrato laboral.

**Módulo**: Asociados  
**Nombre en base de datos**: `[aso].[contractType]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |
| maxLoanPercentage | INT | ✓ | - | - | - |

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
    aso_contractType {
        int id PK
    }
    aso_associate
    aso_contractType ||--o{ aso_associate : "id_contractType"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`aso.associate`](../aso/associate.md) | id_contractType | `FK__aso__associate__id_contractType` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `aso.contractType_act` | Procedimiento |
| `aso.contractType_ins_bulk` | Procedimiento |
| `aso.contractType_sel` | Procedimiento |
| `aso.contractType_typ` | Tipo tabla |
| `aso.contractType_upd_bulk` | Procedimiento |
| `aso.contractType_view` | Vista |
| `aso.contractType_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
