---
sidebar_position: 24
title: equ_trazabilidad
description: Tabla equ_trazabilidad del módulo Equipos
tags: [database, equ]
---

# equ_trazabilidad

## Descripción

Tabla equ_trazabilidad del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| trazabilidad | VARCHAR | ✗ | - | - |
| trazabilidad_codigo | VARCHAR | ✓ | - | - |
| horometro | FLOAT | ✓ | - | - |
| fecha_ff | DATETIME | ✗ | - | - |
| esSoporte | BIT | ✗ | - | - |
| id_equipo | INTEGER | ✗ | FK | - |
| id_equipo_padre | INTEGER | ✗ | FK | - |
| id_tercero | INTEGER | ✗ | FK | - |
| id_sucursal | INTEGER | ✗ | FK | - |
| id_documento.alquiler | INTEGER | ✗ | FK | - |
| id_prestamo | INTEGER | ✗ | FK | - |
| id_reporteTecnico | INTEGER | ✗ | FK | - |
| id_evento | INTEGER | ✗ | FK | - |
| id_documento | INTEGER | ✗ | FK | - |
| id_tipoTrazabilidad | INTEGER | ✗ | FK | - |
| id_cicloHorometro | INTEGER | ✗ | FK | - |
| id_posicion | INTEGER | ✗ | FK | - |
| id_estadoEquipo | INTEGER | ✗ | FK | - |

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

- **id_prestamo** → [equ_prestamo](../equipos/equ_prestamo) - Referencia a equ_prestamo
- **id_tipoTrazabilidad** → [equ_tipoTrazabilidad](../equipos/equ_tipoTrazabilidad) - Referencia a equ_tipoTrazabilidad
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_equipo_padre** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_cicloHorometro** → [equ_cicloHorometro](../equipos/equ_cicloHorometro) - Referencia a equ_cicloHorometro
- **id_documento.alquiler** → [doc_documento.alquiler](../documentos/doc_documento_alquiler) - Referencia a doc_documento.alquiler
- **id_evento** → [dis_evento](../despacho/dis_evento) - Referencia a dis_evento
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_posicion** → [cat_posicion](../catalogo/cat_posicion) - Referencia a cat_posicion
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_reporteTecnico** → [ort_reporteTecnico](../ordenes/ort_reporteTecnico) - Referencia a ort_reporteTecnico
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_trazabilidad`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_trazabilidad] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_trazabilidad] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
