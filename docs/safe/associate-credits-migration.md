---
sidebar_position: 2
release_version: "0.14.0"
release_module: "SAFE"
---

# Migrar y Visualizar Créditos de Asociados en SAFE desde el Sistema Legado

Este documento describe la mejora que migra la información de créditos de asociados desde el sistema legado hacia SAFE, además de mostrar el detalle de los créditos y permitir la creación y edición de créditos. Con esta mejora, la cartera histórica puede consultarse en SAFE sin depender del sistema anterior.

## Referencias

- [SO-2258: Migrar y visualizar créditos de asociados en SAFE desde el sistema legado](https://softwaresamm.atlassian.net/browse/SO-2258)
## Información de Versiones

### Versión de Lanzamiento

:::info **FEB V.0.14.0**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción     |
| ---------- | -------------- | --------------- |
| SAFE       | >= v0.14.0     | Plataforma SAFE |

## Requisitos Previos

Antes de usar la funcionalidad, asegúrese de tener:

- La aplicación actualizada a la versión mínima indicada en la tabla anterior
- Un usuario autorizado para ingresar a la plataforma

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Actualizar la aplicación

Esta funcionalidad no requiere configuración. Los créditos migrados, las líneas de crédito y sus catálogos están disponibles una vez que la aplicación está actualizada a la versión indicada.

:::tip Consejo
Después de actualizar, ingrese al formulario de Preferencias y confirme que se visualiza la sección **Catálogos de Créditos**.
:::

## Video

- [Video: Migrar y visualizar créditos de asociados en SAFE](https://youtu.be/gGDEMZRfSkA)

## Casos Especiales

:::note Comportamientos Predefinidos
La migración de créditos desde el sistema legado tiene un comportamiento definido.
:::

| Caso               | Campo/Valor          | Descripción                                                                                  |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------- |
| Créditos huérfanos | Script de migración  | Los créditos huérfanos no se migran a SAFE; están documentados en el script de migración     |

## Resultado Esperado

Una vez actualizada la aplicación:

1. **Cartera histórica migrada**: Como administrador, debería encontrar en SAFE los créditos, las líneas de crédito y sus catálogos migrados desde el sistema legado (salvo los créditos huérfanos documentados en el script de migración), para consultar la cartera histórica sin depender del sistema anterior.
2. **Búsqueda y detalle de créditos**: Como analista de cartera, debería buscar créditos por código, asociado o cualquier otro campo del crédito y ver su detalle completo, para atender consultas de los asociados de forma ágil.
3. **Navegación desde el asociado**: Como analista, debería abrir desde un asociado sus créditos y sus movimientos, quitar el filtro del asociado y volver al listado correspondiente, para navegar de forma uniforme entre los módulos de cartera.
4. **Administración de catálogos**: Como administrador, debería crear, editar y eliminar líneas de crédito y sus catálogos desde Preferencias, para mantener actualizadas las condiciones de crédito vigentes.
5. **Diccionario de datos publicado**: Como equipo técnico, debería contar con el [diccionario de datos de SAFE](https://softwaresamm.github.io/IDAE.Docs/docs/safe/database) publicado en IDAE.Docs, para conocer la estructura y el origen de los datos de la base.

## Resolución de Problemas

### La sección Catálogos de Créditos no aparece en Preferencias

Verifique que:

- La aplicación esté en la versión `v0.14.0` o superior
- El usuario haya cerrado e iniciado sesión después de la actualización

### Un crédito del sistema legado no aparece en SAFE

Confirme que:

- El crédito no corresponda a un crédito huérfano documentado en el script de migración

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Acceso a la plataforma y a Catálogos de Créditos

**Precondiciones:** Usuario autorizado.

| Paso | Acción                                                                                              | Resultado esperado                                                                               |
| ---- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1    | Validar el acceso a la plataforma con un usuario autorizado                                         | **La plataforma carga correctamente**, sin presentar errores de autenticación ni de navegación   |
| 2    | Validar el ingreso al formulario de Preferencias                                                    | El formulario carga correctamente y permite visualizar las opciones configuradas                 |
| 3    | Validar que se encuentre disponible la sección Catálogos de Créditos dentro del formulario de Preferencias | La sección Catálogos de Créditos se visualiza correctamente y permite identificar sus opciones   |

### Escenario 2: Línea de Crédito

**Precondiciones:** Sección Catálogos de Créditos disponible en Preferencias.

| Paso | Acción                                                                                         | Resultado esperado                                                                               |
| ---- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1    | Validar la navegación al formulario Línea de Crédito al seleccionar la opción correspondiente  | El sistema redirige correctamente al formulario Línea de Crédito                                 |
| 2    | Validar que el formulario Línea de Crédito muestre la información de los registros existentes  | Se visualizan correctamente los registros y sus respectivos datos                                |
| 3    | Validar la creación, consulta, actualización y eliminación de registros en el formulario Línea de Crédito | **El sistema permite realizar correctamente las operaciones CRUD** y refleja los cambios realizados |

### Escenario 3: Tipo de Tasa

**Precondiciones:** Sección Catálogos de Créditos disponible en Preferencias.

| Paso | Acción                                                                                     | Resultado esperado                                                                               |
| ---- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| 1    | Validar la navegación al formulario Tipo de Tasa al seleccionar la opción correspondiente  | El sistema redirige correctamente al formulario Tipo de Tasa                                     |
| 2    | Validar que el formulario Tipo de Tasa muestre la información de los registros existentes  | Se visualizan correctamente los registros y sus respectivos datos                                |
| 3    | Validar la creación, consulta, actualización y eliminación de registros en el formulario Tipo de Tasa | **El sistema permite realizar correctamente las operaciones CRUD** y refleja los cambios realizados |

### Escenario 4: Forma de Pago

**Precondiciones:** Sección Catálogos de Créditos disponible en Preferencias.

| Paso | Acción                                                                                      | Resultado esperado                                                                               |
| ---- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1    | Validar la navegación al formulario Forma de Pago al seleccionar la opción correspondiente  | El sistema redirige correctamente al formulario Forma de Pago                                    |
| 2    | Validar que el formulario Forma de Pago muestre la información de los registros existentes  | Se visualizan correctamente los registros y sus respectivos datos                                |
| 3    | Validar la creación, consulta, actualización y eliminación de registros en el formulario Forma de Pago | **El sistema permite realizar correctamente las operaciones CRUD** y refleja los cambios realizados |

### Escenario 5: Destino del Crédito

**Precondiciones:** Sección Catálogos de Créditos disponible en Preferencias.

| Paso | Acción                                                                                            | Resultado esperado                                                                               |
| ---- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1    | Validar la navegación al formulario Destino del Crédito al seleccionar la opción correspondiente  | El sistema redirige correctamente al formulario Destino del Crédito                              |
| 2    | Validar que el formulario Destino del Crédito muestre la información de los registros existentes  | Se visualizan correctamente los registros y sus respectivos datos                                |
| 3    | Validar la creación, consulta, actualización y eliminación de registros en el formulario Destino del Crédito | **El sistema permite realizar correctamente las operaciones CRUD** y refleja los cambios realizados |

### Escenario 6: Estado del Crédito

**Precondiciones:** Sección Catálogos de Créditos disponible en Preferencias.

| Paso | Acción                                                                                           | Resultado esperado                                                                               |
| ---- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| 1    | Validar la navegación al formulario Estado del Crédito al seleccionar la opción correspondiente  | El sistema redirige correctamente al formulario Estado del Crédito                               |
| 2    | Validar que el formulario Estado del Crédito muestre la información de los registros existentes  | Se visualizan correctamente los registros y sus respectivos datos                                |
| 3    | Validar la creación, consulta, actualización y eliminación de registros en el formulario Estado del Crédito | **El sistema permite realizar correctamente las operaciones CRUD** y refleja los cambios realizados |

### Escenario 7: Créditos desde el formulario de Asociados

**Precondiciones:** Usuario autorizado y asociados con créditos registrados.

| Paso | Acción                                                                                                         | Resultado esperado                                                                                                    |
| ---- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1    | Validar el ingreso al formulario de Asociados desde la plataforma                                              | El formulario de Asociados carga correctamente y permite visualizar la información disponible, sin presentar errores  |
| 2    | Validar que al buscar o seleccionar un asociado se visualice correctamente el signo de pesos en los campos correspondientes | El sistema muestra correctamente el signo de pesos al consultar o seleccionar un asociado                             |
| 3    | Validar el acceso al listado de créditos al seleccionar la opción Créditos de un asociado                      | **El sistema permite ingresar al listado** y muestra correctamente los créditos asociados al usuario seleccionado     |
