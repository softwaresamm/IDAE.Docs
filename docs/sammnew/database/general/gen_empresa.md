---
sidebar_position: 9
title: gen_empresa
description: Tabla para gestionar empresa en el sistema SAMM
tags: [database, gen]
---

# gen_empresa

## Descripción

Tabla para gestionar empresa en el sistema SAMM.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| empresa | VARCHAR | ✓ | - | - | - |
| empresa_codigo | VARCHAR | ✓ | - | - | - |
| codigo | VARCHAR | ✓ | - | - | - |
| costoAdministrativoMes | DECIMAL | ✓ | - | - | - |
| id_empresa | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_empresa** → [gen_empresa](../general/gen_empresa) - Referencia a gen_empresa

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo General / Configuración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gen_empresa WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gen_empresa
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
