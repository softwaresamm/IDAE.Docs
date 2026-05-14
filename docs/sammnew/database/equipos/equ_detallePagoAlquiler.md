---
sidebar_position: 7
title: equ_detallePagoAlquiler
description: Tabla para gestionar detallePagoAlquiler en el sistema SAMM
tags: [database, equ]
---

# equ_detallePagoAlquiler

## Descripción

Tabla para gestionar detallePagoAlquiler en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| detallePagoAlquiler | VARCHAR | ✓ | - | - | - |
| detallePagoAlquiler_codigo | VARCHAR | ✓ | - | - | - |
| valor | DECIMAL | ✓ | - | - | - |
| horometro | DECIMAL | ✓ | - | - | - |
| id_pagoAlquiler | INTEGER | ✓ | FK | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| valorMulta | DECIMAL | ✓ | - | - | - |
| facturado | BIT | ✓ | - | - | - |
| fechaInicial_ff | DATE | ✓ | - | - | - |
| fechaFin_ff | DATE | ✓ | - | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |
| id_itemDocumento | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_pagoAlquiler** → [unknown_pagoAlquiler](../general/unknown_pagoAlquiler) - Referencia a unknown_pagoAlquiler
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_detallePagoAlquiler WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_detallePagoAlquiler
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
