---
sidebar_position: 5
title: rep_opcionReporte
description: Tabla para gestionar opcionReporte en el sistema SAMM
tags: [database, rep]
---

# rep_opcionReporte

## Descripción

Tabla para gestionar opcionReporte en el sistema SAMM.

**Módulo**: Reportes  
**Prefijo**: `rep_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| opcionReporte | VARCHAR | ✓ | - | - | - |
| opcionReporte_codigo | VARCHAR | ✓ | - | - | - |
| id_reporte | INTEGER | ✓ | FK | - | - |
| defecto | BIT | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_reporte** → [unknown_reporte](../general/unknown_reporte) - Referencia a unknown_reporte

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Reportes
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM rep_opcionReporte WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM rep_opcionReporte
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
