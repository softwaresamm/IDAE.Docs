---
sidebar_position: 3
title: gas_gasto
description: Tabla para gestionar gasto en el sistema SAMM
tags: [database, gas]
---

# gas_gasto

## Descripción

Tabla para gestionar gasto en el sistema SAMM.

**Módulo**: Gastos  
**Prefijo**: `gas_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| gasto | VARCHAR | ✓ | - | - | - |
| gasto_codigo | VARCHAR | ✓ | - | - | - |
| numero | INTEGER | ✓ | - | - | - |
| fecha_ff | DATE | ✓ | - | - | - |
| dias | INTEGER | ✓ | - | - | - |
| valor | DECIMAL | ✓ | - | - | - |
| concepto | VARCHAR | ✓ | - | - | - |
| consignado | BIT | ✓ | - | - | - |
| id_tipogasto | INTEGER | ✓ | FK | - | - |
| id_usuario_aprobo | INTEGER | ✓ | FK | - | - |
| id_usuario_solicitante | INTEGER | ✓ | FK | - | - |
| id_estadoTipoDocumento | INTEGER | ✓ | FK | - | - |

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

- **id_usuario_aprobo** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_usuario_solicitante** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_estadoTipoDocumento** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Gastos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gas_gasto WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gas_gasto
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
