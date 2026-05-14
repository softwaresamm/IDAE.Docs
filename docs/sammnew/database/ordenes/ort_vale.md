---
sidebar_position: 11
title: ort_vale
description: Tabla ort_vale del módulo Órdenes de Trabajo
tags: [database, ort]
---

# ort_vale

## Descripción

Tabla ort_vale del módulo Órdenes de Trabajo.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| vale | VARCHAR | ✗ | - | - |
| vale_codigo | VARCHAR | ✓ | - | - |
| id_documento.ot | INTEGER | ✗ | FK | - |

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

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Nombre real en base de datos: `ort_vale`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ort_vale] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ort_vale] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
