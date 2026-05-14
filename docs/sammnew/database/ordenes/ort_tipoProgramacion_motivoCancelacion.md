---
sidebar_position: 10
title: ort_tipoProgramacion_motivoCancelacion
description: Tabla para gestionar tipoProgramacion_motivoCancelacion en el sistema SAMM
tags: [database, ort]
---

# ort_tipoProgramacion_motivoCancelacion

## Descripción

Tabla para gestionar tipoProgramacion_motivoCancelacion en el sistema SAMM.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| tipoProgramacion_motivoCancelacion | VARCHAR | ✓ | - | - | - |
| id_tipoProgramacion | INTEGER | ✓ | FK | - | - |
| id_motivoCancelacion | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_tipoProgramacion** → [unknown_tipoProgramacion](../general/unknown_tipoProgramacion) - Referencia a unknown_tipoProgramacion
- **id_motivoCancelacion** → [unknown_motivoCancelacion](../general/unknown_motivoCancelacion) - Referencia a unknown_motivoCancelacion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ort_tipoProgramacion_motivoCancelacion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ort_tipoProgramacion_motivoCancelacion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
