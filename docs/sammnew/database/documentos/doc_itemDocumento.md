---
sidebar_position: 39
title: doc_itemDocumento
description: Tabla doc_itemDocumento del módulo Documentos
tags: [database, doc]
---

# doc_itemDocumento

## Descripción

Tabla doc_itemDocumento del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| itemDocumento | VARCHAR | ✗ | - | - |
| itemDocumento_codigo | VARCHAR | ✓ | - | - |
| detalle | VARCHAR | ✗ | - | - |
| horasOrdinales | FLOAT | ✗ | - | - |
| horasFestivas | FLOAT | ✗ | - | - |
| horasNocturnas | FLOAT | ✗ | - | - |
| cantidadPlaneado | FLOAT | ✗ | - | - |
| cantidadEjecutado | FLOAT | ✗ | - | - |
| valorUnitarioPlaneado | MONEY | ✗ | - | - |
| valorUnitarioEjecutado | MONEY | ✗ | - | - |
| subtotalPlaneado | MONEY | ✗ | - | - |
| subtotalEjecutado | MONEY | ✗ | - | - |
| totalPlaneado | MONEY | ✗ | - | - |
| totalEjecutado | MONEY | ✗ | - | - |
| porciva | FLOAT | ✗ | - | - |
| ivaPlaneado | MONEY | ✗ | - | - |
| ivaEjecutado | MONEY | ✗ | - | - |
| porcdto | FLOAT | ✗ | - | - |
| dtoPlaneado | MONEY | ✗ | - | - |
| dtoEjecutado | MONEY | ✗ | - | - |
| costear | BIT | ✗ | - | - |
| esUrgente | BIT | ✗ | - | - |
| vencimientoGarantia_ff | DATETIME | ✓ | - | - |
| horasGarantia | FLOAT | ✓ | - | - |
| porcentajeCliente | FLOAT | ✓ | - | - |
| porcentajeDistribuidor | FLOAT | ✓ | - | - |
| porcentajeFabricante | FLOAT | ✓ | - | - |
| afectoInventario | BIT | ✗ | - | - |
| id_documento | INTEGER | ✗ | FK | - |
| id_itemDocumento | INTEGER | ✗ | FK | - |
| id_centroCosto | INTEGER | ✗ | FK | - |
| id_catalogo | INTEGER | ✗ | FK | - |
| id_bodega | INTEGER | ✗ | FK | - |
| id_incoterm | INTEGER | ✗ | FK | - |
| id_itemDocumento_superior | INTEGER | ✗ | FK | - |
| costoPlaneado | FLOAT | ✗ | - | - |
| costoEjecutado | FLOAT | ✗ | - | - |
| id_listaprecio | INTEGER | ✗ | FK | - |
| vrbase | FLOAT | ✓ | - | - |
| vrenlista | FLOAT | ✓ | - | - |
| porcdescuento | FLOAT | ✓ | - | - |
| cantAuxiliar | FLOAT | ✗ | - | - |
| porcentajeMargen | FLOAT | ✓ | - | - |
| margenPlaneado | FLOAT | ✓ | - | - |

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

- **id_incoterm** → [doc_incoterm](../documentos/doc_incoterm) - Referencia a doc_incoterm
- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento
- **id_itemDocumento_superior** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento
- **id_bodega** → [gen_bodega](../general/gen_bodega) - Referencia a gen_bodega
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_centroCosto** → [doc_centroCosto](../documentos/doc_centroCosto) - Referencia a doc_centroCosto
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_listaprecio** → [cat_listaPrecio](../catalogo/cat_listaPrecio) - Referencia a cat_listaPrecio

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_itemDocumento`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_itemDocumento] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_itemDocumento] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
