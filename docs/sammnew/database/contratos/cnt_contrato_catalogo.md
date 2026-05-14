---
sidebar_position: 5
title: cnt_contrato_catalogo
description: Tabla para gestionar contrato_catalogo en el sistema SAMM
tags: [database, cnt]
---

# cnt_contrato_catalogo

## Descripción

Tabla para gestionar contrato_catalogo en el sistema SAMM.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| contrato_catalogo | VARCHAR | ✓ | - | - | - |
| incluida | DECIMAL | ✓ | - | - | - |
| consumida | DECIMAL | ✓ | - | - | - |
| saldo | DECIMAL | ✓ | - | - | - |
| precioVenta | DECIMAL | ✓ | - | - | - |
| notas | VARCHAR | ✓ | - | - | - |
| id_contrato | INTEGER | ✓ | FK | - | - |
| id_catalogo | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_contrato** → [cnt_contrato](../contratos/cnt_contrato) - Referencia a cnt_contrato
- **id_catalogo** → [cat_catalogo](../catalogo/cat_catalogo) - Referencia a cat_catalogo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cnt_contrato_catalogo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cnt_contrato_catalogo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
