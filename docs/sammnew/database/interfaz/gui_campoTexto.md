---
sidebar_position: 4
title: gui_campoTexto
description: Tabla para gestionar campoTexto en el sistema SAMM
tags: [database, gui]
---

# gui_campoTexto

## Descripción

Tabla para gestionar campoTexto en el sistema SAMM.

**Módulo**: Interfaz  
**Prefijo**: `gui_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| campoTexto | VARCHAR | ✓ | - | - | - |
| campoTexto_codigo | VARCHAR | ✓ | - | - | - |
| esHTML | BIT | ✓ | - | - | - |
| id_funcionalidad | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_funcionalidad** → [unknown_funcionalidad](../general/unknown_funcionalidad) - Referencia a unknown_funcionalidad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Interfaz
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gui_campoTexto WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gui_campoTexto
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
