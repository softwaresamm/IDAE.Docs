---
sidebar_position: 5
title: gui_detalleBloqueHome
description: Tabla para gestionar detalleBloqueHome en el sistema SAMM
tags: [database, gui]
---

# gui_detalleBloqueHome

## Descripción

Tabla para gestionar detalleBloqueHome en el sistema SAMM.

**Módulo**: Interfaz  
**Prefijo**: `gui_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| detalleBloqueHome | VARCHAR | ✓ | - | - | - |
| detalleBloqueHome_codigo | VARCHAR | ✓ | - | - | - |
| id_bloqueHome | INTEGER | ✓ | FK | - | - |
| tipoCampo | INTEGER | ✓ | - | - | - |
| orden | INTEGER | ✓ | - | - | - |
| tipoBloqueHome | INTEGER | ✓ | - | - | - |
| estrategiaFecha | INTEGER | ✓ | - | - | - |
| itemsTab | INTEGER | ✓ | - | - | - |
| posicionTab | INTEGER | ✓ | - | - | - |
| ordenResultados | INTEGER | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_bloqueHome** → [unknown_bloqueHome](../general/unknown_bloqueHome) - Referencia a unknown_bloqueHome

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Interfaz
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gui_detalleBloqueHome WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gui_detalleBloqueHome
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
