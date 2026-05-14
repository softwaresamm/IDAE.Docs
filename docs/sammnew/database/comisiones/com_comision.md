---
sidebar_position: 1
title: com_comision
description: Tabla para gestionar comision en el sistema SAMM
tags: [database, com]
---

# com_comision

## Descripción

Tabla para gestionar comision en el sistema SAMM.

**Módulo**: Comisiones  
**Prefijo**: `com_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| comision | VARCHAR | ✓ | - | - | - |
| comision_codigo | VARCHAR | ✓ | - | - | - |
| descuentoMaximo | DECIMAL | ✓ | - | - | - |
| descuentoMinimo | DECIMAL | ✓ | - | - | - |
| id_cargo | INTEGER | ✓ | FK | - | - |
| id_subTipoCatalogo | INTEGER | ✓ | FK | - | - |
| costear | BIT | ✓ | - | - | - |
| nivelnegocio | INTEGER | ✓ | - | - | - |
| porc_comision | DECIMAL | ✓ | - | - | - |
| id_condicion | INTEGER | ✓ | FK | - | - |
| id_opcionCondicion | INTEGER | ✓ | FK | - | - |
| id_zona | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_cargo** → [unknown_cargo](../general/unknown_cargo) - Referencia a unknown_cargo
- **id_subTipoCatalogo** → [unknown_subTipoCatalogo](../general/unknown_subTipoCatalogo) - Referencia a unknown_subTipoCatalogo
- **id_condicion** → [unknown_condicion](../general/unknown_condicion) - Referencia a unknown_condicion
- **id_opcionCondicion** → [unknown_opcionCondicion](../general/unknown_opcionCondicion) - Referencia a unknown_opcionCondicion
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Comisiones
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM com_comision WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM com_comision
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
