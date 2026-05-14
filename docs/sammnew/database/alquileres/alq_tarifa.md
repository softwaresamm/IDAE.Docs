---
sidebar_position: 5
title: alq_tarifa
description: Tabla alq_tarifa del módulo Alquileres
tags: [database, alq]
---

# alq_tarifa

## Descripción

Tabla alq_tarifa del módulo Alquileres.

**Módulo**: Alquileres  
**Prefijo**: `alq_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| tarifa | VARCHAR | ✗ | - | - |
| tarifa_codigo | VARCHAR | ✓ | - | - |
| id_itemDocumento | INTEGER | ✗ | FK | - |
| id_detalleAlquiler | INTEGER | ✗ | FK | - |
| id_tipoTarifa | INTEGER | ✗ | FK | - |
| horasIncluidas | FLOAT | ✗ | - | - |
| cantidadIncluida | INTEGER | ✗ | - | - |

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
- **id_tipoTarifa** → [alq_tipoTarifa](../alquileres/alq_tipoTarifa) - Referencia a alq_tipoTarifa

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Alquileres
- Nombre real en base de datos: `alq_tarifa`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [alq_tarifa] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [alq_tarifa] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
