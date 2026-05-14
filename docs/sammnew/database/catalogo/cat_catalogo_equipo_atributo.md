---
sidebar_position: 6
title: cat_catalogo.equipo_atributo
description: Tabla cat_catalogo.equipo_atributo del módulo Catálogo
tags: [database, cat]
---

# cat_catalogo.equipo_atributo

## Descripción

Tabla cat_catalogo.equipo_atributo del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| catalogo.equipo_atributo | VARCHAR | ✓ | - | - |
| valorMinimo | FLOAT | ✗ | - | - |
| ValorMaximo | FLOAT | ✗ | - | - |
| bloquearCierreOT | BIT | ✗ | - | - |
| id_atributo | INTEGER | ✗ | FK | - |
| id_catalogo.equipo | INTEGER | ✗ | FK | - |
| orden | INTEGER | ✗ | - | - |

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

- **id_atributo** → [cat_atributo](../catalogo/cat_atributo) - Referencia a cat_atributo
- **id_catalogo.equipo** → [cat_catalogo.equipo](../catalogo/cat_catalogo_equipo) - Referencia a cat_catalogo.equipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_catalogo.equipo_atributo`
- El punto en el nombre separa el tipo de documento del subtipo

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_catalogo.equipo_atributo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_catalogo.equipo_atributo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
