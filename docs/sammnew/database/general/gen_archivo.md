---
sidebar_position: 2
title: gen_archivo
description: Tabla para gestionar archivo en el sistema SAMM
tags: [database, gen]
---

# gen_archivo

## Descripción

Tabla para gestionar archivo en el sistema SAMM.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| archivo | VARCHAR | ✓ | - | - | - |
| archivo_codigo | VARCHAR | ✓ | - | - | - |
| tabla | VARCHAR | ✓ | - | - | - |
| idObjeto | INTEGER | ✓ | - | - | - |
| descripcion | VARCHAR | ✓ | - | - | - |
| archivoBinario | VARCHAR | ✓ | - | - | - |
| esPrincipal | BIT | ✓ | - | - | - |
| link | VARCHAR | ✓ | - | - | - |
| id_tipoArchivo | INTEGER | ✓ | FK | - | - |
| tamano | DECIMAL | ✓ | - | - | - |

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

- **id_tipoArchivo** → [gen_tipoArchivo](../general/gen_tipoArchivo) - Referencia a gen_tipoArchivo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo General / Configuración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gen_archivo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gen_archivo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
