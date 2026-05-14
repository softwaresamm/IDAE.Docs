---
sidebar_position: 2
title: pro_actividadPredecesora
description: Tabla para gestionar actividadPredecesora en el sistema SAMM
tags: [database, pro]
---

# pro_actividadPredecesora

## Descripción

Tabla para gestionar actividadPredecesora en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| actividadPredecesora | VARCHAR | ✓ | - | - | - |
| actividadPredecesora_codigo | VARCHAR | ✓ | - | - | - |
| id_actividad_origen | INTEGER | ✓ | FK | - | - |
| id_actividad_destino | INTEGER | ✓ | FK | - | - |

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

- **id_actividad_origen** → [pro_actividad](../proyectos/pro_actividad) - Referencia a pro_actividad
- **id_actividad_destino** → [pro_actividad](../proyectos/pro_actividad) - Referencia a pro_actividad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_actividadPredecesora WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_actividadPredecesora
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
