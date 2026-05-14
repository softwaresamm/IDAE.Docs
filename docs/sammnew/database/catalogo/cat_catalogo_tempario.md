---
sidebar_position: 14
title: cat_catalogo_tempario
description: Tabla para gestionar catalogo_tempario en el sistema SAMM
tags: [database, cat]
---

# cat_catalogo_tempario

## Descripción

Tabla para gestionar catalogo_tempario en el sistema SAMM.

**Módulo**: Catálogo  
**Prefijo**: `cat_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| catalogo_tempario | VARCHAR | ✓ | - | - | - |
| duracionEstimada | DECIMAL | ✓ | - | - | - |
| enTaller | BIT | ✓ | - | - | - |
| esCiclico | BIT | ✓ | - | - | - |
| detieneEquipos | BIT | ✓ | - | - | - |
| horasDetencion | DECIMAL | ✓ | - | - | - |
| periodoHoras | INTEGER | ✓ | - | - | - |
| facturaTodo | BIT | ✓ | - | - | - |
| periodoDias | INTEGER | ✓ | - | - | - |
| porcGarantia | DECIMAL | ✓ | - | - | - |
| porcTropicalizacion | DECIMAL | ✓ | - | - | - |
| id_tipoServicio | INTEGER | ✓ | FK | - | - |
| proyectar | BIT | ✓ | - | - | - |
| incluirMenores | BIT | ✓ | - | - | - |
| modoAjuste | INTEGER | ✓ | - | - | - |

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

- **id_tipoServicio** → [gen_tipoServicio](../general/gen_tipoServicio) - Referencia a gen_tipoServicio

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Catálogo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cat_catalogo_tempario WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cat_catalogo_tempario
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
