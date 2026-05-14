---
sidebar_position: 3
title: cat_catalogo
description: Tabla para gestionar catalogo en el sistema SAMM
tags: [database, cat]
---

# cat_catalogo

## Descripción

Tabla para gestionar catalogo en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| catalogo | VARCHAR | ✓ | - | - | - |
| catalogo_codigo | VARCHAR | ✓ | - | - | - |
| codigoInventario | VARCHAR | ✓ | - | - | - |
| precioVenta | DECIMAL | ✓ | - | - | - |
| tiempoConsecucion | INTEGER | ✓ | - | - | - |
| esNacional | BIT | ✓ | - | - | - |
| id_familia | INTEGER | ✓ | FK | - | - |
| id_subTipoCatalogo | INTEGER | ✓ | FK | - | - |
| id_unidad | INTEGER | ✓ | FK | - | - |
| id_impuesto | INTEGER | ✓ | FK | - | - |
| descripcion | VARCHAR | ✓ | - | - | - |
| bloquearCostear | BIT | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **id_usuario_creo**: Usuario que creó el registro
- **id_usuario_modifico**: Usuario que modificó el registro
- **fechaCreacion**: Fecha y hora de creación
- **fechaModificacion**: Fecha y hora de última modificación
- **uid**: Control multiempresa (User ID)
- **eid**: Control multiempresa (Entity ID)

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_familia** → [gen_familia](../general/gen_familia) - Referencia a gen_familia
- **id_unidad** → [gen_unidad](../general/gen_unidad) - Referencia a gen_unidad
- **id_impuesto** → [gen_impuesto](../general/gen_impuesto) - Referencia a gen_impuesto

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_catalogo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_catalogo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
