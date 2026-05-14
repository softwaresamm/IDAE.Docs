---
sidebar_position: 12
title: ter_tercero_listaprecio
description: Tabla ter_tercero_listaprecio del módulo Terceros
tags: [database, ter]
---

# ter_tercero_listaprecio

## Descripción

Tabla ter_tercero_listaprecio del módulo Terceros.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| tercero_listaprecio | VARCHAR | ✗ | - | - |
| id_tercero | INTEGER | ✗ | FK | - |
| id_listaprecio | INTEGER | ✗ | FK | - |

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

- **id_listaprecio** → [cat_listaPrecio](../catalogo/cat_listaPrecio) - Referencia a cat_listaPrecio
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Nombre real en base de datos: `ter_tercero_listaprecio`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ter_tercero_listaprecio] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ter_tercero_listaprecio] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
