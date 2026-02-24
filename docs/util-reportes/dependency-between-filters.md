---
sidebar_position: 3
release_version: "v0.3.0"
release_module: "Utilitario de Reportes"
---

# Dependencia entre Filtros

Este documento describe cómo configurar la dependencia entre los filtros para los reportes, con el objetivo de optimizar los resultados al encadenar filtros secuencialmente. Por ejemplo, si se filtra por un cliente, se espera ver únicamente las sucursales pertenecientes a ese cliente previamente seleccionado.

## Referencias

- [SO-394: Ajustar consumos desde utilitario para el manejo de dependencias](https://softwaresamm.atlassian.net/browse/SO-394)

## Información de Versiones

### Versión de Lanzamiento

:::info **v0.3.0**
:::

### Versiones Requeridas

| Aplicación      | Versión Mínima | Descripción                           |
| --------------- | -------------- | ------------------------------------- |
| SAMMNEW         | >= 7.1.10.13   | Aplicación web principal              |
| SAMM LOGICA     | >= 5.6.23.7    | Lógica de negocio                     |
| BASE DE DATOS   | >= C2.1.8.0    | Scripts de configuración de historial |
| REPORT SERVICES | >= 0.3.0       | Utilitario de Reportes                |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- La versión mínima de Report Services instalada y operativa
- Acceso a los procedimientos almacenados del módulo de reportes
- Permisos de escritura sobre la base de datos para ejecutar sentencias `INSERT`

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

### Paso 1: Verificar la existencia de la tabla `rep_campoReporteDependiente`

Realice una consulta simple para confirmar que la tabla existe y contiene el registro base con `id = 0`, el cual se usará como plantilla en el paso siguiente.

```sql title="Verificar existencia de la tabla"
SELECT * FROM rep_campoReporteDependiente WHERE id = 0
```

:::tip Consejo
Se espera obtener al menos un registro como resultado. Si la consulta no retorna filas, verifique que la versión de la base de datos cumple con el mínimo requerido.
:::

### Paso 2: Identificar los IDs de los campos reporte a relacionar

Consulte la tabla `rep_camporeporte` para obtener los identificadores de los campos del reporte que desea vincular. Necesitará el ID del campo que actuará como **filtro padre** (`id_campoReporte_origen`) y el ID del campo que actuará como **filtro dependiente** (`id_campoReporte_dependiente`).

```sql title="Consultar los campos del reporte a configurar"
SELECT *
FROM rep_camporeporte
WHERE id_reporte = -- id del reporte técnico a configurar
```

### Paso 3: Registrar la dependencia en `rep_campoReporteDependiente`

Con los IDs identificados en el paso anterior, ejecute el siguiente `INSERT` para registrar la relación de dependencia entre los filtros. El ejemplo a continuación configura la dependencia de `sucursal` a partir de `equipo`.

```sql title="Insertar la dependencia entre filtros"
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
     SELECT
           [uid]
           ,[eid]
           ,[id_usuario_modifico]
           ,[id_usuario_creo]
           ,GETDATE()
           ,GETDATE()
           ,1
           ,'sucursal -> equipo'
           ,[campoReporteDependiente_codigo]
           ,616   -- ID del campo filtro padre (origen)
           ,615   -- ID del campo filtro dependiente
     FROM [rep_campoReporteDependiente]
     WHERE id = 0
```

El campo `id_campoReporte_origen` corresponde al **filtro padre** que condiciona los resultados, mientras que `id_campoReporte_dependiente` es el **filtro hijo** cuyos valores se mostrarán según la selección del filtro padre.

## Resultado Esperado

Una vez completada la configuración:

1. **Filtrado encadenado activo**: Al seleccionar un valor en el filtro padre (por ejemplo, un cliente), el filtro dependiente (por ejemplo, sucursal) mostrará únicamente los registros asociados a esa selección.
2. **Registro creado correctamente**: La tabla `rep_campoReporteDependiente` contendrá el nuevo registro con los IDs de los campos relacionados y el campo `active = 1`.
3. **Sin impacto en otros reportes**: Los reportes que no utilicen los campos configurados no se verán afectados por el cambio.

## Resolución de Problemas

### El filtro dependiente no se actualiza al cambiar el filtro padre

Verifique que:

- El `INSERT` se ejecutó correctamente y el registro existe en `rep_campoReporteDependiente` con `active = 1`.
- Los valores de `id_campoReporte_origen` e `id_campoReporte_dependiente` corresponden a los campos correctos del reporte.
- La versión de Report Services instalada cumple con el mínimo requerido (`>= 0.3.0`).

### La consulta del Paso 1 no retorna ningún registro

Confirme que:

- La tabla `rep_campoReporteDependiente` existe en la base de datos.
- La versión de la base de datos cumple con el mínimo requerido (`>= C2.1.8.0`).
- El usuario de base de datos tiene permisos de lectura sobre la tabla.

### El `INSERT` del Paso 3 falla con error de clave foránea

Revise que:

- Los IDs especificados en `id_campoReporte_origen` e `id_campoReporte_dependiente` existen en la tabla `rep_camporeporte`.
- El reporte técnico objetivo está correctamente registrado en el sistema.

---

**Versión del Documento:** 1.0
**Última Actualización:** Enero 2026
**Mantenedor:** Equipo de Desarrollo IDAE
