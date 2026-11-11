---
sidebar_position: 2
title: cre.interestRateType
description: "Catálogo de tipos de tasa de interés (1 ANTICIPADOS, 2 VENCIDOS). Conserva los ids del sistema legado."
tags: [database, cre]
---

# cre.interestRateType

## Descripción

Catálogo de tipos de tasa de interés (1 ANTICIPADOS, 2 VENCIDOS). Conserva los ids del sistema legado.

**Módulo**: Créditos  
**Nombre en base de datos**: `[cre].[interestRateType]`  
**Origen (migración)**: `app_febancol.dbo.MOD_TIPOINTERES`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | Nombre del tipo de tasa (legado: Nombre) |

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
| [`cre.creditLine`](../cre/credit-line.md) | id_interestRateType | `FK__cre__creditLine__id_interestRateType` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `cre.interestRateType_act` | Procedimiento |
| `cre.interestRateType_ins_bulk` | Procedimiento |
| `cre.interestRateType_sel` | Procedimiento |
| `cre.interestRateType_typ` | Tipo tabla |
| `cre.interestRateType_upd_bulk` | Procedimiento |
| `cre.interestRateType_view` | Vista |
| `cre.interestRateType_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
