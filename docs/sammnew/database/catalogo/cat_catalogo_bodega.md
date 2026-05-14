---
sidebar_position: 13
title: cat_catalogo_bodega
description: Tabla cat_catalogo_bodega del módulo Catálogo
tags: [database, cat]
---

# cat_catalogo_bodega

## Descripción

Tabla cat_catalogo_bodega del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| catalogo_bodega | VARCHAR | ✗ | - | - |
| disponible | FLOAT | ✗ | - | - |
| existencia | FLOAT | ✗ | - | - |
| reservado | FLOAT | ✗ | - | - |
| existenciaMinima | FLOAT | ✗ | - | - |
| enOrdenes | FLOAT | ✓ | - | - |
| localizacion | VARCHAR | ✓ | - | - |
| costo | MONEY | ✗ | - | - |
| existenciaMaxima | FLOAT | ✓ | - | - |
| id_catalogo | INTEGER | ✗ | FK | - |
| id_bodega | INTEGER | ✗ | FK | - |

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

- **id_bodega** → [gen_bodega](../general/gen_bodega) - Referencia a gen_bodega
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_catalogo_bodega`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_catalogo_bodega] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_catalogo_bodega] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
