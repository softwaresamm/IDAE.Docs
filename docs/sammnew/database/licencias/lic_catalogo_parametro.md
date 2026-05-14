---
sidebar_position: 1
title: lic_catalogo_parametro
description: Tabla para gestionar catalogo_parametro en el sistema SAMM
tags: [database, lic]
---

# lic_catalogo_parametro

## Descripción

Tabla para gestionar catalogo_parametro en el sistema SAMM.

**Módulo**: Licencias  
**Prefijo**: `lic_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| catalogo_parametro | VARCHAR | ✓ | - | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |
| id_parametro | INTEGER | ✓ | FK | - | - |
| valorXdefecto | VARCHAR | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_parametro** → [unknown_parametro](../general/unknown_parametro) - Referencia a unknown_parametro

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Licencias
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM lic_catalogo_parametro WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM lic_catalogo_parametro
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
