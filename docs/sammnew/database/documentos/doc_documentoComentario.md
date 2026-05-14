---
sidebar_position: 25
title: doc_documentoComentario
description: Tabla doc_documentoComentario del módulo Documentos
tags: [database, doc]
---

# doc_documentoComentario

## Descripción

Tabla doc_documentoComentario del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| documentoComentario | VARCHAR | ✗ | - | - |
| documentoComentario_codigo | VARCHAR | ✓ | - | - |
| comentario | VARCHAR | ✗ | - | - |
| recordar | BIT | ✗ | - | - |
| id_documento | INTEGER | ✗ | FK | - |
| id_usuario | INTEGER | ✗ | FK | - |
| id_tarea | INTEGER | ✗ | FK | - |
| fechaRecordar_fh | DATETIME | ✗ | - | - |
| cerrada | BIT | ✗ | - | - |
| id_documentoComentario | INTEGER | ✗ | FK | - |
| id_contacto | INTEGER | ✗ | FK | - |
| fechaOrden | DATETIME | ✗ | - | - |
| fechaOriginal | DATETIME | ✗ | - | - |
| id_usuarioOriginal | INTEGER | ✗ | FK | - |
| conRespuesta | INTEGER | ✗ | - | - |
| relevante | INTEGER | ✗ | - | - |
| id_reporteTecnico | INTEGER | ✗ | FK | - |
| finalizado | INTEGER | ✗ | - | - |

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

- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_documentoComentario** → [doc_documentoComentario](../documentos/doc_documentoComentario) - Referencia a doc_documentoComentario
- **id_contacto** → [ter_contacto](../terceros/ter_contacto) - Referencia a ter_contacto
- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_reporteTecnico** → [ort_reporteTecnico](../ordenes/ort_reporteTecnico) - Referencia a ort_reporteTecnico

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_documentoComentario`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_documentoComentario] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_documentoComentario] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
