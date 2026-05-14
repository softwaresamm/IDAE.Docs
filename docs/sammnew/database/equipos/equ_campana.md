---
sidebar_position: 3
title: equ_campana
description: Tabla para gestionar campana en el sistema SAMM
tags: [database, equ]
---

# equ_campana

## Descripción

Tabla para gestionar campana en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| campana | VARCHAR | ✓ | - | - | - |
| campana_codigo | VARCHAR | ✓ | - | - | - |
| detalleCampana | VARCHAR | ✓ | - | - | - |
| fechaInicio_ff | DATE | ✓ | - | - | - |
| fechafin_ff | DATE | ✓ | - | - | - |
| activo | BIT | ✓ | - | - | - |
| id_tercero | INTEGER | ✓ | FK | - | - |
| id_catalogo_tempario | INTEGER | ✓ | FK | - | - |

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

- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_catalogo_tempario** → [catalogo_tempario](../general/catalogo_tempario) - Referencia a catalogo_tempario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_campana WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_campana
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
