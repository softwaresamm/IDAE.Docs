---
sidebar_position: 8
title: ter_sucursal
description: Tabla para gestionar sucursal en el sistema SAMM
tags: [database, ter]
---

# ter_sucursal

## Descripción

Tabla para gestionar sucursal en el sistema SAMM.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| sucursal | VARCHAR | ✓ | - | - | - |
| sucursal_codigo | VARCHAR | ✓ | - | - | - |
| contacto | VARCHAR | ✓ | - | - | - |
| telefono | VARCHAR | ✓ | - | - | - |
| Fax | VARCHAR | ✓ | - | - | - |
| Email | VARCHAR | ✓ | - | - | - |
| Direccion | VARCHAR | ✓ | - | - | - |
| paraVenta | BIT | ✓ | - | - | - |
| paraSoporte | BIT | ✓ | - | - | - |
| paraAlquiler | BIT | ✓ | - | - | - |
| id_tercero | INTEGER | ✓ | FK | - | - |
| id_zona | INTEGER | ✓ | FK | - | - |
| id_usuario_asesor | INTEGER | ✓ | FK | - | - |
| id_usuario_tecnico | INTEGER | ✓ | FK | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |
| id_estadoTercero | INTEGER | ✓ | FK | - | - |
| codigorecursiva | VARCHAR | ✓ | - | - | - |
| cargo | VARCHAR | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **id_usuario_creo**: Usuario que creó el registro
- **id_usuario_modifico**: Usuario que modificó el registro
- **fechaCreacion**: Fecha y hora de creación
- **fechaModificacion**: Fecha y hora de última modificación
- **uid**: Control multiempresa (User ID)
- **eid**: Control multiempresa (Entity ID)

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona
- **id_usuario_asesor** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_usuario_tecnico** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_estadoTercero** → [ter_estadoTercero](../terceros/ter_estadoTercero) - Referencia a ter_estadoTercero

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ter_sucursal WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ter_sucursal
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
