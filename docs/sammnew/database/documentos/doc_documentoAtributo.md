---
sidebar_position: 5
title: doc_documentoAtributo
description: Tabla para gestionar documentoAtributo en el sistema SAMM
tags: [database, doc]
---

# doc_documentoAtributo

## Descripción

Tabla para gestionar documentoAtributo en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| documentoAtributo | VARCHAR | ✓ | - | - | - |
| documentoAtributo_codigo | VARCHAR | ✓ | - | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |
| id_atributo | INTEGER | ✓ | FK | - | - |
| id_opcionAtributo | INTEGER | ✓ | FK | - | - |

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
- **id_atributo** → [unknown_atributo](../general/unknown_atributo) - Referencia a unknown_atributo
- **id_opcionAtributo** → [unknown_opcionAtributo](../general/unknown_opcionAtributo) - Referencia a unknown_opcionAtributo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documentoAtributo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documentoAtributo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
