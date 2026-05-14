---
sidebar_position: 4
title: pro_actividadPredecesora
description: Tabla pro_actividadPredecesora del módulo Proyectos
tags: [database, pro]
---

# pro_actividadPredecesora

## Descripción

Tabla pro_actividadPredecesora del módulo Proyectos.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| actividadPredecesora | VARCHAR | ✗ | - | - |
| actividadPredecesora_codigo | VARCHAR | ✓ | - | - |
| id_actividad_origen | INTEGER | ✗ | FK | - |
| id_actividad_destino | INTEGER | ✗ | FK | - |

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

- **id_actividad_destino** → [pro_actividad](../proyectos/pro_actividad) - Referencia a pro_actividad
- **id_actividad_origen** → [pro_actividad](../proyectos/pro_actividad) - Referencia a pro_actividad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Nombre real en base de datos: `pro_actividadPredecesora`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [pro_actividadPredecesora] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [pro_actividadPredecesora] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
