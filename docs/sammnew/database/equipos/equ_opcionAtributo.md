---
sidebar_position: 15
title: equ_opcionAtributo
description: Tabla para gestionar opcionAtributo en el sistema SAMM
tags: [database, equ]
---

# equ_opcionAtributo

## Descripción

Tabla para gestionar opcionAtributo en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| opcionAtributo | VARCHAR | ✓ | - | - | - |
| opcionAtributo_codigo | VARCHAR | ✓ | - | - | - |
| orden | INTEGER | ✓ | - | - | - |
| id_atributo | INTEGER | ✓ | FK | - | - |

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

- **id_atributo** → [cat_atributo](../catalogo/cat_atributo) - Referencia a cat_atributo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_opcionAtributo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_opcionAtributo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
