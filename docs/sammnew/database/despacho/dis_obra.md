---
sidebar_position: 7
title: dis_obra
description: Tabla dis_obra del módulo Despacho
tags: [database, dis]
---

# dis_obra

## Descripción

Tabla dis_obra del módulo Despacho.

**Módulo**: Despacho  
**Prefijo**: `dis_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| obra | VARCHAR | ✗ | - | - |
| obra_codigo | VARCHAR | ✓ | - | - |
| fechaInicial_ff | DATETIME | ✗ | - | - |
| fechaFinal_ff | DATETIME | ✓ | - | - |
| id_sucursal | INTEGER | ✗ | FK | - |

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

- Esta tabla forma parte del módulo Despacho
- Nombre real en base de datos: `dis_obra`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [dis_obra] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [dis_obra] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
