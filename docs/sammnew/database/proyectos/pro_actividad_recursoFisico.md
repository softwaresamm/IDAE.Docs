---
sidebar_position: 9
title: pro_actividad_recursoFisico
description: Tabla para gestionar actividad_recursoFisico en el sistema SAMM
tags: [database, pro]
---

# pro_actividad_recursoFisico

## Descripción

Tabla para gestionar actividad_recursoFisico en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| actividad_recursoFisico | VARCHAR | ✓ | - | - | - |
| duracion | VARCHAR | ✓ | - | - | - |
| cantidad | INTEGER | ✓ | - | - | - |
| id_recursoFisico | INTEGER | ✓ | FK | - | - |
| id_actividad | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_recursoFisico** → [unknown_recursoFisico](../general/unknown_recursoFisico) - Referencia a unknown_recursoFisico
- **id_actividad** → [unknown_actividad](../general/unknown_actividad) - Referencia a unknown_actividad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_actividad_recursoFisico WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_actividad_recursoFisico
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
