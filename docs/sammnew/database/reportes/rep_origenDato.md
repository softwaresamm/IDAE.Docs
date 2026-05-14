---
sidebar_position: 6
title: rep_origenDato
description: Tabla rep_origenDato del módulo Reportes
tags: [database, rep]
---

# rep_origenDato

## Descripción

Tabla rep_origenDato del módulo Reportes.

**Módulo**: Reportes  
**Prefijo**: `rep_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| origenDato | VARCHAR | ✗ | - | - |
| origenDato_codigo | VARCHAR | ✓ | - | - |
| id_reporte | INTEGER | ✗ | FK | - |
| duracion | INTEGER | ✓ | - | - |

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

- **id_reporte** → [rep_reporte](../reportes/rep_reporte) - Referencia a rep_reporte

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Reportes
- Nombre real en base de datos: `rep_origenDato`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [rep_origenDato] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [rep_origenDato] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
