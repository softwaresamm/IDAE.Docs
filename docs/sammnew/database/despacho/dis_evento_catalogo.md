---
sidebar_position: 3
title: dis_evento_catalogo
description: Tabla para gestionar evento_catalogo en el sistema SAMM
tags: [database, dis]
---

# dis_evento_catalogo

## Descripción

Tabla para gestionar evento_catalogo en el sistema SAMM.

**Módulo**: Despacho  
**Prefijo**: `dis_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| evento_catalogo | VARCHAR | ✓ | - | - | - |
| equipoAuxiliar | BIT | ✓ | - | - | - |
| cantidad | DECIMAL | ✓ | - | - | - |
| valorUnitario | DECIMAL | ✓ | - | - | - |
| total | DECIMAL | ✓ | - | - | - |
| id_evento | INTEGER | ✓ | FK | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |
| observaciones | VARCHAR | ✓ | - | - | - |

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

- **id_evento** → [unknown_evento](../general/unknown_evento) - Referencia a unknown_evento
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Despacho
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM dis_evento_catalogo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM dis_evento_catalogo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
