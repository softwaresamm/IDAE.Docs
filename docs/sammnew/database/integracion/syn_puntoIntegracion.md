---
sidebar_position: 2
title: syn_puntoIntegracion
description: Tabla para gestionar puntoIntegracion en el sistema SAMM
tags: [database, syn]
---

# syn_puntoIntegracion

## Descripción

Tabla para gestionar puntoIntegracion en el sistema SAMM.

**Módulo**: Integración  
**Prefijo**: `syn_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| puntoIntegracion | VARCHAR | ✓ | - | - | - |
| puntoIntegracion_codigo | VARCHAR | ✓ | - | - | - |
| tablaLocal | VARCHAR | ✓ | - | - | - |
| condicion | VARCHAR | ✓ | - | - | - |
| urlConsumir | VARCHAR | ✓ | - | - | - |
| id_puntoIntegracion | INTEGER | ✓ | FK | - | - |
| id_sistemaIntegrar | INTEGER | ✓ | FK | - | - |
| metodo | VARCHAR | ✓ | - | - | - |
| cantidadReintentos | INTEGER | ✓ | - | - | - |
| intervaloReintentos | INTEGER | ✓ | - | - | - |
| codigosReintentos | VARCHAR | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_puntoIntegracion** → [unknown_puntoIntegracion](../general/unknown_puntoIntegracion) - Referencia a unknown_puntoIntegracion
- **id_sistemaIntegrar** → [unknown_sistemaIntegrar](../general/unknown_sistemaIntegrar) - Referencia a unknown_sistemaIntegrar

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Integración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM syn_puntoIntegracion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM syn_puntoIntegracion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
