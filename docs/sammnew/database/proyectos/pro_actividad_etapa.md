---
sidebar_position: 6
title: pro_actividad_etapa
description: Tabla pro_actividad_etapa del módulo Proyectos
tags: [database, pro]
---

# pro_actividad_etapa

## Descripción

Tabla pro_actividad_etapa del módulo Proyectos.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| actividad_etapa | VARCHAR | ✗ | - | - |
| id_etapa | INTEGER | ✗ | FK | - |
| id_actividad | INTEGER | ✗ | FK | - |

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

- **id_etapa** → [pro_etapa](../proyectos/pro_etapa) - Referencia a pro_etapa
- **id_actividad** → [pro_actividad](../proyectos/pro_actividad) - Referencia a pro_actividad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Nombre real en base de datos: `pro_actividad_etapa`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [pro_actividad_etapa] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [pro_actividad_etapa] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
