---
sidebar_position: 1
title: cat_atributo
description: Tabla para gestionar atributo en el sistema SAMM
tags: [database, cat]
---

# cat_atributo

## Descripción

Tabla para gestionar atributo en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| atributo | VARCHAR | ✓ | - | - | - |
| atributo_codigo | VARCHAR | ✓ | - | - | - |
| nombreControl | VARCHAR | ✓ | - | - | - |
| esVariable | BIT | ✓ | - | - | - |
| resaltado | BIT | ✓ | - | - | - |
| valorMinimo | DECIMAL | ✓ | - | - | - |
| ValorMaximo | DECIMAL | ✓ | - | - | - |
| id_seccionAtributo | INTEGER | ✓ | FK | - | - |
| id_tipoAtributo | INTEGER | ✓ | FK | - | - |
| id_unidad | INTEGER | ✓ | FK | - | - |
| esObligatorio | BIT | ✓ | - | - | - |

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

- **id_seccionAtributo** → [cat_seccionAtributo](../catalogo/cat_seccionAtributo) - Referencia a cat_seccionAtributo
- **id_tipoAtributo** → [equ_tipoAtributo](../equipos/equ_tipoAtributo) - Referencia a equ_tipoAtributo
- **id_unidad** → [gen_unidad](../general/gen_unidad) - Referencia a gen_unidad

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_atributo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_atributo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
