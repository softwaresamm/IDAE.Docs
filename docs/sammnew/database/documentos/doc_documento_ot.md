---
sidebar_position: 11
title: doc_documento.ot
description: Tabla doc_documento.ot del módulo Documentos
tags: [database, doc]
---

# doc_documento.ot

## Descripción

Tabla doc_documento.ot del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| documento.ot | VARCHAR | ✗ | - | - |
| motivoServicio | VARCHAR | ✗ | - | - |
| enTaller | BIT | ✗ | - | - |
| diagnosticoInicial | VARCHAR | ✓ | - | - |
| contacto | VARCHAR | ✗ | - | - |
| cargo | VARCHAR | ✓ | - | - |
| telefono | VARCHAR | ✗ | - | - |
| fax | VARCHAR | ✓ | - | - |
| email | VARCHAR | ✓ | - | - |
| direccionUbicacion | VARCHAR | ✓ | - | - |
| duracionEstimada | FLOAT | ✗ | - | - |
| fechaGarantia_ff | DATETIME | ✓ | - | - |
| fechaCompromiso_fh | DATETIME | ✗ | - | - |
| trabajos | VARCHAR | ✓ | - | - |
| recomendaciones | VARCHAR | ✓ | - | - |
| compromisos | VARCHAR | ✓ | - | - |
| reclamacionFabrica | VARCHAR | ✓ | - | - |
| porcentajeCliente | FLOAT | ✓ | - | - |
| porcentajeDistribuidor | FLOAT | ✓ | - | - |
| porcentajeFabricante | FLOAT | ✓ | - | - |
| segunTempario | BIT | ✓ | - | - |
| distribuyeCentros | BIT | ✓ | - | - |
| id_tipoServicio | INTEGER | ✗ | FK | - |
| id_equipo | INTEGER | ✗ | FK | - |
| id_usuario_coordinador | INTEGER | ✗ | FK | - |
| id_motivoCancelacion | INTEGER | ✗ | FK | - |
| id_sucursal | INTEGER | ✗ | FK | - |
| id_sistema | INTEGER | ✗ | FK | - |
| id_departamentoSolicitud | INTEGER | ✗ | FK | - |
| id_contrato | INTEGER | ✗ | FK | - |
| id_zona | INTEGER | ✗ | FK | - |

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

- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_usuario_coordinador** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona
- **id_departamentoSolicitud** → [ort_departamentoSolicitud](../ordenes/ort_departamentoSolicitud) - Referencia a ort_departamentoSolicitud
- **id_motivoCancelacion** → [ort_motivoCancelacion](../ordenes/ort_motivoCancelacion) - Referencia a ort_motivoCancelacion
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_tipoServicio** → [gen_tipoServicio](../general/gen_tipoServicio) - Referencia a gen_tipoServicio
- **id_sistema** → [cat_sistema](../catalogo/cat_sistema) - Referencia a cat_sistema
- **id_contrato** → [cnt_contrato](../contratos/cnt_contrato) - Referencia a cnt_contrato

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_documento.ot`
- El punto en el nombre separa el tipo de documento del subtipo

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_documento.ot] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_documento.ot] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
