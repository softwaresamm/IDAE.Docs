---
sidebar_position: 4
title: equ_campana_documento_OT
description: Tabla para gestionar campana_documento_OT en el sistema SAMM
tags: [database, equ]
---

# equ_campana_documento_OT

## Descripción

Tabla para gestionar campana_documento_OT en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| campana_documento_OT | VARCHAR | ✓ | - | - | - |
| id_campana | INTEGER | ✓ | FK | - | - |
| id_documento_ot | INTEGER | ✓ | FK | - | - |

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

- **id_campana** → [unknown_campana](../general/unknown_campana) - Referencia a unknown_campana
- **id_documento_ot** → [documento_ot](../general/documento_ot) - Referencia a documento_ot

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_campana_documento_OT WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_campana_documento_OT
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
