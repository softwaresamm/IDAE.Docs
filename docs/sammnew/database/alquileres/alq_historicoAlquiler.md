---
sidebar_position: 3
title: alq_historicoAlquiler
description: Tabla alq_historicoAlquiler del módulo Alquileres
tags: [database, alq]
---

# alq_historicoAlquiler

## Descripción

Tabla alq_historicoAlquiler del módulo Alquileres.

**Módulo**: Alquileres  
**Prefijo**: `alq_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| historicoAlquiler | VARCHAR | ✗ | - | - |
| historicoAlquiler_codigo | VARCHAR | ✓ | - | - |
| fechaEstado | DATETIME | ✗ | - | - |
| id_equipo | INTEGER | ✓ | FK | - |
| id_estadoEquipo | INTEGER | ✓ | FK | - |
| id_documento | INTEGER | ✓ | FK | - |

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

- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_estadoEquipo** → [equ_estadoEquipo](../equipos/equ_estadoEquipo) - Referencia a equ_estadoEquipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Alquileres
- Nombre real en base de datos: `alq_historicoAlquiler`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [alq_historicoAlquiler] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [alq_historicoAlquiler] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
