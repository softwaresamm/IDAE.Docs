---
sidebar_position: 20
title: equ_prestamo_equipo
description: Tabla equ_prestamo_equipo del módulo Equipos
tags: [database, equ]
---

# equ_prestamo_equipo

## Descripción

Tabla equ_prestamo_equipo del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| prestamo_equipo | VARCHAR | ✗ | - | - |
| fechaDevolucion_ff | DATETIME | ✓ | - | - |
| id_prestamo | INTEGER | ✗ | FK | - |
| id_equipo | INTEGER | ✗ | FK | - |

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

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_prestamo** → [equ_prestamo](../equipos/equ_prestamo) - Referencia a equ_prestamo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_prestamo_equipo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_prestamo_equipo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_prestamo_equipo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
