---
sidebar_position: 9
title: equ_equipoAtributo
description: Tabla para gestionar equipoAtributo en el sistema SAMM
tags: [database, equ]
---

# equ_equipoAtributo

## Descripción

Tabla para gestionar equipoAtributo en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| equipoAtributo | VARCHAR | ✓ | - | - | - |
| equipoAtributo_codigo | VARCHAR | ✓ | - | - | - |
| fecha_ff | DATE | ✓ | - | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_documento_ot | INTEGER | ✓ | FK | - | - |
| id_atributo | INTEGER | ✓ | FK | - | - |
| id_opcionAtributo | INTEGER | ✓ | FK | - | - |
| id_reporteTecnico | INTEGER | ✓ | FK | - | - |
| id_pruebaCheckList | INTEGER | ✓ | FK | - | - |
| id_evento | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_documento_ot** → [documento_ot](../general/documento_ot) - Referencia a documento_ot
- **id_atributo** → [unknown_atributo](../general/unknown_atributo) - Referencia a unknown_atributo
- **id_opcionAtributo** → [unknown_opcionAtributo](../general/unknown_opcionAtributo) - Referencia a unknown_opcionAtributo
- **id_reporteTecnico** → [unknown_reporteTecnico](../general/unknown_reporteTecnico) - Referencia a unknown_reporteTecnico
- **id_pruebaCheckList** → [unknown_pruebaCheckList](../general/unknown_pruebaCheckList) - Referencia a unknown_pruebaCheckList
- **id_evento** → [unknown_evento](../general/unknown_evento) - Referencia a unknown_evento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_equipoAtributo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_equipoAtributo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
