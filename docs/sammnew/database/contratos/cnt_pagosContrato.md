---
sidebar_position: 10
title: cnt_pagosContrato
description: Tabla cnt_pagosContrato del módulo Contratos
tags: [database, cnt]
---

# cnt_pagosContrato

## Descripción

Tabla cnt_pagosContrato del módulo Contratos.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| pagosContrato | VARCHAR | ✗ | - | - |
| pagosContrato_codigo | VARCHAR | ✓ | - | - |
| fecha_ff | DATETIME | ✗ | - | - |
| valor | MONEY | ✗ | - | - |
| id_contrato | INTEGER | ✗ | FK | - |

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

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Nombre real en base de datos: `cnt_pagosContrato`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [cnt_pagosContrato] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [cnt_pagosContrato] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
