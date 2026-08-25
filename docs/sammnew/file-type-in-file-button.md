---
sidebar_position: 1
release_version: "7.1.16.0"
release_module: "SAMM New"
---

# Asignar Tipo Archivo

Este documento describe cómo configurar la funcionalidad de **asignación de tipo de archivo** en SAMM New, permitiendo clasificar los documentos adjuntos sin necesidad de renombrarlos manualmente.

## Referencias

- [SO-43: Crear formulario para crear tipo archivo](https://softwaresamm.atlassian.net/browse/SO-43)

## Información de Versiones

### Versión de Lanzamiento

:::info **v7.1.16.0**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción            |
| ------------- | --------------- | ----------------------- |
| SAMM LOGICA   | >= 5.6.26.5     | Lógica de negocio        |
| CAPA DE DATOS | >= 2.1.17.0     | Capa de acceso a datos   |
| SAMM CORE     | >= 2.0.26.0     | Core del sistema         |
| SAMMAPI       | >= 1.2.32.0     | API principal            |
| BASE DE DATOS | >= C2.1.17.0    | Base de datos            |

:::note
Esta funcionalidad no requiere una versión mínima específica del módulo de Recursos.
:::

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Acceso al módulo de **Configuración** en SAMM New
- Permisos para gestionar la sección **Aplicación** dentro de Configuración
- Conocimiento de los tipos de archivo que se manejan habitualmente en la documentación de la organización

:::important Importante
Los tipos de archivo deben crearse **antes** de que los usuarios intenten clasificar los adjuntos, ya que el listado desplegable solo mostrará las opciones previamente configuradas.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Crear los Tipos de Archivo

Para habilitar la clasificación de archivos, primero es necesario crear los tipos que estarán disponibles para selección.

Diríjase a `Configuración > Aplicación > Tipos de archivo` y cree allí todos los tipos de archivo que se requieran (por ejemplo: `Factura`, `Contrato`, `Evidencia Fotográfica`, `Certificado`, etc.).

:::tip Consejo
Defina una nomenclatura clara y consistente para los tipos de archivo desde el inicio, ya que esto facilitará la búsqueda y clasificación posterior de los documentos adjuntos.
:::

### Paso 2: Visualización y Asignación

Una vez creados los tipos de archivo, estos estarán disponibles al momento de adjuntar documentos.

Al agregar un archivo mediante el botón **Archivos** disponible en los documentos, y una vez que dicho archivo ya se encuentre cargado, en la última columna de la tabla de adjuntos aparecerá un cuadro desplegable con los `tipos de archivo` creados en el Paso 1. Desde allí el usuario podrá seleccionar la clasificación correspondiente para cada documento.

:::note
Esta clasificación es opcional y busca evitar la necesidad de renombrar manualmente cada archivo adjunto para identificarlo.
:::

En caso de tener dudas consultar el siguiente video https://youtu.be/F4WBzPXLiOw

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Tipos de archivo disponibles**: Los tipos de archivo creados en `Configuración > Aplicación > Tipos de archivo` quedan disponibles para su selección en cualquier documento donde se adjunten archivos.
2. **Clasificación al adjuntar**: Al cargar un archivo desde el botón **Archivos**, el usuario puede seleccionar un `tipo de archivo` desde el desplegable ubicado en la última columna, sin necesidad de renombrar el documento.
3. **Persistencia de la clasificación**: El tipo de archivo asignado queda registrado junto con el adjunto para su posterior identificación y búsqueda.

## Resolución de Problemas

### El desplegable de tipo de archivo no aparece

Verifique que:

- La versión de SAMM New instalada corresponda a `7.1.16.0` o superior
- Las versiones mínimas de `SAMM LOGICA`, `CAPA DE DATOS`, `SAMM CORE` y `SAMMAPI` cumplan lo indicado en la sección de Versiones Requeridas
- El archivo se encuentre completamente cargado antes de intentar seleccionar el tipo (el desplegable solo se muestra en archivos ya cargados)

### No hay tipos de archivo para seleccionar

Confirme que:

- Se hayan creado previamente tipos de archivo en `Configuración > Aplicación > Tipos de archivo`
- El usuario cuente con los permisos necesarios para visualizar la sección de configuración de tipos de archivo

### La selección de tipo de archivo no se guarda

Revise que:

- La conexión con `SAMMAPI` esté activa y responda correctamente
- No existan errores en consola relacionados con el guardado del adjunto
- El usuario tenga permisos de edición sobre el documento donde se está adjuntando el archivo

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Creación y visualización de tipo de archivo

1. Ingrese a `Configuración > Aplicación > Tipos de archivo`
2. Cree un nuevo tipo de archivo (ej: `Certificado`)
3. Diríjase a cualquier documento y presione el botón **Archivos**
4. Adjunte un archivo y espere a que finalice la carga
5. **Resultado esperado**: En la última columna aparece un desplegable que incluye el tipo de archivo `Certificado` creado previamente

### Escenario 2: Asignación de tipo de archivo a un adjunto

1. Con al menos un tipo de archivo ya creado, adjunte un archivo en cualquier documento
2. Una vez cargado, seleccione un tipo de archivo desde el desplegable
3. Guarde o refresque la vista del documento
4. **Resultado esperado**: El tipo de archivo seleccionado se mantiene asociado al adjunto tras el refresco

### Escenario 3: Adjunto sin tipo de archivo asignado

1. Adjunte un archivo sin seleccionar ningún tipo de archivo en el desplegable
2. Guarde el documento
3. **Resultado esperado**: El sistema permite guardar el adjunto sin clasificación, sin generar errores, dejando el campo de tipo de archivo vacío o en su valor por defecto