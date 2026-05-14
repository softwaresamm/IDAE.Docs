---
sidebar_position: 31
title: cat_tarifaCatalogo
description: Tabla para gestionar tarifaCatalogo en el sistema SAMM
tags: [database, cat]
---

# cat_tarifaCatalogo

## Descripción

Tabla para gestionar tarifaCatalogo en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| tarifaCatalogo | VARCHAR | ✓ | - | - | - |
| tarifaCatalogo_codigo | VARCHAR | ✓ | - | - | - |
| id_catalogo_tarifa | INTEGER | ✓ | FK | - | - |
| id_catalogo_elemento | INTEGER | ✓ | FK | - | - |
| id_tipotarifa | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_catalogo_tarifa** → [catalogo_tarifa](../general/catalogo_tarifa) - Referencia a catalogo_tarifa
- **id_catalogo_elemento** → [catalogo_elemento](../general/catalogo_elemento) - Referencia a catalogo_elemento
- **id_tipotarifa** → [unknown_tipotarifa](../general/unknown_tipotarifa) - Referencia a unknown_tipotarifa

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_tarifaCatalogo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_tarifaCatalogo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
