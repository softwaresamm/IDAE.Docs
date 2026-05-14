---
sidebar_position: 29
title: doc_documento_salida
description: Tabla para gestionar documento_salida en el sistema SAMM
tags: [database, doc]
---

# doc_documento_salida

## Descripción

Tabla para gestionar documento_salida en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| documento_salida | VARCHAR | ✓ | - | - | - |
| telefonoEntrega | VARCHAR | ✓ | - | - | - |
| direccionEntrega | VARCHAR | ✓ | - | - | - |
| asunto | VARCHAR | ✓ | - | - | - |
| observaciones | VARCHAR | ✓ | - | - | - |
| solicitante | VARCHAR | ✓ | - | - | - |
| id_usuario_recibe | INTEGER | ✓ | FK | - | - |
| id_tercero_transportador | INTEGER | ✓ | FK | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_usuario_recibe** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario
- **id_tercero_transportador** → [ter_tercero](../terceros/ter_tercero) - Referencia a ter_tercero
- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_salida WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_salida
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
