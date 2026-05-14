---
sidebar_position: 31
title: cat_tarifaCatalogo
description: Tabla para gestionar tarifaCatalogo en el sistema SAMM
tags: [database, cat]
---

# cat_tarifaCatalogo

## Descripción

Tabla para gestionar tarifaCatalogo en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| tarifaCatalogo | VARCHAR | ✓ | - | - | - |
| tarifaCatalogo_codigo | VARCHAR | ✓ | - | - | - |
| id_catalogo_tarifa | INTEGER | ✓ | FK | - | - |
| id_catalogo_elemento | INTEGER | ✓ | FK | - | - |
| id_tipotarifa | INTEGER | ✓ | FK | - | - |

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

- **id_catalogo_tarifa** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_catalogo_elemento** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_tarifaCatalogo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_tarifaCatalogo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
