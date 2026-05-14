---
sidebar_position: 9
title: equ_equipoAtributo
description: Tabla equ_equipoAtributo del módulo Equipos
tags: [database, equ]
---

# equ_equipoAtributo

## Descripción

Tabla equ_equipoAtributo del módulo Equipos.

**Módulo**: Equipos  
**Prefijo**: `equ_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| equipoAtributo | VARCHAR | ✓ | - | - |
| equipoAtributo_codigo | VARCHAR | ✓ | - | - |
| fecha_ff | DATETIME | ✗ | - | - |
| id_equipo | INTEGER | ✗ | FK | - |
| id_documento.ot | INTEGER | ✗ | FK | - |
| id_atributo | INTEGER | ✗ | FK | - |
| id_opcionAtributo | INTEGER | ✗ | FK | - |
| id_reporteTecnico | INTEGER | ✗ | FK | - |
| id_pruebaCheckList | INTEGER | ✗ | FK | - |
| id_evento | INTEGER | ✗ | FK | - |

### Columnas de Auditoría

Todas las tablas incluyen estas columnas estándar:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER | Clave primaria auto-incremental |
| active | BIT | Registro activo (soft delete) |
| id_usuario_creo | INTEGER | Usuario que creó el registro |
| id_usuario_modifico | INTEGER | Usuario que modificó el registro |
| fechaCreacion | DATETIME | Fecha y hora de creación |
| fechaModificacion | DATETIME | Fecha y hora de última modificación |
| uid | VARCHAR | Control multiempresa (User ID) |
| eid | VARCHAR | Control multiempresa (Entity ID) |

## Relaciones

### Relaciones Salientes (Foreign Keys)

- **id_equipo** → [equ_equipo](../equipos/equ_equipo) - Referencia a equ_equipo
- **id_opcionAtributo** → [equ_opcionAtributo](../equipos/equ_opcionAtributo) - Referencia a equ_opcionAtributo
- **id_atributo** → [cat_atributo](../catalogo/cat_atributo) - Referencia a cat_atributo
- **id_evento** → [dis_evento](../despacho/dis_evento) - Referencia a dis_evento
- **id_documento.ot** → [doc_documento.ot](../documentos/doc_documento_ot) - Referencia a doc_documento.ot
- **id_reporteTecnico** → [ort_reporteTecnico](../ordenes/ort_reporteTecnico) - Referencia a ort_reporteTecnico

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Equipos
- Nombre real en base de datos: `equ_equipoAtributo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [equ_equipoAtributo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [equ_equipoAtributo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
