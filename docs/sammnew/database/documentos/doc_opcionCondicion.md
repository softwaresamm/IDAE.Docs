---
sidebar_position: 43
title: doc_opcionCondicion
description: Tabla para gestionar opcionCondicion en el sistema SAMM
tags: [database, doc]
---

# doc_opcionCondicion

## Descripción

Tabla para gestionar opcionCondicion en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| opcionCondicion | VARCHAR | ✓ | - | - | - |
| opcionCondicion_codigo | VARCHAR | ✓ | - | - | - |
| id_condicion | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_condicion** → [unknown_condicion](../general/unknown_condicion) - Referencia a unknown_condicion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_opcionCondicion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_opcionCondicion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
