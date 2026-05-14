---
sidebar_position: 44
title: doc_pendienteDocumento
description: Tabla doc_pendienteDocumento del módulo Documentos
tags: [database, doc]
---

# doc_pendienteDocumento

## Descripción

Tabla doc_pendienteDocumento del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| pendienteDocumento | VARCHAR | ✗ | - | - |
| pendienteDocumento_codigo | VARCHAR | ✓ | - | - |
| cantidad | FLOAT | ✓ | - | - |
| id_documento | INTEGER | ✗ | FK | - |
| id_catalogo | INTEGER | ✗ | FK | - |
| id_tipoDocumento | INTEGER | ✗ | FK | - |
| olvidar | BIT | ✗ | - | - |
| id_reporteTecnico | INTEGER | ✗ | FK | - |
| id_tipoPendiente | INTEGER | ✗ | FK | - |

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

- **id_tipoDocumento** → [doc_tipoDocumento](../documentos/doc_tipoDocumento) - Referencia a doc_tipoDocumento
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_reporteTecnico** → [ort_reporteTecnico](../ordenes/ort_reporteTecnico) - Referencia a ort_reporteTecnico

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_pendienteDocumento`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_pendienteDocumento] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_pendienteDocumento] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
