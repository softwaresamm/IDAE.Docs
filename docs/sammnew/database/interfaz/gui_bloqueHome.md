---
sidebar_position: 3
title: gui_bloqueHome
description: Tabla gui_bloqueHome del módulo Interfaz
tags: [database, gui]
---

# gui_bloqueHome

## Descripción

Tabla gui_bloqueHome del módulo Interfaz.

**Módulo**: Interfaz  
**Prefijo**: `gui_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| bloqueHome | VARCHAR | ✗ | - | - |
| bloqueHome_codigo | VARCHAR | ✓ | - | - |
| nombreControl | VARCHAR | ✗ | - | - |
| urlBusqueda | VARCHAR | ✗ | - | - |
| urlNuevo | VARCHAR | ✗ | - | - |
| orden | INTEGER | ✗ | - | - |
| colorModulo | VARCHAR | ✗ | - | - |
| esGenerico | BIT | ✗ | - | - |
| filtro | VARCHAR | ✗ | - | - |
| actualizacion | BIT | ✓ | - | - |

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

*Esta tabla no tiene relaciones salientes definidas.*

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Interfaz
- Nombre real en base de datos: `gui_bloqueHome`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [gui_bloqueHome] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [gui_bloqueHome] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
