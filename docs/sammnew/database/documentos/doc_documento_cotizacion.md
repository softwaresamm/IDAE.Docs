---
sidebar_position: 6
title: doc_documento.cotizacion
description: Tabla doc_documento.cotizacion del módulo Documentos
tags: [database, doc]
---

# doc_documento.cotizacion

## Descripción

Tabla doc_documento.cotizacion del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| documento.cotizacion | VARCHAR | ✗ | - | - |
| version | INTEGER | ✗ | - | - |
| validez | INTEGER | ✗ | - | - |
| contacto | VARCHAR | ✗ | - | - |
| cargo | VARCHAR | ✗ | - | - |
| encabezado | VARCHAR | ✗ | - | - |
| condiciones | VARCHAR | ✗ | - | - |
| notas | VARCHAR | ✗ | - | - |
| esAIU | BIT | ✗ | - | - |
| procentajeA | FLOAT | ✓ | - | - |
| procentajeI | FLOAT | ✓ | - | - |
| procentajeU | FLOAT | ✓ | - | - |
| valorA | FLOAT | ✓ | - | - |
| valorI | FLOAT | ✓ | - | - |
| valorU | FLOAT | ✓ | - | - |
| id_sucursal | INTEGER | ✗ | FK | - |
| id_equipo | INTEGER | ✗ | FK | - |
| id_usuario_asesor | INTEGER | ✗ | FK | - |
| email | VARCHAR | ✓ | - | - |
| telefono | VARCHAR | ✓ | - | - |

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
- **id_usuario_asesor** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_documento.cotizacion`
- El punto en el nombre separa el tipo de documento del subtipo

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_documento.cotizacion] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_documento.cotizacion] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
