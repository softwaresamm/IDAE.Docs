---
sidebar_position: 10
title: seg_registroPeticion
description: Tabla para gestionar registroPeticion en el sistema SAMM
tags: [database, seg]
---

# seg_registroPeticion

## Descripción

Tabla para gestionar registroPeticion en el sistema SAMM.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| registroPeticion | VARCHAR | ✓ | - | - | - |
| registroPeticion_codigo | VARCHAR | ✓ | - | - | - |
| urlServicio | VARCHAR | ✓ | - | - | - |
| modulo | VARCHAR | ✓ | - | - | - |
| aplicacion | VARCHAR | ✓ | - | - | - |
| esExitosa | BIT | ✓ | - | - | - |
| mensajeRespuesta | VARCHAR | ✓ | - | - | - |
| id_usuario | INTEGER | ✓ | FK | - | - |
| tamanoPeticion | DECIMAL | ✓ | - | - | - |

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

- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM seg_registroPeticion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM seg_registroPeticion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
