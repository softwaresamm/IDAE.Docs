---
sidebar_position: 10
title: gen_envioCorreo
description: Tabla gen_envioCorreo del módulo General / Configuración
tags: [database, gen]
---

# gen_envioCorreo

## Descripción

Tabla gen_envioCorreo del módulo General / Configuración.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| envioCorreo | VARCHAR | ✗ | - | - |
| envioCorreo_codigo | VARCHAR | ✓ | - | - |
| estrategia | INTEGER | ✗ | - | - |
| tabla | VARCHAR | ✗ | - | - |
| id_reporte | INTEGER | ✗ | FK | - |
| correoAdicional | VARCHAR | ✓ | - | - |
| plantillaAdjunto | VARCHAR | ✓ | - | - |
| id_subtipoDocumento | INTEGER | ✗ | FK | - |
| id_estadoTipoDocumento | INTEGER | ✗ | FK | - |
| cantidadMensajes | INTEGER | ✗ | - | - |
| tiempo_por_mensajes | INTEGER | ✗ | - | - |
| cantidadReintento | INTEGER | ✗ | - | - |
| adjuntarArchivo | INTEGER | ✓ | - | - |
| id_remitenteCorreo | INTEGER | ✓ | FK | - |

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

- **id_remitenteCorreo** → [gen_remitenteCorreo](../general/gen_remitenteCorreo) - Referencia a gen_remitenteCorreo
- **id_estadoTipoDocumento** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento
- **id_subtipoDocumento** → [doc_subtipoDocumento](../documentos/doc_subtipoDocumento) - Referencia a doc_subtipoDocumento
- **id_reporte** → [rep_reporte](../reportes/rep_reporte) - Referencia a rep_reporte

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo General / Configuración
- Nombre real en base de datos: `gen_envioCorreo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [gen_envioCorreo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [gen_envioCorreo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
