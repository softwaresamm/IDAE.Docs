---
sidebar_position: 4
title: cre.loanPurpose
description: "Catálogo de destinos (finalidad) del crédito. Conserva los ids del sistema legado."
tags: [database, cre]
---

# cre.loanPurpose

## Descripción

Catálogo de destinos (finalidad) del crédito. Conserva los ids del sistema legado.

**Módulo**: Créditos  
**Nombre en base de datos**: `[cre].[loanPurpose]`  
**Origen (migración)**: `app_febancol.dbo.SOL_DESTINO`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | Nombre del destino (legado: Nombre) |

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
| [`cre.creditLine`](../cre/credit-line.md) | id_loanPurpose | `FK__cre__creditLine__id_loanPurpose` |
| [`cre.loan`](../cre/loan.md) | id_loanPurpose | `FK__cre__loan__id_loanPurpose` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `cre.loanPurpose_act` | Procedimiento |
| `cre.loanPurpose_ins_bulk` | Procedimiento |
| `cre.loanPurpose_sel` | Procedimiento |
| `cre.loanPurpose_typ` | Tipo tabla |
| `cre.loanPurpose_upd_bulk` | Procedimiento |
| `cre.loanPurpose_view` | Vista |
| `cre.loanPurpose_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
