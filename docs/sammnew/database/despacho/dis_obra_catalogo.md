---
sidebar_position: 8
title: dis_obra_catalogo
description: Tabla para gestionar obra_catalogo en el sistema SAMM
tags: [database, dis]
---

# dis_obra_catalogo

## Descripción

Tabla para gestionar obra_catalogo en el sistema SAMM.

**Módulo**: Despacho  
**Prefijo**: `dis_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| obra_catalogo | VARCHAR | ✓ | - | - | - |
| cantidad | DECIMAL | ✓ | - | - | - |
| valorUnitario | DECIMAL | ✓ | - | - | - |
| total | DECIMAL | ✓ | - | - | - |
| promedioDia | DECIMAL | ✓ | - | - | - |
| id_obra | INTEGER | ✓ | FK | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |
| valorMaximo | DECIMAL | ✓ | - | - | - |
| valorMinimo | DECIMAL | ✓ | - | - | - |

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

- **id_obra** → [unknown_obra](../general/unknown_obra) - Referencia a unknown_obra
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Despacho
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM dis_obra_catalogo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM dis_obra_catalogo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
