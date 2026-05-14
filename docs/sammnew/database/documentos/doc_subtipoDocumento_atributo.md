---
sidebar_position: 52
title: doc_subtipoDocumento_atributo
description: Tabla para gestionar subtipoDocumento_atributo en el sistema SAMM
tags: [database, doc]
---

# doc_subtipoDocumento_atributo

## Descripción

Tabla para gestionar subtipoDocumento_atributo en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| subtipoDocumento_atributo | VARCHAR | ✓ | - | - | - |
| id_subtipoDocumento | INTEGER | ✓ | FK | - | - |
| id_atributo | INTEGER | ✓ | FK | - | - |
| orden | INTEGER | ✓ | - | - | - |
| mostrarAPI | BIT | ✓ | - | - | - |

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

- **id_subtipoDocumento** → [doc_subtipoDocumento](../documentos/doc_subtipoDocumento) - Referencia a doc_subtipoDocumento
- **id_atributo** → [unknown_atributo](../general/unknown_atributo) - Referencia a unknown_atributo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_subtipoDocumento_atributo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_subtipoDocumento_atributo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
