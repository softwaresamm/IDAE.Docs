---
sidebar_position: 4
title: alq_tarifa
description: Tabla para gestionar tarifa en el sistema SAMM
tags: [database, alq]
---

# alq_tarifa

## Descripción

Tabla para gestionar tarifa en el sistema SAMM.

**Módulo**: Alquileres  
**Prefijo**: `alq_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| tarifa | VARCHAR | ✓ | - | - | - |
| tarifa_codigo | VARCHAR | ✓ | - | - | - |
| id_itemDocumento | INTEGER | ✓ | FK | - | - |
| id_detalleAlquiler | INTEGER | ✓ | FK | - | - |
| id_tipoTarifa | INTEGER | ✓ | FK | - | - |
| horasIncluidas | DECIMAL | ✓ | - | - | - |
| cantidadIncluida | INTEGER | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento
- **id_detalleAlquiler** → [unknown_detalleAlquiler](../general/unknown_detalleAlquiler) - Referencia a unknown_detalleAlquiler
- **id_tipoTarifa** → [unknown_tipoTarifa](../general/unknown_tipoTarifa) - Referencia a unknown_tipoTarifa

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Alquileres
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM alq_tarifa WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM alq_tarifa
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
