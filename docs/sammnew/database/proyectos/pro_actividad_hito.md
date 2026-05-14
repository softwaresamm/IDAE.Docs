---
sidebar_position: 7
title: pro_actividad_hito
description: Tabla para gestionar actividad_hito en el sistema SAMM
tags: [database, pro]
---

# pro_actividad_hito

## Descripción

Tabla para gestionar actividad_hito en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| actividad_hito | VARCHAR | ✓ | - | - | - |
| id_hito | INTEGER | ✓ | FK | - | - |
| id_actividad | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_hito** → [unknown_hito](../general/unknown_hito) - Referencia a unknown_hito
- **id_actividad** → [unknown_actividad](../general/unknown_actividad) - Referencia a unknown_actividad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_actividad_hito WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_actividad_hito
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
