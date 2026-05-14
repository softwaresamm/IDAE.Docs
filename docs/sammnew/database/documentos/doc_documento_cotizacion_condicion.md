---
sidebar_position: 7
title: doc_documento.cotizacion_condicion
description: Tabla doc_documento.cotizacion_condicion del módulo Documentos
tags: [database, doc]
---

# doc_documento.cotizacion_condicion

## Descripción

Tabla doc_documento.cotizacion_condicion del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| documento.cotizacion_condicion | VARCHAR | ✗ | - | - |
| imprimir | BIT | ✓ | - | - |
| id_opcionCondicion | INTEGER | ✗ | FK | - |
| id_documento.cotizacion | INTEGER | ✗ | FK | - |
| id_condicion | INTEGER | ✗ | FK | - |

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

- **id_condicion** → [doc_condicion](../documentos/doc_condicion) - Referencia a doc_condicion
- **id_documento.cotizacion** → [doc_documento.cotizacion](../documentos/doc_documento_cotizacion) - Referencia a doc_documento.cotizacion
- **id_opcionCondicion** → [doc_opcionCondicion](../documentos/doc_opcionCondicion) - Referencia a doc_opcionCondicion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_documento.cotizacion_condicion`
- El punto en el nombre separa el tipo de documento del subtipo

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_documento.cotizacion_condicion] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_documento.cotizacion_condicion] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
