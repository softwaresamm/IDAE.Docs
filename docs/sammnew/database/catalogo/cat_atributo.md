---
sidebar_position: 1
title: cat_atributo
description: Tabla cat_atributo del módulo Catálogo
tags: [database, cat]
---

# cat_atributo

## Descripción

Tabla cat_atributo del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| atributo | VARCHAR | ✗ | - | - |
| atributo_codigo | VARCHAR | ✓ | - | - |
| nombreControl | VARCHAR | ✗ | - | - |
| esVariable | BIT | ✗ | - | - |
| resaltado | BIT | ✗ | - | - |
| valorMinimo | FLOAT | ✓ | - | - |
| ValorMaximo | FLOAT | ✓ | - | - |
| id_seccionAtributo | INTEGER | ✗ | FK | - |
| id_tipoAtributo | INTEGER | ✗ | FK | - |
| id_unidad | INTEGER | ✗ | FK | - |
| esObligatorio | BIT | ✗ | - | - |

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

- **id_seccionAtributo** → [cat_seccionAtributo](../catalogo/cat_seccionAtributo) - Referencia a cat_seccionAtributo
- **id_tipoAtributo** → [equ_tipoAtributo](../equipos/equ_tipoAtributo) - Referencia a equ_tipoAtributo
- **id_unidad** → [gen_unidad](../general/gen_unidad) - Referencia a gen_unidad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_atributo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_atributo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_atributo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
