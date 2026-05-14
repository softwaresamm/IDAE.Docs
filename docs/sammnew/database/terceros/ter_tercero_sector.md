---
sidebar_position: 13
title: ter_tercero_sector
description: Tabla ter_tercero_sector del módulo Terceros
tags: [database, ter]
---

# ter_tercero_sector

## Descripción

Tabla ter_tercero_sector del módulo Terceros.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| tercero_sector | VARCHAR | ✗ | - | - |
| id_tercero | INTEGER | ✗ | FK | - |
| id_sector | INTEGER | ✗ | FK | - |

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

- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_sector** → [ter_sector](../terceros/ter_sector) - Referencia a ter_sector

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Nombre real en base de datos: `ter_tercero_sector`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ter_tercero_sector] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ter_tercero_sector] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
