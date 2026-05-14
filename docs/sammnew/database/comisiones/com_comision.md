---
sidebar_position: 1
title: com_comision
description: Tabla com_comision del módulo Comisiones
tags: [database, com]
---

# com_comision

## Descripción

Tabla com_comision del módulo Comisiones.

**Módulo**: Comisiones  
**Prefijo**: `com_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| comision | VARCHAR | ✗ | - | - |
| comision_codigo | VARCHAR | ✓ | - | - |
| descuentoMaximo | FLOAT | ✓ | - | - |
| descuentoMinimo | FLOAT | ✓ | - | - |
| id_cargo | INTEGER | ✗ | FK | - |
| id_subtipoCatalogo | INTEGER | ✗ | FK | - |
| costear | BIT | ✓ | - | - |
| nivelnegocio | INTEGER | ✓ | - | - |
| porc_comision | FLOAT | ✓ | - | - |
| id_condicion | INTEGER | ✗ | FK | - |
| id_opcionCondicion | INTEGER | ✗ | FK | - |
| id_zona | INTEGER | ✗ | FK | - |

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

- **id_subtipoCatalogo** → [cat_subtipoCatalogo](../catalogo/cat_subtipoCatalogo) - Referencia a cat_subtipoCatalogo
- **id_condicion** → [doc_condicion](../documentos/doc_condicion) - Referencia a doc_condicion
- **id_opcionCondicion** → [doc_opcionCondicion](../documentos/doc_opcionCondicion) - Referencia a doc_opcionCondicion
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona
- **id_cargo** → [seg_cargo](../seguridad/seg_cargo) - Referencia a seg_cargo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Comisiones
- Nombre real en base de datos: `com_comision`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [com_comision] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [com_comision] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
