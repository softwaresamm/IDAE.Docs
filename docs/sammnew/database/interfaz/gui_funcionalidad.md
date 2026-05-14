---
sidebar_position: 6
title: gui_funcionalidad
description: Tabla gui_funcionalidad del módulo Interfaz
tags: [database, gui]
---

# gui_funcionalidad

## Descripción

Tabla gui_funcionalidad del módulo Interfaz.

**Módulo**: Interfaz  
**Prefijo**: `gui_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| funcionalidad | VARCHAR | ✗ | - | - |
| funcionalidad_codigo | VARCHAR | ✓ | - | - |
| urlImagen | VARCHAR | ✓ | - | - |
| urlFormulario | VARCHAR | ✓ | - | - |
| targetUrl | VARCHAR | ✓ | - | - |
| url | VARCHAR | ✓ | - | - |
| toolTip | VARCHAR | ✓ | - | - |
| esMenu | BIT | ✗ | - | - |
| nombreControl | VARCHAR | ✓ | - | - |
| nombreComando | VARCHAR | ✓ | - | - |
| orden | INTEGER | ✗ | - | - |
| id_funcionalidad | INTEGER | ✗ | FK | - |
| id_tipoFuncionalidad | INTEGER | ✗ | FK | - |
| esMvc | BIT | ✓ | - | - |
| id_aplicacion | INTEGER | ✗ | FK | - |

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

- **id_aplicacion** → [gui_aplicacion](../interfaz/gui_aplicacion) - Referencia a gui_aplicacion
- **id_funcionalidad** → [gui_funcionalidad](../interfaz/gui_funcionalidad) - Referencia a gui_funcionalidad
- **id_tipoFuncionalidad** → [gui_tipoFuncionalidad](../interfaz/gui_tipoFuncionalidad) - Referencia a gui_tipoFuncionalidad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Interfaz
- Nombre real en base de datos: `gui_funcionalidad`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [gui_funcionalidad] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [gui_funcionalidad] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
