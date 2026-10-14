---
sidebar_position: 56
title: doc_tipoDocumento_tipoPendiente
description: Tabla doc_tipoDocumento_tipoPendiente del módulo Documentos
tags: [database, doc]
---

# doc_tipoDocumento_tipoPendiente

## Descripción

Tabla puente (N:M) que asocia un [doc_tipoDocumento](../documentos/doc_tipoDocumento) con las
[doc_tipoPendiente](../documentos/doc_tipoPendiente) (clasificaciones) válidas para ese tipo de
documento. Se usa para filtrar la "Clasificación" de un repuesto sugerido según el tipo de
documento elegido en el utilitario de reporte técnico (SO-2223).

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| tipoDocumento_tipoPendiente | VARCHAR | ✗ | - | - |
| id_tipoDocumento | INTEGER | ✗ | FK | - |
| id_tipoPendiente | INTEGER | ✗ | FK | - |

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

- **id_tipoDocumento** → [doc_tipoDocumento](../documentos/doc_tipoDocumento) - Referencia a doc_tipoDocumento
- **id_tipoPendiente** → [doc_tipoPendiente](../documentos/doc_tipoPendiente) - Referencia a doc_tipoPendiente

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Mantenimiento

Las asociaciones se administran desde el formulario `doc_tipoDocumento.aspx` (sammnew), en el tab
"Clasificaciones" (control `inc_tipoPendienteTipoDocumento.ascx`). Los permisos de crear/editar/eliminar
cuelgan de ese tab (`nombreControl='doc_tipoDocumento_tipoPendiente'`), no del formulario `doc_tipoPendiente`.

## Consumo desde servicios

El tipo de documento filtra las clasificaciones disponibles vía el SP `fil_tipoPendienteXtipoDocumento`,
consumido a través del mecanismo genérico `/api/buscar/{tabla}/{filtro}`:

```
GET /api/buscar/tipoPendiente/fil_tipoPendienteXtipoDocumento?td=<id>
```

Si no hay ninguna asociación configurada (tabla vacía), el SP devuelve el catálogo completo de
`doc_tipoPendiente` sin filtrar, para no romper el flujo mientras un cliente no haya configurado
sus clasificaciones por tipo de documento.

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_tipoDocumento_tipoPendiente`
- Scripts de creación: `sammapi/capadatos/sps/SO-2223/` (pendientes de migrar a `SAMM.DBObjects`)
- Como toda tabla del sistema, incluye un registro `id = 0` por defecto (integridad referencial)

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_tipoDocumento_tipoPendiente] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_tipoDocumento_tipoPendiente] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Página de documentación creada manualmente (SO-2223) siguiendo el formato de las páginas
generadas desde el esquema real de la base de datos `sn_dev`.
