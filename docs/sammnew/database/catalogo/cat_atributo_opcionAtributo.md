---
sidebar_position: 2
title: cat_atributo_opcionAtributo
description: Tabla para gestionar atributo_opcionAtributo en el sistema SAMM
tags: [database, cat]
---

# cat_atributo_opcionAtributo

## Descripción

Tabla para gestionar atributo_opcionAtributo en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| atributo_opcionAtributo | VARCHAR | ✓ | - | - | - |
| id_atributo | INTEGER | ✓ | FK | - | - |
| id_opcionAtributo | INTEGER | ✓ | FK | - | - |

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

- **id_atributo** → [unknown_atributo](../general/unknown_atributo) - Referencia a unknown_atributo
- **id_opcionAtributo** → [unknown_opcionAtributo](../general/unknown_opcionAtributo) - Referencia a unknown_opcionAtributo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_atributo_opcionAtributo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_atributo_opcionAtributo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
