---
sidebar_position: 9
title: seg_perfil_tercero
description: Tabla seg_perfil_tercero del módulo Seguridad
tags: [database, seg]
---

# seg_perfil_tercero

## Descripción

Tabla seg_perfil_tercero del módulo Seguridad.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| perfil_tercero | VARCHAR | ✗ | - | - |
| id_perfil | INTEGER | ✗ | FK | - |
| id_tercero | INTEGER | ✗ | FK | - |

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

- **id_perfil** → [seg_perfil](../seguridad/seg_perfil) - Referencia a seg_perfil
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Nombre real en base de datos: `seg_perfil_tercero`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [seg_perfil_tercero] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [seg_perfil_tercero] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
