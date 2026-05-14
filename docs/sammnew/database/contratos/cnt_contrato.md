---
sidebar_position: 2
title: cnt_contrato
description: Tabla cnt_contrato del módulo Contratos
tags: [database, cnt]
---

# cnt_contrato

## Descripción

Tabla cnt_contrato del módulo Contratos.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| contrato | VARCHAR | ✗ | - | - |
| contrato_codigo | VARCHAR | ✓ | - | - |
| numero | VARCHAR | ✗ | - | - |
| totalContrato | MONEY | ✓ | - | - |
| presupuesto | MONEY | ✓ | - | - |
| fechaInicio_ff | DATETIME | ✗ | - | - |
| fechaFin_ff | DATETIME | ✓ | - | - |
| diasCumplimiento | INTEGER | ✓ | - | - |
| condiciones | VARCHAR | ✓ | - | - |
| id_periodoContrato | INTEGER | ✗ | FK | - |
| id_tercero | INTEGER | ✗ | FK | - |
| id_tipoServicio | INTEGER | ✗ | FK | - |
| id_tipoContrato | INTEGER | ✗ | FK | - |
| id_tercero_servicio | INTEGER | ✗ | FK | - |
| id_subtipoDocumento | INTEGER | ✗ | FK | - |
| id_departamentoSolicitud | INTEGER | ✗ | FK | - |
| id_usuario_coordinador | INTEGER | ✗ | FK | - |
| id_documento.alquiler | INTEGER | ✗ | FK | - |
| id_estadoTipoDocumento_inicial | INTEGER | ✗ | FK | - |
| id_subtipoDocumento_solicitud | INTEGER | ✗ | FK | - |

### Columnas de Auditoría

Todas las tablas incluyen estas columnas estándar:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER | Clave primaria auto-incremental |
| active | BIT | Registro activo (soft delete) |
| id_usuario_creo | INTEGER | Usuario que creó el registro |
| id_usuario_modifico | INTEGER | Usuario que modificó el registro |
| fechaCreacion | DATETIME | Fecha y hora de creación |
| fechaModificacion | DATETIME | Fecha y hora de última modificación |
| uid | VARCHAR | Control multiempresa (User ID) |
| eid | VARCHAR | Control multiempresa (Entity ID) |

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_departamentoSolicitud** → [ort_departamentoSolicitud](../ordenes/ort_departamentoSolicitud) - Referencia a ort_departamentoSolicitud
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_tercero_servicio** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_usuario_coordinador** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_periodoContrato** → [cnt_periodoContrato](../contratos/cnt_periodoContrato) - Referencia a cnt_periodoContrato
- **id_tipoContrato** → [cnt_tipoContrato](../contratos/cnt_tipoContrato) - Referencia a cnt_tipoContrato
- **id_documento.alquiler** → [doc_documento.alquiler](../documentos/doc_documento_alquiler) - Referencia a doc_documento.alquiler
- **id_tipoServicio** → [gen_tipoServicio](../general/gen_tipoServicio) - Referencia a gen_tipoServicio
- **id_estadoTipoDocumento_inicial** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento
- **id_subtipoDocumento** → [doc_subtipoDocumento](../documentos/doc_subtipoDocumento) - Referencia a doc_subtipoDocumento
- **id_subtipoDocumento_solicitud** → [doc_subtipoDocumento](../documentos/doc_subtipoDocumento) - Referencia a doc_subtipoDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Nombre real en base de datos: `cnt_contrato`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cnt_contrato] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cnt_contrato] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
