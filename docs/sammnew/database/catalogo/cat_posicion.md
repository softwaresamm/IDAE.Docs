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

- **id_catalogo_equipo_equipo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_catalogo_equipo_componente** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_dimension_x** → [cat_dimension](../catalogo/cat_dimension) - Referencia a cat_dimension
- **id_dimension_y** → [cat_dimension](../catalogo/cat_dimension) - Referencia a cat_dimension
- **id_dimension_z** → [cat_dimension](../catalogo/cat_dimension) - Referencia a cat_dimension

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
