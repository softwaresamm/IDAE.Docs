---
sidebar_position: 10
release_version: "0.15.0"
release_module: "SAFE"
---

# Filtros y Valores en Moneda de los Catálogos de Preferencias

Este documento describe cómo filtrar los listados de catálogos de **Preferencias** y cómo se muestran y digitan los valores en dinero de esos catálogos. Los filtros encuentran registros por cualquiera de las columnas del listado, y los campos de dinero usan el mismo formato de moneda que el resto de la aplicación.

## Referencias

- [SO-2288: Corregir el formato de moneda y los filtros de los catálogos de Preferencias](https://softwaresamm.atlassian.net/browse/SO-2288)
- Guías relacionadas: [Catálogo de Tipos de Documento](./document-type-catalog.md), [Línea de Crédito según el Plazo del Crédito](./loan-credit-line-term.md)

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
- Un usuario autorizado para ingresar a **Preferencias**

## Configuración

### Paso 1: Actualizar la aplicación

Esta funcionalidad no requiere configuración ni cambios en la base de datos ni en la API.

### Paso 2: Filtrar un listado de catálogo

1. Ingrese a **Preferencias** y abra el catálogo (por ejemplo, **Catálogos de Créditos > Línea de Crédito**).
2. Haga clic en **Filtrar**, escriba el texto a buscar y aplique el filtro.
3. El listado muestra los registros en los que **cada palabra** escrita aparece en alguna de las columnas visibles, sin importar mayúsculas ni tildes.

| Ejemplo (Línea de Crédito) | Resultado                                                         |
| -------------------------- | ----------------------------------------------------------------- |
| `9012cf`                   | La línea con ese código                                           |
| `anticipados`              | Las líneas cuyo tipo de tasa contiene "anticipados"               |
| `cuota 3 meses`            | Las líneas que contienen las tres palabras, en cualquier columna  |

:::tip Consejo
El filtro también busca en los nombres de catálogos relacionados (por ejemplo, el tipo de tasa de una línea de crédito), en los valores **Sí**/**No** y en los valores en moneda tal como se muestran (por ejemplo `65.000`).
:::

### Paso 3: Digitar valores en moneda

Los siguientes campos usan el formato de moneda de la aplicación (pesos colombianos, sin decimales):

| Catálogo            | Campos                                        |
| ------------------- | --------------------------------------------- |
| Otros descuentos    | **Valor**                                     |
| Descuento importado | **Valor**                                     |
| Línea de Crédito    | **Monto máximo a solicitar**, **Valor de las cesantías** |

- En el listado y en el detalle se muestran como `$ 65.000`.
- En el formulario se muestran con separador de miles; al editar el campo solo se aceptan dígitos.
- Tasas, plazos, porcentajes y días se mantienen como números sin formato de moneda.

## Casos Especiales

| Caso                                              | Resultado                                                          |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| Se escribe en el filtro y se cierra sin aplicar   | Al reabrir, se muestra el filtro aplicado, no el texto sin aplicar |
| Campo de moneda sin valor en la base de datos     | El formulario lo muestra vacío (no en 0)                           |

## Resultado Esperado

Una vez actualizada la aplicación:

1. **Filtros funcionales**: todos los listados de Preferencias filtran por cualquier columna visible.
2. **Moneda consistente**: los valores en dinero de los catálogos se ven y se digitan igual que en el resto de SAFE.

## Resolución de Problemas

### El filtro no encuentra un registro

Verifique que todas las palabras escritas aparezcan en alguna columna visible del listado; una palabra que no esté en ninguna columna descarta el registro.
