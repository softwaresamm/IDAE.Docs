---
sidebar_position: 2
title: tax_objetoTax
description: Tabla para gestionar objetoTax en el sistema SAMM
tags: [database, tax]
---

# tax_objetoTax

## Descripción

Tabla para gestionar objetoTax en el sistema SAMM.

**Módulo**: Taxonomía  
**Prefijo**: `tax_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| objetoTax | VARCHAR | ✓ | - | - | - |
| objetoTax_codigo | VARCHAR | ✓ | - | - | - |
| tabla | VARCHAR | ✓ | - | - | - |
| idTablaTax | INTEGER | ✓ | - | - | - |
| idObjTax | INTEGER | ✓ | - | - | - |
| id_nivelTax | INTEGER | ✓ | FK | - | - |
| orden | INTEGER | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_nivelTax** → [unknown_nivelTax](../general/unknown_nivelTax) - Referencia a unknown_nivelTax

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Taxonomía
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM tax_objetoTax WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM tax_objetoTax
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
