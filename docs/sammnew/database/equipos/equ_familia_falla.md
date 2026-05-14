---
sidebar_position: 14
title: equ_familia_falla
description: Tabla equ_familia_falla del módulo Equipos
tags: [database, equ]
---

# equ_familia_falla

## Descripción

Tabla equ_familia_falla del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| familia_falla | VARCHAR | ✗ | - | - |
| id_familia | INTEGER | ✗ | FK | - |
| id_falla | INTEGER | ✗ | FK | - |

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

- **id_familia** → [gen_familia](../general/gen_familia) - Referencia a gen_familia
- **id_falla** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_familia_falla`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_familia_falla] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_familia_falla] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
