---
sidebar_position: 6
title: cre.loanParameter
description: "Tabla cre.loanParameter del módulo Créditos."
tags: [database, cre]
---

# cre.loanParameter

## Descripción

Tabla cre.loanParameter del módulo Créditos.

**Módulo**: Créditos  
**Nombre en base de datos**: `[cre].[loanParameter]`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Descripción |
|---------|------|------|-------|---------|-------------|
| name | NVARCHAR(500) | ✓ | - | - | - |
| dueDay | INT | ✗ | - | - | - |
| currentPeriod | NVARCHAR(10) | ✗ | - | - | - |
| currentLoanNumber | INT | ✗ | - | - | - |

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

- `UQ__cre__loanParameter__eid` (eid) — filtro `([isActive]=(1))`

## Diagrama ER

Tabla y sus relaciones directas (sin las columnas de auditoría).

```mermaid
erDiagram
    cre_loanParameter {
        int id PK
    }
```

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (aparte de las columnas de auditoría).*

### Relaciones Entrantes

*Ninguna tabla referencia a esta tabla.*

## Objetos Relacionados

| Objeto | Tipo |
|--------|------|
| `cre.loanParameter_act` | Procedimiento |
| `cre.loanParameter_ins_bulk` | Procedimiento |
| `cre.loanParameter_next_code` | Procedimiento |
| `cre.loanParameter_sel` | Procedimiento |
| `cre.loanParameter_typ` | Tipo tabla |
| `cre.loanParameter_upd_bulk` | Procedimiento |
| `cre.loanParameter_view` | Vista |
| `cre.loanParameter_view_base` | Vista |

---

**Nota**: Documentación generada desde el esquema real de la base de datos `pro_safe` con la skill `data-dictionary` (IDAE.ClaudeConfig).
