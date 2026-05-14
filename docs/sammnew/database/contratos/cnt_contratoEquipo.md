---
sidebar_position: 4
title: cnt_contratoEquipo
description: Tabla para gestionar contratoEquipo en el sistema SAMM
tags: [database, cnt]
---

# cnt_contratoEquipo

## Descripción

Tabla para gestionar contratoEquipo en el sistema SAMM.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| contratoEquipo | VARCHAR | ✓ | - | - | - |
| contratoEquipo_codigo | VARCHAR | ✓ | - | - | - |
| precioVisita | DECIMAL | ✓ | - | - | - |
| precioServicio | DECIMAL | ✓ | - | - | - |
| fecha_ff | DATE | ✓ | - | - | - |
| promedio | DECIMAL | ✓ | - | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_contrato | INTEGER | ✓ | FK | - | - |
| id_contratoDetalleVisita | INTEGER | ✓ | FK | - | - |

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

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_contrato** → [cnt_contrato](../contratos/cnt_contrato) - Referencia a cnt_contrato
- **id_contratoDetalleVisita** → [cnt_contratoDetalleVisita](../contratos/cnt_contratoDetalleVisita) - Referencia a cnt_contratoDetalleVisita

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cnt_contratoEquipo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cnt_contratoEquipo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
