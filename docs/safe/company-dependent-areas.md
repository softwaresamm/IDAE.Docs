---
sidebar_position: 1
release_version: "0.14.0"
release_module: "SAFE"
---

# Configurar Relación Dependiente entre Empresas y Áreas de Asociados

Este documento describe la mejora que establece una relación entre las empresas y sus respectivas áreas, de manera que cada área quede asociada a una empresa específica. Al crear un área, el usuario debe seleccionar la empresa a la que pertenece; posteriormente, al crear un asociado, la selección del área depende de la empresa seleccionada, mostrando únicamente las áreas correspondientes a dicha empresa.

## Referencias

- [SO-2160: Configurar relación dependiente entre empresas y áreas de asociados](https://softwaresamm.atlassian.net/browse/SO-2160)

## Información de Versiones

### Versión de Lanzamiento

:::info **FEB V.0.14.0**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción |
| ---------- | -------------- | ----------- |
| SAFE       | >= v0.14.0     | Plataforma SAFE |

## Requisitos Previos

Antes de usar la funcionalidad, asegúrese de tener:

- La aplicación actualizada a la versión mínima indicada en la tabla anterior
- Un usuario autorizado para ingresar a la plataforma
- Empresas creadas previamente en el formulario de Empresas

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Actualizar la aplicación

Esta funcionalidad no requiere configuración. El campo **Empresa** aparece en el formulario de Áreas una vez que la aplicación está actualizada a la versión indicada.

:::tip Consejo
Después de actualizar, ingrese al formulario de Áreas y confirme que se visualiza el campo **Empresa**.
:::

## Video

- [Video: Relación dependiente entre empresas y áreas](https://youtu.be/O3zWpAxDOe4)

## Casos Especiales

:::note Comportamientos Predefinidos
La selección de empresas y áreas tiene un comportamiento definido en los formularios de Áreas y de Asociados.
:::

| Caso                                  | Campo/Valor              | Descripción                                                                                              |
| ------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------- |
| Búsqueda reactiva de empresas         | Campo **Empresa** (Áreas) | La búsqueda filtra los resultados a medida que se ingresa texto, sin necesidad de ejecutar una búsqueda manual |
| Búsqueda sin coincidencias            | Campo **Empresa** (Áreas) | El sistema no muestra resultados que no coincidan y presenta el estado vacío correspondiente             |
| Cambio de empresa en el asociado      | Campo **Área** (Asociados) | El listado de áreas se actualiza al seleccionar o cambiar la empresa                                    |
| Área de otra empresa                  | Campo **Área** (Asociados) | Se impide la asignación de un área que no pertenezca a la empresa seleccionada                          |

## Resultado Esperado

Una vez actualizada la aplicación:

1. **Asociación de área con empresa**: Como usuario encargado de administrar la información, debería seleccionar la empresa a la que pertenece un área al momento de crearla, para mantener correctamente relacionada la estructura organizacional.
2. **Áreas disponibles por empresa**: Como usuario encargado de registrar asociados, debería visualizar únicamente las áreas asociadas a la empresa seleccionada, para evitar asignaciones incorrectas.
3. **Dependencia entre campos**: Como usuario encargado de registrar asociados, debería actualizarse el listado de áreas cuando se seleccione o cambie la empresa, para garantizar que las opciones disponibles correspondan a la empresa seleccionada.
4. **Validación de la relación**: Como responsable de la gestión de asociados, debería impedirse la asignación de un área que no pertenezca a la empresa seleccionada, para garantizar la integridad de la información.

## Resolución de Problemas

### El campo Empresa no aparece en el formulario de Áreas

Verifique que:

- La aplicación esté en la versión `v0.14.0` o superior
- El usuario haya cerrado e iniciado sesión después de la actualización

### El campo Empresa no lista empresas

Confirme que:

- Existan empresas creadas previamente en el formulario de Empresas

### Al crear un asociado no aparecen áreas

Revise que:

- Se haya seleccionado una empresa en el asociado
- Existan áreas asociadas a la empresa seleccionada

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Acceso a la plataforma y a los formularios

**Precondiciones:** Usuario autorizado.

| Paso | Acción                                                             | Resultado esperado                                                                                 |
| ---- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| 1    | Validar el acceso a la plataforma con un usuario autorizado        | **La plataforma carga correctamente**, sin presentar errores de autenticación ni de navegación     |
| 2    | Validar el ingreso al formulario de Preferencias                   | El formulario de Preferencias carga correctamente y permite visualizar las opciones configuradas   |
| 3    | Verificar el ingreso al formulario de administración de Empresas   | El formulario de Empresas carga correctamente y permite consultar los registros existentes         |
| 4    | Validar el ingreso al formulario de administración de Áreas        | El formulario de Áreas carga correctamente y permite consultar los registros existentes            |

### Escenario 2: Gestión de registros de Empresas (CRUD)

**Precondiciones:** Formulario de Empresas abierto.

| Paso | Acción                                                                                              | Resultado esperado                                                                          |
| ---- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1    | Verificar que se puedan realizar las operaciones de creación, consulta, edición y eliminación de empresas | **El sistema permite ejecutar correctamente las operaciones CRUD** y conserva los cambios realizados |

### Escenario 3: Campo Empresa en el formulario de Áreas

**Precondiciones:** Formulario de Áreas abierto y empresas creadas previamente en el formulario de Empresas.

| Paso | Acción                                                                                                            | Resultado esperado                                                                                                                                       |
| ---- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Verificar que, al ingresar al formulario de Áreas, se visualice el nuevo campo denominado Empresa                 | **El campo Empresa se muestra correctamente** en el formulario y permite interactuar con él según su configuración                                       |
| 2    | Verificar que el campo Empresa liste las empresas creadas previamente en el formulario de Empresas                | Se muestran correctamente las empresas registradas y disponibles para su selección                                                                       |
| 3    | Verificar que el listado de empresas cuente con un campo de búsqueda que filtre los resultados a medida que se ingresa texto | La búsqueda funciona de manera reactiva y muestra únicamente las empresas que coinciden con el texto ingresado, sin necesidad de ejecutar una búsqueda manual |
| 4    | Ingresar un texto que no corresponda a ninguna empresa registrada en el campo de búsqueda                         | El sistema no muestra resultados que no coincidan e informa o presenta el estado vacío correspondiente                                                   |

### Escenario 4: Asociación de área con empresa

**Precondiciones:** Formulario de Áreas abierto y empresas creadas previamente.

| Paso | Acción                                                                                                              | Resultado esperado                                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Verificar las operaciones de creación, consulta, edición y eliminación de áreas, incluyendo la asociación con una empresa | El sistema permite realizar las operaciones CRUD correctamente y conserva la empresa asociada al área según la información seleccionada |
| 2    | Crear un área y seleccionar una empresa en el campo correspondiente                                                  | **El área se crea correctamente** y queda asociada a la empresa seleccionada                                                    |
| 3    | Modificar la empresa asociada a un área existente y guardar los cambios                                              | El sistema actualiza correctamente la asociación y muestra la nueva empresa al consultar el área                                |
| 4    | Consultar un área previamente registrada y verificar la información del campo Empresa                                | Se visualiza correctamente la empresa asociada al área seleccionada                                                             |
| 5    | Crear o modificar un área asociada a una empresa, salir del formulario y consultar nuevamente el registro            | **La empresa asociada se conserva correctamente** después de guardar y volver a consultar el área                               |
