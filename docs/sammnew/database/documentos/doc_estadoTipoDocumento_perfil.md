---
sidebar_position: 32
title: doc_estadoTipoDocumento_perfil
description: Tabla doc_estadoTipoDocumento_perfil del módulo Documentos
tags: [database, doc]
---

# doc_estadoTipoDocumento_perfil

## Descripción

Tabla doc_estadoTipoDocumento_perfil del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| estadoTipoDocumento_perfil | VARCHAR | ✗ | - | - |
| id_estadoTipoDocumento | INTEGER | ✗ | FK | - |
| id_perfil | INTEGER | ✗ | FK | - |

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

- **id_estadoTipoDocumento** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento
- **id_perfil** → [seg_perfil](../seguridad/seg_perfil) - Referencia a seg_perfil

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_estadoTipoDocumento_perfil`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_estadoTipoDocumento_perfil] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_estadoTipoDocumento_perfil] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
