---
sidebar_position: 11
title: doc_documento_cotizacion_condicion
description: Tabla para gestionar documento_cotizacion_condicion en el sistema SAMM
tags: [database, doc]
---

# doc_documento_cotizacion_condicion

## Descripción

Tabla para gestionar documento_cotizacion_condicion en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| documento_cotizacion_condicion | VARCHAR | ✓ | - | - | - |
| imprimir | BIT | ✓ | - | - | - |
| id_opcionCondicion | INTEGER | ✓ | FK | - | - |
| id_documento_cotizacion | INTEGER | ✓ | FK | - | - |
| id_condicion | INTEGER | ✓ | FK | - | - |

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

- **id_opcionCondicion** → [unknown_opcionCondicion](../general/unknown_opcionCondicion) - Referencia a unknown_opcionCondicion
- **id_documento_cotizacion** → [documento_cotizacion](../general/documento_cotizacion) - Referencia a documento_cotizacion
- **id_condicion** → [unknown_condicion](../general/unknown_condicion) - Referencia a unknown_condicion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_cotizacion_condicion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_cotizacion_condicion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
