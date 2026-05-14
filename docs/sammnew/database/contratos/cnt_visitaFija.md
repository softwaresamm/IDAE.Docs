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

- **id_documento_ot** → [doc_documento_ot](../documentos/doc_documento_ot) - Referencia a doc_documento_ot
- **id_contratoEquipo** → [cnt_contratoEquipo](../contratos/cnt_contratoEquipo) - Referencia a cnt_contratoEquipo
- **id_contratoDetalleVisita** → [cnt_contratoDetalleVisita](../contratos/cnt_contratoDetalleVisita) - Referencia a cnt_contratoDetalleVisita
- **id_catalogo_tempario** → [cat_catalogo_tempario](../catalogo/cat_catalogo_tempario) - Referencia a cat_catalogo_tempario
- **id_configContrato** → [cnt_configContrato](../contratos/cnt_configContrato) - Referencia a cnt_configContrato

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
