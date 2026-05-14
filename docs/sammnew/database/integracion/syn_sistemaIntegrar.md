---
sidebar_position: 5
title: syn_sistemaIntegrar
description: Tabla para gestionar sistemaIntegrar en el sistema SAMM
tags: [database, syn]
---

# syn_sistemaIntegrar

## Descripción

Tabla para gestionar sistemaIntegrar en el sistema SAMM.

**Módulo**: Integración  
**Prefijo**: `syn_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| sistemaIntegrar | VARCHAR | ✓ | - | - | - |
| sistemaIntegrar_codigo | VARCHAR | ✓ | - | - | - |
| usuario | VARCHAR | ✓ | - | - | - |
| clave | VARCHAR | ✓ | - | - | - |
| urlAutenticar | VARCHAR | ✓ | - | - | - |
| id_tipoAutenticacion | INTEGER | ✓ | FK | - | - |
| token | VARCHAR | ✓ | - | - | - |
| metodoAutenticar | VARCHAR | ✓ | - | - | - |
| estructuraResponseAutenticar | VARCHAR | ✓ | - | - | - |

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

- **id_tipoAutenticacion** → [syn_tipoAutenticacion](../integracion/syn_tipoAutenticacion) - Referencia a syn_tipoAutenticacion

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Integración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM syn_sistemaIntegrar WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM syn_sistemaIntegrar
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
