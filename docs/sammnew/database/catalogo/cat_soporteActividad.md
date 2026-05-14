---
sidebar_position: 28
title: cat_soporteActividad
description: Tabla cat_soporteActividad del módulo Catálogo
tags: [database, cat]
---

# cat_soporteActividad

## Descripción

Tabla cat_soporteActividad del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| soporteActividad | VARCHAR | ✗ | - | - |
| soporteActividad_codigo | VARCHAR | ✓ | - | - |
| duracion | FLOAT | ✗ | - | - |
| id_detalleTempario | INTEGER | ✗ | FK | - |
| id_cargo | INTEGER | ✗ | FK | - |

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
- **id_cargo** → [seg_cargo](../seguridad/seg_cargo) - Referencia a seg_cargo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_soporteActividad`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_soporteActividad] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_soporteActividad] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
