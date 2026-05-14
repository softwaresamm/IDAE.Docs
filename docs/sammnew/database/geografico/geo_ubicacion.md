---
sidebar_position: 1
title: geo_ubicacion
description: Tabla geo_ubicacion del módulo Geográfico
tags: [database, geo]
---

# geo_ubicacion

## Descripción

Tabla geo_ubicacion del módulo Geográfico.

**Módulo**: Geográfico  
**Prefijo**: `geo_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| ubicacion | VARCHAR | ✓ | - | - |
| ubicacion_codigo | VARCHAR | ✓ | - | - |
| tabla | VARCHAR | ✓ | - | - |
| idObjeto | INTEGER | ✓ | - | - |
| longitud | FLOAT | ✓ | - | - |
| latitud | FLOAT | ✓ | - | - |
| fecha_fh | DATETIME | ✓ | - | - |

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

- Esta tabla forma parte del módulo Geográfico
- Nombre real en base de datos: `geo_ubicacion`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [geo_ubicacion] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [geo_ubicacion] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
