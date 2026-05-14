---
sidebar_position: 1
title: equ_alquiler
description: Tabla para gestionar alquiler en el sistema SAMM
tags: [database, equ]
---

# equ_alquiler

## Descripción

Tabla para gestionar alquiler en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| alquiler | VARCHAR | ✓ | - | - | - |
| alquiler_codigo | VARCHAR | ✓ | - | - | - |
| fechaCompromiso_ff | DATE | ✓ | - | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |
| id_tercero | INTEGER | ✓ | FK | - | - |
| id_subtipoDocumento | INTEGER | ✓ | FK | - | - |
| fechaFin_ff | DATE | ✓ | - | - | - |
| mesVencido | BIT | ✓ | - | - | - |
| alquiler_numero | INTEGER | ✓ | - | - | - |
| observaciones | VARCHAR | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_subtipoDocumento** → [doc_subtipoDocumento](../documentos/doc_subtipoDocumento) - Referencia a doc_subtipoDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_alquiler WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_alquiler
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
