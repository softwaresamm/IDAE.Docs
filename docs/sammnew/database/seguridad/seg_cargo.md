---
sidebar_position: 1
title: seg_cargo
description: Tabla seg_cargo del módulo Seguridad
tags: [database, seg]
---

# seg_cargo

## Descripción

Tabla seg_cargo del módulo Seguridad.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| cargo | VARCHAR | ✗ | - | - |
| cargo_codigo | VARCHAR | ✓ | - | - |
| esTecnico | BIT | ✓ | - | - |
| esComercial | BIT | ✓ | - | - |
| esCoordinador | BIT | ✓ | - | - |
| valorHora | MONEY | ✓ | - | - |
| esAdministrativo | BIT | ✗ | - | - |

### Columnas de Auditoría

Todas las tablas incluyen estas columnas estándar:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER | Clave primaria auto-incremental |
| active | BIT | Registro activo (soft delete) |
| id_usuario_creo | INTEGER | Usuario que creó el registro |
| id_usuario_modifico | INTEGER | Usuario que modificó el registro |
| fechaCreacion | DATETIME | Fecha y hora de creación |
| fechaModificacion | DATETIME | Fecha y hora de última modificación |
| uid | VARCHAR | Control multiempresa (User ID) |
| eid | VARCHAR | Control multiempresa (Entity ID) |

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes definidas.*

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Nombre real en base de datos: `seg_cargo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [seg_cargo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [seg_cargo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
