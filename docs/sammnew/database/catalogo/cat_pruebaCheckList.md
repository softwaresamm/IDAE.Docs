---
sidebar_position: 21
title: cat_pruebaCheckList
description: Tabla para gestionar pruebaCheckList en el sistema SAMM
tags: [database, cat]
---

# cat_pruebaCheckList

## Descripción

Tabla para gestionar pruebaCheckList en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| pruebaCheckList | VARCHAR | ✓ | - | - | - |
| pruebaCheckList_codigo | VARCHAR | ✓ | - | - | - |
| activo | BIT | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (foreign keys).*

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_pruebaCheckList WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_pruebaCheckList
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
