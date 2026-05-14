---
sidebar_position: 3
title: gui_bloqueHome
description: Tabla para gestionar bloqueHome en el sistema SAMM
tags: [database, gui]
---

# gui_bloqueHome

## Descripción

Tabla para gestionar bloqueHome en el sistema SAMM.

**Módulo**: Interfaz  
**Prefijo**: `gui_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| bloqueHome | VARCHAR | ✓ | - | - | - |
| bloqueHome_codigo | VARCHAR | ✓ | - | - | - |
| nombreControl | VARCHAR | ✓ | - | - | - |
| urlBusqueda | VARCHAR | ✓ | - | - | - |
| urlNuevo | VARCHAR | ✓ | - | - | - |
| orden | INTEGER | ✓ | - | - | - |
| colorModulo | VARCHAR | ✓ | - | - | - |
| esGenerico | BIT | ✓ | - | - | - |
| filtro | VARCHAR | ✓ | - | - | - |
| actualizacion | BIT | ✓ | - | - | - |

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

*Esta tabla no tiene relaciones salientes (foreign keys).*

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Interfaz
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gui_bloqueHome WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gui_bloqueHome
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
