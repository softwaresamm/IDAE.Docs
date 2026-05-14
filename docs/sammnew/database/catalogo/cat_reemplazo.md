---
sidebar_position: 23
title: cat_reemplazo
description: Tabla cat_reemplazo del módulo Catálogo
tags: [database, cat]
---

# cat_reemplazo

## Descripción

Tabla cat_reemplazo del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| reemplazo | VARCHAR | ✗ | - | - |
| reemplazo_codigo | VARCHAR | ✓ | - | - |
| id_tipoReemplazo | INTEGER | ✗ | FK | - |
| id_catalogo.repuesto | INTEGER | ✗ | FK | - |
| id_catalogo.repuesto_1 | INTEGER | ✗ | FK | - |

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

- **id_catalogo.repuesto** → [cat_catalogo.repuesto](../catalogo/cat_catalogo_repuesto) - Referencia a cat_catalogo.repuesto
- **id_catalogo.repuesto_1** → [cat_catalogo.repuesto](../catalogo/cat_catalogo_repuesto) - Referencia a cat_catalogo.repuesto
- **id_tipoReemplazo** → [cat_tipoReemplazo](../catalogo/cat_tipoReemplazo) - Referencia a cat_tipoReemplazo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_reemplazo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_reemplazo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_reemplazo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
