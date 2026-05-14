---
sidebar_position: 11
title: ter_tercero
description: Tabla para gestionar tercero en el sistema SAMM
tags: [database, ter]
---

# ter_tercero

## Descripción

Tabla para gestionar tercero en el sistema SAMM.

**Módulo**: Terceros  
**Prefijo**: `ter_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| tercero | VARCHAR | ✓ | - | - | - |
| tercero_codigo | VARCHAR | ✓ | - | - | - |
| tercero_nit | VARCHAR | ✓ | - | - | - |
| direccion | VARCHAR | ✓ | - | - | - |
| contacto | VARCHAR | ✓ | - | - | - |
| telefono | VARCHAR | ✓ | - | - | - |
| fax | VARCHAR | ✓ | - | - | - |
| email | VARCHAR | ✓ | - | - | - |
| website | VARCHAR | ✓ | - | - | - |
| representante | VARCHAR | ✓ | - | - | - |
| notas | VARCHAR | ✓ | - | - | - |
| tercero_nombreCorto | VARCHAR | ✓ | - | - | - |
| esCliente | BIT | ✓ | - | - | - |
| esProveedor | BIT | ✓ | - | - | - |
| esTransportador | BIT | ✓ | - | - | - |
| esFabricante | BIT | ✓ | - | - | - |
| esEmpresaPropia | BIT | ✓ | - | - | - |
| clasificacion | VARCHAR | ✓ | - | - | - |
| id_zona | INTEGER | ✓ | FK | - | - |
| id_estadoTercero | INTEGER | ✓ | FK | - | - |
| id_naturalezaTercero | INTEGER | ✓ | FK | - | - |
| esProspecto | BIT | ✓ | - | - | - |
| tiempoEntrega | INTEGER | ✓ | - | - | - |
| id_formaPago | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona
- **id_estadoTercero** → [unknown_estadoTercero](../general/unknown_estadoTercero) - Referencia a unknown_estadoTercero
- **id_naturalezaTercero** → [unknown_naturalezaTercero](../general/unknown_naturalezaTercero) - Referencia a unknown_naturalezaTercero
- **id_formaPago** → [unknown_formaPago](../general/unknown_formaPago) - Referencia a unknown_formaPago

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Terceros
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ter_tercero WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ter_tercero
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
