---
sidebar_position: 16
title: equ_opcionAtributoDependiente
description: Tabla para gestionar opcionAtributoDependiente en el sistema SAMM
tags: [database, equ]
---

# equ_opcionAtributoDependiente

## Descripción

Tabla para gestionar opcionAtributoDependiente en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| opcionAtributoDependiente | VARCHAR | ✓ | - | - | - |
| opcionAtributoDependiente_codigo | VARCHAR | ✓ | - | - | - |
| id_opcionAtributo_hijo | INTEGER | ✓ | FK | - | - |
| id_opcionAtributo_padre | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_opcionAtributo_hijo** → [opcionAtributo_hijo](../general/opcionAtributo_hijo) - Referencia a opcionAtributo_hijo
- **id_opcionAtributo_padre** → [opcionAtributo_padre](../general/opcionAtributo_padre) - Referencia a opcionAtributo_padre

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_opcionAtributoDependiente WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_opcionAtributoDependiente
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
