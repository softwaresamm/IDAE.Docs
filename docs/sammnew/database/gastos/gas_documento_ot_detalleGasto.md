---
sidebar_position: 2
title: gas_documento_ot_detalleGasto
description: Tabla para gestionar documento_ot_detalleGasto en el sistema SAMM
tags: [database, gas]
---

# gas_documento_ot_detalleGasto

## Descripción

Tabla para gestionar documento_ot_detalleGasto en el sistema SAMM.

**Módulo**: Gastos  
**Prefijo**: `gas_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| documento_ot_detalleGasto | VARCHAR | ✓ | - | - | - |
| id_detalleGasto | INTEGER | ✓ | FK | - | - |
| id_documento_ot | INTEGER | ✓ | FK | - | - |
| id_itemDocumento | INTEGER | ✓ | FK | - | - |

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

- **id_detalleGasto** → [unknown_detalleGasto](../general/unknown_detalleGasto) - Referencia a unknown_detalleGasto
- **id_documento_ot** → [documento_ot](../general/documento_ot) - Referencia a documento_ot
- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Gastos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gas_documento_ot_detalleGasto WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gas_documento_ot_detalleGasto
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
