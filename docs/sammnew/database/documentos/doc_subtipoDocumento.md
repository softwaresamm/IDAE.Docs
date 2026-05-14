---
sidebar_position: 50
title: doc_subtipoDocumento
description: Tabla doc_subtipoDocumento del módulo Documentos
tags: [database, doc]
---

# doc_subtipoDocumento

## Descripción

Tabla doc_subtipoDocumento del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| subtipoDocumento | VARCHAR | ✗ | - | - |
| subtipoDocumento_codigo | VARCHAR | ✓ | - | - |
| prefijo | VARCHAR | ✗ | - | - |
| consecutivo | INTEGER | ✗ | - | - |
| id_tipoDocumento | INTEGER | ✗ | FK | - |
| programarPlaneadas | BIT | ✗ | - | - |
| cargarSolicitante | BIT | ✗ | - | - |
| verCentroCosto | BIT | ✗ | - | - |
| verIncoterm | BIT | ✗ | - | - |
| valUrgente | BIT | ✗ | - | - |
| bloquearDespacho | BIT | ✗ | - | - |
| cerrarSol | BIT | ✗ | - | - |
| ejecutaDevolucion | BIT | ✗ | - | - |
| tipoCobro | INTEGER | ✗ | - | - |
| mostrarPendienteDocumento | INTEGER | ✗ | - | - |
| cantidadAuxiliar | BIT | ✗ | - | - |
| mostrarValoresEjecutados | BIT | ✗ | - | - |
| archivosAdjuntosApp | INTEGER | ✗ | - | - |
| entregasNegativas | BIT | ✗ | - | - |

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

- **id_tipoDocumento** → [doc_tipoDocumento](../documentos/doc_tipoDocumento) - Referencia a doc_tipoDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_subtipoDocumento`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_subtipoDocumento] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_subtipoDocumento] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
