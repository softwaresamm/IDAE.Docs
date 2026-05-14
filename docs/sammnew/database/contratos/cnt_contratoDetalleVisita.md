---
sidebar_position: 3
title: cnt_contratoDetalleVisita
description: Tabla para gestionar contratoDetalleVisita en el sistema SAMM
tags: [database, cnt]
---

# cnt_contratoDetalleVisita

## Descripción

Tabla para gestionar contratoDetalleVisita en el sistema SAMM.

**Módulo**: Contratos  
**Prefijo**: `cnt_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| contratoDetalleVisita | VARCHAR | ✓ | - | - | - |
| contratoDetalleVisita_codigo | VARCHAR | ✓ | - | - | - |
| frecuencia | INTEGER | ✓ | - | - | - |
| cadaN | DECIMAL | ✓ | - | - | - |
| dia | INTEGER | ✓ | - | - | - |
| estrategia | INTEGER | ✓ | - | - | - |
| porTrabajo | BIT | ✓ | - | - | - |
| incluirMenores | BIT | ✓ | - | - | - |
| aproximarA | INTEGER | ✓ | - | - | - |
| fecha_ff | DATE | ✓ | - | - | - |
| id_contrato | INTEGER | ✓ | FK | - | - |
| diaHabil | INTEGER | ✓ | - | - | - |

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

- **id_contrato** → [cnt_contrato](../contratos/cnt_contrato) - Referencia a cnt_contrato

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Contratos
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM cnt_contratoDetalleVisita WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM cnt_contratoDetalleVisita
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
