---
sidebar_position: 28
title: cat_soporteActividad
description: Tabla para gestionar soporteActividad en el sistema SAMM
tags: [database, cat]
---

# cat_soporteActividad

## Descripción

Tabla para gestionar soporteActividad en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| soporteActividad | VARCHAR | ✓ | - | - | - |
| soporteActividad_codigo | VARCHAR | ✓ | - | - | - |
| duracion | DECIMAL | ✓ | - | - | - |
| id_detalleTempario | INTEGER | ✓ | FK | - | - |
| id_cargo | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_detalleTempario** → [unknown_detalleTempario](../general/unknown_detalleTempario) - Referencia a unknown_detalleTempario
- **id_cargo** → [unknown_cargo](../general/unknown_cargo) - Referencia a unknown_cargo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_soporteActividad WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_soporteActividad
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
