---
sidebar_position: 14
title: cnt_visitaFija
description: Tabla cnt_visitaFija del módulo Contratos
tags: [database, cnt]
---

# cnt_visitaFija

## Descripción

Tabla cnt_visitaFija del módulo Contratos.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| visitaFija | VARCHAR | ✗ | - | - |
| visitaFija_codigo | VARCHAR | ✓ | - | - |
| fecha_ff | DATETIME | ✗ | - | - |
| fechaCreada_ff | DATETIME | ✗ | - | - |
| horometro | FLOAT | ✓ | - | - |
| id_documento.ot | INTEGER | ✗ | FK | - |
| id_contratoEquipo | INTEGER | ✗ | FK | - |
| id_contratoDetalleVisita | INTEGER | ✗ | FK | - |
| id_catalogo.tempario | INTEGER | ✗ | FK | - |
| esPorTrabajo | BIT | ✓ | - | - |
| correoRecordatorio | VARCHAR | ✗ | - | - |
| id_configContrato | INTEGER | ✓ | FK | - |
| presupuesto | FLOAT | ✓ | - | - |

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

- **id_contratoEquipo** → [cnt_contratoEquipo](../contratos/cnt_contratoEquipo) - Referencia a cnt_contratoEquipo
- **id_configContrato** → [cnt_configContrato](../contratos/cnt_configContrato) - Referencia a cnt_configContrato
- **id_contratoDetalleVisita** → [cnt_contratoDetalleVisita](../contratos/cnt_contratoDetalleVisita) - Referencia a cnt_contratoDetalleVisita
- **id_documento.ot** → [doc_documento.ot](../documentos/doc_documento_ot) - Referencia a doc_documento.ot
- **id_catalogo.tempario** → [cat_catalogo.tempario](../catalogo/cat_catalogo_tempario) - Referencia a cat_catalogo.tempario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Nombre real en base de datos: `cnt_visitaFija`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cnt_visitaFija] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cnt_visitaFija] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
