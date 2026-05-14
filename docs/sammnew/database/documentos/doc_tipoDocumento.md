---
sidebar_position: 54
title: doc_tipoDocumento
description: Tabla doc_tipoDocumento del módulo Documentos
tags: [database, doc]
---

# doc_tipoDocumento

## Descripción

Tabla doc_tipoDocumento del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| tipoDocumento | VARCHAR | ✗ | - | - |
| tipoDocumento_codigo | VARCHAR | ✓ | - | - |
| esSalida | BIT | ✗ | - | - |
| mostrarBodega | BIT | ✗ | - | - |
| mostrarCentroCosto | BIT | ✗ | - | - |
| mostrarIncoterm | BIT | ✗ | - | - |
| puedeSerMayor | BIT | ✗ | - | - |
| puedeSerMenor | BIT | ✗ | - | - |
| esUrgente | BIT | ✗ | - | - |

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
- Nombre real en base de datos: `doc_tipoDocumento`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_tipoDocumento] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_tipoDocumento] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
