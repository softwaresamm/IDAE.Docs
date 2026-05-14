---
sidebar_position: 2
title: syn_puntoIntegracion
description: Tabla syn_puntoIntegracion del módulo Integración
tags: [database, syn]
---

# syn_puntoIntegracion

## Descripción

Tabla syn_puntoIntegracion del módulo Integración.

**Módulo**: Integración  
**Prefijo**: `syn_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| puntoIntegracion | VARCHAR | ✗ | - | - |
| puntoIntegracion_codigo | VARCHAR | ✓ | - | - |
| tablaLocal | VARCHAR | ✓ | - | - |
| condicion | VARCHAR | ✓ | - | - |
| urlConsumir | VARCHAR | ✓ | - | - |
| id_puntoIntegracion | INTEGER | ✓ | FK | - |
| id_sistemaIntegrar | INTEGER | ✓ | FK | - |
| metodo | VARCHAR | ✓ | - | - |
| cantidadReintentos | INTEGER | ✓ | - | - |
| intervaloReintentos | INTEGER | ✓ | - | - |
| codigosReintentos | VARCHAR | ✓ | - | - |
| mascaraJSON | VARCHAR | ✓ | - | - |

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

- **id_puntoIntegracion** → [syn_puntoIntegracion](../integracion/syn_puntoIntegracion) - Referencia a syn_puntoIntegracion
- **id_sistemaIntegrar** → [syn_sistemaIntegrar](../integracion/syn_sistemaIntegrar) - Referencia a syn_sistemaIntegrar

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Integración
- Nombre real en base de datos: `syn_puntoIntegracion`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [syn_puntoIntegracion] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [syn_puntoIntegracion] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
