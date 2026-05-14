---
sidebar_position: 26
title: pro_SesionActividad
description: Tabla para gestionar SesionActividad en el sistema SAMM
tags: [database, pro]
---

# pro_SesionActividad

## Descripción

Tabla para gestionar SesionActividad en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| SesionActividad | VARCHAR | ✓ | - | - | - |
| SesionActividad_codigo | VARCHAR | ✓ | - | - | - |
| id_actividad | INTEGER | ✓ | FK | - | - |
| id_ejecutores | INTEGER | ✓ | FK | - | - |
| id_GrupoSesion | INTEGER | ✓ | FK | - | - |
| duracion | DECIMAL | ✓ | - | - | - |
| descripcion | VARCHAR | ✓ | - | - | - |
| fecha_inicio | DATETIME | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_actividad** → [unknown_actividad](../general/unknown_actividad) - Referencia a unknown_actividad
- **id_ejecutores** → [unknown_ejecutores](../general/unknown_ejecutores) - Referencia a unknown_ejecutores
- **id_GrupoSesion** → [unknown_GrupoSesion](../general/unknown_GrupoSesion) - Referencia a unknown_GrupoSesion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_SesionActividad WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_SesionActividad
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
