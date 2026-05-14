---
sidebar_position: 6
title: seg_perfil_funcionalidad
description: Tabla para gestionar perfil_funcionalidad en el sistema SAMM
tags: [database, seg]
---

# seg_perfil_funcionalidad

## Descripción

Tabla para gestionar perfil_funcionalidad en el sistema SAMM.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| perfil_funcionalidad | VARCHAR | ✓ | - | - | - |
| id_perfil | INTEGER | ✓ | FK | - | - |
| id_funcionalidad | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_perfil** → [seg_perfil](../seguridad/seg_perfil) - Referencia a seg_perfil
- **id_funcionalidad** → [unknown_funcionalidad](../general/unknown_funcionalidad) - Referencia a unknown_funcionalidad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM seg_perfil_funcionalidad WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM seg_perfil_funcionalidad
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
