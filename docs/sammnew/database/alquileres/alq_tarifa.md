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

- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento
- **id_detalleAlquiler** → [equ_detalleAlquiler](../equipos/equ_detalleAlquiler) - Referencia a equ_detalleAlquiler
- **id_tipoTarifa** → [alq_tipoTarifa](../alquileres/alq_tipoTarifa) - Referencia a alq_tipoTarifa

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
