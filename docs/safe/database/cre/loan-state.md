---
sidebar_position: 5
title: cre.loanState
description: "Catálogo de estados del crédito. Conserva los ids del sistema legado, que no son consecutivos (99 RECHAZADA, 999 CANCELADA POR EL ASOCIADO, 9999 FINALIZADA)."
tags: [database, cre]
---

# cre.loanState

## Descripción

Catálogo de estados del crédito. Conserva los ids del sistema legado, que no son consecutivos (99 RECHAZADA, 999 CANCELADA POR EL ASOCIADO, 9999 FINALIZADA).

**Módulo**: Créditos  
**Nombre en base de datos**: `[cre].[loanState]`  
**Origen (migración)**: `app_febancol.dbo.SOL_ESTADO`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | Nombre del estado (legado: Nombre) |

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
    cre_loanState {
        int id PK
    }
    cre_loan
    cre_loanState ||--o{ cre_loan : "id_loanState"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`cre.loan`](../cre/loan.md) | id_loanState | `FK__cre__loan__id_loanState` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `cre.loanState_act` | Procedimiento |
| `cre.loanState_ins_bulk` | Procedimiento |
| `cre.loanState_sel` | Procedimiento |
| `cre.loanState_typ` | Tipo tabla |
| `cre.loanState_upd_bulk` | Procedimiento |
| `cre.loanState_view` | Vista |
| `cre.loanState_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
