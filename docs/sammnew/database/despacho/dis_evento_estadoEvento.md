---
sidebar_position: 4
title: dis_evento_estadoEvento
description: Tabla para gestionar evento_estadoEvento en el sistema SAMM
tags: [database, dis]
---

# dis_evento_estadoEvento

## Descripción

Tabla para gestionar evento_estadoEvento en el sistema SAMM.

**Módulo**: Despacho  
**Prefijo**: `dis_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| evento_estadoEvento | VARCHAR | ✓ | - | - | - |
| id_evento | INTEGER | ✓ | FK | - | - |
| id_estadoEvento | INTEGER | ✓ | FK | - | - |
| fechaHoraRegistro_fh | DATETIME | ✓ | - | - | - |
| afectaCliente | BIT | ✓ | - | - | - |
| id_sistema | INTEGER | ✓ | FK | - | - |

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

- **id_evento** → [unknown_evento](../general/unknown_evento) - Referencia a unknown_evento
- **id_estadoEvento** → [unknown_estadoEvento](../general/unknown_estadoEvento) - Referencia a unknown_estadoEvento
- **id_sistema** → [unknown_sistema](../general/unknown_sistema) - Referencia a unknown_sistema

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Despacho
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM dis_evento_estadoEvento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM dis_evento_estadoEvento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
