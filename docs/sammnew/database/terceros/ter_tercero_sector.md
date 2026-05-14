---
sidebar_position: 13
title: ter_tercero_sector
description: Tabla para gestionar tercero_sector en el sistema SAMM
tags: [database, ter]
---

# ter_tercero_sector

## Descripción

Tabla para gestionar tercero_sector en el sistema SAMM.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| tercero_sector | VARCHAR | ✓ | - | - | - |
| id_tercero | INTEGER | ✓ | FK | - | - |
| id_sector | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_sector** → [unknown_sector](../general/unknown_sector) - Referencia a unknown_sector

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ter_tercero_sector WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ter_tercero_sector
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
