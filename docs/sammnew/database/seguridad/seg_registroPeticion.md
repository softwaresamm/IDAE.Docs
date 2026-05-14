---
sidebar_position: 11
title: seg_registroPeticion
description: Tabla seg_registroPeticion del módulo Seguridad
tags: [database, seg]
---

# seg_registroPeticion

## Descripción

Tabla seg_registroPeticion del módulo Seguridad.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| registroPeticion | VARCHAR | ✗ | - | - |
| registroPeticion_codigo | VARCHAR | ✓ | - | - |
| urlServicio | VARCHAR | ✗ | - | - |
| modulo | VARCHAR | ✗ | - | - |
| aplicacion | VARCHAR | ✗ | - | - |
| esExitosa | BIT | ✗ | - | - |
| mensajeRespuesta | VARCHAR | ✓ | - | - |
| id_usuario | INTEGER | ✗ | FK | - |
| tamanoPeticion | FLOAT | ✓ | - | - |

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

- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Nombre real en base de datos: `seg_registroPeticion`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [seg_registroPeticion] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [seg_registroPeticion] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
