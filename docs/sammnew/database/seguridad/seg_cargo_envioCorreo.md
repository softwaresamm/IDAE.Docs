---
sidebar_position: 2
title: seg_cargo_envioCorreo
description: Tabla para gestionar cargo_envioCorreo en el sistema SAMM
tags: [database, seg]
---

# seg_cargo_envioCorreo

## Descripción

Tabla para gestionar cargo_envioCorreo en el sistema SAMM.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| cargo_envioCorreo | VARCHAR | ✓ | - | - | - |
| id_cargo | INTEGER | ✓ | FK | - | - |
| id_envioCorreo | INTEGER | ✓ | FK | - | - |

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

- **id_cargo** → [seg_cargo](../seguridad/seg_cargo) - Referencia a seg_cargo
- **id_envioCorreo** → [gen_envioCorreo](../general/gen_envioCorreo) - Referencia a gen_envioCorreo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM seg_cargo_envioCorreo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM seg_cargo_envioCorreo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
