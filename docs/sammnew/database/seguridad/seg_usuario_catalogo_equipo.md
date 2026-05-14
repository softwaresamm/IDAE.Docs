---
sidebar_position: 13
title: seg_usuario_catalogo_equipo
description: Tabla para gestionar usuario_catalogo_equipo en el sistema SAMM
tags: [database, seg]
---

# seg_usuario_catalogo_equipo

## Descripción

Tabla para gestionar usuario_catalogo_equipo en el sistema SAMM.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| usuario_catalogo_equipo | VARCHAR | ✓ | - | - | - |
| id_usuario | INTEGER | ✓ | FK | - | - |
| id_tipoServicio | INTEGER | ✓ | FK | - | - |
| id_catalogo_equipo | INTEGER | ✓ | FK | - | - |

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

- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_tipoServicio** → [gen_tipoServicio](../general/gen_tipoServicio) - Referencia a gen_tipoServicio
- **id_catalogo_equipo** → [cat_catalogo_equipo](../catalogo/cat_catalogo_equipo) - Referencia a cat_catalogo_equipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM seg_usuario_catalogo_equipo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM seg_usuario_catalogo_equipo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
