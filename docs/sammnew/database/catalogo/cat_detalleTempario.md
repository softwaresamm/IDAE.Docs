---
sidebar_position: 16
title: cat_detalleTempario
description: Tabla para gestionar detalleTempario en el sistema SAMM
tags: [database, cat]
---

# cat_detalleTempario

## Descripción

Tabla para gestionar detalleTempario en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| detalleTempario | VARCHAR | ✓ | - | - | - |
| detalleTempario_codigo | VARCHAR | ✓ | - | - | - |
| cantidadEstandar | DECIMAL | ✓ | - | - | - |
| orden | INTEGER | ✓ | - | - | - |
| cantidadTropicalizada | DECIMAL | ✓ | - | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |
| id_catalogo_tempario | INTEGER | ✓ | FK | - | - |
| id_pruebaCheckList | INTEGER | ✓ | FK | - | - |
| id_Sistema | INTEGER | ✓ | FK | - | - |
| id_detalleTempario_padre | INTEGER | ✓ | FK | - | - |

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

- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_catalogo_tempario** → [catalogo_tempario](../general/catalogo_tempario) - Referencia a catalogo_tempario
- **id_pruebaCheckList** → [unknown_pruebaCheckList](../general/unknown_pruebaCheckList) - Referencia a unknown_pruebaCheckList
- **id_Sistema** → [unknown_Sistema](../general/unknown_Sistema) - Referencia a unknown_Sistema
- **id_detalleTempario_padre** → [detalleTempario_padre](../general/detalleTempario_padre) - Referencia a detalleTempario_padre

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_detalleTempario WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_detalleTempario
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
