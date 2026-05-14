---
sidebar_position: 8
title: ort_reporteTecnico_ot
description: Tabla para gestionar reporteTecnico_ot en el sistema SAMM
tags: [database, ort]
---

# ort_reporteTecnico_ot

## Descripción

Tabla para gestionar reporteTecnico_ot en el sistema SAMM.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| id_reporteTecnico | INTEGER | ✓ | FK | - | - |
| id_documento_ot | INTEGER | ✓ | FK | - | - |
| observaciones | VARCHAR | ✓ | - | - | - |

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

- **id_reporteTecnico** → [unknown_reporteTecnico](../general/unknown_reporteTecnico) - Referencia a unknown_reporteTecnico
- **id_documento_ot** → [documento_ot](../general/documento_ot) - Referencia a documento_ot

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ort_reporteTecnico_ot WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ort_reporteTecnico_ot
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
