---
sidebar_position: 30
title: cat_tarifa
description: Tabla para gestionar tarifa en el sistema SAMM
tags: [database, cat]
---

# cat_tarifa

## Descripción

Tabla para gestionar tarifa en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| tarifa | VARCHAR | ✓ | - | - | - |
| tarifa_codigo | VARCHAR | ✓ | - | - | - |
| incluyeRepuestos | BIT | ✓ | - | - | - |
| externo | BIT | ✓ | - | - | - |
| taller | BIT | ✓ | - | - | - |
| precio | DECIMAL | ✓ | - | - | - |
| valorPorUnidad | BIT | ✓ | - | - | - |
| minimo | DECIMAL | ✓ | - | - | - |
| estrategia | INTEGER | ✓ | - | - | - |
| prioridad | INTEGER | ✓ | - | - | - |
| id_marca | INTEGER | ✓ | FK | - | - |
| id_cargo | INTEGER | ✓ | FK | - | - |
| id_tipoServicio | INTEGER | ✓ | FK | - | - |
| id_familia | INTEGER | ✓ | FK | - | - |
| id_atributo | INTEGER | ✓ | FK | - | - |
| id_zona | INTEGER | ✓ | FK | - | - |
| id_catalogo_equipo | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_marca** → [unknown_marca](../general/unknown_marca) - Referencia a unknown_marca
- **id_cargo** → [unknown_cargo](../general/unknown_cargo) - Referencia a unknown_cargo
- **id_tipoServicio** → [unknown_tipoServicio](../general/unknown_tipoServicio) - Referencia a unknown_tipoServicio
- **id_familia** → [unknown_familia](../general/unknown_familia) - Referencia a unknown_familia
- **id_atributo** → [unknown_atributo](../general/unknown_atributo) - Referencia a unknown_atributo
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona
- **id_catalogo_equipo** → [catalogo_equipo](../general/catalogo_equipo) - Referencia a catalogo_equipo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_tarifa WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_tarifa
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
