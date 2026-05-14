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

- **id_perfil** → [seg_perfil](../seguridad/seg_perfil) - Referencia a seg_perfil
- **id_funcionalidad** → [gui_funcionalidad](../interfaz/gui_funcionalidad) - Referencia a gui_funcionalidad

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
