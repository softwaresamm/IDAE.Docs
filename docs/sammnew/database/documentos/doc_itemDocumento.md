---
sidebar_position: 40
title: doc_itemDocumento
description: Tabla para gestionar itemDocumento en el sistema SAMM
tags: [database, doc]
---

# doc_itemDocumento

## Descripción

Tabla para gestionar itemDocumento en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| itemDocumento | VARCHAR | ✓ | - | - | - |
| itemDocumento_codigo | VARCHAR | ✓ | - | - | - |
| detalle | VARCHAR | ✓ | - | - | - |
| horasOrdinales | DECIMAL | ✓ | - | - | - |
| horasFestivas | DECIMAL | ✓ | - | - | - |
| horasNocturnas | DECIMAL | ✓ | - | - | - |
| cantidadPlaneado | DECIMAL | ✓ | - | - | - |
| cantidadEjecutado | DECIMAL | ✓ | - | - | - |
| valorUnitarioPlaneado | DECIMAL | ✓ | - | - | - |
| valorUnitarioEjecutado | DECIMAL | ✓ | - | - | - |
| subtotalPlaneado | DECIMAL | ✓ | - | - | - |
| subtotalEjecutado | DECIMAL | ✓ | - | - | - |
| totalPlaneado | DECIMAL | ✓ | - | - | - |
| totalEjecutado | DECIMAL | ✓ | - | - | - |
| porciva | DECIMAL | ✓ | - | - | - |
| ivaPlaneado | DECIMAL | ✓ | - | - | - |
| ivaEjecutado | DECIMAL | ✓ | - | - | - |
| porcdto | DECIMAL | ✓ | - | - | - |
| dtoPlaneado | DECIMAL | ✓ | - | - | - |
| dtoEjecutado | DECIMAL | ✓ | - | - | - |
| costear | BIT | ✓ | - | - | - |
| esUrgente | BIT | ✓ | - | - | - |
| vencimientoGarantia_ff | DATE | ✓ | - | - | - |
| horasGarantia | DECIMAL | ✓ | - | - | - |
| porcentajeCliente | DECIMAL | ✓ | - | - | - |
| porcentajeDistribuidor | DECIMAL | ✓ | - | - | - |
| porcentajeFabricante | DECIMAL | ✓ | - | - | - |
| afectoInventario | BIT | ✓ | - | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |
| id_itemDocumento | INTEGER | ✓ | FK | - | - |
| id_centroCosto | INTEGER | ✓ | FK | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |
| id_bodega | INTEGER | ✓ | FK | - | - |
| id_incoterm | INTEGER | ✓ | FK | - | - |
| id_itemDocumento_superior | INTEGER | ✓ | FK | - | - |
| costoPlaneado | DECIMAL | ✓ | - | - | - |
| costoEjecutado | DECIMAL | ✓ | - | - | - |
| id_listaprecio | INTEGER | ✓ | FK | - | - |
| vrbase | DECIMAL | ✓ | - | - | - |
| vrenlista | DECIMAL | ✓ | - | - | - |
| porcdescuento | DECIMAL | ✓ | - | - | - |
| cantAuxiliar | DECIMAL | ✓ | - | - | - |
| porcentajeMargen | DECIMAL | ✓ | - | - | - |
| margenPlaneado | DECIMAL | ✓ | - | - | - |

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

- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento
- **id_centroCosto** → [doc_centroCosto](../documentos/doc_centroCosto) - Referencia a doc_centroCosto
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_bodega** → [gen_bodega](../general/gen_bodega) - Referencia a gen_bodega
- **id_incoterm** → [doc_incoterm](../documentos/doc_incoterm) - Referencia a doc_incoterm
- **id_itemDocumento_superior** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_itemDocumento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_itemDocumento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
