---
sidebar_position: 3
title: dis_evento_catalogo
description: Tabla dis_evento_catalogo del módulo Despacho
tags: [database, dis]
---

# dis_evento_catalogo

## Descripción

Tabla dis_evento_catalogo del módulo Despacho.

**Módulo**: Despacho  
**Prefijo**: `dis_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| evento_catalogo | VARCHAR | ✗ | - | - |
| equipoAuxiliar | BIT | ✗ | - | - |
| cantidad | FLOAT | ✓ | - | - |
| valorUnitario | FLOAT | ✓ | - | - |
| total | FLOAT | ✓ | - | - |
| id_evento | INTEGER | ✗ | FK | - |
| id_catalogo | INTEGER | ✗ | FK | - |
| observaciones | VARCHAR | ✗ | - | - |

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

- **id_evento** → [dis_evento](../despacho/dis_evento) - Referencia a dis_evento
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Despacho
- Nombre real en base de datos: `dis_evento_catalogo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [dis_evento_catalogo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [dis_evento_catalogo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
