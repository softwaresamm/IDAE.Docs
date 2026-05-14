---
sidebar_position: 4
title: ort_programacion
description: Tabla ort_programacion del módulo Órdenes de Trabajo
tags: [database, ort]
---

# ort_programacion

## Descripción

Tabla ort_programacion del módulo Órdenes de Trabajo.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| programacion | VARCHAR | ✗ | - | - |
| programacion_codigo | VARCHAR | ✓ | - | - |
| desde_fh | DATETIME | ✓ | - | - |
| duracion | FLOAT | ✓ | - | - |
| comentario | VARCHAR | ✓ | - | - |
| id_usuario | INTEGER | ✗ | FK | - |
| id_tipoProgramacion | INTEGER | ✗ | FK | - |
| id_motivoCancelacion | INTEGER | ✗ | FK | - |
| id_documento.ot | INTEGER | ✗ | FK | - |
| id_programacion | INTEGER | ✗ | FK | - |
| id_reporteTecnico | INTEGER | ✗ | FK | - |
| id_catalogo.actividad | INTEGER | ✗ | FK | - |
| costo | FLOAT | ✗ | - | - |
| id_soporteItemDocumento | INTEGER | ✗ | FK | - |

### Columnas de Auditoría

Todas las tablas incluyen estas columnas estándar:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER | Clave primaria auto-incremental |
| active | BIT | Registro activo (soft delete) |
| id_usuario_creo | INTEGER | Usuario que creó el registro |
| id_usuario_modifico | INTEGER | Usuario que modificó el registro |
| fechaCreacion | DATETIME | Fecha y hora de creación |
| fechaModificacion | DATETIME | Fecha y hora de última modificación |
| uid | VARCHAR | Control multiempresa (User ID) |
| eid | VARCHAR | Control multiempresa (Entity ID) |

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_reporteTecnico** → [ort_reporteTecnico](../ordenes/ort_reporteTecnico) - Referencia a ort_reporteTecnico
- **id_motivoCancelacion** → [ort_motivoCancelacion](../ordenes/ort_motivoCancelacion) - Referencia a ort_motivoCancelacion
- **id_tipoProgramacion** → [ort_tipoProgramacion](../ordenes/ort_tipoProgramacion) - Referencia a ort_tipoProgramacion
- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_programacion** → [ort_programacion](../ordenes/ort_programacion) - Referencia a ort_programacion
- **id_catalogo.actividad** → [cat_catalogo.actividad](../catalogo/cat_catalogo_actividad) - Referencia a cat_catalogo.actividad
- **id_documento.ot** → [doc_documento.ot](../documentos/doc_documento_ot) - Referencia a doc_documento.ot
- **id_soporteItemDocumento** → [doc_soporteItemDocumento](../documentos/doc_soporteItemDocumento) - Referencia a doc_soporteItemDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Nombre real en base de datos: `ort_programacion`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ort_programacion] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ort_programacion] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
