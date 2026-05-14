---
sidebar_position: 17
title: doc_documento_ordenCompra
description: Tabla para gestionar documento_ordenCompra en el sistema SAMM
tags: [database, doc]
---

# doc_documento_ordenCompra

## Descripción

Tabla para gestionar documento_ordenCompra en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| documento_ordenCompra | VARCHAR | ✓ | - | - | - |
| telefonoEntrega | VARCHAR | ✓ | - | - | - |
| direccionEntrega | VARCHAR | ✓ | - | - | - |
| asunto | VARCHAR | ✓ | - | - | - |
| observaciones | VARCHAR | ✓ | - | - | - |
| fechaPago_ff | DATE | ✓ | - | - | - |
| solicitante | VARCHAR | ✓ | - | - | - |
| id_formaPago | INTEGER | ✓ | FK | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |

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

- **id_formaPago** → [doc_formaPago](../documentos/doc_formaPago) - Referencia a doc_formaPago
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_ordenCompra WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_ordenCompra
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
