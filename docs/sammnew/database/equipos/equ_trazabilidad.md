---
sidebar_position: 24
title: equ_trazabilidad
description: Tabla para gestionar trazabilidad en el sistema SAMM
tags: [database, equ]
---

# equ_trazabilidad

## Descripción

Tabla para gestionar trazabilidad en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| trazabilidad | VARCHAR | ✓ | - | - | - |
| trazabilidad_codigo | VARCHAR | ✓ | - | - | - |
| horometro | DECIMAL | ✓ | - | - | - |
| fecha_ff | DATE | ✓ | - | - | - |
| esSoporte | BIT | ✓ | - | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_equipo_padre | INTEGER | ✓ | FK | - | - |
| id_tercero | INTEGER | ✓ | FK | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |
| id_documento_alquiler | INTEGER | ✓ | FK | - | - |
| id_prestamo | INTEGER | ✓ | FK | - | - |
| id_reporteTecnico | INTEGER | ✓ | FK | - | - |
| id_evento | INTEGER | ✓ | FK | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |
| id_tipoTrazabilidad | INTEGER | ✓ | FK | - | - |
| id_cicloHorometro | INTEGER | ✓ | FK | - | - |
| id_posicion | INTEGER | ✓ | FK | - | - |
| id_estadoEquipo | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_equipo_padre** → [equipo_padre](../general/equipo_padre) - Referencia a equipo_padre
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_documento_alquiler** → [documento_alquiler](../general/documento_alquiler) - Referencia a documento_alquiler
- **id_prestamo** → [unknown_prestamo](../general/unknown_prestamo) - Referencia a unknown_prestamo
- **id_reporteTecnico** → [unknown_reporteTecnico](../general/unknown_reporteTecnico) - Referencia a unknown_reporteTecnico
- **id_evento** → [unknown_evento](../general/unknown_evento) - Referencia a unknown_evento
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_tipoTrazabilidad** → [unknown_tipoTrazabilidad](../general/unknown_tipoTrazabilidad) - Referencia a unknown_tipoTrazabilidad
- **id_cicloHorometro** → [unknown_cicloHorometro](../general/unknown_cicloHorometro) - Referencia a unknown_cicloHorometro
- **id_posicion** → [unknown_posicion](../general/unknown_posicion) - Referencia a unknown_posicion
- **id_estadoEquipo** → [unknown_estadoEquipo](../general/unknown_estadoEquipo) - Referencia a unknown_estadoEquipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_trazabilidad WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_trazabilidad
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
