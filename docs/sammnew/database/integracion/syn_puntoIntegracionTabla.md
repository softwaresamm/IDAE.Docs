---
sidebar_position: 3
title: syn_puntoIntegracionTabla
description: Tabla para gestionar puntoIntegracionTabla en el sistema SAMM
tags: [database, syn]
---

# syn_puntoIntegracionTabla

## Descripción

Tabla para gestionar puntoIntegracionTabla en el sistema SAMM.

**Módulo**: Integración  
**Prefijo**: `syn_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| puntoIntegracionTabla | VARCHAR | ✓ | - | - | - |
| puntoIntegracionTabla_codigo | VARCHAR | ✓ | - | - | - |
| id_puntoIntegracion | INTEGER | ✓ | FK | - | - |
| tabla | VARCHAR | ✓ | - | - | - |

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

- **id_puntoIntegracion** → [unknown_puntoIntegracion](../general/unknown_puntoIntegracion) - Referencia a unknown_puntoIntegracion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Integración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM syn_puntoIntegracionTabla WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM syn_puntoIntegracionTabla
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
