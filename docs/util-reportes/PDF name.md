---
sidebar_position: 3
release_version: "v0.3.1"
release_module: "Utilitario de Reportes"
---

# Nombre del PDF

Este documento describe cómo configurar el nuevo procedimiento 

## Referencias

- [SO-375: Nombre del adjunto sea tomado del SP]

## Información de Versiones

### Versión de Lanzamiento

:::info **v0.3.1**
:::

### Versiones Requeridas

| Aplicación      | Versión Mínima | Descripción                           |
| --------------- | -------------- | ------------------------------------- |
| SAMMNEW         | >= 7.1.10.9    | Aplicación web principal              |
| SAMM LOGICA     | >= 5.6.23.4    | Lógica de negocio                     |
| BASE DE DATOS   | >= C2.1.6.1    | Scripts de configuración de historial |
| REPORT SERVICES | >= 0.3.1       | Utilitario de Reportes                |

## Requisitos Previos

Para la columna llamada "tabla" en la tabla rep_reporte se debe espesificar el origen 

:::important Importante
Esta funcionalidad requiere la versión mínima especificada de Report Services. Verifique su versión actual antes de continuar.
:::



### Parámetros del Servicio

El servicio acepta un parámetro `aplicacion` que identifica desde qué aplicación se realiza la petición:

| Aplicación            | Valor | Descripción      |
| --------------------- | ----- | ---------------- |
| SAMMAPI (por defecto) | 0     | API principal    |
| SAMMWEB               | 1     | Aplicación web   |
| MVC                   | 2     | Aplicación MVC   |
| APPSAMM               | 3     | Aplicación móvil |


## Configuración

### Paso 1: Buscar el procedimiento 

Para el control del nombre intervienen 4 procedimientos *_GetDefaultReportName
*_GetDocumentReportName
*_GetReportName
*_GetTechicalReportReportName

estos procedimientos tienen en cuenta los procedimientos originales que controlaban el nomnbre como lo son _nombreArchivoExportar y _nombreReporteTecnico  no obstante de ser necesario se puede controlar el nombre del documento directamente con alguno de los procedimientos ya mencionados.


**Versión del Documento:** 1.0  
**Última Actualización:** Febrero 2026  
**Mantenedor:** Equipo de Desarrollo IDAE
