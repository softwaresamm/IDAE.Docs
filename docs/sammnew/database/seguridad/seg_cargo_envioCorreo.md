---
sidebar_position: 3
title: seg_cargo_envioCorreo
description: Tabla seg_cargo_envioCorreo del módulo Seguridad
tags: [database, seg]
---

# seg_cargo_envioCorreo

## Descripción

Tabla seg_cargo_envioCorreo del módulo Seguridad.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| cargo_envioCorreo | VARCHAR | ✗ | - | - |
| id_cargo | INTEGER | ✗ | FK | - |
| id_envioCorreo | INTEGER | ✗ | FK | - |

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

- **id_envioCorreo** → [gen_envioCorreo](../general/gen_envioCorreo) - Referencia a gen_envioCorreo
- **id_cargo** → [seg_cargo](../seguridad/seg_cargo) - Referencia a seg_cargo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Nombre real en base de datos: `seg_cargo_envioCorreo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [seg_cargo_envioCorreo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [seg_cargo_envioCorreo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
