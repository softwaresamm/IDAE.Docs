---
sidebar_position: 1
title: Diccionario de Datos
description: Documentación completa del esquema de base de datos del sistema SammNew
tags: [database, schema, diccionario]
---

# Diccionario de Datos - Sistema SammNew

Este diccionario de datos documenta el esquema completo del sistema SAMM (Sistema de Administración de Mantenimiento Moderno).

## Resumen Ejecutivo

SAMM es un sistema de gestión de mantenimiento para operaciones de activos, postventa y alquiler, 100% en línea, compuesto de plataforma web y App para trabajo en campo logrando conectividad en tiempo real.

### Estadísticas

- **Total de tablas**: 268 tablas
- **Módulos funcionales**: 19 módulos
- **Base de datos**: SQL Server (sn_dev)

### Características Principales

- **Auditoría completa**: Todas las tablas incluyen `id_usuario_creo`, `id_usuario_modifico`, `fechaCreacion`, `fechaModificacion`
- **Control multiempresa**: Campos `uid` y `eid` en todas las tablas para trazabilidad entre entidades
- **Soft delete**: Campo `active` (bit) en todas las tablas para borrado lógico
- **Relaciones FK**: Campos que comienzan con `id_` representan relaciones de clave foránea
- **Primary keys**: Campo `id` (integer) como clave primaria en todas las tablas

## Módulos del Sistema

### 1. General / Configuración (gen_*)
Tablas maestras y de configuración del sistema.

**Tablas principales:**
- [gen_empresa](./general/gen_empresa.md) - Empresas y entidades organizacionales
- [gen_bodega](./general/gen_bodega.md) - Bodegas y almacenes
- [gen_zona](./general/gen_zona.md) - Zonas geográficas
- [gen_moneda](./general/gen_moneda.md) - Monedas
- [gen_impuesto](./general/gen_impuesto.md) - Impuestos y tasas
- [gen_unidad](./general/gen_unidad.md) - Unidades de medida
- [gen_tipoServicio](./general/gen_tipoServicio.md) - Tipos de servicio
- [gen_config](./general/gen_config.md) - Parámetros de configuración del sistema

### 2. Equipos (equ_*)
Gestión completa del ciclo de vida de equipos y activos.

**Tablas principales:**
- [equ_equipo](./equipos/equ_equipo.md) - Equipos (serial, ubicación, garantía, horómetro, costo)
- [equ_estadoEquipo](./equipos/equ_estadoEquipo.md) - Estados de equipos (activo, inactivo, mantenimiento)
- [equ_equipoAtributo](./equipos/equ_equipoAtributo.md) - Atributos personalizados de equipos
- [equ_falla](./equipos/equ_falla.md) - Registro de fallas
- [equ_tipoFalla](./equipos/equ_tipoFalla.md) - Catálogo de tipos de falla
- [equ_prestamo](./equipos/equ_prestamo.md) - Préstamos de equipos
- [equ_alquiler](./equipos/equ_alquiler.md) - Alquileres de equipos
- [equ_overhall](./equipos/equ_overhall.md) - Mantenimientos mayores

### 3. Contratos (cnt_*)
Administración de contratos de servicio y mantenimiento.

**Tablas principales:**
- [cnt_contrato](./contratos/cnt_contrato.md) - Contratos (fechas, montos, condiciones)
- [cnt_tipoContrato](./contratos/cnt_tipoContrato.md) - Tipos de contrato
- [cnt_contratoEquipo](./contratos/cnt_contratoEquipo.md) - Equipos asociados a contratos
- [cnt_visitaFija](./contratos/cnt_visitaFija.md) - Programación de visitas fijas
- [cnt_periodoContrato](./contratos/cnt_periodoContrato.md) - Períodos de facturación
- [cnt_pagosContrato](./contratos/cnt_pagosContrato.md) - Pagos de contratos
- [cnt_tiempoRespuesta](./contratos/cnt_tiempoRespuesta.md) - SLAs de tiempo de respuesta

### 4. Catálogo (cat_*)
Catálogo maestro de productos, repuestos, equipos y servicios.

**Tablas principales:**
- [cat_catalogo](./catalogo/cat_catalogo.md) - Catálogo maestro de items
- [cat_tipoCatalogo](./catalogo/cat_tipoCatalogo.md) - Tipos de catálogo (equipo, repuesto, servicio)
- [cat_catalogo.equipo](./catalogo/cat_catalogo_equipo.md) - Catálogo de equipos
- [cat_catalogo.actividad](./catalogo/cat_catalogo_actividad.md) - Actividades del catálogo
- [cat_catalogo.repuesto](./catalogo/cat_catalogo_repuesto.md) - Repuestos del catálogo
- [cat_catalogo.tempario](./catalogo/cat_catalogo_tempario.md) - Temparios del catálogo
- [cat_marca](./catalogo/cat_marca.md) - Marcas y fabricantes
- [cat_sistema](./catalogo/cat_sistema.md) - Sistemas de equipos
- [cat_atributo](./catalogo/cat_atributo.md) - Definiciones de atributos dinámicos
- [cat_seccionAtributo](./catalogo/cat_seccionAtributo.md) - Agrupaciones de atributos
- [cat_listaPrecio](./catalogo/cat_listaPrecio.md) - Listas de precios
- [cat_versionEquipo](./catalogo/cat_versionEquipo.md) - Versiones de equipos

### 5. Documentos (doc_*)
Sistema de gestión documental, órdenes, cotizaciones y flujos de trabajo.

**Tablas principales:**
- [doc_documento](./documentos/doc_documento.md) - Documentos maestros (facturas, OT, cotizaciones)
- [doc_tipoDocumento](./documentos/doc_tipoDocumento.md) - Tipos de documento
- [doc_subtipoDocumento](./documentos/doc_subtipoDocumento.md) - Subtipos de documento
- [doc_itemDocumento](./documentos/doc_itemDocumento.md) - Líneas de documento
- [doc_estadoTipoDocumento](./documentos/doc_estadoTipoDocumento.md) - Estados por tipo de documento
- [doc_flujoDocumento](./documentos/doc_flujoDocumento.md) - Flujos de trabajo
- [doc_pendienteDocumento](./documentos/doc_pendienteDocumento.md) - Tareas pendientes

### 6. Terceros (ter_*)
Gestión de clientes, proveedores y contactos.

**Tablas principales:**
- [ter_tercero](./terceros/ter_tercero.md) - Terceros (clientes, proveedores, fabricantes)
- [ter_naturalezaTercero](./terceros/ter_naturalezaTercero.md) - Tipos de tercero (persona, empresa)
- [ter_sucursal](./terceros/ter_sucursal.md) - Sucursales y locaciones
- [ter_contacto](./terceros/ter_contacto.md) - Contactos
- [ter_cargoContacto](./terceros/ter_cargoContacto.md) - Cargos de contactos
- [ter_estadoTercero](./terceros/ter_estadoTercero.md) - Estados de terceros

### 7. Órdenes de Trabajo (ort_*)
Programación y ejecución de órdenes de servicio.

**Tablas principales:**
- [ort_programacion](./ordenes/ort_programacion.md) - Programación de trabajos
- [ort_tipoProgramacion](./ordenes/ort_tipoProgramacion.md) - Tipos de programación
- [ort_reporteTecnico](./ordenes/ort_reporteTecnico.md) - Reportes técnicos de ejecución
- [ort_canalAtencion](./ordenes/ort_canalAtencion.md) - Canales de solicitud de servicio
- [ort_departamentoSolicitud](./ordenes/ort_departamentoSolicitud.md) - Departamentos solicitantes
- [ort_vale](./ordenes/ort_vale.md) - Vales de trabajo

### 8. Seguridad (seg_*)
Control de acceso, usuarios y perfiles.

**Tablas principales:**
- [seg_usuario](./seguridad/seg_usuario.md) - Usuarios del sistema
- [seg_perfil](./seguridad/seg_perfil.md) - Perfiles y roles
- [seg_cargo](./seguridad/seg_cargo.md) - Cargos laborales
- [seg_grupo](./seguridad/seg_grupo.md) - Grupos de usuarios
- [seg_sesion](./seguridad/seg_sesion.md) - Sesiones activas

### 9. Proyectos (pro_*)
Gestión de proyectos y actividades.

**Tablas principales:**
- [pro_actividad](./proyectos/pro_actividad.md) - Actividades de proyecto
- [pro_etapa](./proyectos/pro_etapa.md) - Etapas de proyecto
- [pro_entregable](./proyectos/pro_entregable.md) - Entregables
- [pro_recursoFisico](./proyectos/pro_recursoFisico.md) - Recursos físicos asignados
- [pro_ejecutores](./proyectos/pro_ejecutores.md) - Miembros del equipo
- [pro_hito](./proyectos/pro_hito.md) - Hitos del proyecto

### 10. Integración (syn_*)
Sincronización e integración con sistemas externos.

**Tablas principales:**
- [syn_puntoIntegracion](./integracion/syn_puntoIntegracion.md) - Puntos de integración/endpoints
- [syn_sistemaIntegrar](./integracion/syn_sistemaIntegrar.md) - Sistemas a integrar
- [syn_tipoAutenticacion](./integracion/syn_tipoAutenticacion.md) - Métodos de autenticación

### 11. Licencias (lic_*)
Gestión de licencias y parámetros del sistema.

**Tablas principales:**
- [lic_licencia](./licencias/lic_licencia.md) - Licencias
- [lic_parametro](./licencias/lic_parametro.md) - Parámetros de licencia
- [lic_licencia_parametro](./licencias/lic_licencia_parametro.md) - Valores de parámetros

### 12. Alquileres (alq_*)
Gestión de alquileres de equipos.

**Tablas principales:**
- [alq_tarifa](./alquileres/alq_tarifa.md) - Tarifas de alquiler
- [alq_tipoTarifa](./alquileres/alq_tipoTarifa.md) - Tipos de tarifa
- [alq_detalleLiquidacion](./alquileres/alq_detalleLiquidacion.md) - Detalles de liquidación
- [alq_historicoAlquiler](./alquileres/alq_historicoAlquiler.md) - Historial de alquileres
- [alq_periodoalquiler](./alquileres/alq_periodoalquiler.md) - Períodos de alquiler

### 13. Despacho (dis_*)
Gestión de eventos y obras.

**Tablas principales:**
- [dis_evento](./despacho/dis_evento.md) - Eventos
- [dis_estadoEvento](./despacho/dis_estadoEvento.md) - Estados de evento
- [dis_motivoEvento](./despacho/dis_motivoEvento.md) - Motivos de evento
- [dis_metodoDeteccion](./despacho/dis_metodoDeteccion.md) - Métodos de detección
- [dis_obra](./despacho/dis_obra.md) - Obras asociadas a eventos

### 14. Comisiones (com_*)
Registro de comisiones.

**Tablas principales:**
- [com_comision](./comisiones/com_comision.md) - Comisiones generadas

### 15. Gastos (gas_*)
Gestión de gastos operativos.

**Tablas principales:**
- [gas_gasto](./gastos/gas_gasto.md) - Gastos
- [gas_tipoGasto](./gastos/gas_tipoGasto.md) - Tipos de gasto
- [gas_detalleGasto](./gastos/gas_detalleGasto.md) - Detalle de gastos
- [gas_documento.ot_detalleGasto](./gastos/gas_documento_ot_detalleGasto.md) - Gastos en órdenes de trabajo

### 16. Interfaz (gui_*)
Configuración de la interfaz de usuario.

**Tablas principales:**
- [gui_funcionalidad](./interfaz/gui_funcionalidad.md) - Funcionalidades del sistema
- [gui_tipoFuncionalidad](./interfaz/gui_tipoFuncionalidad.md) - Tipos de funcionalidad
- [gui_bloqueHome](./interfaz/gui_bloqueHome.md) - Bloques del home
- [gui_ayuda](./interfaz/gui_ayuda.md) - Textos de ayuda
- [gui_campoTexto](./interfaz/gui_campoTexto.md) - Campos de texto configurables

### 17. Geográfico (geo_*)
Datos geográficos y de ubicación.

**Tablas principales:**
- [geo_ubicacion](./geografico/geo_ubicacion.md) - Ubicaciones geográficas

### 18. Reportes (rep_*)
Configuración del módulo de reportes.

**Tablas principales:**
- [rep_reporte](./reportes/rep_reporte.md) - Reportes configurados
- [rep_categoria](./reportes/rep_categoria.md) - Categorías de reporte
- [rep_campoReporte](./reportes/rep_campoReporte.md) - Campos de reporte
- [rep_origenDato](./reportes/rep_origenDato.md) - Orígenes de datos
- [rep_indicador](./reportes/rep_indicador.md) - Indicadores

### 19. Taxonomía (tax_*)
Estructura de taxonomía y clasificación.

**Tablas principales:**
- [tax_nivelTax](./taxonomia/tax_nivelTax.md) - Niveles de taxonomía
- [tax_objetoTax](./taxonomia/tax_objetoTax.md) - Objetos de taxonomía

## Convenciones del Esquema

### Nomenclatura de Tablas
Las tablas siguen el patrón `[módulo]_[entidad]`:
- `gen_` = General/Configuración
- `equ_` = Equipos
- `cnt_` = Contratos
- `cat_` = Catálogo
- `doc_` = Documentos
- `ter_` = Terceros
- `ort_` = Órdenes de trabajo
- `seg_` = Seguridad
- `pro_` = Proyectos
- `syn_` = Integración (Synchronization)
- `lic_` = Licencias
- `alq_` = Alquileres
- `dis_` = Despacho
- `com_` = Comisiones
- `gas_` = Gastos
- `gui_` = Interfaz
- `geo_` = Geográfico
- `rep_` = Reportes
- `tax_` = Taxonomía

:::note Nomenclatura con punto
Algunas tablas usan **punto** como separador de subtipo, por ejemplo `cat_catalogo.equipo`. El punto indica que es una especialización del catálogo base (`cat_catalogo`). Los archivos de documentación reemplazan el punto por guión bajo en el nombre del archivo.
:::

### Tipos de Datos
- **INTEGER**: Números enteros, usado para IDs y contadores
- **BIT**: Booleanos (0/1, true/false)
- **VARCHAR/NVARCHAR**: Cadenas de texto
- **DECIMAL/FLOAT**: Números decimales, montos, porcentajes
- **DATE**: Fechas sin hora
- **DATETIME**: Fechas con hora

### Campos Estándar
Todas las tablas incluyen estos campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INTEGER | Clave primaria, auto-incremental |
| `active` | BIT | Indica si el registro está activo (soft delete) |
| `id_usuario_creo` | INTEGER | ID del usuario que creó el registro |
| `id_usuario_modifico` | INTEGER | ID del usuario que modificó el registro |
| `fechaCreacion` | DATETIME | Fecha y hora de creación del registro |
| `fechaModificacion` | DATETIME | Fecha y hora de última modificación |
| `uid` | VARCHAR | User ID - Control multiempresa |
| `eid` | VARCHAR | Entity ID - Control multiempresa |

### Campos de Relación
- Los campos que comienzan con `id_` son claves foráneas
- Ejemplo: `id_empresa` referencia a la tabla `gen_empresa`
- Los campos `*_codigo` almacenan códigos alternativos de búsqueda

### Campos de Nomenclatura
La mayoría de tablas maestras incluyen:
- `[entidad]`: Nombre o descripción principal
- `[entidad]_codigo`: Código único alfanumérico

## Estructura de este Diccionario

Cada tabla está documentada en un archivo individual organizado por módulo. La documentación de cada tabla incluye:

1. **Descripción funcional**: Propósito de la tabla en el sistema
2. **Tabla de columnas**: Detalle de cada campo (nombre, tipo, nullable, clave, default, constraint)
3. **Relaciones**: Foreign keys que salen (referencias a otras tablas) y que entran (tablas que la referencian)
4. **Índices**: Índices definidos en la tabla (si aplica)

## Diagramas de Relaciones

### Relaciones Principales

```mermaid
graph TD
    A[gen_empresa] --> B[ter_tercero]
    B --> C[ter_sucursal]
    C --> D[equ_equipo]
    D --> E[doc_documento]
    E --> F[doc_itemDocumento]
    B --> G[cnt_contrato]
    G --> H[cnt_contratoEquipo]
    H --> D
    D --> I[cat_catalogo.equipo]
    I --> J[cat_catalogo]
```

### Flujo de Datos

1. **Configuración**: Se definen empresas, zonas, bodegas, monedas, impuestos
2. **Catálogo**: Se crea el catálogo de productos, repuestos y equipos
3. **Terceros**: Se registran clientes, proveedores y contactos
4. **Equipos**: Se registran los equipos de los clientes
5. **Contratos**: Se crean contratos asociando terceros y equipos
6. **Documentos**: Se generan cotizaciones, órdenes de compra, facturas
7. **Órdenes de Trabajo**: Se programan y ejecutan servicios
8. **Reportes Técnicos**: Se registra la ejecución y resultados

## Notas de Implementación

### Performance
- Índices en campos FK para optimizar consultas relacionales
- Soft delete (`active` bit) permite mantener historial sin afectar consultas activas

### Seguridad
- Campo `uid` y `eid` en todas las tablas para trazabilidad completa
- Control de acceso basado en perfiles (`seg_perfil`) y funcionalidades (`gui_funcionalidad`)
- Registro de sesiones en `seg_sesion` para auditoría de acceso

### Extensibilidad
- Sistema de atributos dinámicos (`cat_atributo`, `cat_seccionAtributo`) para personalización sin cambios de esquema
- Tablas de configuración (`gen_config`) para parámetros del sistema
- Sistema de flujos de trabajo configurable (`doc_flujoDocumento`, `doc_estadoTipoDocumento`)

## Referencias

- [Estructura del Proyecto](/docs/intro)
- [Guía de Desarrollo](/docs/sammnew/guia-desarrollo)
- [API Reference](/docs/sammnew/api-reference)

---

**Última actualización**: Mayo 2026  
**Sistema**: SammNew (SAMM - Sistema de Administración de Mantenimiento Moderno)  
**Total de tablas documentadas**: 270+
