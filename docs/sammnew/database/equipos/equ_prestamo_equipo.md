---
sidebar_position: 20
title: equ_prestamo_equipo
description: Tabla para gestionar prestamo_equipo en el sistema SAMM
tags: [database, equ]
---

# equ_prestamo_equipo

## Descripción

Tabla para gestionar prestamo_equipo en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| prestamo_equipo | VARCHAR | ✓ | - | - | - |
| fechaDevolucion_ff | DATE | ✓ | - | - | - |
| id_prestamo | INTEGER | ✓ | FK | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_prestamo** → [unknown_prestamo](../general/unknown_prestamo) - Referencia a unknown_prestamo
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_prestamo_equipo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_prestamo_equipo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
