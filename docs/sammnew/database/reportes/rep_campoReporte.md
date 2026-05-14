---
sidebar_position: 1
title: rep_campoReporte
description: Tabla rep_campoReporte del módulo Reportes
tags: [database, rep]
---

# rep_campoReporte

## Descripción

Tabla rep_campoReporte del módulo Reportes.

**Módulo**: Reportes  
**Prefijo**: `rep_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| campoReporte | VARCHAR | ✗ | - | - |
| campoReporte_codigo | VARCHAR | ✓ | - | - |
| id_reporte | INTEGER | ✗ | FK | - |
| id_tipoCampoReporte | INTEGER | ✗ | FK | - |
| tabla | VARCHAR | ✗ | - | - |
| valorDefecto | VARCHAR | ✗ | - | - |
| esParametro | BIT | ✗ | - | - |
| esSerie | BIT | ✗ | - | - |
| parametroTotal | BIT | ✗ | - | - |
| condicion | VARCHAR | ✓ | - | - |

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
- **id_tipoCampoReporte** → [rep_tipoCampoReporte](../reportes/rep_tipoCampoReporte) - Referencia a rep_tipoCampoReporte

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Reportes
- Nombre real en base de datos: `rep_campoReporte`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [rep_campoReporte] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [rep_campoReporte] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
