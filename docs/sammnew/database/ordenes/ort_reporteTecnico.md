---
sidebar_position: 6
title: ort_reporteTecnico
description: Tabla para gestionar reporteTecnico en el sistema SAMM
tags: [database, ort]
---

# ort_reporteTecnico

## Descripción

Tabla para gestionar reporteTecnico en el sistema SAMM.

**Módulo**: Órdenes de Trabajo  
**Prefijo**: `ort_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| reporteTecnico | VARCHAR | ✓ | - | - | - |
| reporteTecnico_codigo | VARCHAR | ✓ | - | - | - |
| numero | VARCHAR | ✓ | - | - | - |
| trabajos | VARCHAR | ✓ | - | - | - |
| recomendaciones | VARCHAR | ✓ | - | - | - |
| compromisos | VARCHAR | ✓ | - | - | - |
| id_gasto | INTEGER | ✓ | FK | - | - |
| id_canalAtencion | INTEGER | ✓ | FK | - | - |
| diagnostico | VARCHAR | ✓ | - | - | - |
| id_documento_gasto | INTEGER | ✓ | FK | - | - |
| trabajos_enriquecido | VARCHAR | ✓ | - | - | - |
| recomendaciones_enriquecido | VARCHAR | ✓ | - | - | - |
| compromisos_enriquecido | VARCHAR | ✓ | - | - | - |
| diagnostico_enriquecido | VARCHAR | ✓ | - | - | - |

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

- **id_gasto** → [gas_gasto](../gastos/gas_gasto) - Referencia a gas_gasto
- **id_canalAtencion** → [ort_canalAtencion](../ordenes/ort_canalAtencion) - Referencia a ort_canalAtencion
- **id_documento_gasto** → [doc_documento_gasto](../documentos/doc_documento_gasto) - Referencia a doc_documento_gasto

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo Órdenes de Trabajo
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM ort_reporteTecnico WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM ort_reporteTecnico
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
