---
sidebar_position: 5
title: dis_metodoDeteccion
description: Tabla dis_metodoDeteccion del módulo Despacho
tags: [database, dis]
---

# dis_metodoDeteccion

## Descripción

Tabla dis_metodoDeteccion del módulo Despacho.

**Módulo**: Despacho  
**Prefijo**: `dis_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| metodoDeteccion | VARCHAR | ✗ | - | - |
| metodoDeteccion_codigo | VARCHAR | ✓ | - | - |

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

- Esta tabla forma parte del módulo Despacho
- Nombre real en base de datos: `dis_metodoDeteccion`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [dis_metodoDeteccion] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [dis_metodoDeteccion] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
