---
sidebar_position: 15
title: cnt_visitaFija_catalogo
description: Tabla para gestionar visitaFija_catalogo en el sistema SAMM
tags: [database, cnt]
---

# cnt_visitaFija_catalogo

## Descripción

Tabla para gestionar visitaFija_catalogo en el sistema SAMM.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| visitaFija_catalogo | VARCHAR | ✓ | - | - | - |
| cantidad | DECIMAL | ✓ | - | - | - |
| precio | DECIMAL | ✓ | - | - | - |
| id_visitaFija | INTEGER | ✓ | FK | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |

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

- **id_visitaFija** → [unknown_visitaFija](../general/unknown_visitaFija) - Referencia a unknown_visitaFija
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cnt_visitaFija_catalogo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cnt_visitaFija_catalogo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
