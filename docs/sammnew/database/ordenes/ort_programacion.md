---
sidebar_position: 4
title: ort_programacion
description: Tabla para gestionar programacion en el sistema SAMM
tags: [database, ort]
---

# ort_programacion

## Descripción

Tabla para gestionar programacion en el sistema SAMM.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| programacion | VARCHAR | ✓ | - | - | - |
| programacion_codigo | VARCHAR | ✓ | - | - | - |
| desde_fh | DATETIME | ✓ | - | - | - |
| duracion | DECIMAL | ✓ | - | - | - |
| comentario | VARCHAR | ✓ | - | - | - |
| id_usuario | INTEGER | ✓ | FK | - | - |
| id_tipoProgramacion | INTEGER | ✓ | FK | - | - |
| id_motivoCancelacion | INTEGER | ✓ | FK | - | - |
| id_documento_ot | INTEGER | ✓ | FK | - | - |
| id_programacion | INTEGER | ✓ | FK | - | - |
| id_reporteTecnico | INTEGER | ✓ | FK | - | - |
| id_catalogo_actividad | INTEGER | ✓ | FK | - | - |
| costo | DECIMAL | ✓ | - | - | - |
| id_soporteItemDocumento | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_tipoProgramacion** → [unknown_tipoProgramacion](../general/unknown_tipoProgramacion) - Referencia a unknown_tipoProgramacion
- **id_motivoCancelacion** → [unknown_motivoCancelacion](../general/unknown_motivoCancelacion) - Referencia a unknown_motivoCancelacion
- **id_documento_ot** → [documento_ot](../general/documento_ot) - Referencia a documento_ot
- **id_programacion** → [unknown_programacion](../general/unknown_programacion) - Referencia a unknown_programacion
- **id_reporteTecnico** → [unknown_reporteTecnico](../general/unknown_reporteTecnico) - Referencia a unknown_reporteTecnico
- **id_catalogo_actividad** → [catalogo_actividad](../general/catalogo_actividad) - Referencia a catalogo_actividad
- **id_soporteItemDocumento** → [unknown_soporteItemDocumento](../general/unknown_soporteItemDocumento) - Referencia a unknown_soporteItemDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ort_programacion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ort_programacion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
