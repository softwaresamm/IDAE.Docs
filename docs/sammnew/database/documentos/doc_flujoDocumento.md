---
sidebar_position: 36
title: doc_flujoDocumento
description: Tabla doc_flujoDocumento del módulo Documentos
tags: [database, doc]
---

# doc_flujoDocumento

## Descripción

Tabla doc_flujoDocumento del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| flujoDocumento | VARCHAR | ✗ | - | - |
| flujoDocumento_codigo | VARCHAR | ✓ | - | - |
| restrictivo | BIT | ✗ | - | - |
| id_subtipoDocumento_origen | INTEGER | ✗ | FK | - |
| id_subtipoDocumento_destino | INTEGER | ✗ | FK | - |
| id_estadoTipoDocumento_origen | INTEGER | ✗ | FK | - |
| id_estadoTipoDocumento_resultado | INTEGER | ✗ | FK | - |
| replicarItems | INTEGER | ✗ | - | - |
| replicarAtributos | BIT | ✗ | - | - |
| replicarItemsActividades | INTEGER | ✗ | - | - |
| replicarComentario | INTEGER | ✗ | - | - |

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

- **id_subtipoDocumento_destino** → [doc_subtipoDocumento](../documentos/doc_subtipoDocumento) - Referencia a doc_subtipoDocumento
- **id_subtipoDocumento_origen** → [doc_subtipoDocumento](../documentos/doc_subtipoDocumento) - Referencia a doc_subtipoDocumento
- **id_estadoTipoDocumento_origen** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento
- **id_estadoTipoDocumento_resultado** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_flujoDocumento`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_flujoDocumento] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_flujoDocumento] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
