---
sidebar_position: 4
title: equ_campana_documento.OT
description: Tabla equ_campana_documento.OT del módulo Equipos
tags: [database, equ]
---

# equ_campana_documento.OT

## Descripción

Tabla equ_campana_documento.OT del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| campana_documento.OT | VARCHAR | ✗ | - | - |
| id_campana | INTEGER | ✗ | FK | - |
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

- **id_documento.ot** → [doc_documento.ot](../documentos/doc_documento_ot) - Referencia a doc_documento.ot
- **id_campana** → [equ_campana](../equipos/equ_campana) - Referencia a equ_campana

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_campana_documento.OT`
- El punto en el nombre separa el tipo de documento del subtipo

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_campana_documento.OT] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_campana_documento.OT] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
