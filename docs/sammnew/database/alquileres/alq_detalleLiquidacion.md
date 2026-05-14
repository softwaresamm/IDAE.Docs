---
sidebar_position: 2
title: alq_detalleLiquidacion
description: Tabla para gestionar detalleLiquidacion en el sistema SAMM
tags: [database, alq]
---

# alq_detalleLiquidacion

## Descripción

Tabla para gestionar detalleLiquidacion en el sistema SAMM.

**Módulo**: Alquileres  
**Prefijo**: `alq_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| detalleLiquidacion | VARCHAR | ✓ | - | - | - |
| detalleLiquidacion_codigo | VARCHAR | ✓ | - | - | - |
| cantidad | INTEGER | ✓ | - | - | - |
| dias | INTEGER | ✓ | - | - | - |
| fechaInicio_fh | DATETIME | ✓ | - | - | - |
| fechaFin_fh | DATETIME | ✓ | - | - | - |
| id_itemDocumento | INTEGER | ✓ | FK | - | - |
| id_detalleAlquiler | INTEGER | ✓ | FK | - | - |
| saldo | INTEGER | ✓ | - | - | - |
| id_documento_movimiento | INTEGER | ✓ | FK | - | - |
| horometro | DECIMAL | ✓ | - | - | - |
| id_tarifa | INTEGER | ✓ | FK | - | - |
| id_evento | INTEGER | ✓ | FK | - | - |

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
- **id_documento_movimiento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_tarifa** → [cat_tarifa](../catalogo/cat_tarifa) - Referencia a cat_tarifa
- **id_evento** → [dis_evento](../despacho/dis_evento) - Referencia a dis_evento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Alquileres
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM alq_detalleLiquidacion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM alq_detalleLiquidacion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
