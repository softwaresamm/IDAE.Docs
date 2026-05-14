---
sidebar_position: 12
title: seg_usuario
description: Tabla para gestionar usuario en el sistema SAMM
tags: [database, seg]
---

# seg_usuario

## Descripción

Tabla para gestionar usuario en el sistema SAMM.

**Módulo**: Seguridad  
**Prefijo**: `seg_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| usuario | VARCHAR | ✓ | - | - | - |
| usuario_codigo | VARCHAR | ✓ | - | - | - |
| intentosFallidos | INTEGER | ✓ | - | - | - |
| numeroIngresos | INTEGER | ✓ | - | - | - |
| fechaUltimoIngreso_fh | DATETIME | ✓ | - | - | - |
| fechaIntentoFallido_fh | DATETIME | ✓ | - | - | - |
| clave | VARCHAR | ✓ | - | - | - |
| nombre | VARCHAR | ✓ | - | - | - |
| profesion | VARCHAR | ✓ | - | - | - |
| email | VARCHAR | ✓ | - | - | - |
| direccion | VARCHAR | ✓ | - | - | - |
| telefono | VARCHAR | ✓ | - | - | - |
| costoHora | DECIMAL | ✓ | - | - | - |
| porcentajeComision | DECIMAL | ✓ | - | - | - |
| accesoActivo | BIT | ✓ | - | - | - |
| cambiarClave | BIT | ✓ | - | - | - |
| fechaUltimoCambioClave_fh | DATETIME | ✓ | - | - | - |
| aplicaRecargo | BIT | ✓ | - | - | - |
| sexo | BIT | ✓ | - | - | - |
| id_perfil | INTEGER | ✓ | FK | - | - |
| id_cargo | INTEGER | ✓ | FK | - | - |
| id_grupo | INTEGER | ✓ | FK | - | - |
| id_zona | INTEGER | ✓ | FK | - | - |
| identificacion | VARCHAR | ✓ | - | - | - |
| id_usuario | INTEGER | ✓ | FK | - | - |
| preferencias | VARCHAR | ✓ | - | - | - |
| habilitado | BIT | ✓ | - | - | - |
| idDispositivo | VARCHAR | ✓ | - | - | - |

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

- **id_perfil** → [seg_perfil](../seguridad/seg_perfil) - Referencia a seg_perfil
- **id_cargo** → [unknown_cargo](../general/unknown_cargo) - Referencia a unknown_cargo
- **id_grupo** → [unknown_grupo](../general/unknown_grupo) - Referencia a unknown_grupo
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona
- **id_usuario** → [seg_usuario](../seguridad/seg_usuario) - Referencia a seg_usuario

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Seguridad
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM seg_usuario WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM seg_usuario
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
