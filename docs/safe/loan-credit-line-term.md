---
sidebar_position: 6
release_version: "0.15.0"
release_module: "SAFE"
---

# Línea de Crédito según el Plazo del Crédito

Este documento describe cómo se eligen las líneas de crédito (tarifas) al crear un crédito en SAFE. Cada línea de crédito tiene una tasa pensada para un plazo; por eso, al crear el crédito solo se ofrecen las líneas cuyo **plazo máximo es igual** al plazo del crédito, y no las de un plazo mayor.

## Referencias

- [SO-2283: Mostrar en el nuevo crédito solo líneas con plazo máximo igual al plazo](https://softwaresamm.atlassian.net/browse/SO-2283)
- Diccionario de datos: [`cre.creditLine`](./database/cre/credit-line.md)

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
- Líneas de crédito configuradas en **Preferencias > Catálogos de Créditos > Línea de Crédito**, con su plazo máximo

## Configuración

### Paso 1: Actualizar la aplicación

Esta funcionalidad no requiere cambios en la base de datos. Despliegue el backend y el frontend juntos.

### Paso 2: Crear el crédito

1. Ingrese a **Cartera y Créditos > Créditos > Nuevo**.
2. Seleccione el tipo de pago y escriba el **plazo** en meses.
3. En **Línea de crédito** aparecen solo las líneas del tipo de pago cuyo plazo máximo es igual al plazo escrito.
4. Si cambia el plazo, la lista se actualiza y la línea elegida se borra cuando ya no corresponde; elija de nuevo la línea.

:::warning Validación al proyectar y crear
**Proyectar cuotas** y la creación del crédito validan la misma regla. Si el plazo no coincide con el plazo máximo de la línea, se muestra: *"El plazo de 60 meses no corresponde a la línea de crédito '12013AG': su plazo máximo es de 120 meses y debe ser igual al plazo del crédito"* (ejemplo).
:::

## Casos Especiales

:::note Comportamientos Predefinidos
El sistema anterior (VB6) aceptaba líneas con plazo máximo mayor o igual al plazo. Los créditos ya creados no se revalidan; la regla aplica a la proyección y creación de créditos nuevos.
:::

| Caso                                   | Resultado                                                        |
| -------------------------------------- | ---------------------------------------------------------------- |
| Aún no se ha escrito el plazo          | Se listan todas las líneas del tipo de pago                      |
| Ninguna línea tiene ese plazo máximo   | La lista de líneas queda vacía                                   |
| Plazo cambiado después de elegir línea | La línea se borra si su plazo máximo ya no es igual al plazo     |

## Resultado Esperado

Una vez actualizada la aplicación:

1. **Tarifa correcta**: el crédito solo puede crearse con una línea cuyo plazo máximo es igual a su plazo.
2. **Lista coherente**: la lista de líneas siempre corresponde al plazo escrito.

## Resolución de Problemas

### No aparece ninguna línea de crédito

Verifique que:

- Exista una línea activa del tipo de pago con **plazo máximo** igual al plazo escrito
- El plazo esté en meses y corresponda a una tarifa configurada (por ejemplo 12, 36, 60, 84 o 120)
