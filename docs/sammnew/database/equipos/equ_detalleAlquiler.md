---
sidebar_position: 6
title: equ_detalleAlquiler
description: Tabla equ_detalleAlquiler del módulo Equipos
tags: [database, equ]
---

# equ_detalleAlquiler

## Descripción

Tabla equ_detalleAlquiler del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| detalleAlquiler | VARCHAR | ✗ | - | - |
| detalleAlquiler_codigo | VARCHAR | ✓ | - | - |
| fechaDevolucion_ff | DATETIME | ✗ | - | - |
| valorHora | MONEY | ✗ | - | - |
| ValorHoraStandBy | MONEY | ✗ | - | - |
| valorPeriodo | MONEY | ✗ | - | - |
| valorMulta | MONEY | ✗ | - | - |
| fechaDespacho_ff | DATETIME | ✗ | - | - |
| id_equipo | INTEGER | ✗ | FK | - |
| id_documento.alquiler | INTEGER | ✗ | FK | - |
| id_sucursal | INTEGER | ✗ | FK | - |
| id_tercero | INTEGER | ✗ | FK | - |
| fechaUltimaFactura_fh | DATETIME | ✓ | - | - |
| valorMes | FLOAT | ✓ | - | - |
| fechaInicioFactura_fh | DATETIME | ✗ | - | - |
| cantidadSolicitada | INTEGER | ✗ | - | - |
| cantidadAlquilada | INTEGER | ✗ | - | - |
| id_catalogo | INTEGER | ✗ | FK | - |
| estadoalquiler | INTEGER | ✓ | - | - |
| esSerializado | BIT | ✗ | - | - |
| bloquearDespacho | BIT | ✗ | - | - |

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
- **id_documento.alquiler** → [doc_documento.alquiler](../documentos/doc_documento_alquiler) - Referencia a doc_documento.alquiler
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_detalleAlquiler`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_detalleAlquiler] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_detalleAlquiler] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
