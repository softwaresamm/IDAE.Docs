---
sidebar_position: 7
title: ort_reporteTecnico_falla
description: Tabla para gestionar reporteTecnico_falla en el sistema SAMM
tags: [database, ort]
---

# ort_reporteTecnico_falla

## Descripción

Tabla para gestionar reporteTecnico_falla en el sistema SAMM.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| reporteTecnico_falla | VARCHAR | ✓ | - | - | - |
| id_reporteTecnico | INTEGER | ✓ | FK | - | - |
| id_falla | INTEGER | ✓ | FK | - | - |
| id_falla_causa | INTEGER | ✓ | FK | - | - |
| id_falla_efecto | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_reporteTecnico** → [unknown_reporteTecnico](../general/unknown_reporteTecnico) - Referencia a unknown_reporteTecnico
- **id_falla** → [unknown_falla](../general/unknown_falla) - Referencia a unknown_falla
- **id_falla_causa** → [falla_causa](../general/falla_causa) - Referencia a falla_causa
- **id_falla_efecto** → [falla_efecto](../general/falla_efecto) - Referencia a falla_efecto

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ort_reporteTecnico_falla WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ort_reporteTecnico_falla
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
