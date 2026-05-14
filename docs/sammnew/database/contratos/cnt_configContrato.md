---
sidebar_position: 1
title: cnt_configContrato
description: Tabla para gestionar configContrato en el sistema SAMM
tags: [database, cnt]
---

# cnt_configContrato

## Descripción

Tabla para gestionar configContrato en el sistema SAMM.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| configContrato | VARCHAR | ✓ | - | - | - |
| id_contratoEquipo | INTEGER | ✓ | FK | - | - |
| id_catalogo_tempario | INTEGER | ✓ | FK | - | - |
| id_tercero_proveedor | INTEGER | ✓ | FK | - | - |
| frecuencia | INTEGER | ✓ | - | - | - |
| cadaN | DECIMAL | ✓ | - | - | - |
| dia | INTEGER | ✓ | - | - | - |
| estrategia | INTEGER | ✓ | - | - | - |
| porTrabajo | BIT | ✓ | - | - | - |
| incluirMenores | BIT | ✓ | - | - | - |
| aproximarA | INTEGER | ✓ | - | - | - |
| fecha_ff | DATE | ✓ | - | - | - |
| diaHabil | INTEGER | ✓ | - | - | - |

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

- **id_contratoEquipo** → [unknown_contratoEquipo](../general/unknown_contratoEquipo) - Referencia a unknown_contratoEquipo
- **id_catalogo_tempario** → [catalogo_tempario](../general/catalogo_tempario) - Referencia a catalogo_tempario
- **id_tercero_proveedor** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cnt_configContrato WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cnt_configContrato
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
