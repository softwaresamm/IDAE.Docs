---
sidebar_position: 1
title: tax_nivelTax
description: Tabla para gestionar nivelTax en el sistema SAMM
tags: [database, tax]
---

# tax_nivelTax

## Descripción

Tabla para gestionar nivelTax en el sistema SAMM.

**Módulo**: Taxonomía  
**Prefijo**: `tax_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| nivelTax | VARCHAR | ✓ | - | - | - |
| nivelTax_codigo | VARCHAR | ✓ | - | - | - |
| id_nivelTax | INTEGER | ✓ | FK | - | - |
| tabla | VARCHAR | ✓ | - | - | - |
| filtro | VARCHAR | ✓ | - | - | - |
| columnaPrincipal | VARCHAR | ✓ | - | - | - |
| esEquipo | BIT | ✓ | - | - | - |

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
SELECT * FROM tax_nivelTax WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM tax_nivelTax
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
