---
sidebar_position: 19
title: pro_recursoFisico
description: Tabla pro_recursoFisico del módulo Proyectos
tags: [database, pro]
---

# pro_recursoFisico

## Descripción

Tabla pro_recursoFisico del módulo Proyectos.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| recursoFisico | VARCHAR | ✗ | - | - |
| recursoFisico_codigo | VARCHAR | ✓ | - | - |
| costo | FLOAT | ✗ | - | - |
| unidadTiempo | VARCHAR | ✗ | - | - |
| esPropio | BIT | ✗ | - | - |
| id_equipo | INTEGER | ✗ | FK | - |
| id_catalogo | INTEGER | ✗ | FK | - |

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

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Nombre real en base de datos: `pro_recursoFisico`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [pro_recursoFisico] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [pro_recursoFisico] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
