---
sidebar_position: 4
release_version: "0.15.0"
release_module: "SAFE"
---

# Buscar Asociados por Documento y Nombre

Este documento describe cómo funcionan los buscadores de asociados de SAFE. Todos los buscadores encuentran al asociado tanto por su número de documento como por su nombre, de forma parcial, sin importar mayúsculas, tildes, espacios repetidos ni el orden de las palabras. Así el usuario puede ubicar a un asociado sin conocer su documento exacto ni cómo quedó escrito su nombre.

## Referencias

- [SO-2281: Buscar asociados por documento y nombre en toda la aplicación](https://softwaresamm.atlassian.net/browse/SO-2281)

## Información de Versiones

### Versión de Lanzamiento

:::info **FEB V.0.15.0**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción                      |
| ---------- | -------------- | -------------------------------- |
| SAFE       | >= v0.15.0     | Plataforma SAFE (frontend y API) |

## Requisitos Previos

Antes de usar la funcionalidad, asegúrese de tener:

- La aplicación actualizada a la versión mínima indicada en la tabla anterior
- Un usuario autorizado para ingresar a la plataforma

## Configuración

### Paso 1: Actualizar la aplicación

Esta funcionalidad no requiere configuración ni cambios en la base de datos. Aplica a los siguientes buscadores:

| Pantalla                       | Buscador                                     |
| ------------------------------ | -------------------------------------------- |
| **Asociados > Listado**        | Buscador rápido y campo **Nombre** del filtro avanzado |
| **Cartera y Créditos > Créditos > Nuevo** | Campo **Asociado**                |
| **Cartera y Créditos > Créditos** | Buscador del listado (código del crédito, documento o nombre del asociado) |
| **Movimientos**                | Campo **Asociado** del formulario y del filtro avanzado |

:::tip Consejo
En los campos de selección de asociado, escriba al menos **3 caracteres** para iniciar la búsqueda. Se muestran hasta 20 resultados; si no aparece el asociado, escriba más del documento o del nombre.
:::

## Casos Especiales

:::note Comportamientos Predefinidos
La búsqueda encuentra el texto en cualquier parte del documento o del nombre ("contiene").
:::

| Caso                         | Ejemplo de búsqueda | Resultado                                                                  |
| ---------------------------- | ------------------- | -------------------------------------------------------------------------- |
| Documento parcial            | `1026250`           | Asociados cuyo documento contiene `1026250`                                |
| Nombre parcial               | `buitrago`          | Asociados cuyo nombre contiene `BUITRAGO`                                  |
| Varias palabras              | `juan osorio`       | Asociados cuyo nombre contiene **todas** las palabras, en cualquier orden (p. ej. `JUAN MANUEL BUITRAGO OSORIO`) |
| Tildes                       | `rocio` o `rocío`   | Encuentra el nombre con o sin tilde                                        |
| Espacios repetidos           | `salas fonseca`     | Encuentra `SALAS  FONSECA` aunque el nombre tenga doble espacio            |
| Menos de 3 caracteres        | `ju`                | En los campos de selección no se busca todavía                             |

## Resultado Esperado

Una vez actualizada la aplicación:

1. **Búsqueda por documento**: al escribir parte del número de documento se listan los asociados que lo contienen.
2. **Búsqueda por nombre**: al escribir una o varias palabras del nombre, sin importar tildes ni orden, se listan los asociados que las contienen.
3. **Comportamiento uniforme**: todos los buscadores de asociados de la aplicación funcionan igual.

## Resolución de Problemas

### No aparece el asociado buscado

Verifique que:

- Se hayan escrito al menos 3 caracteres en los campos de selección de asociado
- Todas las palabras escritas formen parte del nombre (una palabra que no esté en el nombre descarta al asociado)
- El asociado esté activo

### Aparecen demasiados resultados

Escriba más palabras del nombre o más dígitos del documento: los campos de selección muestran solo los primeros 20 resultados.
