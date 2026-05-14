---
sidebar_position: 7
title: equ_detallePagoAlquiler
description: Tabla equ_detallePagoAlquiler del módulo Equipos
tags: [database, equ]
---

# equ_detallePagoAlquiler

## Descripción

Tabla equ_detallePagoAlquiler del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| detallePagoAlquiler | VARCHAR | ✗ | - | - |
| detallePagoAlquiler_codigo | VARCHAR | ✓ | - | - |
| valor | MONEY | ✗ | - | - |
| horometro | FLOAT | ✓ | - | - |
| id_pagoAlquiler | INTEGER | ✗ | FK | - |
| id_equipo | INTEGER | ✗ | FK | - |
| valorMulta | FLOAT | ✓ | - | - |
| facturado | BIT | ✗ | - | - |
| fechaInicial_ff | DATETIME | ✓ | - | - |
| fechaFin_ff | DATETIME | ✓ | - | - |
| id_documento | INTEGER | ✓ | FK | - |
| id_itemDocumento | INTEGER | ✗ | FK | - |

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

- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_pagoAlquiler** → [equ_pagoAlquiler](../equipos/equ_pagoAlquiler) - Referencia a equ_pagoAlquiler
- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_detallePagoAlquiler`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_detallePagoAlquiler] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_detallePagoAlquiler] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
