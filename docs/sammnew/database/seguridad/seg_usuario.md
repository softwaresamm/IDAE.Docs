---
sidebar_position: 14
title: seg_usuario
description: Tabla seg_usuario del módulo Seguridad
tags: [database, seg]
---

# seg_usuario

## Descripción

Tabla seg_usuario del módulo Seguridad.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Descripción |
|---------|------|------|-------|-------------|
| usuario | VARCHAR | ✗ | - | - |
| usuario_codigo | VARCHAR | ✓ | - | - |
| intentosFallidos | INTEGER | ✓ | - | - |
| numeroIngresos | INTEGER | ✓ | - | - |
| fechaUltimoIngreso_fh | DATETIME | ✓ | - | - |
| fechaIntentoFallido_fh | DATETIME | ✓ | - | - |
| clave | VARCHAR | ✓ | - | - |
| nombre | VARCHAR | ✓ | - | - |
| profesion | VARCHAR | ✓ | - | - |
| email | VARCHAR | ✗ | - | - |
| direccion | VARCHAR | ✓ | - | - |
| telefono | VARCHAR | ✓ | - | - |
| costoHora | MONEY | ✓ | - | - |
| porcentajeComision | FLOAT | ✓ | - | - |
| accesoActivo | BIT | ✓ | - | - |
| cambiarClave | BIT | ✓ | - | - |
| fechaUltimoCambioClave_fh | DATETIME | ✓ | - | - |
| aplicaRecargo | BIT | ✗ | - | - |
| sexo | BIT | ✗ | - | - |
| id_perfil | INTEGER | ✗ | FK | - |
| id_cargo | INTEGER | ✗ | FK | - |
| id_grupo | INTEGER | ✗ | FK | - |
| id_zona | INTEGER | ✗ | FK | - |
| identificacion | VARCHAR | ✓ | - | - |
| id_usuario | INTEGER | ✗ | FK | - |
| preferencias | IMAGE | ✓ | - | - |
| habilitado | BIT | ✗ | - | - |
| idDispositivo | VARCHAR | ✓ | - | - |

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

- **id_grupo** → [seg_grupo](../seguridad/seg_grupo) - Referencia a seg_grupo
- **id_perfil** → [seg_perfil](../seguridad/seg_perfil) - Referencia a seg_perfil
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona
- **id_cargo** → [seg_cargo](../seguridad/seg_cargo) - Referencia a seg_cargo
- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Nombre real en base de datos: `seg_usuario`

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM [seg_usuario] WHERE active = 1;

-- Consulta con joins
SELECT t.*, u.usuario
FROM [seg_usuario] t
LEFT JOIN seg_usuario u ON t.id_usuario_creo = u.id
WHERE t.active = 1
ORDER BY t.id DESC;
```

---

**Nota**: Documentación generada desde el esquema real de la base de datos `sn_dev`.
