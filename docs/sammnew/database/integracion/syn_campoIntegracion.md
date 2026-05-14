---
sidebar_position: 1
title: syn_campoIntegracion
description: Tabla para gestionar campoIntegracion en el sistema SAMM
tags: [database, syn]
---

# syn_campoIntegracion

## Descripción

Tabla para gestionar campoIntegracion en el sistema SAMM.

**Módulo**: Integración  
**Prefijo**: `syn_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| campoIntegracion | VARCHAR | ✓ | - | - | - |
| campoIntegracion_codigo | VARCHAR | ✓ | - | - | - |
| campoLocal | VARCHAR | ✓ | - | - | - |
| tablaAuxiliar | VARCHAR | ✓ | - | - | - |
| campoEnlace | VARCHAR | ✓ | - | - | - |
| valorXDefecto | VARCHAR | ✓ | - | - | - |
| tipoDato | INTEGER | ✓ | - | - | - |
| longitud | INTEGER | ✓ | - | - | - |
| esLlave | BIT | ✓ | - | - | - |
| orden | INTEGER | ✓ | - | - | - |
| id_puntoIntegracion | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

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
SELECT * FROM syn_campoIntegracion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM syn_campoIntegracion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
