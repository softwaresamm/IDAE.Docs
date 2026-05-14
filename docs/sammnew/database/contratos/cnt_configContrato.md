---
sidebar_position: 1
title: cnt_configContrato
description: Tabla cnt_configContrato del módulo Contratos
tags: [database, cnt]
---

# cnt_configContrato

## Descripción

Tabla cnt_configContrato del módulo Contratos.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| configContrato | VARCHAR | ✗ | - | - |
| id_contratoEquipo | INTEGER | ✓ | FK | - |
| id_catalogo.tempario | INTEGER | ✓ | FK | - |
| id_tercero_proveedor | INTEGER | ✓ | FK | - |
| frecuencia | INTEGER | ✓ | - | - |
| cadaN | FLOAT | ✓ | - | - |
| dia | INTEGER | ✓ | - | - |
| estrategia | INTEGER | ✓ | - | - |
| porTrabajo | BIT | ✓ | - | - |
| incluirMenores | BIT | ✓ | - | - |
| aproximarA | INTEGER | ✓ | - | - |
| fecha_ff | DATETIME | ✓ | - | - |
| diaHabil | INTEGER | ✓ | - | - |

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
- **id_catalogo.tempario** → [cat_catalogo.tempario](../catalogo/cat_catalogo_tempario) - Referencia a cat_catalogo.tempario
- **id_tercero_proveedor** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Nombre real en base de datos: `cnt_configContrato`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cnt_configContrato] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cnt_configContrato] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
