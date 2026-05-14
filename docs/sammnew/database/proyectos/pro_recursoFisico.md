---
sidebar_position: 22
title: pro_recursoFisico
description: Tabla para gestionar recursoFisico en el sistema SAMM
tags: [database, pro]
---

# pro_recursoFisico

## Descripción

Tabla para gestionar recursoFisico en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| recursoFisico | VARCHAR | ✓ | - | - | - |
| recursoFisico_codigo | VARCHAR | ✓ | - | - | - |
| costo | DECIMAL | ✓ | - | - | - |
| unidadTiempo | VARCHAR | ✓ | - | - | - |
| esPropio | BIT | ✓ | - | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_recursoFisico WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_recursoFisico
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
