---
sidebar_position: 9
title: gen_empresa
description: Tabla gen_empresa del módulo General / Configuración
tags: [database, gen]
---

# gen_empresa

## Descripción

Tabla gen_empresa del módulo General / Configuración.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| empresa | VARCHAR | ✗ | - | - |
| empresa_codigo | VARCHAR | ✓ | - | - |
| codigo | VARCHAR | ✗ | - | - |
| costoAdministrativoMes | MONEY | ✗ | - | - |
| id_empresa | INTEGER | ✗ | FK | - |

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

- **id_empresa** → [gen_empresa](../general/gen_empresa) - Referencia a gen_empresa

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo General / Configuración
- Nombre real en base de datos: `gen_empresa`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [gen_empresa] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [gen_empresa] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
