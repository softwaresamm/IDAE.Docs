---
sidebar_position: 9
title: equ_equipoAtributo
description: Tabla para gestionar equipoAtributo en el sistema SAMM
tags: [database, equ]
---

# equ_equipoAtributo

## Descripción

Tabla para gestionar equipoAtributo en el sistema SAMM.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| equipoAtributo | VARCHAR | ✓ | - | - | - |
| equipoAtributo_codigo | VARCHAR | ✓ | - | - | - |
| fecha_ff | DATE | ✓ | - | - | - |
| id_equipo | INTEGER | ✓ | FK | - | - |
| id_documento_ot | INTEGER | ✓ | FK | - | - |
| id_atributo | INTEGER | ✓ | FK | - | - |
| id_opcionAtributo | INTEGER | ✓ | FK | - | - |
| id_reporteTecnico | INTEGER | ✓ | FK | - | - |
| id_pruebaCheckList | INTEGER | ✓ | FK | - | - |
| id_evento | INTEGER | ✓ | FK | - | - |

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

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_documento_ot** → [doc_documento_ot](../documentos/doc_documento_ot) - Referencia a doc_documento_ot
- **id_atributo** → [cat_atributo](../catalogo/cat_atributo) - Referencia a cat_atributo
- **id_opcionAtributo** → [equ_opcionAtributo](../equipos/equ_opcionAtributo) - Referencia a equ_opcionAtributo
- **id_reporteTecnico** → [ort_reporteTecnico](../ordenes/ort_reporteTecnico) - Referencia a ort_reporteTecnico
- **id_pruebaCheckList** → [cat_pruebaCheckList](../catalogo/cat_pruebaCheckList) - Referencia a cat_pruebaCheckList
- **id_evento** → [dis_evento](../despacho/dis_evento) - Referencia a dis_evento

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM equ_equipoAtributo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM equ_equipoAtributo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
