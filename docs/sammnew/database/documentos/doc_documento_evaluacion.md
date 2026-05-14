---
sidebar_position: 14
title: doc_documento_evaluacion
description: Tabla para gestionar documento_evaluacion en el sistema SAMM
tags: [database, doc]
---

# doc_documento_evaluacion

## Descripción

Tabla para gestionar documento_evaluacion en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| documento_evaluacion | VARCHAR | ✓ | - | - | - |
| personaEncuestada | VARCHAR | ✓ | - | - | - |
| fechaEncuesta_ff | DATE | ✓ | - | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |
| id_evaluacion | INTEGER | ✓ | FK | - | - |
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

- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_evaluacion** → [doc_evaluacion](../documentos/doc_evaluacion) - Referencia a doc_evaluacion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_evaluacion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_evaluacion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
