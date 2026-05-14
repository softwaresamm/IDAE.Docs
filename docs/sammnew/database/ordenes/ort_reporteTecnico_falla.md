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

Todas las tablas incluyen estos campos:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **id_usuario_creo**: Usuario que creó el registro
- **id_usuario_modifico**: Usuario que modificó el registro
- **fechaCreacion**: Fecha y hora de creación
- **fechaModificacion**: Fecha y hora de última modificación
- **uid**: Control multiempresa (User ID)
- **eid**: Control multiempresa (Entity ID)

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_reporteTecnico** → [ort_reporteTecnico](../ordenes/ort_reporteTecnico) - Referencia a ort_reporteTecnico
- **id_falla** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla_causa** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla_efecto** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla

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
