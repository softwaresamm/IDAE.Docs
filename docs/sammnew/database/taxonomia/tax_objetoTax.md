---
sidebar_position: 2
title: tax_objetoTax
description: Tabla tax_objetoTax del módulo Taxonomía
tags: [database, tax]
---

# tax_objetoTax

## Descripción

Tabla tax_objetoTax del módulo Taxonomía.

**Módulo**: Taxonomía  
**Prefijo**: `tax_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| objetoTax | VARCHAR | ✗ | - | - |
| objetoTax_codigo | VARCHAR | ✓ | - | - |
| tabla | VARCHAR | ✗ | - | - |
| id_tablaTax | INTEGER | ✗ | FK | - |
| id_objTax | INTEGER | ✗ | FK | - |
| id_nivelTax | INTEGER | ✗ | FK | - |
| orden | INTEGER | ✗ | - | - |

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

- **id_nivelTax** → [tax_nivelTax](../taxonomia/tax_nivelTax) - Referencia a tax_nivelTax

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Taxonomía
- Nombre real en base de datos: `tax_objetoTax`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [tax_objetoTax] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [tax_objetoTax] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
