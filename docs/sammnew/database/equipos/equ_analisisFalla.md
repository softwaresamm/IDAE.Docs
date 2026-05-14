---
sidebar_position: 2
title: equ_analisisFalla
description: Tabla para gestionar analisisFalla en el sistema SAMM
tags: [database, equ]
---

# equ_analisisFalla

## Descripción

Tabla para gestionar analisisFalla en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| analisisFalla | VARCHAR | ✓ | - | - | - |
| analisisFalla_codigo | VARCHAR | ✓ | - | - | - |
| id_catalogo_equipo | INTEGER | ✓ | FK | - | - |
| id_falla | INTEGER | ✓ | FK | - | - |
| id_falla_causa | INTEGER | ✓ | FK | - | - |
| id_falla_efecto | INTEGER | ✓ | FK | - | - |
| id_falla_solucion | INTEGER | ✓ | FK | - | - |

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

- **id_catalogo_equipo** → [cat_catalogo_equipo](../catalogo/cat_catalogo_equipo) - Referencia a cat_catalogo_equipo
- **id_falla** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla_causa** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla_efecto** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla_solucion** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_analisisFalla WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_analisisFalla
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
