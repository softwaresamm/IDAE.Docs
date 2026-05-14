---
sidebar_position: 32
title: doc_estadoTipoDocumento
description: Tabla para gestionar estadoTipoDocumento en el sistema SAMM
tags: [database, doc]
---

# doc_estadoTipoDocumento

## Descripción

Tabla para gestionar estadoTipoDocumento en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| estadoTipoDocumento | VARCHAR | ✓ | - | - | - |
| estadoTipoDocumento_codigo | VARCHAR | ✓ | - | - | - |
| afectaIndicador | BIT | ✓ | - | - | - |
| editaDocumento | BIT | ✓ | - | - | - |
| orden | INTEGER | ✓ | - | - | - |
| puedeRegresar | BIT | ✓ | - | - | - |
| color | VARCHAR | ✓ | - | - | - |
| afectaInventario | BIT | ✓ | - | - | - |
| id_tipoDocumento | INTEGER | ✓ | FK | - | - |
| descripcion | VARCHAR | ✓ | - | - | - |
| observacionesObligatorio | BIT | ✓ | - | - | - |
| motivoObligatorio | BIT | ✓ | - | - | - |

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

- **id_tipoDocumento** → [doc_tipoDocumento](../documentos/doc_tipoDocumento) - Referencia a doc_tipoDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_estadoTipoDocumento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_estadoTipoDocumento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
