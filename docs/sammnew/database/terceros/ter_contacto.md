---
sidebar_position: 2
title: ter_contacto
description: Tabla para gestionar contacto en el sistema SAMM
tags: [database, ter]
---

# ter_contacto

## Descripción

Tabla para gestionar contacto en el sistema SAMM.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| contacto | VARCHAR | ✓ | - | - | - |
| contacto_codigo | VARCHAR | ✓ | - | - | - |
| telefono | VARCHAR | ✓ | - | - | - |
| Fax | VARCHAR | ✓ | - | - | - |
| Email | VARCHAR | ✓ | - | - | - |
| Direccion | VARCHAR | ✓ | - | - | - |
| telefonoMovil | VARCHAR | ✓ | - | - | - |
| id_tercero | INTEGER | ✓ | FK | - | - |
| id_usuario | INTEGER | ✓ | FK | - | - |
| cargo | VARCHAR | ✓ | - | - | - |
| codigoAcceso | VARCHAR | ✓ | - | - | - |
| id_cargoContacto | INTEGER | ✓ | FK | - | - |
| accesoActivo | BIT | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_tercero** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_cargoContacto** → [unknown_cargoContacto](../general/unknown_cargoContacto) - Referencia a unknown_cargoContacto

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ter_contacto WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ter_contacto
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
