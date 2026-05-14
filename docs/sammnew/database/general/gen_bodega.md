---
sidebar_position: 3
title: gen_bodega
description: Tabla gen_bodega del módulo General / Configuración
tags: [database, gen]
---

# gen_bodega

## Descripción

Tabla gen_bodega del módulo General / Configuración.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| bodega | VARCHAR | ✗ | - | - |
| bodega_codigo | VARCHAR | ✓ | - | - |
| salidasEnRojo | BIT | ✗ | - | - |
| usaLocalizacion | BIT | ✗ | - | - |
| id_sucursal | INTEGER | ✓ | FK | - |

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

- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo General / Configuración
- Nombre real en base de datos: `gen_bodega`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [gen_bodega] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [gen_bodega] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
