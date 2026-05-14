---
sidebar_position: 47
title: doc_prioridadDocumento
description: Tabla doc_prioridadDocumento del módulo Documentos
tags: [database, doc]
---

# doc_prioridadDocumento

## Descripción

Tabla doc_prioridadDocumento del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| prioridadDocumento | VARCHAR | ✗ | - | - |
| prioridadDocumento_codigo | VARCHAR | ✓ | - | - |
| tiempoRespuesta | INTEGER | ✗ | - | - |
| id_tipoDocumento | INTEGER | ✗ | FK | - |
| id_estrategiaPrioridad | INTEGER | ✗ | FK | - |
| orden | INTEGER | ✓ | - | - |

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
- **id_estrategiaPrioridad** → [doc_estrategiaPrioridad](../documentos/doc_estrategiaPrioridad) - Referencia a doc_estrategiaPrioridad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_prioridadDocumento`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_prioridadDocumento] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_prioridadDocumento] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
