---
sidebar_position: 9
title: cat_catalogo_equipo_pruebaCheckList
description: Tabla para gestionar catalogo_equipo_pruebaCheckList en el sistema SAMM
tags: [database, cat]
---

# cat_catalogo_equipo_pruebaCheckList

## Descripción

Tabla para gestionar catalogo_equipo_pruebaCheckList en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| catalogo_equipo_pruebaCheckList | VARCHAR | ✓ | - | - | - |
| id_pruebaCheckList | INTEGER | ✓ | FK | - | - |
| id_catalogo_equipo | INTEGER | ✓ | FK | - | - |

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

- **id_pruebaCheckList** → [unknown_pruebaCheckList](../general/unknown_pruebaCheckList) - Referencia a unknown_pruebaCheckList
- **id_catalogo_equipo** → [catalogo_equipo](../general/catalogo_equipo) - Referencia a catalogo_equipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_catalogo_equipo_pruebaCheckList WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_catalogo_equipo_pruebaCheckList
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
