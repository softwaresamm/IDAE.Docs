---
sidebar_position: 14
title: cnt_visitaFija
description: Tabla para gestionar visitaFija en el sistema SAMM
tags: [database, cnt]
---

# cnt_visitaFija

## Descripción

Tabla para gestionar visitaFija en el sistema SAMM.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| visitaFija | VARCHAR | ✓ | - | - | - |
| visitaFija_codigo | VARCHAR | ✓ | - | - | - |
| fecha_ff | DATE | ✓ | - | - | - |
| fechaCreada_ff | DATE | ✓ | - | - | - |
| horometro | DECIMAL | ✓ | - | - | - |
| id_documento_ot | INTEGER | ✓ | FK | - | - |
| id_contratoEquipo | INTEGER | ✓ | FK | - | - |
| id_contratoDetalleVisita | INTEGER | ✓ | FK | - | - |
| id_catalogo_tempario | INTEGER | ✓ | FK | - | - |
| esPorTrabajo | BIT | ✓ | - | - | - |
| correoRecordatorio | VARCHAR | ✓ | - | - | - |
| presupuesto | DECIMAL | ✓ | - | - | - |
| id_configContrato | INTEGER | ✓ | FK | - | - |

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

- **id_documento_ot** → [documento_ot](../general/documento_ot) - Referencia a documento_ot
- **id_contratoEquipo** → [unknown_contratoEquipo](../general/unknown_contratoEquipo) - Referencia a unknown_contratoEquipo
- **id_contratoDetalleVisita** → [unknown_contratoDetalleVisita](../general/unknown_contratoDetalleVisita) - Referencia a unknown_contratoDetalleVisita
- **id_catalogo_tempario** → [catalogo_tempario](../general/catalogo_tempario) - Referencia a catalogo_tempario
- **id_configContrato** → [unknown_configContrato](../general/unknown_configContrato) - Referencia a unknown_configContrato

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cnt_visitaFija WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cnt_visitaFija
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
