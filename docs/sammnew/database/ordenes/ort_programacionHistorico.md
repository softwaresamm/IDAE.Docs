---
sidebar_position: 5
title: ort_programacionHistorico
description: Tabla ort_programacionHistorico del módulo Órdenes de Trabajo
tags: [database, ort]
---

# ort_programacionHistorico

## Descripción

Tabla ort_programacionHistorico del módulo Órdenes de Trabajo.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| programacionHistorico | VARCHAR | ✗ | - | - |
| programacionHistorico_codigo | VARCHAR | ✓ | - | - |
| id_programacion | INTEGER | ✗ | FK | - |
| id_motivo | INTEGER | ✗ | FK | - |
| id_usuario_actual | INTEGER | ✗ | FK | - |
| id_usuario_programado | INTEGER | ✗ | FK | - |
| fecha_programacion | DATETIME | ✓ | - | - |
| duracion | FLOAT | ✓ | - | - |
| fecha_nueva_programacion | DATETIME | ✓ | - | - |
| comentario | VARCHAR | ✓ | - | - |

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

- **id_usuario_actual** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_usuario_programado** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_programacion** → [ort_programacion](../ordenes/ort_programacion) - Referencia a ort_programacion
- **id_motivo** → [ort_motivoCancelacion](../ordenes/ort_motivoCancelacion) - Referencia a ort_motivoCancelacion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Nombre real en base de datos: `ort_programacionHistorico`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ort_programacionHistorico] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ort_programacionHistorico] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
