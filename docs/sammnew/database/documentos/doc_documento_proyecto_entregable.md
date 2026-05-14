---
sidebar_position: 24
title: doc_documento_proyecto_entregable
description: Tabla para gestionar documento_proyecto_entregable en el sistema SAMM
tags: [database, doc]
---

# doc_documento_proyecto_entregable

## Descripción

Tabla para gestionar documento_proyecto_entregable en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| documento_proyecto_entregable | VARCHAR | ✓ | - | - | - |
| id_documento_proyecto | INTEGER | ✓ | FK | - | - |
| id_entregable | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_documento_proyecto** → [documento_proyecto](../general/documento_proyecto) - Referencia a documento_proyecto
- **id_entregable** → [unknown_entregable](../general/unknown_entregable) - Referencia a unknown_entregable

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_proyecto_entregable WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_proyecto_entregable
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
