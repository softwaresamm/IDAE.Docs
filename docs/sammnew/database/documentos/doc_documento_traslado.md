---
sidebar_position: 31
title: doc_documento_traslado
description: Tabla para gestionar documento_traslado en el sistema SAMM
tags: [database, doc]
---

# doc_documento_traslado

## Descripción

Tabla para gestionar documento_traslado en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| documento_traslado | VARCHAR | ✓ | - | - | - |
| id_bodega_origen | INTEGER | ✓ | FK | - | - |
| id_bodega_destino | INTEGER | ✓ | FK | - | - |

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

- **id_bodega_origen** → [bodega_origen](../general/bodega_origen) - Referencia a bodega_origen
- **id_bodega_destino** → [bodega_destino](../general/bodega_destino) - Referencia a bodega_destino

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_traslado WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_traslado
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
