---
sidebar_position: 2
title: rep_campoReporteDependiente
description: Tabla rep_campoReporteDependiente del módulo Reportes
tags: [database, rep]
---

# rep_campoReporteDependiente

## Descripción

Tabla rep_campoReporteDependiente del módulo Reportes.

**Módulo**: Reportes  
**Prefijo**: `rep_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| campoReporteDependiente | VARCHAR | ✗ | - | - |
| campoReporteDependiente_codigo | VARCHAR | ✓ | - | - |
| id_campoReporte_origen | INTEGER | ✗ | FK | - |
| id_campoReporte_dependiente | INTEGER | ✗ | FK | - |

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

- **id_campoReporte_dependiente** → [rep_campoReporte](../reportes/rep_campoReporte) - Referencia a rep_campoReporte
- **id_campoReporte_origen** → [rep_campoReporte](../reportes/rep_campoReporte) - Referencia a rep_campoReporte

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Reportes
- Nombre real en base de datos: `rep_campoReporteDependiente`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [rep_campoReporteDependiente] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [rep_campoReporteDependiente] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
