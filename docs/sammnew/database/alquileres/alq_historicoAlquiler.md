---
sidebar_position: 3
title: alq_historicoAlquiler
description: Tabla para gestionar historicoAlquiler en el sistema SAMM
tags: [database, alq]
---

# alq_historicoAlquiler

## Descripción

Tabla para gestionar historicoAlquiler en el sistema SAMM.

**Módulo**: Alquileres  
**Prefijo**: `alq_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| historicoAlquiler | VARCHAR | ✓ | - | - | - |
| historicoAlquiler_codigo | VARCHAR | ✓ | - | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_estadoEquipo | INTEGER | ✓ | FK | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |
| fechaEstado | DATETIME | ✓ | - | - | - |

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

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_estadoEquipo** → [unknown_estadoEquipo](../general/unknown_estadoEquipo) - Referencia a unknown_estadoEquipo
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Alquileres
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM alq_historicoAlquiler WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM alq_historicoAlquiler
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
