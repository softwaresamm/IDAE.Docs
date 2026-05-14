---
sidebar_position: 13
title: equ_falla
description: Tabla para gestionar falla en el sistema SAMM
tags: [database, equ]
---

# equ_falla

## Descripción

Tabla para gestionar falla en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| falla | VARCHAR | ✓ | - | - | - |
| falla_codigo | VARCHAR | ✓ | - | - | - |
| procedimiento | VARCHAR | ✓ | - | - | - |
| id_tipoFalla | INTEGER | ✓ | FK | - | - |
| id_falla | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_tipoFalla** → [unknown_tipoFalla](../general/unknown_tipoFalla) - Referencia a unknown_tipoFalla
- **id_falla** → [unknown_falla](../general/unknown_falla) - Referencia a unknown_falla

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_falla WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_falla
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
