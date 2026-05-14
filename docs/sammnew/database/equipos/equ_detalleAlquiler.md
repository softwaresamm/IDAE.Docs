---
sidebar_position: 6
title: equ_detalleAlquiler
description: Tabla para gestionar detalleAlquiler en el sistema SAMM
tags: [database, equ]
---

# equ_detalleAlquiler

## Descripción

Tabla para gestionar detalleAlquiler en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| detalleAlquiler | VARCHAR | ✓ | - | - | - |
| detalleAlquiler_codigo | VARCHAR | ✓ | - | - | - |
| fechaDevolucion_ff | DATE | ✓ | - | - | - |
| valorHora | DECIMAL | ✓ | - | - | - |
| ValorHoraStandBy | DECIMAL | ✓ | - | - | - |
| valorPeriodo | DECIMAL | ✓ | - | - | - |
| valorMulta | DECIMAL | ✓ | - | - | - |
| fechaDespacho_ff | DATE | ✓ | - | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_documento_alquiler | INTEGER | ✓ | FK | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |
| id_tercero | INTEGER | ✓ | FK | - | - |
| fechaUltimaFactura_fh | DATETIME | ✓ | - | - | - |
| valorMes | DECIMAL | ✓ | - | - | - |
| fechaInicioFactura_fh | DATETIME | ✓ | - | - | - |
| cantidadSolicitada | INTEGER | ✓ | - | - | - |
| cantidadAlquilada | INTEGER | ✓ | - | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |
| estadoalquiler | INTEGER | ✓ | - | - | - |
| bloquearDespacho | BIT | ✓ | - | - | - |
| esSerializado | BIT | ✓ | - | - | - |

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
- **id_documento_alquiler** → [doc_documento_alquiler](../documentos/doc_documento_alquiler) - Referencia a doc_documento_alquiler
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_detalleAlquiler WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_detalleAlquiler
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
