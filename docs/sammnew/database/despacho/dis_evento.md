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
- **id_motivoEvento** → [unknown_motivoEvento](../general/unknown_motivoEvento) - Referencia a unknown_motivoEvento
- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_estadoEquipo** → [unknown_estadoEquipo](../general/unknown_estadoEquipo) - Referencia a unknown_estadoEquipo
- **id_falla** → [unknown_falla](../general/unknown_falla) - Referencia a unknown_falla
- **id_falla_causa** → [falla_causa](../general/falla_causa) - Referencia a falla_causa
- **id_metodoDeteccion** → [unknown_metodoDeteccion](../general/unknown_metodoDeteccion) - Referencia a unknown_metodoDeteccion
- **id_estadoEvento** → [unknown_estadoEvento](../general/unknown_estadoEvento) - Referencia a unknown_estadoEvento

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
