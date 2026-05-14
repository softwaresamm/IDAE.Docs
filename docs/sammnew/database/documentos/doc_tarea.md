---
sidebar_position: 54
title: doc_tarea
description: Tabla para gestionar tarea en el sistema SAMM
tags: [database, doc]
---

# doc_tarea

## Descripción

Tabla para gestionar tarea en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| tarea | VARCHAR | ✓ | - | - | - |
| tarea_codigo | VARCHAR | ✓ | - | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |
| id_cargo | INTEGER | ✓ | FK | - | - |
| fechaPlaneada_fh | DATETIME | ✓ | - | - | - |
| porcentajeAvance | INTEGER | ✓ | - | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_cargo** → [unknown_cargo](../general/unknown_cargo) - Referencia a unknown_cargo
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_tarea WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_tarea
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
