---
sidebar_position: 5
title: ort_programacionHistorico
description: Tabla para gestionar programacionHistorico en el sistema SAMM
tags: [database, ort]
---

# ort_programacionHistorico

## Descripción

Tabla para gestionar programacionHistorico en el sistema SAMM.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| programacionHistorico | VARCHAR | ✓ | - | - | - |
| programacionHistorico_codigo | VARCHAR | ✓ | - | - | - |
| id_programacion | INTEGER | ✓ | FK | - | - |
| id_usuario_actual | INTEGER | ✓ | FK | - | - |
| id_usuario_programado | INTEGER | ✓ | FK | - | - |
| fecha_programacion | DATETIME | ✓ | - | - | - |
| fecha_nueva_programacion | DATETIME | ✓ | - | - | - |
| duracion | DECIMAL | ✓ | - | - | - |
| id_motivo | INTEGER | ✓ | FK | - | - |
| comentario | VARCHAR | ✓ | - | - | - |

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

- **id_programacion** → [unknown_programacion](../general/unknown_programacion) - Referencia a unknown_programacion
- **id_usuario_actual** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_usuario_programado** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_motivo** → [unknown_motivo](../general/unknown_motivo) - Referencia a unknown_motivo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ort_programacionHistorico WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ort_programacionHistorico
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
