---
sidebar_position: 30
title: cat_tarifa
description: Tabla cat_tarifa del módulo Catálogo
tags: [database, cat]
---

# cat_tarifa

## Descripción

Tabla cat_tarifa del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| tarifa | VARCHAR | ✗ | - | - |
| tarifa_codigo | VARCHAR | ✓ | - | - |
| incluyeRepuestos | BIT | ✓ | - | - |
| externo | BIT | ✓ | - | - |
| taller | BIT | ✓ | - | - |
| precio | MONEY | ✗ | - | - |
| valorPorUnidad | BIT | ✗ | - | - |
| minimo | FLOAT | ✓ | - | - |
| estrategia | INTEGER | ✓ | - | - |
| prioridad | INTEGER | ✗ | - | - |
| id_marca | INTEGER | ✗ | FK | - |
| id_cargo | INTEGER | ✗ | FK | - |
| id_tipoServicio | INTEGER | ✗ | FK | - |
| id_familia | INTEGER | ✗ | FK | - |
| id_atributo | INTEGER | ✗ | FK | - |
| id_zona | INTEGER | ✗ | FK | - |
| id_catalogo.equipo | INTEGER | ✗ | FK | - |

### Columnas de Auditoría

Todas las tablas incluyen estas columnas estándar:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER | Clave primaria auto-incremental |
| active | BIT | Registro activo (soft delete) |
| id_usuario_creo | INTEGER | Usuario que creó el registro |
| id_usuario_modifico | INTEGER | Usuario que modificó el registro |
| fechaCreacion | DATETIME | Fecha y hora de creación |
| fechaModificacion | DATETIME | Fecha y hora de última modificación |
| uid | VARCHAR | Control multiempresa (User ID) |
| eid | VARCHAR | Control multiempresa (Entity ID) |

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_marca** → [cat_marca](../catalogo/cat_marca) - Referencia a cat_marca
- **id_catalogo.equipo** → [cat_catalogo.equipo](../catalogo/cat_catalogo_equipo) - Referencia a cat_catalogo.equipo
- **id_atributo** → [cat_atributo](../catalogo/cat_atributo) - Referencia a cat_atributo
- **id_familia** → [gen_familia](../general/gen_familia) - Referencia a gen_familia
- **id_tipoServicio** → [gen_tipoServicio](../general/gen_tipoServicio) - Referencia a gen_tipoServicio
- **id_cargo** → [seg_cargo](../seguridad/seg_cargo) - Referencia a seg_cargo
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_tarifa`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_tarifa] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_tarifa] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
