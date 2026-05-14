---
sidebar_position: 7
title: cnt_contrato_tipoServicio
description: Tabla para gestionar contrato_tipoServicio en el sistema SAMM
tags: [database, cnt]
---

# cnt_contrato_tipoServicio

## Descripción

Tabla para gestionar contrato_tipoServicio en el sistema SAMM.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| contrato_tipoServicio | VARCHAR | ✓ | - | - | - |
| id_contrato | INTEGER | ✓ | FK | - | - |
| id_tipoServicio | INTEGER | ✓ | FK | - | - |
| id_listaPrecio | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_contrato** → [cnt_contrato](../contratos/cnt_contrato) - Referencia a cnt_contrato
- **id_tipoServicio** → [unknown_tipoServicio](../general/unknown_tipoServicio) - Referencia a unknown_tipoServicio
- **id_listaPrecio** → [unknown_listaPrecio](../general/unknown_listaPrecio) - Referencia a unknown_listaPrecio

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cnt_contrato_tipoServicio WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cnt_contrato_tipoServicio
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
