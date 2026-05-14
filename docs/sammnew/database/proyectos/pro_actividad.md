---
sidebar_position: 1
title: pro_actividad
description: Tabla para gestionar actividad en el sistema SAMM
tags: [database, pro]
---

# pro_actividad

## Descripción

Tabla para gestionar actividad en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| actividad | VARCHAR | ✓ | - | - | - |
| actividad_codigo | VARCHAR | ✓ | - | - | - |
| descripcionDetallada | VARCHAR | ✓ | - | - | - |
| fechainicioPlaneada | DATETIME | ✓ | - | - | - |
| fechainicioProyectada | DATETIME | ✓ | - | - | - |
| fechaInicioReal | DATETIME | ✓ | - | - | - |
| duracion | DECIMAL | ✓ | - | - | - |
| fechaTerminacionPlaneada | DATETIME | ✓ | - | - | - |
| fechaTerminacionProyectada | DATETIME | ✓ | - | - | - |
| fechaTerminacionReal | DATETIME | ✓ | - | - | - |

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

*Esta tabla no tiene relaciones salientes (foreign keys).*

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_actividad WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_actividad
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
