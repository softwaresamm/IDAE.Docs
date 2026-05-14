---
sidebar_position: 23
title: cat_reemplazo
description: Tabla para gestionar reemplazo en el sistema SAMM
tags: [database, cat]
---

# cat_reemplazo

## Descripción

Tabla para gestionar reemplazo en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| reemplazo | VARCHAR | ✓ | - | - | - |
| reemplazo_codigo | VARCHAR | ✓ | - | - | - |
| id_tipoReemplazo | INTEGER | ✓ | FK | - | - |
| id_catalogo_repuesto | INTEGER | ✓ | FK | - | - |
| id_catalogo_repuesto_1 | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_tipoReemplazo** → [unknown_tipoReemplazo](../general/unknown_tipoReemplazo) - Referencia a unknown_tipoReemplazo
- **id_catalogo_repuesto** → [catalogo_repuesto](../general/catalogo_repuesto) - Referencia a catalogo_repuesto
- **id_catalogo_repuesto_1** → [catalogo_repuesto_1](../general/catalogo_repuesto_1) - Referencia a catalogo_repuesto_1

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_reemplazo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_reemplazo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
