---
sidebar_position: 20
title: gen_remitenteCorreo
description: Tabla gen_remitenteCorreo del módulo General / Configuración
tags: [database, gen]
---

# gen_remitenteCorreo

## Descripción

Tabla gen_remitenteCorreo del módulo General / Configuración.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| remitenteCorreo | VARCHAR | ✗ | - | - |
| remitenteCorreo_codigo | VARCHAR | ✓ | - | - |
| servidor | VARCHAR | ✓ | - | - |
| certificado | BIT | ✓ | - | - |
| puerto | VARCHAR | ✓ | - | - |
| credenciales | VARCHAR | ✓ | - | - |
| esGSuite | BIT | ✓ | - | - |
| cuentaCertificado | VARCHAR | ✓ | - | - |
| archivoCertificado | VARCHAR | ✓ | - | - |

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

- Esta tabla forma parte del módulo General / Configuración
- Nombre real en base de datos: `gen_remitenteCorreo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [gen_remitenteCorreo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [gen_remitenteCorreo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
