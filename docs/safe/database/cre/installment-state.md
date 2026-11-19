---
sidebar_position: 2
title: cre.installmentState
description: "Catálogo de estados de la cuota de un crédito: 1 PENDIENTE y 2 PAGADA. Es un catálogo nuevo: el legado solo tenía el indicador Cancelada en cada cuota."
tags: [database, cre]
---

# cre.installmentState

## Descripción

Catálogo de estados de la cuota de un crédito: 1 PENDIENTE y 2 PAGADA. Es un catálogo nuevo: el legado solo tenía el indicador Cancelada en cada cuota.

**Módulo**: Créditos  
**Nombre en base de datos**: `[cre].[installmentState]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | Nombre del estado (PENDIENTE, PAGADA) |

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
    cre_installmentState {
        int id PK
    }
    cre_loanInstallment
    cre_installmentState ||--o{ cre_loanInstallment : "id_installmentState"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`cre.loanInstallment`](../cre/loan-installment.md) | id_installmentState | `FK__cre__loanInstallment__id_installmentState` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `cre.installmentState_act` | Procedimiento |
| `cre.installmentState_ins_bulk` | Procedimiento |
| `cre.installmentState_sel` | Procedimiento |
| `cre.installmentState_typ` | Tipo tabla |
| `cre.installmentState_upd_bulk` | Procedimiento |
| `cre.installmentState_view` | Vista |
| `cre.installmentState_view_base` | Vista |

## Notas Técnicas

- Los ids son fijos (IDENTITY_INSERT) y se cargan tanto en `Migration/31_installmentState.sql` como en `DML/07_installmentState.sql`, para que exista con o sin migración.

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
