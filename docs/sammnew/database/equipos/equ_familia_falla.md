---
sidebar_position: 14
title: equ_familia_falla
description: Tabla para gestionar familia_falla en el sistema SAMM
tags: [database, equ]
---

# equ_familia_falla

## Descripción

Tabla para gestionar familia_falla en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| familia_falla | VARCHAR | ✓ | - | - | - |
| id_familia | INTEGER | ✓ | FK | - | - |
| id_falla | INTEGER | ✓ | FK | - | - |

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

- **id_familia** → [gen_familia](../general/gen_familia) - Referencia a gen_familia
- **id_falla** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_familia_falla WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_familia_falla
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
