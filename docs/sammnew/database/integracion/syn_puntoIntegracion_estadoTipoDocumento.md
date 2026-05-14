---
sidebar_position: 4
title: syn_puntoIntegracion_estadoTipoDocumento
description: Tabla para gestionar puntoIntegracion_estadoTipoDocumento en el sistema SAMM
tags: [database, syn]
---

# syn_puntoIntegracion_estadoTipoDocumento

## Descripción

Tabla para gestionar puntoIntegracion_estadoTipoDocumento en el sistema SAMM.

**Módulo**: Integración  
**Prefijo**: `syn_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| puntoIntegracion_estadoTipoDocumento | VARCHAR | ✓ | - | - | - |
| id_puntoIntegracion | INTEGER | ✓ | FK | - | - |
| id_estadoTipoDocumento | INTEGER | ✓ | FK | - | - |
| idRolEstado | INTEGER | ✓ | - | - | - |

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

- **id_puntoIntegracion** → [syn_puntoIntegracion](../integracion/syn_puntoIntegracion) - Referencia a syn_puntoIntegracion
- **id_estadoTipoDocumento** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Integración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM syn_puntoIntegracion_estadoTipoDocumento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM syn_puntoIntegracion_estadoTipoDocumento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
