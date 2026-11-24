---
sidebar_position: 5
title: cre.loanInstallment
description: "Tabla cre.loanInstallment del módulo Créditos."
tags: [database, cre]
---

# cre.loanInstallment

## Descripción

Tabla cre.loanInstallment del módulo Créditos.

**Módulo**: Créditos  
**Nombre en base de datos**: `[cre].[loanInstallment]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |
| id_loan | INT | ✗ | FK, UQ | - | Referencia a cre.loan |
| id_installmentState | INT | ✗ | FK | - | Referencia a cre.installmentState |
| number | INT | ✗ | UQ | - | - |
| dueDate | DATETIME2(0) | ✗ | - | - | - |
| capitalAmount | INT | ✗ | - | - | - |
| interestAmount | INT | ✗ | - | - | - |
| lifeInsurance | INT | ✓ | - | - | - |
| capitalBalance | INT | ✗ | - | - | - |
| accumulatedInterest | INT | ✓ | - | - | - |
| periodDays | INT | ✓ | - | - | - |

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

### Índices Únicos

- `UQ__cre__loanInstallment__id_loan_number` (id_loan, number) — filtro `([isActive]=(1))`

## Diagrama ER

Tabla y sus relaciones directas (sin las columnas de auditoría).

```mermaid
erDiagram
    cre_loanInstallment {
        int id PK
        int id_loan FK,UK
        int id_installmentState FK
        int number UK
    }
    cre_installmentState
    cre_loan
    mov_movement
    cre_installmentState ||--o{ cre_loanInstallment : "id_installmentState"
    cre_loan ||--o{ cre_loanInstallment : "id_loan"
    cre_loanInstallment |o--o{ mov_movement : "id_loanInstallment"
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

| Columna | Referencia | Constraint |
|---------|------------|------------|
| id_installmentState | [`cre.installmentState`](../cre/installment-state.md).id | `FK__cre__loanInstallment__id_installmentState` |
| id_loan | [`cre.loan`](../cre/loan.md).id | `FK__cre__loanInstallment__id_loan` |

### Relaciones Entrantes

| Tabla | Columna | Constraint |
|-------|---------|------------|
| [`mov.movement`](../mov/movement.md) | id_loanInstallment | `FK__mov__movement__id_loanInstallment` |

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `cre.loanInstallment_act` | Procedimiento |
| `cre.loanInstallment_ins_bulk` | Procedimiento |
| `cre.loanInstallment_sel` | Procedimiento |
| `cre.loanInstallment_sel_by_idLoan` | Procedimiento |
| `cre.loanInstallment_typ` | Tipo tabla |
| `cre.loanInstallment_upd_bulk` | Procedimiento |
| `cre.loanInstallment_view` | Vista |
| `cre.loanInstallment_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
