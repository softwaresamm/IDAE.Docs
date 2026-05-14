---
sidebar_position: 14
title: cat_catalogo_listaPrecio
description: Tabla cat_catalogo_listaPrecio del módulo Catálogo
tags: [database, cat]
---

# cat_catalogo_listaPrecio

## Descripción

Tabla cat_catalogo_listaPrecio del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| catalogo_listaPrecio | VARCHAR | ✗ | - | - |
| PrecioVenta | MONEY | ✗ | - | - |
| id_catalogo | INTEGER | ✗ | FK | - |
| id_listaPrecio | INTEGER | ✗ | FK | - |
| porcDto | FLOAT | ✓ | - | - |

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

- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_listaPrecio** → [cat_listaPrecio](../catalogo/cat_listaPrecio) - Referencia a cat_listaPrecio

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_catalogo_listaPrecio`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_catalogo_listaPrecio] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_catalogo_listaPrecio] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
