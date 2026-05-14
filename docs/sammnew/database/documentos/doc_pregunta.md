---
sidebar_position: 47
title: doc_pregunta
description: Tabla para gestionar pregunta en el sistema SAMM
tags: [database, doc]
---

# doc_pregunta

## Descripción

Tabla para gestionar pregunta en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| pregunta | VARCHAR | ✓ | - | - | - |
| pregunta_codigo | VARCHAR | ✓ | - | - | - |
| orden | INTEGER | ✓ | - | - | - |
| activa | BIT | ✓ | - | - | - |
| valor | INTEGER | ✓ | - | - | - |
| id_evaluacion | INTEGER | ✓ | FK | - | - |

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

- **id_evaluacion** → [unknown_evaluacion](../general/unknown_evaluacion) - Referencia a unknown_evaluacion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_pregunta WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_pregunta
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
