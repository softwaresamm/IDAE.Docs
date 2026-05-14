---
sidebar_position: 5
title: cat_catalogo_bodega
description: Tabla para gestionar catalogo_bodega en el sistema SAMM
tags: [database, cat]
---

# cat_catalogo_bodega

## Descripción

Tabla para gestionar catalogo_bodega en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| catalogo_bodega | VARCHAR | ✓ | - | - | - |
| disponible | DECIMAL | ✓ | - | - | - |
| existencia | DECIMAL | ✓ | - | - | - |
| reservado | DECIMAL | ✓ | - | - | - |
| existenciaMinima | DECIMAL | ✓ | - | - | - |
| enOrdenes | DECIMAL | ✓ | - | - | - |
| localizacion | VARCHAR | ✓ | - | - | - |
| costo | DECIMAL | ✓ | - | - | - |
| existenciaMaxima | DECIMAL | ✓ | - | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |
| id_bodega | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_bodega** → [gen_bodega](../general/gen_bodega) - Referencia a gen_bodega

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_catalogo_bodega WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_catalogo_bodega
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
