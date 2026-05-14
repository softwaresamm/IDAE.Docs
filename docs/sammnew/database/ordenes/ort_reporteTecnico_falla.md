---
sidebar_position: 7
title: ort_reporteTecnico_falla
description: Tabla ort_reporteTecnico_falla del módulo Órdenes de Trabajo
tags: [database, ort]
---

# ort_reporteTecnico_falla

## Descripción

Tabla ort_reporteTecnico_falla del módulo Órdenes de Trabajo.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| reporteTecnico_falla | VARCHAR | ✗ | - | - |
| id_reporteTecnico | INTEGER | ✗ | FK | - |
| id_falla | INTEGER | ✗ | FK | - |
| id_falla_causa | INTEGER | ✗ | FK | - |
| id_falla_efecto | INTEGER | ✗ | FK | - |

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

- **id_falla_causa** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla_efecto** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_falla** → [equ_falla](../equipos/equ_falla) - Referencia a equ_falla
- **id_reporteTecnico** → [ort_reporteTecnico](../ordenes/ort_reporteTecnico) - Referencia a ort_reporteTecnico

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Nombre real en base de datos: `ort_reporteTecnico_falla`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [ort_reporteTecnico_falla] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [ort_reporteTecnico_falla] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
