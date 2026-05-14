---
sidebar_position: 2
title: alq_detallealquiler_itemdocumento
description: Tabla alq_detallealquiler_itemdocumento del módulo Alquileres
tags: [database, alq]
---

# alq_detallealquiler_itemdocumento

## Descripción

Tabla alq_detallealquiler_itemdocumento del módulo Alquileres.

**Módulo**: Alquileres  
**Prefijo**: `alq_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| detallealquiler_itemdocumento | VARCHAR | ✗ | - | - |
| id_detallealquiler | INTEGER | ✗ | FK | - |
| id_itemdocumento | INTEGER | ✗ | FK | - |

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

- **id_itemdocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento
- **id_detallealquiler** → [equ_detalleAlquiler](../equipos/equ_detalleAlquiler) - Referencia a equ_detalleAlquiler

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Alquileres
- Nombre real en base de datos: `alq_detallealquiler_itemdocumento`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [alq_detallealquiler_itemdocumento] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [alq_detallealquiler_itemdocumento] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
