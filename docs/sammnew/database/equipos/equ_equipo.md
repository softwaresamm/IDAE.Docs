---
sidebar_position: 8
title: equ_equipo
description: Tabla para gestionar equipo en el sistema SAMM
tags: [database, equ]
---

# equ_equipo

## Descripción

Tabla para gestionar equipo en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| equipo | VARCHAR | ✓ | - | - | - |
| equipo_codigo | VARCHAR | ✓ | - | - | - |
| equipo_serial | VARCHAR | ✓ | - | - | - |
| nombreContacto | VARCHAR | ✓ | - | - | - |
| telefonoContacto | VARCHAR | ✓ | - | - | - |
| ubicacion | VARCHAR | ✓ | - | - | - |
| observaciones | VARCHAR | ✓ | - | - | - |
| fechaPuestaMarcha_fh | DATETIME | ✓ | - | - | - |
| vencimientoGarantiaFabrica_ff | DATE | ✓ | - | - | - |
| vencimientoGarantiaDistribuidor_ff | DATE | ✓ | - | - | - |
| horasGarantia | DECIMAL | ✓ | - | - | - |
| ultimaLectura_fh | DATETIME | ✓ | - | - | - |
| horometroActual | DECIMAL | ✓ | - | - | - |
| promedioHoras | DECIMAL | ✓ | - | - | - |
| costo | DECIMAL | ✓ | - | - | - |
| fechaImportacion_ff | DATE | ✓ | - | - | - |
| garantiaCancelada | VARCHAR | ✓ | - | - | - |
| id_catalogo_equipo | INTEGER | ✓ | FK | - | - |
| id_sistema | INTEGER | ✓ | FK | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |
| id_zona | INTEGER | ✓ | FK | - | - |
| id_versionEquipo | INTEGER | ✓ | FK | - | - |
| id_tercero_comprador | INTEGER | ✓ | FK | - | - |
| id_tercero | INTEGER | ✓ | FK | - | - |
| id_tercero_servicio | INTEGER | ✓ | FK | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_estadoEquipo | INTEGER | ✓ | FK | - | - |
| id_centroCosto | INTEGER | ✓ | FK | - | - |

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

- **id_catalogo_equipo** → [catalogo_equipo](../general/catalogo_equipo) - Referencia a catalogo_equipo
- **id_sistema** → [unknown_sistema](../general/unknown_sistema) - Referencia a unknown_sistema
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona
- **id_versionEquipo** → [unknown_versionEquipo](../general/unknown_versionEquipo) - Referencia a unknown_versionEquipo
- **id_tercero_comprador** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_tercero_servicio** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_estadoEquipo** → [unknown_estadoEquipo](../general/unknown_estadoEquipo) - Referencia a unknown_estadoEquipo
- **id_centroCosto** → [unknown_centroCosto](../general/unknown_centroCosto) - Referencia a unknown_centroCosto

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_equipo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_equipo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
