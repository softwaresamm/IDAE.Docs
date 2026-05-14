---
sidebar_position: 18
title: equ_pagoAlquiler
description: Tabla para gestionar pagoAlquiler en el sistema SAMM
tags: [database, equ]
---

# equ_pagoAlquiler

## Descripción

Tabla para gestionar pagoAlquiler en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| pagoAlquiler | VARCHAR | ✓ | - | - | - |
| pagoAlquiler_codigo | VARCHAR | ✓ | - | - | - |
| valorPorCobrar | DECIMAL | ✓ | - | - | - |
| valorFacturado | DECIMAL | ✓ | - | - | - |
| numeroFactura | VARCHAR | ✓ | - | - | - |
| fechaEsperadaPago_ff | DATE | ✓ | - | - | - |
| fecha_factura_ff | DATE | ✓ | - | - | - |
| id_documento_alquiler | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_documento_alquiler** → [documento_alquiler](../general/documento_alquiler) - Referencia a documento_alquiler

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_pagoAlquiler WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_pagoAlquiler
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
