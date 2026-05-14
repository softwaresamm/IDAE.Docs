---
sidebar_position: 18
title: doc_documento_ot
description: Tabla para gestionar documento_ot en el sistema SAMM
tags: [database, doc]
---

# doc_documento_ot

## Descripción

Tabla para gestionar documento_ot en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| documento_ot | VARCHAR | ✓ | - | - | - |
| motivoServicio | VARCHAR | ✓ | - | - | - |
| enTaller | BIT | ✓ | - | - | - |
| diagnosticoInicial | VARCHAR | ✓ | - | - | - |
| contacto | VARCHAR | ✓ | - | - | - |
| cargo | VARCHAR | ✓ | - | - | - |
| telefono | VARCHAR | ✓ | - | - | - |
| fax | VARCHAR | ✓ | - | - | - |
| email | VARCHAR | ✓ | - | - | - |
| direccionUbicacion | VARCHAR | ✓ | - | - | - |
| duracionEstimada | DECIMAL | ✓ | - | - | - |
| fechaGarantia_ff | DATE | ✓ | - | - | - |
| fechaCompromiso_fh | DATETIME | ✓ | - | - | - |
| trabajos | VARCHAR | ✓ | - | - | - |
| recomendaciones | VARCHAR | ✓ | - | - | - |
| compromisos | VARCHAR | ✓ | - | - | - |
| reclamacionFabrica | VARCHAR | ✓ | - | - | - |
| porcentajeCliente | DECIMAL | ✓ | - | - | - |
| porcentajeDistribuidor | DECIMAL | ✓ | - | - | - |
| porcentajeFabricante | DECIMAL | ✓ | - | - | - |
| segunTempario | BIT | ✓ | - | - | - |
| distribuyeCentros | BIT | ✓ | - | - | - |
| id_tipoServicio | INTEGER | ✓ | FK | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_usuario_coordinador | INTEGER | ✓ | FK | - | - |
| id_motivoCancelacion | INTEGER | ✓ | FK | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |
| id_sistema | INTEGER | ✓ | FK | - | - |
| id_departamentoSolicitud | INTEGER | ✓ | FK | - | - |
| id_contrato | INTEGER | ✓ | FK | - | - |
| id_zona | INTEGER | ✓ | FK | - | - |

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

- **id_tipoServicio** → [gen_tipoServicio](../general/gen_tipoServicio) - Referencia a gen_tipoServicio
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_usuario_coordinador** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_motivoCancelacion** → [ort_motivoCancelacion](../ordenes/ort_motivoCancelacion) - Referencia a ort_motivoCancelacion
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_sistema** → [cat_sistema](../catalogo/cat_sistema) - Referencia a cat_sistema
- **id_departamentoSolicitud** → [ort_departamentoSolicitud](../ordenes/ort_departamentoSolicitud) - Referencia a ort_departamentoSolicitud
- **id_contrato** → [cnt_contrato](../contratos/cnt_contrato) - Referencia a cnt_contrato
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_ot WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_ot
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
