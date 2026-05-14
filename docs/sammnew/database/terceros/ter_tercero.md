---
sidebar_position: 11
title: ter_tercero
description: Tabla ter_tercero del módulo Terceros
tags: [database, ter]
---

# ter_tercero

## Descripción

Tabla ter_tercero del módulo Terceros.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| tercero | VARCHAR | ✗ | - | - |
| tercero_codigo | VARCHAR | ✓ | - | - |
| tercero_nit | VARCHAR | ✗ | - | - |
| direccion | VARCHAR | ✓ | - | - |
| contacto | VARCHAR | ✓ | - | - |
| telefono | VARCHAR | ✗ | - | - |
| fax | VARCHAR | ✓ | - | - |
| email | VARCHAR | ✓ | - | - |
| website | VARCHAR | ✓ | - | - |
| representante | VARCHAR | ✓ | - | - |
| notas | VARCHAR | ✓ | - | - |
| tercero_nombreCorto | VARCHAR | ✗ | - | - |
| esCliente | BIT | ✗ | - | - |
| esProveedor | BIT | ✗ | - | - |
| esTransportador | BIT | ✗ | - | - |
| esFabricante | BIT | ✗ | - | - |
| esEmpresaPropia | BIT | ✗ | - | - |
| clasificacion | VARCHAR | ✓ | - | - |
| id_zona | INTEGER | ✗ | FK | - |
| id_estadoTercero | INTEGER | ✗ | FK | - |
| id_naturalezaTercero | INTEGER | ✗ | FK | - |
| esProspecto | BIT | ✗ | - | - |
| id_formaPago | INTEGER | ✓ | FK | - |
| tiempoEntrega | INTEGER | ✓ | - | - |

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

- **id_estadoTercero** → [ter_estadoTercero](../terceros/ter_estadoTercero) - Referencia a ter_estadoTercero
- **id_naturalezaTercero** → [ter_naturalezaTercero](../terceros/ter_naturalezaTercero) - Referencia a ter_naturalezaTercero
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona
- **id_formaPago** → [doc_formaPago](../documentos/doc_formaPago) - Referencia a doc_formaPago

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Nombre real en base de datos: `ter_tercero`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ter_tercero] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ter_tercero] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
