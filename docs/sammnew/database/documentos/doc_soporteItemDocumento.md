---
sidebar_position: 49
title: doc_soporteItemDocumento
description: Tabla doc_soporteItemDocumento del módulo Documentos
tags: [database, doc]
---

# doc_soporteItemDocumento

## Descripción

Tabla doc_soporteItemDocumento del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| soporteItemDocumento | VARCHAR | ✗ | - | - |
| soporteItemDocumento_codigo | VARCHAR | ✓ | - | - |
| duracionPlaneada | FLOAT | ✗ | - | - |
| Valor | MONEY | ✗ | - | - |
| Costo | MONEY | ✗ | - | - |
| id_itemDocumento | INTEGER | ✗ | FK | - |
| id_usuario | INTEGER | ✗ | FK | - |
| duracionEjecutada | FLOAT | ✗ | - | - |
| horasOrdinales | FLOAT | ✗ | - | - |
| horasFestivas | FLOAT | ✗ | - | - |
| horasNocturnas | FLOAT | ✗ | - | - |
| periodo | VARCHAR | ✗ | - | - |

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

- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento
- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_soporteItemDocumento`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_soporteItemDocumento] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_soporteItemDocumento] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
