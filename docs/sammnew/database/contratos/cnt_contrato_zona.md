---
sidebar_position: 8
title: cnt_contrato_zona
description: Tabla cnt_contrato_zona del módulo Contratos
tags: [database, cnt]
---

# cnt_contrato_zona

## Descripción

Tabla cnt_contrato_zona del módulo Contratos.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| contrato_zona | VARCHAR | ✗ | - | - |
| precioVisita | MONEY | ✗ | - | - |
| precioServicio | MONEY | ✗ | - | - |
| id_contrato | INTEGER | ✗ | FK | - |
| id_zona | INTEGER | ✗ | FK | - |

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
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Nombre real en base de datos: `cnt_contrato_zona`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cnt_contrato_zona] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cnt_contrato_zona] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
