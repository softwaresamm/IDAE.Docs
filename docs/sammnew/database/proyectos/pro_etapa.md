---
sidebar_position: 15
title: pro_etapa
description: Tabla para gestionar etapa en el sistema SAMM
tags: [database, pro]
---

# pro_etapa

## Descripción

Tabla para gestionar etapa en el sistema SAMM.

**Módulo**: Proyectos  
**Prefijo**: `pro_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| etapa | VARCHAR | ✓ | - | - | - |
| etapa_codigo | VARCHAR | ✓ | - | - | - |
| descripcion | VARCHAR | ✓ | - | - | - |
| orden | INTEGER | ✓ | - | - | - |
| completado | INTEGER | ✓ | - | - | - |
| porcentajePresupuesto | DECIMAL | ✓ | - | - | - |
| valorPresupuesto | DECIMAL | ✓ | - | - | - |
| fechaInicioPlaneada_ff | DATE | ✓ | - | - | - |
| fechaInicioProyectada_ff | DATE | ✓ | - | - | - |
| fechaInicioReal_ff | DATE | ✓ | - | - | - |
| fechaFinPlaneada_ff | DATE | ✓ | - | - | - |
| fechaFinProyectada_ff | DATE | ✓ | - | - | - |
| fechaFinReal_ff | DATE | ✓ | - | - | - |

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

*Esta tabla no tiene relaciones salientes (foreign keys).*

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Proyectos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM pro_etapa WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM pro_etapa
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
