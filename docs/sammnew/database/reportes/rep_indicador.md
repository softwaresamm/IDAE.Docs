---
sidebar_position: 4
title: rep_indicador
description: Tabla para gestionar indicador en el sistema SAMM
tags: [database, rep]
---

# rep_indicador

## Descripción

Tabla para gestionar indicador en el sistema SAMM.

**Módulo**: Reportes  
**Prefijo**: `rep_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| indicador | VARCHAR | ✓ | - | - | - |
| indicador_codigo | VARCHAR | ✓ | - | - | - |
| id_reporte | INTEGER | ✓ | FK | - | - |
| titulo | VARCHAR | ✓ | - | - | - |
| descripcion | VARCHAR | ✓ | - | - | - |
| cabecera | VARCHAR | ✓ | - | - | - |
| seccion1 | VARCHAR | ✓ | - | - | - |
| seccion2 | VARCHAR | ✓ | - | - | - |
| seccion3 | VARCHAR | ✓ | - | - | - |
| seccion4 | VARCHAR | ✓ | - | - | - |
| seccion5 | VARCHAR | ✓ | - | - | - |
| seccion6 | VARCHAR | ✓ | - | - | - |
| seccion7 | VARCHAR | ✓ | - | - | - |
| seccion8 | VARCHAR | ✓ | - | - | - |

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

- **id_reporte** → [rep_reporte](../reportes/rep_reporte) - Referencia a rep_reporte

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Reportes
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM rep_indicador WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM rep_indicador
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
