---
sidebar_position: 3
title: lic_licencia_parametro
description: Tabla para gestionar licencia_parametro en el sistema SAMM
tags: [database, lic]
---

# lic_licencia_parametro

## Descripción

Tabla para gestionar licencia_parametro en el sistema SAMM.

**Módulo**: Licencias  
**Prefijo**: `lic_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| licencia_parametro | VARCHAR | ✓ | - | - | - |
| id_licencia | INTEGER | ✓ | FK | - | - |
| id_parametro | INTEGER | ✓ | FK | - | - |
| valor | VARCHAR | ✓ | - | - | - |
| esParteSerial | BIT | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_licencia** → [unknown_licencia](../general/unknown_licencia) - Referencia a unknown_licencia
- **id_parametro** → [unknown_parametro](../general/unknown_parametro) - Referencia a unknown_parametro

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Licencias
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM lic_licencia_parametro WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM lic_licencia_parametro
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
