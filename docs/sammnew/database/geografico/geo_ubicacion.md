---
sidebar_position: 1
title: geo_ubicacion
description: Tabla para gestionar ubicacion en el sistema SAMM
tags: [database, geo]
---

# geo_ubicacion

## Descripción

Tabla para gestionar ubicacion en el sistema SAMM.

**Módulo**: Geográfico  
**Prefijo**: `geo_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| ubicacion | VARCHAR | ✓ | - | - | - |
| ubicacion_codigo | VARCHAR | ✓ | - | - | - |
| tabla | VARCHAR | ✓ | - | - | - |
| idObjeto | INTEGER | ✓ | - | - | - |
| longitud | DECIMAL | ✓ | - | - | - |
| latitud | DECIMAL | ✓ | - | - | - |
| fecha_fh | DATETIME | ✓ | - | - | - |

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

*Esta tabla no tiene relaciones salientes (foreign keys).*

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Geográfico
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM geo_ubicacion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM geo_ubicacion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
