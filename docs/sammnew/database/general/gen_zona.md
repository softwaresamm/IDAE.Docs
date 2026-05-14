---
sidebar_position: 24
title: gen_zona
description: Tabla para gestionar zona en el sistema SAMM
tags: [database, gen]
---

# gen_zona

## Descripción

Tabla para gestionar zona en el sistema SAMM.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| zona | VARCHAR | ✓ | - | - | - |
| zona_codigo | VARCHAR | ✓ | - | - | - |
| tiempoDesplazamiento | DECIMAL | ✓ | - | - | - |
| nivel | INTEGER | ✓ | - | - | - |
| id_zona | INTEGER | ✓ | FK | - | - |
| codigoExterno | VARCHAR | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo General / Configuración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gen_zona WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gen_zona
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
