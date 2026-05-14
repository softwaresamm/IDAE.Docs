---
sidebar_position: 13
title: doc_documento.ot_pruebaCheckList
description: Tabla doc_documento.ot_pruebaCheckList del módulo Documentos
tags: [database, doc]
---

# doc_documento.ot_pruebaCheckList

## Descripción

Tabla doc_documento.ot_pruebaCheckList del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| documento.ot_pruebaCheckList | VARCHAR | ✗ | - | - |
| id_documento.ot | INTEGER | ✗ | FK | - |
| id_pruebaCheckList | INTEGER | ✗ | FK | - |

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

- **id_documento.ot** → [doc_documento.ot](../documentos/doc_documento_ot) - Referencia a doc_documento.ot
- **id_pruebaCheckList** → [cat_pruebaCheckList](../catalogo/cat_pruebaCheckList) - Referencia a cat_pruebaCheckList

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_documento.ot_pruebaCheckList`
- El punto en el nombre separa el tipo de documento del subtipo

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_documento.ot_pruebaCheckList] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_documento.ot_pruebaCheckList] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
