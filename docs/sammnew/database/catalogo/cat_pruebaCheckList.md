---
sidebar_position: 21
title: cat_pruebaCheckList
description: Tabla cat_pruebaCheckList del módulo Catálogo
tags: [database, cat]
---

# cat_pruebaCheckList

## Descripción

Tabla cat_pruebaCheckList del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| pruebaCheckList | VARCHAR | ✗ | - | - |
| pruebaCheckList_codigo | VARCHAR | ✓ | - | - |
| activo | BIT | ✗ | - | - |

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

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_pruebaCheckList`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_pruebaCheckList] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_pruebaCheckList] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
