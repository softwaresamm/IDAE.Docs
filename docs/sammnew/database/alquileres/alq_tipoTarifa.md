---
sidebar_position: 6
title: alq_tipoTarifa
description: Tabla alq_tipoTarifa del módulo Alquileres
tags: [database, alq]
---

# alq_tipoTarifa

## Descripción

Tabla alq_tipoTarifa del módulo Alquileres.

**Módulo**: Alquileres  
**Prefijo**: `alq_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| tipoTarifa | VARCHAR | ✗ | - | - |
| tipoTarifa_codigo | VARCHAR | ✓ | - | - |
| valor | DECIMAL | ✓ | - | - |

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

- Esta tabla forma parte del módulo Alquileres
- Nombre real en base de datos: `alq_tipoTarifa`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [alq_tipoTarifa] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [alq_tipoTarifa] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
