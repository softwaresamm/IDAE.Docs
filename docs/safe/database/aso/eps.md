---
sidebar_position: 5
title: aso.eps
description: "Catálogo de EPS (entidades promotoras de salud)."
tags: [database, aso]
---

# aso.eps

## Descripción

Catálogo de EPS (entidades promotoras de salud).

**Módulo**: Asociados  
**Nombre en base de datos**: `[aso].[eps]`

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

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`aso.associate`](../aso/associate.md) | id_eps | `FK__aso__associate__id_eps` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `aso.eps_act` | Procedimiento |
| `aso.eps_ins_bulk` | Procedimiento |
| `aso.eps_sel` | Procedimiento |
| `aso.eps_typ` | Tipo tabla |
| `aso.eps_upd_bulk` | Procedimiento |
| `aso.eps_view` | Vista |
| `aso.eps_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
