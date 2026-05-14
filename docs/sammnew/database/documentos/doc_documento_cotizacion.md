---
sidebar_position: 10
title: doc_documento_cotizacion
description: Tabla para gestionar documento_cotizacion en el sistema SAMM
tags: [database, doc]
---

# doc_documento_cotizacion

## Descripción

Tabla para gestionar documento_cotizacion en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| documento_cotizacion | VARCHAR | ✓ | - | - | - |
| version | INTEGER | ✓ | - | - | - |
| validez | INTEGER | ✓ | - | - | - |
| contacto | VARCHAR | ✓ | - | - | - |
| cargo | VARCHAR | ✓ | - | - | - |
| encabezado | VARCHAR | ✓ | - | - | - |
| condiciones | VARCHAR | ✓ | - | - | - |
| notas | VARCHAR | ✓ | - | - | - |
| esAIU | BIT | ✓ | - | - | - |
| procentajeA | DECIMAL | ✓ | - | - | - |
| procentajeI | DECIMAL | ✓ | - | - | - |
| procentajeU | DECIMAL | ✓ | - | - | - |
| valorA | DECIMAL | ✓ | - | - | - |
| valorI | DECIMAL | ✓ | - | - | - |
| valorU | DECIMAL | ✓ | - | - | - |
| telefono | VARCHAR | ✓ | - | - | - |
| id_sucursal | INTEGER | ✓ | FK | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_usuario_asesor | INTEGER | ✓ | FK | - | - |
| email | VARCHAR | ✓ | - | - | - |

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

- **id_sucursal** → [ter_sucursal](../terceros/ter_sucursal) - Referencia a ter_sucursal
- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_usuario_asesor** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_documento_cotizacion WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_documento_cotizacion
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
