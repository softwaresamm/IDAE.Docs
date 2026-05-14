---
sidebar_position: 2
title: dis_evento
description: Tabla para gestionar evento en el sistema SAMM
tags: [database, dis]
---

# dis_evento

## Descripción

Tabla para gestionar evento en el sistema SAMM.

**Módulo**: Despacho  
**Prefijo**: `dis_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| evento | VARCHAR | ✓ | - | - | - |
| evento_codigo | VARCHAR | ✓ | - | - | - |
| fechaHoraInicio_ff | DATE | ✓ | - | - | - |
| duracion_hh | DATETIME | ✓ | - | - | - |
| afectaProduccion | BIT | ✓ | - | - | - |
| notas | VARCHAR | ✓ | - | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_motivoEvento | INTEGER | ✓ | FK | - | - |
| id_usuario | INTEGER | ✓ | FK | - | - |
| id_estadoEquipo | INTEGER | ✓ | FK | - | - |
| id_falla | INTEGER | ✓ | FK | - | - |
| id_falla_causa | INTEGER | ✓ | FK | - | - |
| id_metodoDeteccion | INTEGER | ✓ | FK | - | - |
| fechaHoraEstimada_fh | DATETIME | ✓ | - | - | - |
| eventoTipo | INTEGER | ✓ | - | - | - |
| afectaCliente | BIT | ✓ | - | - | - |
| id_estadoEvento | INTEGER | ✓ | FK | - | - |
| codigo | VARCHAR | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **id_usuario_creo**: Usuario que creó el registro
- **id_usuario_modifico**: Usuario que modificó el registro
- **fechaCreacion**: Fecha y hora de creación
- **fechaModificacion**: Fecha y hora de última modificación
- **uid**: Control multiempresa (User ID)
- **eid**: Control multiempresa (Entity ID)

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_motivoEvento** → [dis_motivoEvento](../despacho/dis_motivoEvento) - Referencia a dis_motivoEvento
- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_estadoEquipo** → [equ_estadoEquipo](../equipos/equ_estadoEquipo) - Referencia a equ_estadoEquipo
- **id_falla** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla_causa** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_metodoDeteccion** → [dis_metodoDeteccion](../despacho/dis_metodoDeteccion) - Referencia a dis_metodoDeteccion
- **id_estadoEvento** → [dis_estadoEvento](../despacho/dis_estadoEvento) - Referencia a dis_estadoEvento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Despacho
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM dis_evento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM dis_evento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
