---
sidebar_position: 3
title: cat_catalogo
description: Tabla cat_catalogo del módulo Catálogo
tags: [database, cat]
---

# cat_catalogo

## Descripción

Tabla cat_catalogo del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| catalogo | VARCHAR | ✗ | - | - |
| catalogo_codigo | VARCHAR | ✓ | - | - |
| codigoInventario | VARCHAR | ✗ | - | - |
| precioVenta | MONEY | ✓ | - | - |
| tiempoConsecucion | INTEGER | ✓ | - | - |
| esNacional | BIT | ✗ | - | - |
| id_familia | INTEGER | ✗ | FK | - |
| id_subtipoCatalogo | INTEGER | ✗ | FK | - |
| id_unidad | INTEGER | ✗ | FK | - |
| id_impuesto | INTEGER | ✗ | FK | - |
| descripcion | VARCHAR | ✗ | - | - |
| bloquearCostear | BIT | ✗ | - | - |

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

- **id_subtipoCatalogo** → [cat_subtipoCatalogo](../catalogo/cat_subtipoCatalogo) - Referencia a cat_subtipoCatalogo
- **id_familia** → [gen_familia](../general/gen_familia) - Referencia a gen_familia
- **id_impuesto** → [gen_impuesto](../general/gen_impuesto) - Referencia a gen_impuesto
- **id_unidad** → [gen_unidad](../general/gen_unidad) - Referencia a gen_unidad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_catalogo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_catalogo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_catalogo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
