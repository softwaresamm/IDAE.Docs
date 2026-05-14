---
sidebar_position: 1
title: rep_campoReporte
description: Tabla para gestionar campoReporte en el sistema SAMM
tags: [database, rep]
---

# rep_campoReporte

## Descripción

Tabla para gestionar campoReporte en el sistema SAMM.

**Módulo**: Reportes  
**Prefijo**: `rep_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| campoReporte | VARCHAR | ✓ | - | - | - |
| campoReporte_codigo | VARCHAR | ✓ | - | - | - |
| id_reporte | INTEGER | ✓ | FK | - | - |
| id_tipoCampoReporte | INTEGER | ✓ | FK | - | - |
| tabla | VARCHAR | ✓ | - | - | - |
| valorDefecto | VARCHAR | ✓ | - | - | - |
| esParametro | BIT | ✓ | - | - | - |
| esSerie | BIT | ✓ | - | - | - |
| parametroTotal | BIT | ✓ | - | - | - |
| condicion | VARCHAR | ✓ | - | - | - |

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
- **id_tipoCampoReporte** → [rep_tipoCampoReporte](../reportes/rep_tipoCampoReporte) - Referencia a rep_tipoCampoReporte

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Reportes
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM rep_campoReporte WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM rep_campoReporte
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
