---
sidebar_position: 37
title: doc_flujoDocumento
description: Tabla para gestionar flujoDocumento en el sistema SAMM
tags: [database, doc]
---

# doc_flujoDocumento

## Descripción

Tabla para gestionar flujoDocumento en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| flujoDocumento | VARCHAR | ✓ | - | - | - |
| flujoDocumento_codigo | VARCHAR | ✓ | - | - | - |
| restrictivo | BIT | ✓ | - | - | - |
| id_subtipoDocumento_origen | INTEGER | ✓ | FK | - | - |
| id_subtipoDocumento_destino | INTEGER | ✓ | FK | - | - |
| id_estadoTipoDocumento_origen | INTEGER | ✓ | FK | - | - |
| id_estadoTipoDocumento_resultado | INTEGER | ✓ | FK | - | - |
| replicarItems | INTEGER | ✓ | - | - | - |
| replicarAtributos | BIT | ✓ | - | - | - |
| replicarItemsActividades | INTEGER | ✓ | - | - | - |
| replicarComentario | INTEGER | ✓ | - | - | - |

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

- **id_subtipoDocumento_origen** → [subtipoDocumento_origen](../general/subtipoDocumento_origen) - Referencia a subtipoDocumento_origen
- **id_subtipoDocumento_destino** → [subtipoDocumento_destino](../general/subtipoDocumento_destino) - Referencia a subtipoDocumento_destino
- **id_estadoTipoDocumento_origen** → [estadoTipoDocumento_origen](../general/estadoTipoDocumento_origen) - Referencia a estadoTipoDocumento_origen
- **id_estadoTipoDocumento_resultado** → [estadoTipoDocumento_resultado](../general/estadoTipoDocumento_resultado) - Referencia a estadoTipoDocumento_resultado

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_flujoDocumento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_flujoDocumento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
