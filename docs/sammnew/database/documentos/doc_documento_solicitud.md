---
sidebar_position: 30
title: doc_documento_solicitud
description: Tabla para gestionar documento_solicitud en el sistema SAMM
tags: [database, doc]
---

# doc_documento_solicitud

## Descripción

Tabla para gestionar documento_solicitud en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| documento_solicitud | VARCHAR | ✓ | - | - | - |
| email | VARCHAR | ✓ | - | - | - |
| fax | VARCHAR | ✓ | - | - | - |
| telefono | VARCHAR | ✓ | - | - | - |
| solicitante | VARCHAR | ✓ | - | - | - |
| motivoServicio | VARCHAR | ✓ | - | - | - |
| solucionTelefonica | BIT | ✓ | - | - | - |
| id_departamentoSolicitud | INTEGER | ✓ | FK | - | - |
| id_medioSolicitud | INTEGER | ✓ | FK | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |
| id_zona | INTEGER | ✓ | FK | - | - |
| cargo | VARCHAR | ✓ | - | - | - |
| direccion | VARCHAR | ✓ | - | - | - |

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

- **id_departamentoSolicitud** → [ort_departamentoSolicitud](../ordenes/ort_departamentoSolicitud) - Referencia a ort_departamentoSolicitud
- **id_medioSolicitud** → [doc_medioSolicitud](../documentos/doc_medioSolicitud) - Referencia a doc_medioSolicitud
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_solicitud WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_solicitud
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
