---
sidebar_position: 2
title: ter_contacto
description: Tabla ter_contacto del módulo Terceros
tags: [database, ter]
---

# ter_contacto

## Descripción

Tabla ter_contacto del módulo Terceros.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| contacto | VARCHAR | ✗ | - | - |
| contacto_codigo | VARCHAR | ✓ | - | - |
| telefono | VARCHAR | ✗ | - | - |
| Fax | VARCHAR | ✓ | - | - |
| Email | VARCHAR | ✓ | - | - |
| Direccion | VARCHAR | ✓ | - | - |
| telefonoMovil | VARCHAR | ✓ | - | - |
| id_tercero | INTEGER | ✗ | FK | - |
| id_usuario | INTEGER | ✗ | FK | - |
| cargo | NVARCHAR | ✓ | - | - |
| codigoAcceso | VARCHAR | ✓ | - | - |
| id_cargoContacto | INTEGER | ✓ | FK | - |
| accesoActivo | BIT | ✗ | - | - |
| ter_cargoContacto_id_usuario_Modifico | INTEGER | ✓ | - | - |
| ter_cargoContacto_id_usuario_Creo | INTEGER | ✓ | - | - |

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

- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Nombre real en base de datos: `ter_contacto`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ter_contacto] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ter_contacto] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
