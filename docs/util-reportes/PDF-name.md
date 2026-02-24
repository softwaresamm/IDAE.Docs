---
sidebar_position: 3
release_version: "v0.3.1"
release_module: "Utilitario de Reportes"
---

# Nombre del PDF

Este documento describe cómo configurar el nuevo procedimiento para el control del nombre del archivo PDF generado, permitiendo que el nombre del adjunto sea tomado directamente desde el stored procedure correspondiente.

## Referencias

- [SO-375: Nombre del adjunto sea tomado del SP](URL-de-Jira)

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

Antes de iniciar la configuración, asegúrese de tener:

- La columna `tabla` en la tabla `rep_reporte` correctamente especificada con el origen correspondiente
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

### Paso 1: Identificar los procedimientos de control de nombre

El control del nombre del PDF interviene a través de 4 procedimientos principales:

- `*_GetDefaultReportName`
- `*_GetDocumentReportName`
- `*_GetReportName`
- `*_GetTechnicalReportReportName`

Estos procedimientos consideran los procedimientos originales que controlaban el nombre, como `_nombreArchivoExportar` y `_nombreReporteTecnico`.

:::tip Consejo
De ser necesario, el nombre del documento puede controlarse directamente mediante cualquiera de los procedimientos mencionados, sin necesidad de modificar los originales.
:::

### Paso 2: Configurar la columna `tabla` en `rep_reporte`

Para que el procedimiento pueda determinar el nombre correcto del archivo, es necesario especificar el origen en la columna `tabla` de la tabla `rep_reporte`.

```sql title="Verificar configuración de la columna tabla"
-- Consultar el registro del reporte a configurar
SELECT *
FROM rep_reporte
WHERE -- condición del reporte específico
```

:::note Nota
El valor de la columna `tabla` determina qué procedimiento de nombre se ejecutará. Asegúrese de que el valor sea consistente con el origen del reporte.
:::

### Paso 3: Seleccionar y ajustar el procedimiento correspondiente

Según el tipo de reporte, identifique cuál de los 4 procedimientos aplica y realice los ajustes necesarios en su lógica de retorno de nombre.

```sql title="Estructura base del procedimiento de nombre"
-- Ejemplo de estructura esperada en el procedimiento
-- El procedimiento debe retornar el nombre deseado del archivo
SELECT @nombreArchivo = [lógica de nombre personalizado]
```

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
