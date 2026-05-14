---
sidebar_position: 25
title: pro_rol_contacto
description: Tabla para gestionar rol_contacto en el sistema SAMM
tags: [database, pro]
---

# pro_rol_contacto

## Descripción

Tabla para gestionar rol_contacto en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| rol_contacto | VARCHAR | ✓ | - | - | - |
| id_rol | INTEGER | ✓ | FK | - | - |
| id_contacto | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_rol** → [unknown_rol](../general/unknown_rol) - Referencia a unknown_rol
- **id_contacto** → [unknown_contacto](../general/unknown_contacto) - Referencia a unknown_contacto

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_rol_contacto WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_rol_contacto
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
