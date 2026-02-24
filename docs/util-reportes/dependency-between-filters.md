---
sidebar_position: 3
release_version: "v0.3.1"
release_module: "Utilitario de Reportes"
---

# Dependencia entre filtros
Este documento describe cómo configurar la dependencia entre los filtros para los reportes donde la idea es optimizar los resultados o el uso de los filtros posteriores ejemplo : si filtro un cliente espero solo ver las sucursales de ese cliente previamente filtrado.

## Referencias

- [SO-394: Ajustar consumos desde utilitario para el manejo de dependencias](https://softwaresamm.atlassian.net/browse/SO-394)


## Información de Versiones

### Versión de Lanzamiento

:::info **v0.3.0**
:::

### Versiones Requeridas

| Aplicación      | Versión Mínima | Descripción                           |
| --------------- | -------------- | ------------------------------------- |
| SAMMNEW         | >= 7.1.10.13    | Aplicación web principal              |
| SAMM LOGICA     | >= 5.6.23.7    | Lógica de negocio                     |
| BASE DE DATOS   | >= C2.1.8.0    | Scripts de configuración de historial |
| REPORT SERVICES | >= 0.3.0       | Utilitario de Reportes                |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- La versión mínima de Report Services instalada y operativa
- Acceso a los procedimientos almacenados del módulo de reportes

:::important Importante
Esta funcionalidad requiere la versión mínima especificada de Report Services. Verifique su versión actual antes de continuar.
:::

## Información del Servicio

:::note Información
El servicio acepta un parámetro `aplicacion` que identifica desde qué aplicación se realiza la petición, permitiendo distinguir el origen de la solicitud del reporte.
:::

### Parámetros del Servicio

| Aplicación            | Valor | Descripción      |
| --------------------- | ----- | ---------------- |
| SAMMAPI (por defecto) | 0     | API principal    |
| SAMMWEB               | 1     | Aplicación web   |
| MVC                   | 2     | Aplicación MVC   |
| APPSAMM               | 3     | Aplicación móvil |

## Configuración

### Paso 1: Identificar la existencia de la tabla rep_campoReporteDependiente

Se debe realizar una consulta simple como un select * from rep_campoReporteDependiente se espera tener como resultado el registro con el id 0

### Paso 2: Identificar los id de los campos reporte a Relacionar

```sql title="Consulta para ver los id de campo reporte"
-- Consultar el registro del reporte a configurar
SELECT *
FROM rep_camporeporte 
WHERE id_reporte = -- id del reporte tecnico a configurar
```



### Paso 3: Realizar un insert a la tabla rep_campoReporteDependiente

Al haber identificado los id de los campos reporte se podra proceder a realizar el insert por base de datos 

```sql title="Estructura del insert"
INSERT INTO [dbo].[rep_campoReporteDependiente]
           ([uid]
           ,[eid]
           ,[id_usuario_modifico]
           ,[id_usuario_creo]
           ,[fechaModificacion]
           ,[fechaCreacion]
           ,[active]
           ,[campoReporteDependiente]
           ,[campoReporteDependiente_codigo]
           ,[id_campoReporte_origen]
           ,[id_campoReporte_dependiente])
     select
           [uid]
           ,[eid]
           ,[id_usuario_modifico]
           ,[id_usuario_creo]
           ,GETDATE()
           ,GETDATE()
           ,1
           ,'sucursal -> equipo'
           ,[campoReporteDependiente_codigo]
           ,616
           ,615
from [rep_campoReporteDependiente]

where id=0
```
como podemos observar tenemos los campos [id_campoReporte_origen] del cual dejaremos como filtro padre por decirlo de alguna forma y tenemos [id_campoReporte_dependiente] el cual mostrara los resultados dependiendo del [id_campoReporte_origen]

:::important Importante
Si se modifica directamente uno de los procedimientos `*_Get...ReportName`, los cambios afectarán a todos los reportes que lo utilicen. Evalúe el impacto antes de realizar modificaciones.
:::

## Resultado Esperado

Una vez completada la configuración:

1. **Nombre personalizado**: El archivo PDF generado tomará el nombre definido en el procedimiento almacenado correspondiente.
2. **Compatibilidad con orígenes múltiples**: El parámetro `aplicacion` asegura que el nombre sea gestionado correctamente según la aplicación que genera la solicitud.
3. **Retrocompatibilidad**: Los procedimientos originales `_nombreArchivoExportar` y `_nombreReporteTecnico` continúan siendo considerados en la lógica de control.

## Resolución de Problemas

### El PDF se genera con un nombre incorrecto o genérico

Verifique que:

- La columna `tabla` en `rep_reporte` tiene el valor correcto para el reporte en cuestión
- El procedimiento `*_GetReportName` (o el correspondiente) está correctamente implementado y retorna el nombre esperado
- La versión de REPORT SERVICES instalada es `>= 0.3.1`

### El procedimiento no es invocado

Confirme que:

- El nombre del procedimiento sigue la convención `*_GetDefaultReportName`, `*_GetDocumentReportName`, `*_GetReportName` o `*_GetTechnicalReportReportName`
- El valor del parámetro `aplicacion` coincide con uno de los valores válidos (0, 1, 2 o 3)

### Error al ejecutar desde una aplicación específica

Revise que:

- El valor del parámetro `aplicacion` enviado por la aplicación cliente es correcto según la tabla de parámetros del servicio
- Las versiones de SAMMNEW y SAMM LOGICA cumplen con los mínimos requeridos

---

**Versión del Documento:** 1.0
**Última Actualización:** Enero 2026
**Mantenedor:** Equipo de Desarrollo IDAE
