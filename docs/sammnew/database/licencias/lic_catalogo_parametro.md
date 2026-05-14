---
sidebar_position: 1
title: lic_catalogo_parametro
description: Tabla lic_catalogo_parametro del módulo Licencias
tags: [database, lic]
---

# lic_catalogo_parametro

## Descripción

Tabla lic_catalogo_parametro del módulo Licencias.

**Módulo**: Licencias  
**Prefijo**: `lic_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| catalogo_parametro | VARCHAR | ✗ | - | - |
| id_catalogo | INTEGER | ✗ | FK | - |
| id_parametro | INTEGER | ✗ | FK | - |
| valorXdefecto | VARCHAR | ✗ | - | - |

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

- **id_parametro** → [lic_parametro](../licencias/lic_parametro) - Referencia a lic_parametro
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Licencias
- Nombre real en base de datos: `lic_catalogo_parametro`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [lic_catalogo_parametro] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [lic_catalogo_parametro] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
