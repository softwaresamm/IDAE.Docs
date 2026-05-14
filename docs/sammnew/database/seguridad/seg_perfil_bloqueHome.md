---
sidebar_position: 5
title: seg_perfil_bloqueHome
description: Tabla para gestionar perfil_bloqueHome en el sistema SAMM
tags: [database, seg]
---

# seg_perfil_bloqueHome

## Descripción

Tabla para gestionar perfil_bloqueHome en el sistema SAMM.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| perfil_bloqueHome | VARCHAR | ✓ | - | - | - |
| id_perfil | INTEGER | ✓ | FK | - | - |
| id_bloqueHome | INTEGER | ✓ | FK | - | - |

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
- **id_bloqueHome** → [gui_bloqueHome](../interfaz/gui_bloqueHome) - Referencia a gui_bloqueHome

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM seg_perfil_bloqueHome WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM seg_perfil_bloqueHome
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
