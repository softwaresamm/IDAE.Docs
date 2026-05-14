---
sidebar_position: 2
title: cnt_contrato
description: Tabla para gestionar contrato en el sistema SAMM
tags: [database, cnt]
---

# cnt_contrato

## Descripción

Tabla para gestionar contrato en el sistema SAMM.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| contrato | VARCHAR | ✓ | - | - | - |
| contrato_codigo | VARCHAR | ✓ | - | - | - |
| numero | VARCHAR | ✓ | - | - | - |
| totalContrato | DECIMAL | ✓ | - | - | - |
| presupuesto | DECIMAL | ✓ | - | - | - |
| fechaInicio_ff | DATE | ✓ | - | - | - |
| fechaFin_ff | DATE | ✓ | - | - | - |
| diasCumplimiento | INTEGER | ✓ | - | - | - |
| condiciones | VARCHAR | ✓ | - | - | - |
| id_periodoContrato | INTEGER | ✓ | FK | - | - |
| id_tercero | INTEGER | ✓ | FK | - | - |
| id_tipoServicio | INTEGER | ✓ | FK | - | - |
| id_tipoContrato | INTEGER | ✓ | FK | - | - |
| id_tercero_servicio | INTEGER | ✓ | FK | - | - |
| id_subtipoDocumento | INTEGER | ✓ | FK | - | - |
| id_departamentoSolicitud | INTEGER | ✓ | FK | - | - |
| id_usuario_coordinador | INTEGER | ✓ | FK | - | - |
| id_documento_alquiler | INTEGER | ✓ | FK | - | - |
| id_estadoTipoDocumento_inicial | INTEGER | ✓ | FK | - | - |
| id_subtipoDocumento_solicitud | INTEGER | ✓ | FK | - | - |

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

- **id_periodoContrato** → [unknown_periodoContrato](../general/unknown_periodoContrato) - Referencia a unknown_periodoContrato
- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_tipoServicio** → [unknown_tipoServicio](../general/unknown_tipoServicio) - Referencia a unknown_tipoServicio
- **id_tipoContrato** → [unknown_tipoContrato](../general/unknown_tipoContrato) - Referencia a unknown_tipoContrato
- **id_tercero_servicio** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_subtipoDocumento** → [doc_subtipoDocumento](../documentos/doc_subtipoDocumento) - Referencia a doc_subtipoDocumento
- **id_departamentoSolicitud** → [unknown_departamentoSolicitud](../general/unknown_departamentoSolicitud) - Referencia a unknown_departamentoSolicitud
- **id_usuario_coordinador** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_documento_alquiler** → [documento_alquiler](../general/documento_alquiler) - Referencia a documento_alquiler
- **id_estadoTipoDocumento_inicial** → [estadoTipoDocumento_inicial](../general/estadoTipoDocumento_inicial) - Referencia a estadoTipoDocumento_inicial
- **id_subtipoDocumento_solicitud** → [subtipoDocumento_solicitud](../general/subtipoDocumento_solicitud) - Referencia a subtipoDocumento_solicitud

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cnt_contrato WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cnt_contrato
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
