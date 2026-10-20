---
sidebar_position: 1
release_version: "7.1.16.0"
release_module: "SAMM New"
---

# Clasificación de Sugeridos

Este documento describe cómo configurar y utilizar la funcionalidad de **Clasificación de Sugeridos** en SAMM New, que permite crear y administrar los tipos de pendiente asociados a los sugeridos a través de un formulario dedicado, eliminando la necesidad de realizar inserciones manuales directamente en la base de datos.

## Referencias

- [SO-42: Crear formulario para crear clasificación de los sugeridos documento](https://softwaresamm.atlassian.net/browse/SO-42)

## Información de Versiones

### Versión de Lanzamiento

:::info **v7.1.16.0**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción                |
| ------------- | --------------- | --------------------------- |
| SAMMAPI       | >= 1.2.32.0     | API principal                |
| SAMM LOGICA   | >= 5.6.26.5     | Lógica de negocio             |
| SAMM CORE     | >= 2.0.26.0     | Core del sistema              |
| CAPA DE DATOS | >= 2.1.17.0     | Capa de acceso a datos        |
| BASE DE DATOS | >= C2.1.17.0    | Base de datos                 |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Acceso al módulo **Configuración > Aplicación** en SAMM New
- Permisos para crear y administrar `Tipos de pendiente`
- Conocimiento del proceso de carga de sugeridos desde el reporte dinámico

:::important Importante
Antes de esta funcionalidad, la clasificación de los sugeridos requería realizar un `insert` manual directamente en la tabla correspondiente. Verifique que no queden clasificaciones creadas mediante inserciones manuales que dupliquen los `Tipos de pendiente` que se creen desde el nuevo formulario.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Crear los tipos de pendiente

Ingrese a **Configuración > Aplicación > Tipos de pendiente**. Desde este menú se pueden crear todos los tipos de pendiente (clasificaciones) que se requieran, sin necesidad de realizar inserciones manuales en base de datos.

:::tip Consejo
Defina previamente junto al equipo funcional la nomenclatura y el listado de clasificaciones necesarias, para evitar duplicados o `Tipos de pendiente` con nombres poco descriptivos.
:::

### Paso 2: Visualización de la clasificación

Una vez creados los `Tipos de pendiente`, estos se visualizan en dos lugares:

- Al momento de **agregar sugeridos desde el reporte dinámico**, en la columna **Clasificación**.
- Desde el **tab de Sugeridos**, donde los sugeridos ya creados muestran su clasificación en la misma columna **Clasificación**.

:::note
La columna **Clasificación** solo mostrará los `Tipos de pendiente` previamente creados en el paso 1.
:::

En caso de dudas consultar el siguiente video https://youtu.be/X3sCozAoHl8

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Creación de clasificaciones**: El usuario puede crear, desde el formulario de `Tipos de pendiente`, todas las clasificaciones necesarias sin intervención directa sobre la base de datos.
2. **Visualización en reporte dinámico**: Al agregar sugeridos desde el reporte dinámico, la columna **Clasificación** muestra los `Tipos de pendiente` disponibles para seleccionar.
3. **Visualización en tab de Sugeridos**: Los sugeridos ya creados muestran su clasificación asignada en la columna **Clasificación** del tab de Sugeridos.

## Resolución de Problemas

### La columna Clasificación no muestra tipos de pendiente

Verifique que:

- Se hayan creado previamente los `Tipos de pendiente` en **Configuración > Aplicación > Tipos de pendiente**
- El usuario cuente con los permisos necesarios para visualizar dicha configuración
- La versión de SAMM New instalada sea igual o superior a `7.1.16.0`

### No es posible crear un nuevo tipo de pendiente

Confirme que:

- El usuario tiene permisos de administración sobre el módulo de configuración
- Las versiones mínimas de SAMMAPI, SAMM LOGICA, SAMM CORE, capa de datos y base de datos cumplen con lo indicado en la tabla de versiones requeridas


### La clasificación no se refleja en el tab de Sugeridos

Revise que:

- El sugerido haya sido guardado correctamente después de asignar la clasificación
- El `Tipo de pendiente` utilizado siga existiendo y no haya sido eliminado posteriormente

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Creación de un nuevo tipo de pendiente

1. Ingresar a **Configuración > Aplicación > Tipos de pendiente**.
2. Crear un nuevo `Tipo de pendiente` con un nombre descriptivo.
3. **Resultado esperado**: El nuevo tipo de pendiente se guarda correctamente y queda disponible para su selección.

### Escenario 2: Visualización de la clasificación en el reporte dinámico

1. Ingresar al reporte dinámico y agregar un sugerido.
2. Verificar la columna **Clasificación**.
3. **Resultado esperado**: La columna muestra el listado de `Tipos de pendiente` previamente creados, permitiendo seleccionar uno.

### Escenario 3: Visualización de la clasificación en el tab de Sugeridos

1. Ingresar al **tab de Sugeridos**.
2. Ubicar un sugerido con una clasificación ya asignada.
3. **Resultado esperado**: La columna **Clasificación** muestra correctamente el `Tipo de pendiente` asociado al sugerido.