---
sidebar_position: 6
title: gui_funcionalidad
description: Tabla para gestionar funcionalidad en el sistema SAMM
tags: [database, gui]
---

# gui_funcionalidad

## Descripción

Tabla para gestionar funcionalidad en el sistema SAMM.

**Módulo**: Interfaz  
**Prefijo**: `gui_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| funcionalidad | VARCHAR | ✓ | - | - | - |
| funcionalidad_codigo | VARCHAR | ✓ | - | - | - |
| urlImagen | VARCHAR | ✓ | - | - | - |
| urlFormulario | VARCHAR | ✓ | - | - | - |
| targetUrl | VARCHAR | ✓ | - | - | - |
| url | VARCHAR | ✓ | - | - | - |
| toolTip | VARCHAR | ✓ | - | - | - |
| esMenu | BIT | ✓ | - | - | - |
| nombreControl | VARCHAR | ✓ | - | - | - |
| nombreComando | VARCHAR | ✓ | - | - | - |
| orden | INTEGER | ✓ | - | - | - |
| id_funcionalidad | INTEGER | ✓ | FK | - | - |
| id_tipoFuncionalidad | INTEGER | ✓ | FK | - | - |
| esMvc | BIT | ✓ | - | - | - |
| id_aplicacion | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **id_usuario_creo**: Usuario que creó el registro
- **id_usuario_modifico**: Usuario que modificó el registro
- **fechaCreacion**: Fecha y hora de creación
- **fechaModificacion**: Fecha y hora de última modificación
- **uid**: Control multiempresa (User ID)
- **eid**: Control multiempresa (Entity ID)

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_funcionalidad** → [unknown_funcionalidad](../general/unknown_funcionalidad) - Referencia a unknown_funcionalidad
- **id_tipoFuncionalidad** → [unknown_tipoFuncionalidad](../general/unknown_tipoFuncionalidad) - Referencia a unknown_tipoFuncionalidad
- **id_aplicacion** → [unknown_aplicacion](../general/unknown_aplicacion) - Referencia a unknown_aplicacion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Interfaz
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gui_funcionalidad WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gui_funcionalidad
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
