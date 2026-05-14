---
sidebar_position: 33
title: doc_estadoTipoDocumento_perfil
description: Tabla para gestionar estadoTipoDocumento_perfil en el sistema SAMM
tags: [database, doc]
---

# doc_estadoTipoDocumento_perfil

## Descripción

Tabla para gestionar estadoTipoDocumento_perfil en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| estadoTipoDocumento_perfil | VARCHAR | ✓ | - | - | - |
| id_estadoTipoDocumento | INTEGER | ✓ | FK | - | - |
| id_perfil | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_estadoTipoDocumento** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento
- **id_perfil** → [seg_perfil](../seguridad/seg_perfil) - Referencia a seg_perfil

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_estadoTipoDocumento_perfil WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_estadoTipoDocumento_perfil
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
