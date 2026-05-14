---
sidebar_position: 1
title: alq_detalleLiquidacion
description: Tabla alq_detalleLiquidacion del módulo Alquileres
tags: [database, alq]
---

# alq_detalleLiquidacion

## Descripción

Tabla alq_detalleLiquidacion del módulo Alquileres.

**Módulo**: Alquileres  
**Prefijo**: `alq_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| detalleLiquidacion | VARCHAR | ✗ | - | - |
| detalleLiquidacion_codigo | VARCHAR | ✓ | - | - |
| cantidad | INTEGER | ✓ | - | - |
| dias | INTEGER | ✓ | - | - |
| fechaInicio_fh | DATETIME | ✓ | - | - |
| fechaFin_fh | DATETIME | ✓ | - | - |
| id_itemDocumento | INTEGER | ✓ | FK | - |
| id_detalleAlquiler | INTEGER | ✓ | FK | - |
| saldo | INTEGER | ✓ | - | - |
| id_documento_movimiento | INTEGER | ✓ | FK | - |
| horometro | FLOAT | ✓ | - | - |
| id_tarifa | INTEGER | ✓ | FK | - |
| id_evento | INTEGER | ✗ | FK | - |

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

- **id_detalleAlquiler** → [equ_detalleAlquiler](../equipos/equ_detalleAlquiler) - Referencia a equ_detalleAlquiler
- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento
- **id_tarifa** → [alq_tarifa](../alquileres/alq_tarifa) - Referencia a alq_tarifa
- **id_evento** → [dis_evento](../despacho/dis_evento) - Referencia a dis_evento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Alquileres
- Nombre real en base de datos: `alq_detalleLiquidacion`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [alq_detalleLiquidacion] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [alq_detalleLiquidacion] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
