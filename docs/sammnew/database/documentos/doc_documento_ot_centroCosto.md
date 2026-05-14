---
sidebar_position: 19
title: doc_documento_ot_centroCosto
description: Tabla para gestionar documento_ot_centroCosto en el sistema SAMM
tags: [database, doc]
---

# doc_documento_ot_centroCosto

## Descripción

Tabla para gestionar documento_ot_centroCosto en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| documento_ot_centroCosto | VARCHAR | ✓ | - | - | - |
| porcentaje | DECIMAL | ✓ | - | - | - |
| id_centroCosto | INTEGER | ✓ | FK | - | - |
| id_documento_ot | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_centroCosto** → [unknown_centroCosto](../general/unknown_centroCosto) - Referencia a unknown_centroCosto
- **id_documento_ot** → [documento_ot](../general/documento_ot) - Referencia a documento_ot

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_ot_centroCosto WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_ot_centroCosto
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
