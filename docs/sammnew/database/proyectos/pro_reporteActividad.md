---
sidebar_position: 20
title: pro_reporteActividad
description: Tabla pro_reporteActividad del módulo Proyectos
tags: [database, pro]
---

# pro_reporteActividad

## Descripción

Tabla pro_reporteActividad del módulo Proyectos.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| reporteActividad | VARCHAR | ✗ | - | - |
| reporteActividad_codigo | VARCHAR | ✓ | - | - |
| id_actividad | INTEGER | ✗ | FK | - |
| id_SesionActividad | INTEGER | ✗ | FK | - |
| id_ejecutores | INTEGER | ✗ | FK | - |
| id_sucursal | INTEGER | ✗ | FK | - |
| fecha_inicio | DATETIME | ✓ | - | - |
| duracion | FLOAT | ✓ | - | - |
| texto | VARCHAR | ✓ | - | - |
| porcentaje_avance | FLOAT | ✓ | - | - |

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

- **id_ejecutores** → [pro_ejecutores](../proyectos/pro_ejecutores) - Referencia a pro_ejecutores
- **id_actividad** → [pro_actividad](../proyectos/pro_actividad) - Referencia a pro_actividad
- **id_SesionActividad** → [pro_SesionActividad](../proyectos/pro_SesionActividad) - Referencia a pro_SesionActividad
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Nombre real en base de datos: `pro_reporteActividad`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [pro_reporteActividad] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [pro_reporteActividad] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
