---
sidebar_position: 53
title: doc_tarea
description: Tabla doc_tarea del módulo Documentos
tags: [database, doc]
---

# doc_tarea

## Descripción

Tabla doc_tarea del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| tarea | VARCHAR | ✗ | - | - |
| tarea_codigo | VARCHAR | ✓ | - | - |
| id_catalogo | INTEGER | ✗ | FK | - |
| id_cargo | INTEGER | ✗ | FK | - |
| fechaPlaneada_fh | DATETIME | ✗ | - | - |
| porcentajeAvance | INTEGER | ✗ | - | - |
| id_documento | INTEGER | ✗ | FK | - |

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

- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_cargo** → [seg_cargo](../seguridad/seg_cargo) - Referencia a seg_cargo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_tarea`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_tarea] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_tarea] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
