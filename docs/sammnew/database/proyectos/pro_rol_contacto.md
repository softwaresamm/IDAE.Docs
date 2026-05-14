---
sidebar_position: 22
title: pro_rol_contacto
description: Tabla pro_rol_contacto del módulo Proyectos
tags: [database, pro]
---

# pro_rol_contacto

## Descripción

Tabla pro_rol_contacto del módulo Proyectos.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| rol_contacto | VARCHAR | ✗ | - | - |
| id_rol | INTEGER | ✗ | FK | - |
| id_contacto | INTEGER | ✗ | FK | - |

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

- **id_contacto** → [ter_contacto](../terceros/ter_contacto) - Referencia a ter_contacto
- **id_rol** → [pro_rol](../proyectos/pro_rol) - Referencia a pro_rol

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Nombre real en base de datos: `pro_rol_contacto`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [pro_rol_contacto] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [pro_rol_contacto] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
