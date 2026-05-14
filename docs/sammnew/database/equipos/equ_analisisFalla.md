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

- **id_catalogo_equipo** → [catalogo_equipo](../general/catalogo_equipo) - Referencia a catalogo_equipo
- **id_falla** → [unknown_falla](../general/unknown_falla) - Referencia a unknown_falla
- **id_falla_causa** → [falla_causa](../general/falla_causa) - Referencia a falla_causa
- **id_falla_efecto** → [falla_efecto](../general/falla_efecto) - Referencia a falla_efecto
- **id_falla_solucion** → [falla_solucion](../general/falla_solucion) - Referencia a falla_solucion

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
