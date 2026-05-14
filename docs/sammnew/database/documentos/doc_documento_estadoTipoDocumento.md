---
sidebar_position: 28
title: doc_documento_estadoTipoDocumento
description: Tabla doc_documento_estadoTipoDocumento del módulo Documentos
tags: [database, doc]
---

# doc_documento_estadoTipoDocumento

## Descripción

Tabla doc_documento_estadoTipoDocumento del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| documento_estadoTipoDocumento | VARCHAR | ✗ | - | - |
| notas | VARCHAR | ✓ | - | - |
| id_documento | INTEGER | ✗ | FK | - |
| id_estadoTipoDocumento | INTEGER | ✗ | FK | - |
| id_motivoestado | INTEGER | ✗ | FK | - |

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
- **id_motivoestado** → [doc_motivoestado](../documentos/doc_motivoestado) - Referencia a doc_motivoestado
- **id_estadoTipoDocumento** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_documento_estadoTipoDocumento`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_documento_estadoTipoDocumento] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_documento_estadoTipoDocumento] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
