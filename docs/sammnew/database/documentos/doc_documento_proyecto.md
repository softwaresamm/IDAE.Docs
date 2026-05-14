---
sidebar_position: 14
title: doc_documento.proyecto
description: Tabla doc_documento.proyecto del módulo Documentos
tags: [database, doc]
---

# doc_documento.proyecto

## Descripción

Tabla doc_documento.proyecto del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| documento.proyecto | VARCHAR | ✗ | - | - |
| nombre | VARCHAR | ✗ | - | - |
| fechaInicioEstimada | DATETIME | ✗ | - | - |
| fechaFinEstimada | DATETIME | ✗ | - | - |
| descripcion | VARCHAR | ✓ | - | - |
| presupuesto | MONEY | ✓ | - | - |

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

*Esta tabla no tiene relaciones salientes definidas.*

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_documento.proyecto`
- El punto en el nombre separa el tipo de documento del subtipo

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_documento.proyecto] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_documento.proyecto] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
