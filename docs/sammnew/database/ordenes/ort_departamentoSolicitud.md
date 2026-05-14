---
sidebar_position: 2
title: ort_departamentoSolicitud
description: Tabla ort_departamentoSolicitud del módulo Órdenes de Trabajo
tags: [database, ort]
---

# ort_departamentoSolicitud

## Descripción

Tabla ort_departamentoSolicitud del módulo Órdenes de Trabajo.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| departamentoSolicitud | VARCHAR | ✗ | - | - |
| departamentoSolicitud_codigo | VARCHAR | ✓ | - | - |
| recibeSolicitudes | BIT | ✗ | - | - |

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

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Nombre real en base de datos: `ort_departamentoSolicitud`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ort_departamentoSolicitud] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ort_departamentoSolicitud] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
