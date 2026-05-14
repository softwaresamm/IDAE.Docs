---
sidebar_position: 45
title: doc_pendienteDocumento
description: Tabla para gestionar pendienteDocumento en el sistema SAMM
tags: [database, doc]
---

# doc_pendienteDocumento

## Descripción

Tabla para gestionar pendienteDocumento en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| pendienteDocumento | VARCHAR | ✓ | - | - | - |
| pendienteDocumento_codigo | VARCHAR | ✓ | - | - | - |
| cantidad | DECIMAL | ✓ | - | - | - |
| id_documento | INTEGER | ✓ | FK | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |
| id_tipoDocumento | INTEGER | ✓ | FK | - | - |
| olvidar | BIT | ✓ | - | - | - |
| id_reporteTecnico | INTEGER | ✓ | FK | - | - |
| id_tipoPendiente | INTEGER | ✓ | FK | - | - |

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
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo
- **id_tipoDocumento** → [doc_tipoDocumento](../documentos/doc_tipoDocumento) - Referencia a doc_tipoDocumento
- **id_reporteTecnico** → [unknown_reporteTecnico](../general/unknown_reporteTecnico) - Referencia a unknown_reporteTecnico
- **id_tipoPendiente** → [unknown_tipoPendiente](../general/unknown_tipoPendiente) - Referencia a unknown_tipoPendiente

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_pendienteDocumento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_pendienteDocumento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
