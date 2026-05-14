---
sidebar_position: 6
title: cat_catalogo_equipo
description: Tabla para gestionar catalogo_equipo en el sistema SAMM
tags: [database, cat]
---

# cat_catalogo_equipo

## Descripción

Tabla para gestionar catalogo_equipo en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| catalogo_equipo | VARCHAR | ✓ | - | - | - |
| garantiaMeses | INTEGER | ✓ | - | - | - |
| garantiaHoras | INTEGER | ✓ | - | - | - |
| manejaHorometro | BIT | ✓ | - | - | - |
| id_marca | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_marca** → [unknown_marca](../general/unknown_marca) - Referencia a unknown_marca

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_catalogo_equipo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_catalogo_equipo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
