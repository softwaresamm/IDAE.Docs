---
sidebar_position: 4
title: cnt_contratoEquipo
description: Tabla cnt_contratoEquipo del módulo Contratos
tags: [database, cnt]
---

# cnt_contratoEquipo

## Descripción

Tabla cnt_contratoEquipo del módulo Contratos.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| contratoEquipo | VARCHAR | ✗ | - | - |
| contratoEquipo_codigo | VARCHAR | ✓ | - | - |
| precioVisita | MONEY | ✓ | - | - |
| precioServicio | MONEY | ✓ | - | - |
| fecha_ff | DATETIME | ✓ | - | - |
| promedio | FLOAT | ✓ | - | - |
| id_equipo | INTEGER | ✗ | FK | - |
| id_contrato | INTEGER | ✗ | FK | - |
| id_contratoDetalleVisita | INTEGER | ✗ | FK | - |

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

- **id_contrato** → [cnt_contrato](../contratos/cnt_contrato) - Referencia a cnt_contrato
- **id_contratoDetalleVisita** → [cnt_contratoDetalleVisita](../contratos/cnt_contratoDetalleVisita) - Referencia a cnt_contratoDetalleVisita
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Nombre real en base de datos: `cnt_contratoEquipo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cnt_contratoEquipo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cnt_contratoEquipo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
