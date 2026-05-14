---
sidebar_position: 19
title: equ_prestamo
description: Tabla equ_prestamo del módulo Equipos
tags: [database, equ]
---

# equ_prestamo

## Descripción

Tabla equ_prestamo del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| prestamo | VARCHAR | ✗ | - | - |
| prestamo_codigo | VARCHAR | ✓ | - | - |
| fechaPrestamo_ff | DATETIME | ✓ | - | - |
| fechaCompromiso_ff | DATETIME | ✓ | - | - |
| notas | VARCHAR | ✓ | - | - |
| id_estadoPrestamo | INTEGER | ✗ | FK | - |
| id_usuario_entrego | INTEGER | ✗ | FK | - |

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

- **id_estadoPrestamo** → [equ_estadoPrestamo](../equipos/equ_estadoPrestamo) - Referencia a equ_estadoPrestamo
- **id_usuario_entrego** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_prestamo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_prestamo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_prestamo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
