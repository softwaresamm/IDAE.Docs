---
sidebar_position: 2
title: com.city
description: "Catálogo de ciudades."
tags: [database, com]
---

# com.city

## Descripción

Catálogo de ciudades.

**Módulo**: Organización  
**Nombre en base de datos**: `[com].[city]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |
| code | NVARCHAR(255) | ✓ | - | - | - |
| department | INT | ✓ | - | - | - |
| departmentName | NVARCHAR(255) | ✓ | - | - | - |

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
    com_city {
        int id PK
    }
    aso_associate
    com_city |o--o{ aso_associate : "id_city"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`aso.associate`](../aso/associate.md) | id_city | `FK__aso__associate__id_city` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `com.city_act` | Procedimiento |
| `com.city_ins_bulk` | Procedimiento |
| `com.city_sel` | Procedimiento |
| `com.city_typ` | Tipo tabla |
| `com.city_upd_bulk` | Procedimiento |
| `com.city_view` | Vista |
| `com.city_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
