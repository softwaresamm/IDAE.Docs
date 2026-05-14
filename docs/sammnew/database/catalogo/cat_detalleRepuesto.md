---
sidebar_position: 15
title: cat_detalleRepuesto
description: Tabla para gestionar detalleRepuesto en el sistema SAMM
tags: [database, cat]
---

# cat_detalleRepuesto

## Descripción

Tabla para gestionar detalleRepuesto en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| detalleRepuesto | VARCHAR | ✓ | - | - | - |
| detalleRepuesto_codigo | VARCHAR | ✓ | - | - | - |
| cantidad | DECIMAL | ✓ | - | - | - |
| id_catalogo_repuesto | INTEGER | ✓ | FK | - | - |
| id_catalogo_repuesto_hijo | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_catalogo_repuesto** → [catalogo_repuesto](../general/catalogo_repuesto) - Referencia a catalogo_repuesto
- **id_catalogo_repuesto_hijo** → [catalogo_repuesto_hijo](../general/catalogo_repuesto_hijo) - Referencia a catalogo_repuesto_hijo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_detalleRepuesto WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_detalleRepuesto
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
