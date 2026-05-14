---
sidebar_position: 34
title: cat_tipoCatalogo_listaPrecio
description: Tabla para gestionar tipoCatalogo_listaPrecio en el sistema SAMM
tags: [database, cat]
---

# cat_tipoCatalogo_listaPrecio

## Descripción

Tabla para gestionar tipoCatalogo_listaPrecio en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| tipoCatalogo_listaPrecio | VARCHAR | ✓ | - | - | - |
| porcentaje | DECIMAL | ✓ | - | - | - |
| id_tipoCatalogo | INTEGER | ✓ | FK | - | - |
| id_listaPrecio | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_tipoCatalogo** → [unknown_tipoCatalogo](../general/unknown_tipoCatalogo) - Referencia a unknown_tipoCatalogo
- **id_listaPrecio** → [unknown_listaPrecio](../general/unknown_listaPrecio) - Referencia a unknown_listaPrecio

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_tipoCatalogo_listaPrecio WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_tipoCatalogo_listaPrecio
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
