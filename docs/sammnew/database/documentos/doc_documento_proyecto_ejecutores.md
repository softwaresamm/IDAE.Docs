---
sidebar_position: 16
title: doc_documento.proyecto_ejecutores
description: Tabla doc_documento.proyecto_ejecutores del módulo Documentos
tags: [database, doc]
---

# doc_documento.proyecto_ejecutores

## Descripción

Tabla doc_documento.proyecto_ejecutores del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| documento.proyecto_ejecutores | VARCHAR | ✗ | - | - |
| id_ejecutores | INTEGER | ✗ | FK | - |
| id_documento.proyecto | INTEGER | ✗ | FK | - |

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

- **id_documento.proyecto** → [doc_documento.proyecto](../documentos/doc_documento_proyecto) - Referencia a doc_documento.proyecto
- **id_ejecutores** → [pro_ejecutores](../proyectos/pro_ejecutores) - Referencia a pro_ejecutores

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_documento.proyecto_ejecutores`
- El punto en el nombre separa el tipo de documento del subtipo

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_documento.proyecto_ejecutores] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_documento.proyecto_ejecutores] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
