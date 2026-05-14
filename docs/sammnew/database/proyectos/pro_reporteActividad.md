---
sidebar_position: 23
title: pro_reporteActividad
description: Tabla para gestionar reporteActividad en el sistema SAMM
tags: [database, pro]
---

# pro_reporteActividad

## Descripción

Tabla para gestionar reporteActividad en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| reporteActividad | VARCHAR | ✓ | - | - | - |
| reporteActividad_codigo | VARCHAR | ✓ | - | - | - |
| id_actividad | INTEGER | ✓ | FK | - | - |
| id_SesionActividad | INTEGER | ✓ | FK | - | - |
| id_ejecutores | INTEGER | ✓ | FK | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |
| fecha_inicio | DATETIME | ✓ | - | - | - |
| duracion | DECIMAL | ✓ | - | - | - |
| texto | VARCHAR | ✓ | - | - | - |
| porcentaje_avance | DECIMAL | ✓ | - | - | - |

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

- **id_actividad** → [unknown_actividad](../general/unknown_actividad) - Referencia a unknown_actividad
- **id_SesionActividad** → [unknown_SesionActividad](../general/unknown_SesionActividad) - Referencia a unknown_SesionActividad
- **id_ejecutores** → [unknown_ejecutores](../general/unknown_ejecutores) - Referencia a unknown_ejecutores
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_reporteActividad WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_reporteActividad
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
