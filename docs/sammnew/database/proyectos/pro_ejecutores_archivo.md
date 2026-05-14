---
sidebar_position: 11
title: pro_ejecutores_archivo
description: Tabla pro_ejecutores_archivo del módulo Proyectos
tags: [database, pro]
---

# pro_ejecutores_archivo

## Descripción

Tabla pro_ejecutores_archivo del módulo Proyectos.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| ejecutores_archivo | VARCHAR | ✗ | - | - |
| revisado | BIT | ✓ | - | - |
| aprobado | BIT | ✓ | - | - |
| fecha_revision | DATETIME | ✓ | - | - |
| fecha_aprobacion | DATETIME | ✓ | - | - |
| id_archivo | INTEGER | ✗ | FK | - |
| id_ejecutores | INTEGER | ✗ | FK | - |

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

- **id_ejecutores** → [pro_ejecutores](../proyectos/pro_ejecutores) - Referencia a pro_ejecutores
- **id_archivo** → [gen_archivo](../general/gen_archivo) - Referencia a gen_archivo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Nombre real en base de datos: `pro_ejecutores_archivo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [pro_ejecutores_archivo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [pro_ejecutores_archivo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
