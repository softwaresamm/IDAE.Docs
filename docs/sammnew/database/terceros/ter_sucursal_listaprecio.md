---
sidebar_position: 9
title: ter_sucursal_listaprecio
description: Tabla para gestionar sucursal_listaprecio en el sistema SAMM
tags: [database, ter]
---

# ter_sucursal_listaprecio

## Descripción

Tabla para gestionar sucursal_listaprecio en el sistema SAMM.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| sucursal_listaprecio | VARCHAR | ✓ | - | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |
| id_listaprecio | INTEGER | ✓ | FK | - | - |

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

- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_listaprecio** → [unknown_listaprecio](../general/unknown_listaprecio) - Referencia a unknown_listaprecio

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ter_sucursal_listaprecio WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ter_sucursal_listaprecio
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
