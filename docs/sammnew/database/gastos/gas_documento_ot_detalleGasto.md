---
sidebar_position: 2
title: gas_documento.ot_detalleGasto
description: Tabla gas_documento.ot_detalleGasto del módulo Gastos
tags: [database, gas]
---

# gas_documento.ot_detalleGasto

## Descripción

Tabla gas_documento.ot_detalleGasto del módulo Gastos.

**Módulo**: Gastos  
**Prefijo**: `gas_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| documento.ot_detalleGasto | VARCHAR | ✗ | - | - |
| id_detalleGasto | INTEGER | ✗ | FK | - |
| id_documento.ot | INTEGER | ✗ | FK | - |
| id_itemDocumento | INTEGER | ✗ | FK | - |
| id_documento.gasto | INTEGER | ✗ | FK | - |

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

- **id_detalleGasto** → [gas_detalleGasto](../gastos/gas_detalleGasto) - Referencia a gas_detalleGasto
- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento
- **id_documento.ot** → [doc_documento.ot](../documentos/doc_documento_ot) - Referencia a doc_documento.ot

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Gastos
- Nombre real en base de datos: `gas_documento.ot_detalleGasto`
- El punto en el nombre separa el tipo de documento del subtipo

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [gas_documento.ot_detalleGasto] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [gas_documento.ot_detalleGasto] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
