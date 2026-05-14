---
sidebar_position: 1
title: equ_alquiler
description: Tabla equ_alquiler del módulo Equipos
tags: [database, equ]
---

# equ_alquiler

## Descripción

Tabla equ_alquiler del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| alquiler | VARCHAR | ✗ | - | - |
| alquiler_codigo | VARCHAR | ✓ | - | - |
| fechaCompromiso_ff | DATETIME | ✗ | - | - |
| id_sucursal | INTEGER | ✗ | FK | - |
| id_tercero | INTEGER | ✗ | FK | - |
| id_subtipoDocumento | INTEGER | ✗ | FK | - |
| fechaFin_ff | DATETIME | ✓ | - | - |
| mesVencido | BIT | ✗ | - | - |
| alquiler_numero | INTEGER | ✗ | - | - |
| observaciones | VARCHAR | ✓ | - | - |
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

- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_subtipoDocumento** → [doc_subtipoDocumento](../documentos/doc_subtipoDocumento) - Referencia a doc_subtipoDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_alquiler`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_alquiler] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_alquiler] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
