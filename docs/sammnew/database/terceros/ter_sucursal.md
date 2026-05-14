---
sidebar_position: 8
title: ter_sucursal
description: Tabla ter_sucursal del módulo Terceros
tags: [database, ter]
---

# ter_sucursal

## Descripción

Tabla ter_sucursal del módulo Terceros.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| sucursal | VARCHAR | ✗ | - | - |
| sucursal_codigo | VARCHAR | ✓ | - | - |
| contacto | VARCHAR | ✓ | - | - |
| telefono | VARCHAR | ✗ | - | - |
| Fax | VARCHAR | ✓ | - | - |
| Email | VARCHAR | ✓ | - | - |
| Direccion | VARCHAR | ✓ | - | - |
| paraVenta | BIT | ✗ | - | - |
| paraSoporte | BIT | ✗ | - | - |
| paraAlquiler | BIT | ✗ | - | - |
| id_tercero | INTEGER | ✗ | FK | - |
| id_zona | INTEGER | ✗ | FK | - |
| id_usuario_asesor | INTEGER | ✗ | FK | - |
| id_usuario_tecnico | INTEGER | ✗ | FK | - |
| id_sucursal | INTEGER | ✗ | FK | - |
| id_estadoTercero | INTEGER | ✗ | FK | - |
| codigorecursiva | VARCHAR | ✓ | - | - |
| cargo | VARCHAR | ✗ | - | - |

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

- **id_estadoTercero** → [ter_estadoTercero](../terceros/ter_estadoTercero) - Referencia a ter_estadoTercero
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_usuario_asesor** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_usuario_tecnico** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Nombre real en base de datos: `ter_sucursal`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ter_sucursal] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ter_sucursal] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
