---
sidebar_position: 1
title: tax_nivelTax
description: Tabla tax_nivelTax del módulo Taxonomía
tags: [database, tax]
---

# tax_nivelTax

## Descripción

Tabla tax_nivelTax del módulo Taxonomía.

**Módulo**: Taxonomía  
**Prefijo**: `tax_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| nivelTax | VARCHAR | ✗ | - | - |
| nivelTax_codigo | VARCHAR | ✓ | - | - |
| id_nivelTax | INTEGER | ✗ | FK | - |
| tabla | VARCHAR | ✗ | - | - |
| filtro | VARCHAR | ✗ | - | - |
| columnaPrincipal | VARCHAR | ✗ | - | - |
| esEquipo | BIT | ✗ | - | - |

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
- Nombre real en base de datos: `tax_nivelTax`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [tax_nivelTax] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [tax_nivelTax] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
