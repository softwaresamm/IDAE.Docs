---
sidebar_position: 7
title: pro_actividad_hito
description: Tabla para gestionar actividad_hito en el sistema SAMM
tags: [database, pro]
---

# pro_actividad_hito

## Descripción

Tabla para gestionar actividad_hito en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| actividad_hito | VARCHAR | ✓ | - | - | - |
| id_hito | INTEGER | ✓ | FK | - | - |
| id_actividad | INTEGER | ✓ | FK | - | - |

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

- **id_hito** → [pro_hito](../proyectos/pro_hito) - Referencia a pro_hito
- **id_actividad** → [pro_actividad](../proyectos/pro_actividad) - Referencia a pro_actividad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_actividad_hito WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_actividad_hito
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
