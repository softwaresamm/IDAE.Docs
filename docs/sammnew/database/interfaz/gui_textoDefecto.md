---
sidebar_position: 7
title: gui_textoDefecto
description: Tabla gui_textoDefecto del módulo Interfaz
tags: [database, gui]
---

# gui_textoDefecto

## Descripción

Tabla gui_textoDefecto del módulo Interfaz.

**Módulo**: Interfaz  
**Prefijo**: `gui_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| textoDefecto | VARCHAR | ✗ | - | - |
| textoDefecto_codigo | VARCHAR | ✓ | - | - |
| Texto | VARCHAR | ✗ | - | - |
| id_campoTexto | INTEGER | ✗ | FK | - |

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

- **id_campoTexto** → [gui_campoTexto](../interfaz/gui_campoTexto) - Referencia a gui_campoTexto

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Interfaz
- Nombre real en base de datos: `gui_textoDefecto`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [gui_textoDefecto] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [gui_textoDefecto] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
