---
sidebar_position: 3
title: ter_contacto_equipo
description: Tabla ter_contacto_equipo del módulo Terceros
tags: [database, ter]
---

# ter_contacto_equipo

## Descripción

Tabla ter_contacto_equipo del módulo Terceros.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| contacto_equipo | VARCHAR | ✗ | - | - |
| id_equipo | INTEGER | ✗ | FK | - |
| id_usuario | INTEGER | ✗ | FK | - |
| estado_contacto | BIT | ✗ | - | - |
| id_contacto | INTEGER | ✗ | FK | - |

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

- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_contacto** → [ter_contacto](../terceros/ter_contacto) - Referencia a ter_contacto
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Nombre real en base de datos: `ter_contacto_equipo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ter_contacto_equipo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ter_contacto_equipo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
