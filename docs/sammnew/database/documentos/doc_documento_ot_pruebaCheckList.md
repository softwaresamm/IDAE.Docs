---
sidebar_position: 20
title: doc_documento_ot_pruebaCheckList
description: Tabla para gestionar documento_ot_pruebaCheckList en el sistema SAMM
tags: [database, doc]
---

# doc_documento_ot_pruebaCheckList

## Descripción

Tabla para gestionar documento_ot_pruebaCheckList en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| documento_ot_pruebaCheckList | VARCHAR | ✓ | - | - | - |
| id_documento_ot | INTEGER | ✓ | FK | - | - |
| id_pruebaCheckList | INTEGER | ✓ | FK | - | - |

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

- **id_documento_ot** → [documento_ot](../general/documento_ot) - Referencia a documento_ot
- **id_pruebaCheckList** → [unknown_pruebaCheckList](../general/unknown_pruebaCheckList) - Referencia a unknown_pruebaCheckList

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_ot_pruebaCheckList WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_ot_pruebaCheckList
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
