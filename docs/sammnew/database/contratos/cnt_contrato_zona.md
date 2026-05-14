---
sidebar_position: 8
title: cnt_contrato_zona
description: Tabla para gestionar contrato_zona en el sistema SAMM
tags: [database, cnt]
---

# cnt_contrato_zona

## Descripción

Tabla para gestionar contrato_zona en el sistema SAMM.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| contrato_zona | VARCHAR | ✓ | - | - | - |
| precioVisita | DECIMAL | ✓ | - | - | - |
| precioServicio | DECIMAL | ✓ | - | - | - |
| id_contrato | INTEGER | ✓ | FK | - | - |
| id_zona | INTEGER | ✓ | FK | - | - |

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

- **id_contrato** → [cnt_contrato](../contratos/cnt_contrato) - Referencia a cnt_contrato
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cnt_contrato_zona WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cnt_contrato_zona
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
