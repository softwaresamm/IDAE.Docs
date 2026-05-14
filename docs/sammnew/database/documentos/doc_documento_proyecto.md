---
sidebar_position: 21
title: doc_documento_proyecto
description: Tabla para gestionar documento_proyecto en el sistema SAMM
tags: [database, doc]
---

# doc_documento_proyecto

## Descripción

Tabla para gestionar documento_proyecto en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| documento_proyecto | VARCHAR | ✓ | - | - | - |
| nombre | VARCHAR | ✓ | - | - | - |
| fechaInicioEstimada | DATETIME | ✓ | - | - | - |
| fechaFinEstimada | DATETIME | ✓ | - | - | - |
| descripcion | VARCHAR | ✓ | - | - | - |
| presupuesto | DECIMAL | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

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
SELECT * FROM doc_documento_proyecto WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_proyecto
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
