---
sidebar_position: 1
title: com_comision
description: Tabla para gestionar comision en el sistema SAMM
tags: [database, com]
---

# com_comision

## Descripción

Tabla para gestionar comision en el sistema SAMM.

**Módulo**: Comisiones  
**Prefijo**: `com_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| comision | VARCHAR | ✓ | - | - | - |
| comision_codigo | VARCHAR | ✓ | - | - | - |
| descuentoMaximo | DECIMAL | ✓ | - | - | - |
| descuentoMinimo | DECIMAL | ✓ | - | - | - |
| id_cargo | INTEGER | ✓ | FK | - | - |
| id_subTipoCatalogo | INTEGER | ✓ | FK | - | - |
| costear | BIT | ✓ | - | - | - |
| nivelnegocio | INTEGER | ✓ | - | - | - |
| porc_comision | DECIMAL | ✓ | - | - | - |
| id_condicion | INTEGER | ✓ | FK | - | - |
| id_opcionCondicion | INTEGER | ✓ | FK | - | - |
| id_zona | INTEGER | ✓ | FK | - | - |

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

- **id_cargo** → [seg_cargo](../seguridad/seg_cargo) - Referencia a seg_cargo
- **id_condicion** → [doc_condicion](../documentos/doc_condicion) - Referencia a doc_condicion
- **id_opcionCondicion** → [doc_opcionCondicion](../documentos/doc_opcionCondicion) - Referencia a doc_opcionCondicion
- **id_zona** → [gen_zona](../general/gen_zona) - Referencia a gen_zona

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Comisiones
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM com_comision WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM com_comision
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
