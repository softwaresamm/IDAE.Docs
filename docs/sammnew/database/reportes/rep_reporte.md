---
sidebar_position: 7
title: rep_reporte
description: Tabla para gestionar reporte en el sistema SAMM
tags: [database, rep]
---

# rep_reporte

## Descripción

Tabla para gestionar reporte en el sistema SAMM.

**Módulo**: Reportes  
**Prefijo**: `rep_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| reporte | VARCHAR | ✓ | - | - | - |
| reporte_codigo | VARCHAR | ✓ | - | - | - |
| id_funcionalidad | INTEGER | ✓ | FK | - | - |
| esFormato | BIT | ✓ | - | - | - |
| tieneGraficos | BIT | ✓ | - | - | - |
| cabecera | VARCHAR | ✓ | - | - | - |
| orden | INTEGER | ✓ | - | - | - |
| basica | BIT | ✓ | - | - | - |
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

- **id_funcionalidad** → [unknown_funcionalidad](../general/unknown_funcionalidad) - Referencia a unknown_funcionalidad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Reportes
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM rep_reporte WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM rep_reporte
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
