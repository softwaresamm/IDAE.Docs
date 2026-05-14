---
sidebar_position: 34
title: doc_estrategiaPrioridad
description: Tabla doc_estrategiaPrioridad del módulo Documentos
tags: [database, doc]
---

# doc_estrategiaPrioridad

## Descripción

Tabla doc_estrategiaPrioridad del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| estrategiaPrioridad | VARCHAR | ✗ | - | - |
| estrategiaPrioridad_codigo | VARCHAR | ✓ | - | - |
| lunesIni_hh | DATETIME | ✗ | - | - |
| lunesFin_hh | DATETIME | ✗ | - | - |
| martesIni_hh | DATETIME | ✗ | - | - |
| martesFin_hh | DATETIME | ✗ | - | - |
| miercolesIni_hh | DATETIME | ✗ | - | - |
| miercolesFin_hh | DATETIME | ✗ | - | - |
| juevesIni_hh | DATETIME | ✗ | - | - |
| juevesFin_hh | DATETIME | ✗ | - | - |
| viernesIni_hh | DATETIME | ✗ | - | - |
| viernesFin_hh | DATETIME | ✗ | - | - |
| sabadoIni_hh | DATETIME | ✗ | - | - |
| sabadoFin_hh | DATETIME | ✗ | - | - |
| domingoIni_hh | DATETIME | ✗ | - | - |
| domingoFin_hh | DATETIME | ✗ | - | - |
| festivoIni_hh | DATETIME | ✗ | - | - |
| festivoFin_hh | DATETIME | ✗ | - | - |

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

*Esta tabla no tiene relaciones salientes definidas.*

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_estrategiaPrioridad`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_estrategiaPrioridad] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_estrategiaPrioridad] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
