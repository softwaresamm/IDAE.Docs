---
sidebar_position: 38
title: cat_versionEquipo_detalleTempario
description: Tabla cat_versionEquipo_detalleTempario del módulo Catálogo
tags: [database, cat]
---

# cat_versionEquipo_detalleTempario

## Descripción

Tabla cat_versionEquipo_detalleTempario del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| versionEquipo_detalleTempario | VARCHAR | ✗ | - | - |
| id_detalleTempario | INTEGER | ✗ | FK | - |
| id_versionEquipo | INTEGER | ✗ | FK | - |

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

- **id_detalleTempario** → [cat_detalleTempario](../catalogo/cat_detalleTempario) - Referencia a cat_detalleTempario
- **id_versionEquipo** → [cat_versionEquipo](../catalogo/cat_versionEquipo) - Referencia a cat_versionEquipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_versionEquipo_detalleTempario`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_versionEquipo_detalleTempario] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_versionEquipo_detalleTempario] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
