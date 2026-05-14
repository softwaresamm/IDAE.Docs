---
sidebar_position: 19
title: equ_prestamo
description: Tabla para gestionar prestamo en el sistema SAMM
tags: [database, equ]
---

# equ_prestamo

## Descripción

Tabla para gestionar prestamo en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| prestamo | VARCHAR | ✓ | - | - | - |
| prestamo_codigo | VARCHAR | ✓ | - | - | - |
| fechaPrestamo_ff | DATE | ✓ | - | - | - |
| fechaCompromiso_ff | DATE | ✓ | - | - | - |
| notas | VARCHAR | ✓ | - | - | - |
| id_estadoPrestamo | INTEGER | ✓ | FK | - | - |
| id_usuario_entrego | INTEGER | ✓ | FK | - | - |

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

- **id_estadoPrestamo** → [equ_estadoPrestamo](../equipos/equ_estadoPrestamo) - Referencia a equ_estadoPrestamo
- **id_usuario_entrego** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_prestamo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_prestamo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
