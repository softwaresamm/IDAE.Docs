---
sidebar_position: 1
title: gas_detalleGasto
description: Tabla para gestionar detalleGasto en el sistema SAMM
tags: [database, gas]
---

# gas_detalleGasto

## Descripción

Tabla para gestionar detalleGasto en el sistema SAMM.

**Módulo**: Gastos  
**Prefijo**: `gas_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| detalleGasto | VARCHAR | ✓ | - | - | - |
| detalleGasto_codigo | VARCHAR | ✓ | - | - | - |
| fecha_ff | DATE | ✓ | - | - | - |
| valor | DECIMAL | ✓ | - | - | - |
| cantidad | DECIMAL | ✓ | - | - | - |
| id_gasto | INTEGER | ✓ | FK | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |
| id_documento_gasto | INTEGER | ✓ | FK | - | - |

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

- **id_gasto** → [gas_gasto](../gastos/gas_gasto) - Referencia a gas_gasto
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_documento_gasto** → [doc_documento_gasto](../documentos/doc_documento_gasto) - Referencia a doc_documento_gasto

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Gastos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gas_detalleGasto WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gas_detalleGasto
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
