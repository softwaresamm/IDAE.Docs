---
sidebar_position: 7
release_version: "0.15.0"
release_module: "SAFE"
---

# Crear un Crédito desde los Créditos del Asociado

Este documento describe cómo crear un crédito sin perder el contexto del asociado. Cuando se ingresa a los créditos de un asociado y se crea un crédito nuevo, el formulario trae el asociado ya seleccionado y, al terminar, la aplicación regresa al listado de créditos de ese asociado.

## Referencias

- [SO-2284: Conservar el asociado al crear un crédito desde sus créditos](https://softwaresamm.atlassian.net/browse/SO-2284)
- Guía relacionada: [Línea de Crédito según el Plazo del Crédito](./loan-credit-line-term.md)

## Información de Versiones

### Versión de Lanzamiento

:::info **FEB V.0.15.0**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción                |
| ---------- | -------------- | -------------------------- |
| SAFE       | >= v0.15.0     | Plataforma SAFE (frontend) |

## Requisitos Previos

Antes de usar la funcionalidad, asegúrese de tener:

- La aplicación actualizada a la versión mínima indicada en la tabla anterior
- Un usuario autorizado para crear créditos

## Configuración

### Paso 1: Actualizar la aplicación

Esta funcionalidad no requiere configuración ni cambios en la base de datos ni en la API.

### Paso 2: Crear el crédito desde el asociado

1. Ingrese a **Asociados > Listado** y, en la fila del asociado, haga clic en el ícono **Créditos**. Se abre el listado de créditos filtrado por ese asociado.
2. Haga clic en **Nuevo crédito**. El campo **Asociado** ya muestra el documento y el nombre del asociado.
3. Diligencie el crédito y créelo, o cancele.
4. En ambos casos (crear, **Cancelar** o **Volver**) la aplicación regresa al listado de créditos del asociado.

## Casos Especiales

| Caso                                                   | Resultado                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------- |
| **Nuevo crédito** desde **Cartera y Créditos > Créditos** | El formulario abre sin asociado y regresa al listado general (sin cambios) |
| Se quita el filtro del asociado en el listado          | **Nuevo crédito** abre sin asociado                                       |
| Se cambia el asociado en el formulario                 | Al terminar se regresa al listado del asociado con el que se ingresó      |

## Resultado Esperado

Una vez actualizada la aplicación:

1. **Asociado precargado**: no es necesario buscar de nuevo al asociado.
2. **Regreso al contexto**: al crear o cancelar, se vuelve a los créditos del asociado.
3. **Flujo general intacto**: crear desde el listado general funciona como antes.

## Resolución de Problemas

### El formulario no trae el asociado

Verifique que ingresó por el ícono **Créditos** del asociado (la dirección debe incluir `?associateId=`) y que el listado sigue filtrado por ese asociado.
