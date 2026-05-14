---
sidebar_position: 19
title: gen_registroEnvio
description: Tabla para gestionar registroEnvio en el sistema SAMM
tags: [database, gen]
---

# gen_registroEnvio

## Descripción

Tabla para gestionar registroEnvio en el sistema SAMM.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| registroEnvio | VARCHAR | ✓ | - | - | - |
| registroEnvio_codigo | VARCHAR | ✓ | - | - | - |
| tabla | VARCHAR | ✓ | - | - | - |
| reintentar | BIT | ✓ | - | - | - |
| id_envioCorreo | INTEGER | ✓ | FK | - | - |
| id_registroEnvio | INTEGER | ✓ | FK | - | - |

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

- **id_envioCorreo** → [gen_envioCorreo](../general/gen_envioCorreo) - Referencia a gen_envioCorreo
- **id_registroEnvio** → [gen_registroEnvio](../general/gen_registroEnvio) - Referencia a gen_registroEnvio

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo General / Configuración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gen_registroEnvio WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gen_registroEnvio
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
