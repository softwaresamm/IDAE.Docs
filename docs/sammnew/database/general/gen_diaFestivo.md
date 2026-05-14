---
sidebar_position: 8
title: gen_diaFestivo
description: Tabla gen_diaFestivo del módulo General / Configuración
tags: [database, gen]
---

# gen_diaFestivo

## Descripción

Tabla gen_diaFestivo del módulo General / Configuración.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| diaFestivo | VARCHAR | ✗ | - | - |
| diaFestivo_codigo | VARCHAR | ✓ | - | - |
| fecha_ff | DATETIME | ✓ | - | - |

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

- Esta tabla forma parte del módulo General / Configuración
- Nombre real en base de datos: `gen_diaFestivo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [gen_diaFestivo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [gen_diaFestivo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
