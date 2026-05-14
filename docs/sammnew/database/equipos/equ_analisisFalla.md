---
sidebar_position: 2
title: equ_analisisFalla
description: Tabla equ_analisisFalla del módulo Equipos
tags: [database, equ]
---

# equ_analisisFalla

## Descripción

Tabla equ_analisisFalla del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| analisisFalla | VARCHAR | ✗ | - | - |
| analisisFalla_codigo | VARCHAR | ✓ | - | - |
| id_catalogo.equipo | INTEGER | ✗ | FK | - |
| id_falla | INTEGER | ✗ | FK | - |
| id_falla_causa | INTEGER | ✗ | FK | - |
| id_falla_efecto | INTEGER | ✗ | FK | - |
| id_falla_solucion | INTEGER | ✗ | FK | - |

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

- **id_falla** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla_causa** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla_efecto** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla_solucion** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_catalogo.equipo** → [cat_catalogo.equipo](../catalogo/cat_catalogo_equipo) - Referencia a cat_catalogo.equipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_analisisFalla`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_analisisFalla] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_analisisFalla] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
