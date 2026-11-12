---
sidebar_position: 1
release_version: "7.1.25.0"
release_module: "SAMM New"
---

# Permisos para visualizar y configurar Opciones en documentos

## Descripción general

Se validó el comportamiento de los permisos **Ver Opciones** y **Configurar Opciones**, utilizados para controlar el acceso a la sección **Opciones** de los documentos que contienen ítems. Esta funcionalidad permite agrupar los ítems de un documento por opciones y presentar diferentes alternativas al cliente.

Las pruebas se ejecutaron directamente en el documento de **Cotizaciones**. También se verificó que ambos permisos se encuentran disponibles de manera independiente para cada tipo de documento que contiene ítems, por lo que el administrador debe habilitarlos en cada documento según las necesidades del perfil.

## Versiones del ambiente de pruebas

| **Componente** | **Versión** |
| :--- | :---: |
| SAMM Lógica | 5.6.28.0 |
| Capa de datos | 2.1.22.1 |
| Recursos | N/A |
| Base de datos | C2.1.22.1 |
| SAM Core | 2.0.30.0 |
| SAMM API | 1.2.35.2 |

## Casos de prueba

| **Criterio asociado** | **#** | **Caso** | **Descripción** | **Resultado** | **Autor** |
| :---: | :---: | :--- | :--- | :--- | :---: |
| Criterio 1 | 1 | Asignación del permiso **Ver Opciones** | Ingresar a la configuración del perfil, ubicar el documento de **Cotizaciones** y activar o desactivar el permiso **Ver Opciones**. | El administrador puede asignar o quitar el permiso de manera independiente para controlar la visualización de la sección **Opciones**. | Tester |
| Criterio 2 | 2 | Asignación del permiso **Configurar Opciones** | Ingresar a la configuración del perfil, ubicar el documento de **Cotizaciones** y activar o desactivar el permiso **Configurar Opciones**. | El administrador puede asignar o quitar el permiso de manera independiente para controlar la creación, edición y gestión de opciones. | Tester |
| Criterio 3 | 3 | Usuario sin permiso **Ver Opciones** | Desactivar los permisos **Ver Opciones** y **Configurar Opciones**, iniciar sesión con el usuario asociado al perfil e ingresar a una cotización con ítems. | El usuario no visualiza la sección **Opciones** ni puede consultar o gestionar las opciones del documento. | Tester |
| Criterio 4 | 4 | Visualización de opciones en modo de solo lectura | Activar únicamente el permiso **Ver Opciones**, mantener desactivado **Configurar Opciones** e ingresar a una cotización con ítems. | El usuario puede consultar la sección **Opciones**, pero no puede crear nuevas opciones ni editar o gestionar las existentes. | Tester |
| Criterio 2 y 4 | 5 | Visualización y configuración de opciones | Activar los permisos **Ver Opciones** y **Configurar Opciones** e ingresar a una cotización con ítems. | El usuario puede visualizar la sección y crear, editar o gestionar las opciones asociadas a los ítems de la cotización. | Tester |
| General | 6 | Permisos configurables por documento | Revisar la configuración de permisos de los documentos que contienen ítems. | Los permisos **Ver Opciones** y **Configurar Opciones** se encuentran disponibles en cada documento y deben activarse individualmente según el perfil. | Tester |
| Criterio 5 | 7 | Comportamiento predeterminado de perfiles existentes | Revisar el estado de los permisos después de la implementación en un perfil existente. | Los permisos se encontraron desactivados por defecto y requieren que el administrador los seleccione. Este comportamiento debe revisarse frente al criterio que establece que los perfiles existentes deben conservar el acceso habilitado. | Tester |

## Configuración de acceso validada

| **Ver Opciones** | **Configurar Opciones** | **Comportamiento esperado** |
| :---: | :---: | :--- |
| Desactivado | Desactivado | La sección **Opciones** no se visualiza. |
| Activado | Desactivado | La sección **Opciones** se visualiza en modo de solo lectura. |
| Activado | Activado | El usuario puede visualizar, crear, editar y gestionar opciones. |

## Evidencia

El siguiente video muestra la configuración y validación de los permisos **Ver Opciones** y **Configurar Opciones** en el documento de **Cotizaciones**:

[Ver video de la validación de permisos de Opciones en Cotizaciones](https://www.youtube.com/watch?v=1iEUw1FfSNY)

## Resultado general

Las pruebas ejecutadas confirman que los permisos **Ver Opciones** y **Configurar Opciones** controlan de manera independiente la visualización y la gestión de la sección **Opciones** en las cotizaciones. Un usuario sin el permiso de visualización no puede acceder a la sección; un usuario que solamente tiene **Ver Opciones** puede consultar la información en modo de solo lectura; y un usuario con ambos permisos puede crear, editar y gestionar las opciones.

También se comprobó que los permisos deben configurarse por cada documento que contenga ítems. Se identificó como observación que los permisos aparecen desactivados por defecto, por lo que el comportamiento de los perfiles existentes debe revisarse frente al criterio de aceptación que solicita conservar el acceso habilitado después del despliegue.
