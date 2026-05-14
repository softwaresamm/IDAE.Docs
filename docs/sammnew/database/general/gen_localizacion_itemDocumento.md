---
sidebar_position: 16
title: gen_localizacion_itemDocumento
description: Tabla para gestionar localizacion_itemDocumento en el sistema SAMM
tags: [database, gen]
---

# gen_localizacion_itemDocumento

## Descripción

Tabla para gestionar localizacion_itemDocumento en el sistema SAMM.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| localizacion_itemDocumento | VARCHAR | ✓ | - | - | - |
| id_localizacion | INTEGER | ✓ | FK | - | - |
| id_itemDocumento | INTEGER | ✓ | FK | - | - |
| cantidad | INTEGER | ✓ | - | - | - |

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

- **id_localizacion** → [gen_localizacion](../general/gen_localizacion) - Referencia a gen_localizacion
- **id_itemDocumento** → [doc_itemDocumento](../documentos/doc_itemDocumento) - Referencia a doc_itemDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo General / Configuración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gen_localizacion_itemDocumento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gen_localizacion_itemDocumento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
