---
sidebar_position: 10
title: gen_envioCorreo
description: Tabla para gestionar envioCorreo en el sistema SAMM
tags: [database, gen]
---

# gen_envioCorreo

## Descripción

Tabla para gestionar envioCorreo en el sistema SAMM.

**Módulo**: General / Configuración  
**Prefijo**: `gen_`

## Estructura de la Tabla

| Columna | Tipo | Nulo | Clave | Default | Constraint |
|---------|------|------|-------|---------|------------|
| id | INTEGER | ✗ | PK | - | - |
| active | BIT | ✓ | - | - | - |
| envioCorreo | VARCHAR | ✓ | - | - | - |
| envioCorreo_codigo | VARCHAR | ✓ | - | - | - |
| estrategia | INTEGER | ✓ | - | - | - |
| tabla | VARCHAR | ✓ | - | - | - |
| id_reporte | INTEGER | ✓ | FK | - | - |
| correoAdicional | VARCHAR | ✓ | - | - | - |
| plantillaAdjunto | VARCHAR | ✓ | - | - | - |
| id_subtipoDocumento | INTEGER | ✓ | FK | - | - |
| id_estadoTipoDocumento | INTEGER | ✓ | FK | - | - |
| cantidadMensajes | INTEGER | ✓ | - | - | - |
| tiempo_por_mensajes | INTEGER | ✓ | - | - | - |
| cantidadReintento | INTEGER | ✓ | - | - | - |
| id_remitenteCorreo | INTEGER | ✓ | FK | - | - |
| adjuntarArchivo | INTEGER | ✓ | - | - | - |

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

- **id_reporte** → [rep_reporte](../reportes/rep_reporte) - Referencia a rep_reporte
- **id_subtipoDocumento** → [doc_subtipoDocumento](../documentos/doc_subtipoDocumento) - Referencia a doc_subtipoDocumento
- **id_estadoTipoDocumento** → [doc_estadoTipoDocumento](../documentos/doc_estadoTipoDocumento) - Referencia a doc_estadoTipoDocumento
- **id_remitenteCorreo** → [gen_remitenteCorreo](../general/gen_remitenteCorreo) - Referencia a gen_remitenteCorreo

### Relaciones Entrantes

*Esta tabla puede ser referenciada por otras tablas del sistema.*

## Notas Técnicas

- Esta tabla forma parte del módulo General / Configuración
- Utiliza el patrón de nomenclatura estándar del sistema

## Ejemplos de Uso

```sql
-- Consulta básica
SELECT * FROM gen_envioCorreo WHERE active = 1;

-- Consulta con joins (si aplica)
SELECT * FROM gen_envioCorreo
WHERE active = 1
ORDER BY id DESC;
```

---

**Nota**: Esta documentación fue generada automáticamente a partir del análisis del código fuente.
