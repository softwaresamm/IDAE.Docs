---
sidebar_position: 19
title: gen_registroEnvio
description: Tabla gen_registroEnvio del módulo General / Configuración
tags: [database, gen]
---

# gen_registroEnvio

## Descripción

Tabla gen_registroEnvio del módulo General / Configuración.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| registroEnvio | VARCHAR | ✗ | - | - |
| registroEnvio_codigo | VARCHAR | ✓ | - | - |
| tabla | VARCHAR | ✗ | - | - |
| reintentar | BIT | ✗ | - | - |
| id_envioCorreo | INTEGER | ✗ | FK | - |
| id_registroEnvio | INTEGER | ✗ | FK | - |

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

- **id_envioCorreo** → [gen_envioCorreo](../general/gen_envioCorreo) - Referencia a gen_envioCorreo
- **id_registroEnvio** → [gen_registroEnvio](../general/gen_registroEnvio) - Referencia a gen_registroEnvio

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo General / Configuración
- Nombre real en base de datos: `gen_registroEnvio`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [gen_registroEnvio] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [gen_registroEnvio] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
