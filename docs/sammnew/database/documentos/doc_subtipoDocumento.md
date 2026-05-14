---
sidebar_position: 51
title: doc_subtipoDocumento
description: Tabla para gestionar subtipoDocumento en el sistema SAMM
tags: [database, doc]
---

# doc_subtipoDocumento

## Descripción

Tabla para gestionar subtipoDocumento en el sistema SAMM.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| subtipoDocumento | VARCHAR | ✓ | - | - | - |
| subtipoDocumento_codigo | VARCHAR | ✓ | - | - | - |
| prefijo | VARCHAR | ✓ | - | - | - |
| consecutivo | INTEGER | ✓ | - | - | - |
| id_tipoDocumento | INTEGER | ✓ | FK | - | - |
| programarPlaneadas | BIT | ✓ | - | - | - |
| cargarSolicitante | BIT | ✓ | - | - | - |
| verCentroCosto | BIT | ✓ | - | - | - |
| verIncoterm | BIT | ✓ | - | - | - |
| valUrgente | BIT | ✓ | - | - | - |
| bloquearDespacho | BIT | ✓ | - | - | - |
| cerrarSol | BIT | ✓ | - | - | - |
| ejecutaDevolucion | BIT | ✓ | - | - | - |
| tipoCobro | INTEGER | ✓ | - | - | - |
| mostrarPendienteDocumento | INTEGER | ✓ | - | - | - |
| cantidadAuxiliar | BIT | ✓ | - | - | - |
| mostrarValoresEjecutados | BIT | ✓ | - | - | - |
| archivosAdjuntosApp | INTEGER | ✓ | - | - | - |

### Columnas Estándar

Todas las tablas incluyen estos campos de auditoría:
- **id**: Clave primaria auto-incremental
- **active**: Indicador de registro activo (soft delete)
- **uid**: User ID del usuario que creó/modificó
- **eid**: Entity ID para trazabilidad

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_tipoDocumento** → [doc_tipoDocumento](../documentos/doc_tipoDocumento) - Referencia a doc_tipoDocumento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM doc_subtipoDocumento WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM doc_subtipoDocumento
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
