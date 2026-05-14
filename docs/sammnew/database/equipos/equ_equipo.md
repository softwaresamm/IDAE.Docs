---
sidebar_position: 8
title: equ_equipo
description: Tabla equ_equipo del módulo Equipos
tags: [database, equ]
---

# equ_equipo

## Descripción

Tabla equ_equipo del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| equipo | VARCHAR | ✗ | - | - |
| equipo_codigo | VARCHAR | ✓ | - | - |
| equipo_serial | VARCHAR | ✗ | - | - |
| nombreContacto | VARCHAR | ✓ | - | - |
| telefonoContacto | VARCHAR | ✓ | - | - |
| ubicacion | VARCHAR | ✓ | - | - |
| observaciones | VARCHAR | ✓ | - | - |
| fechaPuestaMarcha_fh | DATETIME | ✓ | - | - |
| vencimientoGarantiaFabrica_ff | DATETIME | ✓ | - | - |
| vencimientoGarantiaDistribuidor_ff | DATETIME | ✓ | - | - |
| horasGarantia | FLOAT | ✓ | - | - |
| ultimaLectura_fh | DATETIME | ✓ | - | - |
| horometroActual | FLOAT | ✗ | - | - |
| promedioHoras | FLOAT | ✗ | - | - |
| costo | MONEY | ✓ | - | - |
| fechaImportacion_ff | DATETIME | ✓ | - | - |
| garantiaCancelada | VARCHAR | ✓ | - | - |
| id_catalogo.equipo | INTEGER | ✗ | FK | - |
| id_sistema | INTEGER | ✗ | FK | - |
| id_sucursal | INTEGER | ✗ | FK | - |
| id_zona | INTEGER | ✗ | FK | - |
| id_versionEquipo | INTEGER | ✗ | FK | - |
| id_tercero_comprador | INTEGER | ✗ | FK | - |
| id_tercero | INTEGER | ✗ | FK | - |
| id_tercero_servicio | INTEGER | ✗ | FK | - |
| id_equipo | INTEGER | ✗ | FK | - |
| id_estadoEquipo | INTEGER | ✗ | FK | - |
| id_centroCosto | INTEGER | ✗ | FK | - |

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

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_estadoEquipo** → [equ_estadoEquipo](../equipos/equ_estadoEquipo) - Referencia a equ_estadoEquipo
- **id_sistema** → [cat_sistema](../catalogo/cat_sistema) - Referencia a cat_sistema
- **id_versionEquipo** → [cat_versionEquipo](../catalogo/cat_versionEquipo) - Referencia a cat_versionEquipo
- **id_catalogo.equipo** → [cat_catalogo.equipo](../catalogo/cat_catalogo_equipo) - Referencia a cat_catalogo.equipo
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_tercero_comprador** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_tercero_servicio** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_equipo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_equipo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_equipo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
