---
sidebar_position: 12
title: cat_catalogo.tempario
description: Tabla cat_catalogo.tempario del módulo Catálogo
tags: [database, cat]
---

# cat_catalogo.tempario

## Descripción

Tabla cat_catalogo.tempario del módulo Catálogo.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| catalogo.tempario | VARCHAR | ✗ | - | - |
| duracionEstimada | FLOAT | ✓ | - | - |
| enTaller | BIT | ✗ | - | - |
| esCiclico | BIT | ✗ | - | - |
| detieneEquipos | BIT | ✗ | - | - |
| horasDetencion | FLOAT | ✓ | - | - |
| periodoHoras | INTEGER | ✗ | - | - |
| facturaTodo | BIT | ✗ | - | - |
| periodoDias | INTEGER | ✗ | - | - |
| porcGarantia | FLOAT | ✗ | - | - |
| porcTropicalizacion | FLOAT | ✗ | - | - |
| id_tipoServicio | INTEGER | ✗ | FK | - |
| proyectar | BIT | ✗ | - | - |
| incluirMenores | BIT | ✗ | - | - |
| modoAjuste | INTEGER | ✗ | - | - |

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

- **id_tipoServicio** → [gen_tipoServicio](../general/gen_tipoServicio) - Referencia a gen_tipoServicio

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Nombre real en base de datos: `cat_catalogo.tempario`
- El punto en el nombre separa el tipo de documento del subtipo

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cat_catalogo.tempario] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cat_catalogo.tempario] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
