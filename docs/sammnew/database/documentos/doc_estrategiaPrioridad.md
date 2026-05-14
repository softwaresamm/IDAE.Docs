---
sidebar_position: 35
title: doc_estrategiaPrioridad
description: Tabla para gestionar estrategiaPrioridad en el sistema SAMM
tags: [database, doc]
---

# doc_estrategiaPrioridad

## Descripción

Tabla para gestionar estrategiaPrioridad en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| estrategiaPrioridad | VARCHAR | ✓ | - | - | - |
| estrategiaPrioridad_codigo | VARCHAR | ✓ | - | - | - |
| lunesIni_hh | DATETIME | ✓ | - | - | - |
| lunesFin_hh | DATETIME | ✓ | - | - | - |
| martesIni_hh | DATETIME | ✓ | - | - | - |
| martesFin_hh | DATETIME | ✓ | - | - | - |
| miercolesIni_hh | DATETIME | ✓ | - | - | - |
| miercolesFin_hh | DATETIME | ✓ | - | - | - |
| juevesIni_hh | DATETIME | ✓ | - | - | - |
| juevesFin_hh | DATETIME | ✓ | - | - | - |
| viernesIni_hh | DATETIME | ✓ | - | - | - |
| viernesFin_hh | DATETIME | ✓ | - | - | - |
| sabadoIni_hh | DATETIME | ✓ | - | - | - |
| sabadoFin_hh | DATETIME | ✓ | - | - | - |
| domingoIni_hh | DATETIME | ✓ | - | - | - |
| domingoFin_hh | DATETIME | ✓ | - | - | - |
| festivoIni_hh | DATETIME | ✓ | - | - | - |
| festivoFin_hh | DATETIME | ✓ | - | - | - |

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

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_estrategiaPrioridad WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_estrategiaPrioridad
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
