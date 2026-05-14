---
sidebar_position: 16
title: cat_detalleTempario
description: Tabla cat_detalleTempario del módulo Catálogo
tags: [database, cat]
---

# cat_detalleTempario

## Descripción

Tabla cat_detalleTempario del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| detalleTempario | VARCHAR | ✗ | - | - |
| detalleTempario_codigo | VARCHAR | ✓ | - | - |
| cantidadEstandar | FLOAT | ✗ | - | - |
| orden | INTEGER | ✗ | - | - |
| cantidadTropicalizada | FLOAT | ✗ | - | - |
| id_catalogo | INTEGER | ✗ | FK | - |
| id_catalogo.tempario | INTEGER | ✗ | FK | - |
| id_pruebaCheckList | INTEGER | ✗ | FK | - |
| id_sistema | INTEGER | ✗ | FK | - |
| id_detalleTempario_padre | INTEGER | ✗ | FK | - |

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

- **id_catalogo.tempario** → [cat_catalogo.tempario](../catalogo/cat_catalogo_tempario) - Referencia a cat_catalogo.tempario
- **id_detalleTempario_padre** → [cat_detalleTempario](../catalogo/cat_detalleTempario) - Referencia a cat_detalleTempario
- **id_pruebaCheckList** → [cat_pruebaCheckList](../catalogo/cat_pruebaCheckList) - Referencia a cat_pruebaCheckList
- **id_sistema** → [cat_sistema](../catalogo/cat_sistema) - Referencia a cat_sistema
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_detalleTempario`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_detalleTempario] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_detalleTempario] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
