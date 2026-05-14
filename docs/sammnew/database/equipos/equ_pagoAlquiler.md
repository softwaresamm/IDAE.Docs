---
sidebar_position: 18
title: equ_pagoAlquiler
description: Tabla equ_pagoAlquiler del módulo Equipos
tags: [database, equ]
---

# equ_pagoAlquiler

## Descripción

Tabla equ_pagoAlquiler del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| pagoAlquiler | VARCHAR | ✗ | - | - |
| pagoAlquiler_codigo | VARCHAR | ✓ | - | - |
| valorPorCobrar | MONEY | ✗ | - | - |
| valorFacturado | MONEY | ✓ | - | - |
| numeroFactura | VARCHAR | ✓ | - | - |
| fechaEsperadaPago_ff | DATETIME | ✗ | - | - |
| fecha_factura_ff | DATETIME | ✓ | - | - |
| id_documento.alquiler | INTEGER | ✗ | FK | - |

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

- **id_documento.alquiler** → [doc_documento.alquiler](../documentos/doc_documento_alquiler) - Referencia a doc_documento.alquiler

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_pagoAlquiler`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_pagoAlquiler] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_pagoAlquiler] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
