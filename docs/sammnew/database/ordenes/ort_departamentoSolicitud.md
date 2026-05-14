---
sidebar_position: 2
title: ort_departamentoSolicitud
description: Tabla para gestionar departamentoSolicitud en el sistema SAMM
tags: [database, ort]
---

# ort_departamentoSolicitud

## Descripción

Tabla para gestionar departamentoSolicitud en el sistema SAMM.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| departamentoSolicitud | VARCHAR | ✓ | - | - | - |
| departamentoSolicitud_codigo | VARCHAR | ✓ | - | - | - |
| recibeSolicitudes | BIT | ✓ | - | - | - |

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

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ort_departamentoSolicitud WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ort_departamentoSolicitud
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
