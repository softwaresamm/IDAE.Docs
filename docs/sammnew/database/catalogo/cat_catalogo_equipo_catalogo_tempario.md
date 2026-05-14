---
sidebar_position: 8
title: cat_catalogo_equipo_catalogo_tempario
description: Tabla para gestionar catalogo_equipo_catalogo_tempario en el sistema SAMM
tags: [database, cat]
---

# cat_catalogo_equipo_catalogo_tempario

## Descripción

Tabla para gestionar catalogo_equipo_catalogo_tempario en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| catalogo_equipo_catalogo_tempario | VARCHAR | ✓ | - | - | - |
| id_catalogo_equipo | INTEGER | ✓ | FK | - | - |
| id_catalogo_tempario | INTEGER | ✓ | FK | - | - |

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

- **id_catalogo_equipo** → [cat_catalogo_equipo](../catalogo/cat_catalogo_equipo) - Referencia a cat_catalogo_equipo
- **id_catalogo_tempario** → [cat_catalogo_tempario](../catalogo/cat_catalogo_tempario) - Referencia a cat_catalogo_tempario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_catalogo_equipo_catalogo_tempario WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_catalogo_equipo_catalogo_tempario
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
