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

- **id_marca** → [cat_marca](../catalogo/cat_marca) - Referencia a cat_marca
- **id_cargo** → [seg_cargo](../seguridad/seg_cargo) - Referencia a seg_cargo
- **id_tipoServicio** → [gen_tipoServicio](../general/gen_tipoServicio) - Referencia a gen_tipoServicio
- **id_familia** → [gen_familia](../general/gen_familia) - Referencia a gen_familia
- **id_atributo** → [cat_atributo](../catalogo/cat_atributo) - Referencia a cat_atributo
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona
- **id_catalogo_equipo** → [cat_catalogo_equipo](../catalogo/cat_catalogo_equipo) - Referencia a cat_catalogo_equipo

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
