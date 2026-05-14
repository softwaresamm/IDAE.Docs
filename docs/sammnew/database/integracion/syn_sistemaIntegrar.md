---
sidebar_position: 5
title: syn_sistemaIntegrar
description: Tabla para gestionar sistemaIntegrar en el sistema SAMM
tags: [database, syn]
---

# syn_sistemaIntegrar

## Descripción

Tabla para gestionar sistemaIntegrar en el sistema SAMM.

**Módulo**: Integración  
**Prefijo**: `syn_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| sistemaIntegrar | VARCHAR | ✓ | - | - | - |
| sistemaIntegrar_codigo | VARCHAR | ✓ | - | - | - |
| usuario | VARCHAR | ✓ | - | - | - |
| clave | VARCHAR | ✓ | - | - | - |
| urlAutenticar | VARCHAR | ✓ | - | - | - |
| id_tipoAutenticacion | INTEGER | ✓ | FK | - | - |
| token | VARCHAR | ✓ | - | - | - |
| metodoAutenticar | VARCHAR | ✓ | - | - | - |
| estructuraResponseAutenticar | VARCHAR | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_tipoAutenticacion** → [unknown_tipoAutenticacion](../general/unknown_tipoAutenticacion) - Referencia a unknown_tipoAutenticacion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Integración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM syn_sistemaIntegrar WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM syn_sistemaIntegrar
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
