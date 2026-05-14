---
sidebar_position: 1
title: alq_detallealquiler_itemdocumento
description: Tabla para gestionar detallealquiler_itemdocumento en el sistema SAMM
tags: [database, alq]
---

# alq_detallealquiler_itemdocumento

## Descripción

Tabla para gestionar detallealquiler_itemdocumento en el sistema SAMM.

**Módulo**: Alquileres  
**Prefijo**: `alq_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| detallealquiler_itemdocumento | VARCHAR | ✓ | - | - | - |
| id_detallealquiler | INTEGER | ✓ | FK | - | - |
| id_itemdocumento | INTEGER | ✓ | FK | - | - |

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

- **id_detallealquiler** → [unknown_detallealquiler](../general/unknown_detallealquiler) - Referencia a unknown_detallealquiler
- **id_itemdocumento** → [unknown_itemdocumento](../general/unknown_itemdocumento) - Referencia a unknown_itemdocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Alquileres
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM alq_detallealquiler_itemdocumento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM alq_detallealquiler_itemdocumento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
