---
sidebar_position: 4
title: gen_bodega_usuario
description: Tabla para gestionar bodega_usuario en el sistema SAMM
tags: [database, gen]
---

# gen_bodega_usuario

## Descripción

Tabla para gestionar bodega_usuario en el sistema SAMM.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| bodega_usuario | VARCHAR | ✓ | - | - | - |
| id_usuario | INTEGER | ✓ | FK | - | - |
| id_bodega | INTEGER | ✓ | FK | - | - |
| sugerir | BIT | ✓ | - | - | - |

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
- **id_bodega** → [gen_bodega](../general/gen_bodega) - Referencia a gen_bodega

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo General / Configuración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gen_bodega_usuario WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gen_bodega_usuario
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
