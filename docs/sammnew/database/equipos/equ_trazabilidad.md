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
- **id_equipo_padre** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_documento_alquiler** → [doc_documento_alquiler](../documentos/doc_documento_alquiler) - Referencia a doc_documento_alquiler
- **id_prestamo** → [equ_prestamo](../equipos/equ_prestamo) - Referencia a equ_prestamo
- **id_reporteTecnico** → [ort_reporteTecnico](../ordenes/ort_reporteTecnico) - Referencia a ort_reporteTecnico
- **id_evento** → [dis_evento](../despacho/dis_evento) - Referencia a dis_evento
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_tipoTrazabilidad** → [equ_tipoTrazabilidad](../equipos/equ_tipoTrazabilidad) - Referencia a equ_tipoTrazabilidad
- **id_cicloHorometro** → [equ_cicloHorometro](../equipos/equ_cicloHorometro) - Referencia a equ_cicloHorometro
- **id_posicion** → [cat_posicion](../catalogo/cat_posicion) - Referencia a cat_posicion
- **id_estadoEquipo** → [equ_estadoEquipo](../equipos/equ_estadoEquipo) - Referencia a equ_estadoEquipo

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
