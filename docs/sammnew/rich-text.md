---
sidebar_position: 4
release_version: "7.1.10.8"
release_module: "SammNew"
---

# Configuración del Texto Enriquecido

Este documento describe cómo configurar la funcionalidad de Texto Enriquecido en los reportes técnicos, permitiendo a los usuarios dar formato avanzado al texto (negritas, cursivas, listas, etc.) e insertar imágenes directamente en los campos Trabajos, Recomendaciones, Compromisos y Diagnóstico, tanto en el modo de reporte clásico como dinámico.

## Referencias

- [SO-53: Creación de componente para texto enriquecido (reporte clásico y reporte dinámico)](https://softwaresamm.atlassian.net/browse/SO-53)
- [SO-315: Crear parámetro general para controlar si se usará componente de Texto Enriquecido](https://softwaresamm.atlassian.net/browse/SO-315)
- [SO-323: Aplicar restricción de caracteres y obligatoriedad](https://softwaresamm.atlassian.net/browse/SO-323)
- [SO-324: Manejo de imágenes en Texto enriquecido](https://softwaresamm.atlassian.net/browse/SO-324)

## Información de Versiones

### Versión de Lanzamiento

:::info **v7.1.10.8**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción              |
| ------------- | -------------- | ------------------------ |
| SAMMNEW       | >= 7.1.10.8    | Aplicación web principal |
| SAMMAPI       | >= 1.2.19.6    | API principal            |
| SAMM CORE     | >= 2.0.18.5    | Core del sistema         |
| BASE DE DATOS | >= C2.1.4.3    | Base de datos            |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Permisos de administrador en el sistema
- Acceso a la base de datos del sistema
- Acceso al módulo de Configuración - Aplicación - Parámetros Generales
- Conocimiento de la estructura de las tablas `gen_config`, `ort_reporteTecnico` y `_columnas`

:::important Importante
Esta funcionalidad requiere las versiones mínimas especificadas. Verifique sus versiones actuales antes de continuar.
:::

## Configuración

### Paso 1: Habilitar Texto Enriquecido desde la Interfaz

La forma más sencilla de habilitar esta funcionalidad es a través de la interfaz de usuario.

1. Acceda al módulo de **Configuración** > **Aplicación** > **Parámetros Generales**
2. Seleccione el tab **OTS**
3. Encontrará un campo llamado **Texto Enriquecido**
4. Cambie el valor a **Sí** para habilitar la funcionalidad

:::tip Valor por Defecto
Por defecto este parámetro se encontrará en **No**. Al cambiar a **Sí**, se habilitará el editor de texto enriquecido en los reportes técnicos.
:::

![Configuración de parámetro de Texto enriquecido](./img/parameter-text-rich.png)

### Paso 2: Verificar Configuración en Base de Datos

Si prefiere verificar o configurar manualmente desde la base de datos, siga estos pasos.

#### Verificar Existencia del Parámetro

Ejecute la siguiente consulta para verificar si el parámetro ya existe en la base de datos:

```sql title="Verificar existencia del parámetro"
SELECT *
FROM gen_config
WHERE config = 'textoEnriquecido';
```

#### Verificar Columnas de Texto Enriquecido

Verifique que las columnas necesarias existan en la tabla de reportes técnicos:

```sql title="Verificar columnas de texto enriquecido en ort_reporteTecnico"
SELECT TOP 1
    trabajos_enriquecido,
    recomendaciones_enriquecido,
    compromisos_enriquecido,
    diagnostico_enriquecido
FROM ort_reporteTecnico;
```

```sql title="Verificar configuración de columnas en _columnas"
SELECT *
FROM _columnas
WHERE tabla = 'ort_reporteTecnico'
    AND columna IN (
        'trabajos_enriquecido',
        'recomendaciones_enriquecido',
        'compromisos_enriquecido',
        'diagnostico_enriquecido'
    );
```

#### Crear Parámetro y Columnas (si no existen)

Si las verificaciones anteriores no retornan resultados, debe ejecutar los scripts de creación del repositorio SAMM.DBObjects.

**Scripts de referencia:**

1. **Agregar columnas de texto enriquecido a la tabla `ort_reporteTecnico`:**

   - [SAMMAPI/Versions/Grupo2/2.1.4.1/SO_53_1.sql](https://github.com/softwaresamm/SAMM.DBObjects/blob/develop/SAMM.DBObjects/SAMMAPI/Versions/Grupo2/2.1.4.1/SO_53_1.sql)
   - [SAMMAPI/Versions/Grupo2/2.1.4.1/SO_53_2.sql](https://github.com/softwaresamm/SAMM.DBObjects/blob/develop/SAMM.DBObjects/SAMMAPI/Versions/Grupo2/2.1.4.1/SO_53_2.sql)

2. **Agregar parámetro de Texto Enriquecido:**
   - [SAMMAPI/Versions/Grupo2/2.1.4.2/SO_315_1.sql](https://github.com/softwaresamm/SAMM.DBObjects/blob/develop/SAMM.DBObjects/SAMMAPI/Versions/Grupo2/2.1.4.2/SO_315_1.sql)
   - [SAMMAPI/Versions/Grupo2/2.1.4.3/SO_315_1.sql](https://github.com/softwaresamm/SAMM.DBObjects/blob/develop/SAMM.DBObjects/SAMMAPI/Versions/Grupo2/2.1.4.3/SO_315_1.sql)

:::note Información
Estos scripts crean las columnas necesarias en la base de datos para almacenar el contenido enriquecido y el parámetro de configuración para habilitar/deshabilitar la funcionalidad.
:::

### Valores de Configuración

| Campo    | Valor              | Descripción                              |
| -------- | ------------------ | ---------------------------------------- |
| `config` | `textoEnriquecido` | Nombre del parámetro de configuración    |
| `modulo` | `ots`              | Módulo al que pertenece la configuración |
| `valor`  | `0` o `1`          | `0` = Deshabilitado, `1` = Habilitado    |

:::tip Consejo
Cambiar el valor del parámetro entre `0` y `1` permite habilitar o deshabilitar la funcionalidad sin necesidad de modificar código o reiniciar servicios.
:::

## Resultado Esperado

:::note Comportamiento del Sistema
Estos cambios afectarán a todos los usuarios que generen reportes técnicos, tanto en el modo de reporte clásico como en el modo dinámico.
:::

Una vez completada la configuración y habilitado el parámetro:

1. **Barra de Herramientas de Formato**: Los campos **Trabajos**, **Recomendaciones**, **Compromisos** y **Diagnóstico** mostrarán un componente de barra de herramientas para dar estilo al texto

2. **Funcionalidades Disponibles**: Los usuarios podrán aplicar formato de texto (negrita, cursiva, subrayado, listas, etc.) e insertar imágenes

3. **Alcance de la Funcionalidad**: Solo se mostrará en los campos mencionados anteriormente dentro de los reportes de órdenes de trabajo

### Barra de Herramientas

![Barra de Herramientas de Texto Enriquecido](./img/text-rich-toolbar.png)

### Inserción de Imágenes

#### Método 1: Botón de Cargar Imagen

Para agregar imágenes en los campos con texto enriquecido, haga clic en el botón de imagen:

![Botón de Agregar Imagen](./img/text-rich-file-buttom.png)

Se abrirá un popup para el cargue de la imagen. Haga clic en la sección de **Cargar**:

![Pop up de cargue de imágenes](./img/text-rich-image-upload-window.png)

#### Método 2: Copiar y Pegar

También se puede realizar la acción de copiar y pegar la imagen directamente en el campo:

![Cargue de imágenes](./img/text-rich-upload-image.png)

#### Visualización Final

Las imágenes insertadas se visualizarán integradas en el contenido del texto enriquecido:

![Imágenes en texto Enriquecido](./img/text-rich-image.png)

## Resolución de Problemas

### Error al cargar imágenes

Si al momento de realizar el cargue de imágenes en los campos de texto enriquecido se visualiza un error como el siguiente:

![Error de cargue de imágenes](./img/text-rich-upload-error.png)

Verifique que:

1. **Abrir herramientas de desarrollador**: Presione F12 o clic derecho > Inspeccionar en el navegador
2. **Intentar cargar la imagen nuevamente**: Vaya a la pestaña Network/Red
3. **Verificar el endpoint**: Busque la petición a `api/util/adjuntos/subir/archivoTemporal`
4. **Revisar el código de estado**: Si el status es diferente a 200:
   - Valide que SAMMAPI esté activo y respondiendo
   - Pruebe otros endpoints para confirmar la conectividad
   - Revise los logs del servidor para identificar el error específico

### El editor de texto enriquecido no aparece

Confirme que:

- El parámetro `textoEnriquecido` en la tabla `gen_config` tenga el valor `1`
- Las columnas enriquecidas existan en la tabla `ort_reporteTecnico`
- La versión de SAMMNEW sea al menos `7.1.10.8`
- Se haya refrescado la página después de cambiar la configuración

### El formato del texto no se guarda

Revise que:

- Las columnas `*_enriquecido` en la base de datos sean de tipo texto largo (TEXT o similar)
- No haya restricciones de longitud en las columnas
- El usuario tenga permisos para editar los reportes técnicos
