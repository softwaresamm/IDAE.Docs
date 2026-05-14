---
sidebar_position: 2
title: lic_licencia
description: Tabla para gestionar licencia en el sistema SAMM
tags: [database, lic]
---

# lic_licencia

## Descripción

Tabla para gestionar licencia en el sistema SAMM.

**Módulo**: Licencias  
**Prefijo**: `lic_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| licencia | VARCHAR | ✓ | - | - | - |
| licencia_codigo | VARCHAR | ✓ | - | - | - |
| serial | VARCHAR | ✓ | - | - | - |
| clave | VARCHAR | ✓ | - | - | - |
| fechaInicio_ff | DATE | ✓ | - | - | - |
| fechaFin_ff | DATE | ✓ | - | - | - |
| id_tercero | INTEGER | ✓ | FK | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Licencias
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM lic_licencia WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM lic_licencia
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
