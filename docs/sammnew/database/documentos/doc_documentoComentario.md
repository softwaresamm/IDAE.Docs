---
sidebar_position: 6
title: doc_documentoComentario
description: Tabla para gestionar documentoComentario en el sistema SAMM
tags: [database, doc]
---

# doc_documentoComentario

## Descripción

Tabla para gestionar documentoComentario en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| documentoComentario | VARCHAR | ✓ | - | - | - |
| documentoComentario_codigo | VARCHAR | ✓ | - | - | - |
| comentario | VARCHAR | ✓ | - | - | - |
| recordar | BIT | ✓ | - | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |
| id_usuario | INTEGER | ✓ | FK | - | - |
| id_tarea | INTEGER | ✓ | FK | - | - |
| fechaRecordar_fh | DATETIME | ✓ | - | - | - |
| cerrada | BIT | ✓ | - | - | - |
| id_documentoComentario | INTEGER | ✓ | FK | - | - |
| id_contacto | INTEGER | ✓ | FK | - | - |
| fechaOrden | DATETIME | ✓ | - | - | - |
| fechaOriginal | DATETIME | ✓ | - | - | - |
| id_usuarioOriginal | INTEGER | ✓ | FK | - | - |
| conRespuesta | INTEGER | ✓ | - | - | - |
| relevante | INTEGER | ✓ | - | - | - |
| id_reporteTecnico | INTEGER | ✓ | FK | - | - |
| finalizado | INTEGER | ✓ | - | - | - |

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
- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_tarea** → [doc_tarea](../documentos/doc_tarea) - Referencia a doc_tarea
- **id_documentoComentario** → [doc_documentoComentario](../documentos/doc_documentoComentario) - Referencia a doc_documentoComentario
- **id_contacto** → [ter_contacto](../terceros/ter_contacto) - Referencia a ter_contacto
- **id_reporteTecnico** → [ort_reporteTecnico](../ordenes/ort_reporteTecnico) - Referencia a ort_reporteTecnico

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documentoComentario WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documentoComentario
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
