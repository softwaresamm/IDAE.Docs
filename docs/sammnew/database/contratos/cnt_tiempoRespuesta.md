---
sidebar_position: 12
title: cnt_tiempoRespuesta
description: Tabla para gestionar tiempoRespuesta en el sistema SAMM
tags: [database, cnt]
---

# cnt_tiempoRespuesta

## Descripción

Tabla para gestionar tiempoRespuesta en el sistema SAMM.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| tiempoRespuesta | VARCHAR | ✓ | - | - | - |
| tiempoRespuesta_codigo | VARCHAR | ✓ | - | - | - |
| tiempoLimite | INTEGER | ✓ | - | - | - |
| id_contrato | INTEGER | ✓ | FK | - | - |
| id_prioridadDocumento | INTEGER | ✓ | FK | - | - |
| id_estrategiaPrioridad | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_contrato** → [cnt_contrato](../contratos/cnt_contrato) - Referencia a cnt_contrato
- **id_prioridadDocumento** → [unknown_prioridadDocumento](../general/unknown_prioridadDocumento) - Referencia a unknown_prioridadDocumento
- **id_estrategiaPrioridad** → [unknown_estrategiaPrioridad](../general/unknown_estrategiaPrioridad) - Referencia a unknown_estrategiaPrioridad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cnt_tiempoRespuesta WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cnt_tiempoRespuesta
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
