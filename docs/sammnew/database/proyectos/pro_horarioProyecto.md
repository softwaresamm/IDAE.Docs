---
sidebar_position: 20
title: pro_horarioProyecto
description: Tabla para gestionar horarioProyecto en el sistema SAMM
tags: [database, pro]
---

# pro_horarioProyecto

## Descripción

Tabla para gestionar horarioProyecto en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| horarioProyecto | VARCHAR | ✓ | - | - | - |
| horarioProyecto_codigo | VARCHAR | ✓ | - | - | - |
| id_documento_proyecto | INTEGER | ✓ | FK | - | - |
| lunes | VARCHAR | ✓ | - | - | - |
| martes | VARCHAR | ✓ | - | - | - |
| miercoles | VARCHAR | ✓ | - | - | - |
| jueves | VARCHAR | ✓ | - | - | - |
| viernes | VARCHAR | ✓ | - | - | - |
| sabado | VARCHAR | ✓ | - | - | - |
| domingo | VARCHAR | ✓ | - | - | - |
| festivos | VARCHAR | ✓ | - | - | - |

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

- **id_documento_proyecto** → [documento_proyecto](../general/documento_proyecto) - Referencia a documento_proyecto

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_horarioProyecto WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_horarioProyecto
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
