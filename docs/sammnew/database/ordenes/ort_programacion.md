---
sidebar_position: 4
title: ort_programacion
description: Tabla para gestionar programacion en el sistema SAMM
tags: [database, ort]
---

# ort_programacion

## Descripción

Tabla para gestionar programacion en el sistema SAMM.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| programacion | VARCHAR | ✓ | - | - | - |
| programacion_codigo | VARCHAR | ✓ | - | - | - |
| desde_fh | DATETIME | ✓ | - | - | - |
| duracion | DECIMAL | ✓ | - | - | - |
| comentario | VARCHAR | ✓ | - | - | - |
| id_usuario | INTEGER | ✓ | FK | - | - |
| id_tipoProgramacion | INTEGER | ✓ | FK | - | - |
| id_motivoCancelacion | INTEGER | ✓ | FK | - | - |
| id_documento_ot | INTEGER | ✓ | FK | - | - |
| id_programacion | INTEGER | ✓ | FK | - | - |
| id_reporteTecnico | INTEGER | ✓ | FK | - | - |
| id_catalogo_actividad | INTEGER | ✓ | FK | - | - |
| costo | DECIMAL | ✓ | - | - | - |
| id_soporteItemDocumento | INTEGER | ✓ | FK | - | - |

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

- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_tipoProgramacion** → [ort_tipoProgramacion](../ordenes/ort_tipoProgramacion) - Referencia a ort_tipoProgramacion
- **id_motivoCancelacion** → [ort_motivoCancelacion](../ordenes/ort_motivoCancelacion) - Referencia a ort_motivoCancelacion
- **id_documento_ot** → [doc_documento_ot](../documentos/doc_documento_ot) - Referencia a doc_documento_ot
- **id_programacion** → [ort_programacion](../ordenes/ort_programacion) - Referencia a ort_programacion
- **id_reporteTecnico** → [ort_reporteTecnico](../ordenes/ort_reporteTecnico) - Referencia a ort_reporteTecnico
- **id_catalogo_actividad** → [cat_catalogo_actividad](../catalogo/cat_catalogo_actividad) - Referencia a cat_catalogo_actividad
- **id_soporteItemDocumento** → [doc_soporteItemDocumento](../documentos/doc_soporteItemDocumento) - Referencia a doc_soporteItemDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ort_programacion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ort_programacion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
