---
sidebar_position: 3
title: equ_campana
description: Tabla equ_campana del módulo Equipos
tags: [database, equ]
---

# equ_campana

## Descripción

Tabla equ_campana del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| campana | VARCHAR | ✗ | - | - |
| campana_codigo | VARCHAR | ✓ | - | - |
| detalleCampana | VARCHAR | ✗ | - | - |
| fechaInicio_ff | DATETIME | ✗ | - | - |
| fechafin_ff | DATETIME | ✗ | - | - |
| activo | BIT | ✗ | - | - |
| id_tercero | INTEGER | ✗ | FK | - |
| id_catalogo.tempario | INTEGER | ✗ | FK | - |

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

- **id_catalogo.tempario** → [cat_catalogo.tempario](../catalogo/cat_catalogo_tempario) - Referencia a cat_catalogo.tempario
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_campana`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_campana] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_campana] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
