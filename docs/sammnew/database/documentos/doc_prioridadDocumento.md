---
sidebar_position: 48
title: doc_prioridadDocumento
description: Tabla para gestionar prioridadDocumento en el sistema SAMM
tags: [database, doc]
---

# doc_prioridadDocumento

## Descripción

Tabla para gestionar prioridadDocumento en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| prioridadDocumento | VARCHAR | ✓ | - | - | - |
| prioridadDocumento_codigo | VARCHAR | ✓ | - | - | - |
| tiempoRespuesta | INTEGER | ✓ | - | - | - |
| id_tipoDocumento | INTEGER | ✓ | FK | - | - |
| id_estrategiaPrioridad | INTEGER | ✓ | FK | - | - |
| orden | INTEGER | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_tipoDocumento** → [doc_tipoDocumento](../documentos/doc_tipoDocumento) - Referencia a doc_tipoDocumento
- **id_estrategiaPrioridad** → [unknown_estrategiaPrioridad](../general/unknown_estrategiaPrioridad) - Referencia a unknown_estrategiaPrioridad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_prioridadDocumento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_prioridadDocumento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
