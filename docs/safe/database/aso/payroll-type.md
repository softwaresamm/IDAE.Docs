---
sidebar_position: 9
title: aso.payrollType
description: "Catálogo de tipos de nómina."
tags: [database, aso]
---

# aso.payrollType

## Descripción

Catálogo de tipos de nómina.

**Módulo**: Asociados  
**Nombre en base de datos**: `[aso].[payrollType]`

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
| [`aso.associate`](../aso/associate.md) | id_payrollType | `FK__aso__associate__id_payrollType` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `aso.payrollType_act` | Procedimiento |
| `aso.payrollType_ins_bulk` | Procedimiento |
| `aso.payrollType_sel` | Procedimiento |
| `aso.payrollType_typ` | Tipo tabla |
| `aso.payrollType_upd_bulk` | Procedimiento |
| `aso.payrollType_view` | Vista |
| `aso.payrollType_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
