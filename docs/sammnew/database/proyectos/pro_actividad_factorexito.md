---
sidebar_position: 6
title: pro_actividad_factorexito
description: Tabla para gestionar actividad_factorexito en el sistema SAMM
tags: [database, pro]
---

# pro_actividad_factorexito

## Descripción

Tabla para gestionar actividad_factorexito en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| actividad_factorexito | VARCHAR | ✓ | - | - | - |
| id_actividad | INTEGER | ✓ | FK | - | - |
| id_factorexito | INTEGER | ✓ | FK | - | - |

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

- **id_actividad** → [unknown_actividad](../general/unknown_actividad) - Referencia a unknown_actividad
- **id_factorexito** → [unknown_factorexito](../general/unknown_factorexito) - Referencia a unknown_factorexito

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_actividad_factorexito WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_actividad_factorexito
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
