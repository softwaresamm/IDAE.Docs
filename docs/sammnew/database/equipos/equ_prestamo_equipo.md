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

- **id_prestamo** → [equ_prestamo](../equipos/equ_prestamo) - Referencia a equ_prestamo
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
