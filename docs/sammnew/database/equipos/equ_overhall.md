---
sidebar_position: 17
title: equ_overhall
description: Tabla para gestionar overhall en el sistema SAMM
tags: [database, equ]
---

# equ_overhall

## Descripción

Tabla para gestionar overhall en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| overhall | VARCHAR | ✓ | - | - | - |
| overhall_codigo | VARCHAR | ✓ | - | - | - |
| horometro | DECIMAL | ✓ | - | - | - |
| fecha_ff | DATE | ✓ | - | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_documento_ot | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_documento_ot** → [documento_ot](../general/documento_ot) - Referencia a documento_ot

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_overhall WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_overhall
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
