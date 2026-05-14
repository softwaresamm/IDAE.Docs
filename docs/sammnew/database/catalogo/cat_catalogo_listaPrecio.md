---
sidebar_position: 10
title: cat_catalogo_listaPrecio
description: Tabla para gestionar catalogo_listaPrecio en el sistema SAMM
tags: [database, cat]
---

# cat_catalogo_listaPrecio

## Descripción

Tabla para gestionar catalogo_listaPrecio en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| catalogo_listaPrecio | VARCHAR | ✓ | - | - | - |
| PrecioVenta | DECIMAL | ✓ | - | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |
| id_listaPrecio | INTEGER | ✓ | FK | - | - |
| porcDto | DECIMAL | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_listaPrecio** → [unknown_listaPrecio](../general/unknown_listaPrecio) - Referencia a unknown_listaPrecio

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_catalogo_listaPrecio WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_catalogo_listaPrecio
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
