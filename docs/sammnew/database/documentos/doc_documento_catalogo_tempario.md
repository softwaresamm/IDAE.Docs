---
sidebar_position: 8
title: doc_documento_catalogo_tempario
description: Tabla para gestionar documento_catalogo_tempario en el sistema SAMM
tags: [database, doc]
---

# doc_documento_catalogo_tempario

## Descripción

Tabla para gestionar documento_catalogo_tempario en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| documento_catalogo_tempario | VARCHAR | ✓ | - | - | - |
| id_catalogo_tempario | INTEGER | ✓ | FK | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |
| id_itemDocumento | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_catalogo_tempario** → [catalogo_tempario](../general/catalogo_tempario) - Referencia a catalogo_tempario
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_catalogo_tempario WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_catalogo_tempario
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
