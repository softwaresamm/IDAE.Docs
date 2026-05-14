---
sidebar_position: 24
title: doc_documentoAtributo
description: Tabla doc_documentoAtributo del módulo Documentos
tags: [database, doc]
---

# doc_documentoAtributo

## Descripción

Tabla doc_documentoAtributo del módulo Documentos.

**Módulo**: Documentos  
**Prefijo**: `doc_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| documentoAtributo | VARCHAR | ✓ | - | - |
| documentoAtributo_codigo | VARCHAR | ✓ | - | - |
| id_documento | INTEGER | ✗ | FK | - |
| id_atributo | INTEGER | ✗ | FK | - |
| id_opcionAtributo | INTEGER | ✗ | FK | - |

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

- **id_opcionAtributo** → [equ_opcionAtributo](../equipos/equ_opcionAtributo) - Referencia a equ_opcionAtributo
- **id_documento** → [doc_documento](../documentos/doc_documento) - Referencia a doc_documento
- **id_atributo** → [cat_atributo](../catalogo/cat_atributo) - Referencia a cat_atributo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Documentos
- Nombre real en base de datos: `doc_documentoAtributo`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [doc_documentoAtributo] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [doc_documentoAtributo] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
