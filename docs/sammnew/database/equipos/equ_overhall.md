---
sidebar_position: 17
title: equ_overhall
description: Tabla equ_overhall del módulo Equipos
tags: [database, equ]
---

# equ_overhall

## Descripción

Tabla equ_overhall del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| overhall | VARCHAR | ✗ | - | - |
| overhall_codigo | VARCHAR | ✓ | - | - |
| horometro | FLOAT | ✗ | - | - |
| fecha_ff | DATETIME | ✗ | - | - |
| id_equipo | INTEGER | ✗ | FK | - |
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

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_documento.ot** → [doc_documento.ot](../documentos/doc_documento_ot) - Referencia a doc_documento.ot

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_overhall`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_overhall] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_overhall] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
