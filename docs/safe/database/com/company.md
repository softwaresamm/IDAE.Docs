---
sidebar_position: 3
title: com.company
description: "Empresas a las que pertenecen los asociados."
tags: [database, com]
---

# com.company

## Descripción

Empresas a las que pertenecen los asociados.

**Módulo**: Organización  
**Nombre en base de datos**: `[com].[company]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |
| taxId | NVARCHAR(50) | ✗ | - | - | - |
| code | NVARCHAR(10) | ✓ | - | - | - |
| id_group | INT | ✓ | FK | - | Referencia a com.group |
| isFileGenerated | BIT | ✗ | - | - | - |

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
    com_company {
        int id PK
        int id_group FK
    }
    aso_associate
    com_area
    com_group
    com_company ||--o{ aso_associate : "id_company"
    com_company |o--o{ com_area : "id_company"
    com_group |o--o{ com_company : "id_group"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

| Columna | Referencia | Constraint |
|---------|------------|------------|
| id_group | [`com.group`](../com/group.md).id | `FK__com__company__id_group` |

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`aso.associate`](../aso/associate.md) | id_company | `FK__aso__associate__id_company` |
| [`com.area`](../com/area.md) | id_company | `FK__com__area__id_company` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `com.company_act` | Procedimiento |
| `com.company_ins_bulk` | Procedimiento |
| `com.company_sel` | Procedimiento |
| `com.company_typ` | Tipo tabla |
| `com.company_upd_bulk` | Procedimiento |
| `com.company_view` | Vista |
| `com.company_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
