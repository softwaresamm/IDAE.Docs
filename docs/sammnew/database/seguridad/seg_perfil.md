---
sidebar_position: 4
title: seg_perfil
description: Tabla para gestionar perfil en el sistema SAMM
tags: [database, seg]
---

# seg_perfil

## Descripción

Tabla para gestionar perfil en el sistema SAMM.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| perfil | VARCHAR | ✓ | - | - | - |
| perfil_codigo | VARCHAR | ✓ | - | - | - |
| descripcion | VARCHAR | ✓ | - | - | - |
| mostrarBotones | BIT | ✓ | - | - | - |
| paraCliente | BIT | ✓ | - | - | - |
| paraProveedor | BIT | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

*Esta tabla no tiene relaciones salientes (foreign keys).*

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM seg_perfil WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM seg_perfil
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
