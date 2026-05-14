---
sidebar_position: 46
title: doc_pendienteDocumento_doc_itemDocumento
description: Tabla para gestionar pendienteDocumento_doc_itemDocumento en el sistema SAMM
tags: [database, doc]
---

# doc_pendienteDocumento_doc_itemDocumento

## Descripción

Tabla para gestionar pendienteDocumento_doc_itemDocumento en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| pendienteDocumento_doc_itemDocumento | VARCHAR | ✓ | - | - | - |
| id_pendienteDocumento | INTEGER | ✓ | FK | - | - |
| id_itemDocumento | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_pendienteDocumento** → [unknown_pendienteDocumento](../general/unknown_pendienteDocumento) - Referencia a unknown_pendienteDocumento
- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_pendienteDocumento_doc_itemDocumento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_pendienteDocumento_doc_itemDocumento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
