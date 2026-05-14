---
sidebar_position: 3
title: gas_gasto
description: Tabla gas_gasto del módulo Gastos
tags: [database, gas]
---

# gas_gasto

## Descripción

Tabla gas_gasto del módulo Gastos.

**Módulo**: Gastos  
**Prefijo**: `gas_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| gasto | VARCHAR | ✗ | - | - |
| gasto_codigo | VARCHAR | ✓ | - | - |
| numero | INTEGER | ✗ | - | - |
| fecha_ff | DATETIME | ✗ | - | - |
| dias | INTEGER | ✗ | - | - |
| valor | FLOAT | ✗ | - | - |
| concepto | VARCHAR | ✗ | - | - |
| consignado | BIT | ✗ | - | - |
| id_tipoGasto | INTEGER | ✗ | FK | - |
| id_usuario_aprobo | INTEGER | ✗ | FK | - |
| id_usuario_solicitante | INTEGER | ✗ | FK | - |
| id_estadoTipoDocumento | INTEGER | ✗ | FK | - |

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

- **id_estadoTipoDocumento** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento
- **id_tipoGasto** → [gas_tipoGasto](../gastos/gas_tipoGasto) - Referencia a gas_tipoGasto
- **id_usuario_aprobo** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_usuario_solicitante** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Gastos
- Nombre real en base de datos: `gas_gasto`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [gas_gasto] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [gas_gasto] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
