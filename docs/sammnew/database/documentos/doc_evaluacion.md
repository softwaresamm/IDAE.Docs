---
sidebar_position: 36
title: doc_evaluacion
description: Tabla para gestionar evaluacion en el sistema SAMM
tags: [database, doc]
---

# doc_evaluacion

## Descripción

Tabla para gestionar evaluacion en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| evaluacion | VARCHAR | ✓ | - | - | - |
| evaluacion_codigo | VARCHAR | ✓ | - | - | - |
| activa | BIT | ✓ | - | - | - |
| id_subTipodocumento | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_subTipodocumento** → [unknown_subTipodocumento](../general/unknown_subTipodocumento) - Referencia a unknown_subTipodocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_evaluacion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_evaluacion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
