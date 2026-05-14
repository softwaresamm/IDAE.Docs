---
sidebar_position: 9
title: seg_registroIntegracion
description: Tabla para gestionar registroIntegracion en el sistema SAMM
tags: [database, seg]
---

# seg_registroIntegracion

## Descripción

Tabla para gestionar registroIntegracion en el sistema SAMM.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| registroIntegracion | VARCHAR | ✓ | - | - | - |
| registroIntegracion_codigo | VARCHAR | ✓ | - | - | - |
| mensaje | VARCHAR | ✓ | - | - | - |
| respuesta | VARCHAR | ✓ | - | - | - |
| codigoRespuesta | VARCHAR | ✓ | - | - | - |
| idObjeto | INTEGER | ✓ | - | - | - |
| id_puntoIntegracion | INTEGER | ✓ | FK | - | - |
| numeroReintento | INTEGER | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_puntoIntegracion** → [unknown_puntoIntegracion](../general/unknown_puntoIntegracion) - Referencia a unknown_puntoIntegracion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM seg_registroIntegracion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM seg_registroIntegracion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
