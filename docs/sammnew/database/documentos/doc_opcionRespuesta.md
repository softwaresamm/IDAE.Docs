---
sidebar_position: 43
title: doc_opcionRespuesta
description: Tabla doc_opcionRespuesta del módulo Documentos
tags: [database, doc]
---

# doc_opcionRespuesta

## Descripción

Tabla doc_opcionRespuesta del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| opcionRespuesta | VARCHAR | ✗ | - | - |
| opcionRespuesta_codigo | VARCHAR | ✓ | - | - |
| orden | INTEGER | ✗ | - | - |
| activa | BIT | ✗ | - | - |
| valor | INTEGER | ✗ | - | - |
| id_pregunta | INTEGER | ✗ | FK | - |

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

- **id_pregunta** → [doc_pregunta](../documentos/doc_pregunta) - Referencia a doc_pregunta

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_opcionRespuesta`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_opcionRespuesta] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_opcionRespuesta] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
