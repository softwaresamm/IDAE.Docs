---
sidebar_position: 12
title: pro_ejecutores_archivo
description: Tabla para gestionar ejecutores_archivo en el sistema SAMM
tags: [database, pro]
---

# pro_ejecutores_archivo

## Descripción

Tabla para gestionar ejecutores_archivo en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| ejecutor_archivo | VARCHAR | ✓ | - | - | - |
| revisado | BIT | ✓ | - | - | - |
| aprobado | BIT | ✓ | - | - | - |
| fecha_revision | VARCHAR | ✓ | - | - | - |
| fecha_aprobacion | VARCHAR | ✓ | - | - | - |
| id_archivo | INTEGER | ✓ | FK | - | - |
| id_ejecutores | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_archivo** → [unknown_archivo](../general/unknown_archivo) - Referencia a unknown_archivo
- **id_ejecutores** → [unknown_ejecutores](../general/unknown_ejecutores) - Referencia a unknown_ejecutores

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_ejecutores_archivo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_ejecutores_archivo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
