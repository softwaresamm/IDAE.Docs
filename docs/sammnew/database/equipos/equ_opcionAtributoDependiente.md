---
sidebar_position: 16
title: equ_opcionAtributoDependiente
description: Tabla equ_opcionAtributoDependiente del módulo Equipos
tags: [database, equ]
---

# equ_opcionAtributoDependiente

## Descripción

Tabla equ_opcionAtributoDependiente del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| opcionAtributoDependiente | VARCHAR | ✗ | - | - |
| opcionAtributoDependiente_codigo | VARCHAR | ✓ | - | - |
| id_opcionAtributo_hijo | INTEGER | ✓ | FK | - |
| id_opcionAtributo_padre | INTEGER | ✓ | FK | - |

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

- **id_opcionAtributo_hijo** → [equ_opcionAtributo](../equipos/equ_opcionAtributo) - Referencia a equ_opcionAtributo
- **id_opcionAtributo_hijo** → [equ_opcionAtributo](../equipos/equ_opcionAtributo) - Referencia a equ_opcionAtributo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_opcionAtributoDependiente`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_opcionAtributoDependiente] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_opcionAtributoDependiente] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
