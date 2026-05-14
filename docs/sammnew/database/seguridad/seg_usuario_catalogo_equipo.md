---
sidebar_position: 15
title: seg_usuario_catalogo.equipo
description: Tabla seg_usuario_catalogo.equipo del módulo Seguridad
tags: [database, seg]
---

# seg_usuario_catalogo.equipo

## Descripción

Tabla seg_usuario_catalogo.equipo del módulo Seguridad.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| usuario_catalogo.equipo | VARCHAR | ✗ | - | - |
| id_usuario | INTEGER | ✗ | FK | - |
| id_tipoServicio | INTEGER | ✗ | FK | - |
| id_catalogo.equipo | INTEGER | ✗ | FK | - |

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
- **id_tipoServicio** → [gen_tipoServicio](../general/gen_tipoServicio) - Referencia a gen_tipoServicio
- **id_catalogo.equipo** → [cat_catalogo.equipo](../catalogo/cat_catalogo_equipo) - Referencia a cat_catalogo.equipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Nombre real en base de datos: `seg_usuario_catalogo.equipo`
- El punto en el nombre separa el tipo de documento del subtipo

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [seg_usuario_catalogo.equipo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [seg_usuario_catalogo.equipo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
