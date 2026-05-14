---
sidebar_position: 20
title: cat_posicion
description: Tabla para gestionar posicion en el sistema SAMM
tags: [database, cat]
---

# cat_posicion

## Descripción

Tabla para gestionar posicion en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| posicion | VARCHAR | ✓ | - | - | - |
| posicion_codigo | VARCHAR | ✓ | - | - | - |
| id_catalogo_equipo_equipo | INTEGER | ✓ | FK | - | - |
| id_catalogo_equipo_componente | INTEGER | ✓ | FK | - | - |
| id_dimension_x | INTEGER | ✓ | FK | - | - |
| id_dimension_y | INTEGER | ✓ | FK | - | - |
| id_dimension_z | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_catalogo_equipo_equipo** → [catalogo_equipo_equipo](../general/catalogo_equipo_equipo) - Referencia a catalogo_equipo_equipo
- **id_catalogo_equipo_componente** → [catalogo_equipo_componente](../general/catalogo_equipo_componente) - Referencia a catalogo_equipo_componente
- **id_dimension_x** → [dimension_x](../general/dimension_x) - Referencia a dimension_x
- **id_dimension_y** → [dimension_y](../general/dimension_y) - Referencia a dimension_y
- **id_dimension_z** → [dimension_z](../general/dimension_z) - Referencia a dimension_z

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_posicion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_posicion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
