---
sidebar_position: 2
title: dis_evento
description: Tabla dis_evento del módulo Despacho
tags: [database, dis]
---

# dis_evento

## Descripción

Tabla dis_evento del módulo Despacho.

**Módulo**: Despacho  
**Prefijo**: `dis_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| evento | VARCHAR | ✗ | - | - |
| evento_codigo | VARCHAR | ✓ | - | - |
| fechaHoraInicio_ff | DATETIME | ✗ | - | - |
| duracion_hh | DATETIME | ✗ | - | - |
| afectaProduccion | BIT | ✗ | - | - |
| notas | VARCHAR | ✓ | - | - |
| id_equipo | INTEGER | ✗ | FK | - |
| id_motivoEvento | INTEGER | ✗ | FK | - |
| id_usuario | INTEGER | ✗ | FK | - |
| id_estadoEquipo | INTEGER | ✗ | FK | - |
| id_falla | INTEGER | ✗ | FK | - |
| id_falla_causa | INTEGER | ✗ | FK | - |
| id_metodoDeteccion | INTEGER | ✗ | FK | - |
| fechaHoraEstimada_fh | DATETIME | ✗ | - | - |
| eventoTipo | INTEGER | ✗ | - | - |
| afectaCliente | BIT | ✗ | - | - |
| id_estadoEvento | INTEGER | ✗ | FK | - |
| codigo | VARCHAR | ✓ | - | - |

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
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_falla** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla_causa** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_estadoEquipo** → [equ_estadoEquipo](../equipos/equ_estadoEquipo) - Referencia a equ_estadoEquipo
- **id_estadoEvento** → [dis_estadoEvento](../despacho/dis_estadoEvento) - Referencia a dis_estadoEvento
- **id_metodoDeteccion** → [dis_metodoDeteccion](../despacho/dis_metodoDeteccion) - Referencia a dis_metodoDeteccion
- **id_motivoEvento** → [dis_motivoEvento](../despacho/dis_motivoEvento) - Referencia a dis_motivoEvento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Despacho
- Nombre real en base de datos: `dis_evento`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [dis_evento] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [dis_evento] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
