---
sidebar_position: 9
title: cnt_corrimientoVisitaFija
description: Tabla para gestionar corrimientoVisitaFija en el sistema SAMM
tags: [database, cnt]
---

# cnt_corrimientoVisitaFija

## Descripción

Tabla para gestionar corrimientoVisitaFija en el sistema SAMM.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| corrimientoVisitaFija | VARCHAR | ✓ | - | - | - |
| corrimientoVisitaFija_codigo | VARCHAR | ✓ | - | - | - |
| fechaOriginal_ff | DATE | ✓ | - | - | - |
| id_visitaFija | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_visitaFija** → [unknown_visitaFija](../general/unknown_visitaFija) - Referencia a unknown_visitaFija

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cnt_corrimientoVisitaFija WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cnt_corrimientoVisitaFija
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
