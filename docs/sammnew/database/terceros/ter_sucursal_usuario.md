---
sidebar_position: 10
title: ter_sucursal_usuario
description: Tabla ter_sucursal_usuario del módulo Terceros
tags: [database, ter]
---

# ter_sucursal_usuario

## Descripción

Tabla ter_sucursal_usuario del módulo Terceros.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| sucursal_usuario | VARCHAR | ✗ | - | - |
| id_sucursal | INTEGER | ✗ | FK | - |
| id_usuario | INTEGER | ✗ | FK | - |

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
- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Nombre real en base de datos: `ter_sucursal_usuario`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ter_sucursal_usuario] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ter_sucursal_usuario] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
