---
sidebar_position: 4
title: doc_documento
description: Tabla para gestionar documento en el sistema SAMM
tags: [database, doc]
---

# doc_documento

## Descripción

Tabla para gestionar documento en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| documento | VARCHAR | ✓ | - | - | - |
| documento_codigo | VARCHAR | ✓ | - | - | - |
| documento_numero | INTEGER | ✓ | - | - | - |
| prefijo | VARCHAR | ✓ | - | - | - |
| subtotal | DECIMAL | ✓ | - | - | - |
| descuento | DECIMAL | ✓ | - | - | - |
| iva | DECIMAL | ✓ | - | - | - |
| total | DECIMAL | ✓ | - | - | - |
| costo | DECIMAL | ✓ | - | - | - |
| rentabilidad | DECIMAL | ✓ | - | - | - |
| trm | DECIMAL | ✓ | - | - | - |
| fecha_fh | DATETIME | ✓ | - | - | - |
| fechaSugerida_fh | DATETIME | ✓ | - | - | - |
| fechaCierre_ff | DATE | ✓ | - | - | - |
| fechaLimite_fh | DATETIME | ✓ | - | - | - |
| id_subtipoDocumento | INTEGER | ✓ | FK | - | - |
| id_tercero_cliente | INTEGER | ✓ | FK | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |
| id_tercero_proveedor | INTEGER | ✓ | FK | - | - |
| id_prioridadDocumento | INTEGER | ✓ | FK | - | - |
| id_moneda | INTEGER | ✓ | FK | - | - |
| id_estadoTipoDocumento | INTEGER | ✓ | FK | - | - |
| id_motivoestado | INTEGER | ✓ | FK | - | - |
| subtotalPlaneado | DECIMAL | ✓ | - | - | - |
| descuentoPlaneado | DECIMAL | ✓ | - | - | - |
| ivaPlaneado | DECIMAL | ✓ | - | - | - |
| totalPlaneado | DECIMAL | ✓ | - | - | - |
| costoPlaneado | DECIMAL | ✓ | - | - | - |
| id_usuario_asignado | INTEGER | ✓ | FK | - | - |
| id_usuario_enUso | INTEGER | ✓ | FK | - | - |

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

- **id_subtipoDocumento** → [doc_subtipoDocumento](../documentos/doc_subtipoDocumento) - Referencia a doc_subtipoDocumento
- **id_tercero_cliente** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_tercero_proveedor** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_prioridadDocumento** → [doc_prioridadDocumento](../documentos/doc_prioridadDocumento) - Referencia a doc_prioridadDocumento
- **id_moneda** → [gen_moneda](../general/gen_moneda) - Referencia a gen_moneda
- **id_estadoTipoDocumento** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento
- **id_motivoestado** → [doc_motivoestado](../documentos/doc_motivoestado) - Referencia a doc_motivoestado
- **id_usuario_asignado** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_usuario_enUso** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
