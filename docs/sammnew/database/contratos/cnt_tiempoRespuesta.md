---
sidebar_position: 12
title: cnt_tiempoRespuesta
description: Tabla cnt_tiempoRespuesta del módulo Contratos
tags: [database, cnt]
---

# cnt_tiempoRespuesta

## Descripción

Tabla cnt_tiempoRespuesta del módulo Contratos.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| tiempoRespuesta | VARCHAR | ✗ | - | - |
| tiempoRespuesta_codigo | VARCHAR | ✓ | - | - |
| tiempoLimite | INTEGER | ✗ | - | - |
| id_contrato | INTEGER | ✗ | FK | - |
| id_prioridadDocumento | INTEGER | ✗ | FK | - |
| id_estrategiaPrioridad | INTEGER | ✗ | FK | - |

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

- **id_contrato** → [cnt_contrato](../contratos/cnt_contrato) - Referencia a cnt_contrato
- **id_prioridadDocumento** → [doc_prioridadDocumento](../documentos/doc_prioridadDocumento) - Referencia a doc_prioridadDocumento
- **id_estrategiaPrioridad** → [doc_estrategiaPrioridad](../documentos/doc_estrategiaPrioridad) - Referencia a doc_estrategiaPrioridad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Nombre real en base de datos: `cnt_tiempoRespuesta`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cnt_tiempoRespuesta] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cnt_tiempoRespuesta] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
