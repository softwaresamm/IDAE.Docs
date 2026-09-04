---
sidebar_position: 1
release_version: "2.3.5.3"
release_module: "APP"
---

# Repuestos Planeados (Ejecutados y Sugeridos) — Precarga desde Orden de Trabajo

Este documento describe cómo configurar el procedimiento `mob_repuestosSugeridos` para precargar automáticamente en la **APP** los repuestos planeados de una Orden de Trabajo, ya sea en la sección de **repuestos ejecutados** o en la de **repuestos pendientes (sugeridos)**. Anteriormente, al programar la orden, era necesario actualizar la bandeja dos veces para que los repuestos asignados quedaran registrados; con esta configuración el procedimiento entrega directamente los repuestos planeados a la sección correspondiente.

## Referencias

- [SO-467: SOL - 31135 | Al programar la orden, se requiere actualizar dos veces la bandeja para registrar repuestos asignados](https://softwaresamm.atlassian.net/browse/SO-467)

## Información de Versiones

### Versión de Lanzamiento

:::info **v2.3.5.3**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción |
| --- | --- | --- |
| APP | >= 2.3.5.3 | Aplicación móvil |
| SAMMNEW | >= 7.1.16.1 | Aplicación web (SAMM New) |
| SAMMAPI | >= 1.2.32.1 | API principal |
| SAMM LOGICA | >= 5.6.26.5 | Lógica de negocio |
| SAMM CORE | >= 2.0.26.1 | Core del sistema |
| CAPA DATOS | >= 2.1.17.1 | Capa de acceso a datos |
| BASE DE DATOS | >= C2.1.17.1 | Base de datos |

## Requisitos Previos

No aplica para esta funcionalidad.

## Información del Servicio

:::note Información
Servicio que consulta el procedimiento `mob_repuestosSugeridos` y retorna los repuestos planeados de una Orden de Trabajo, indicando en qué sección de la APP deben precargarse.
:::

### Parámetros del Servicio

| Parámetro | Valor | Descripción |
| --- | --- | --- |
| `Idot` | int (path param) | Id de la Orden de Trabajo sobre la cual se consultan los repuestos planeados |
| Autenticación | Bearer Token | El servicio requiere token de autenticación tipo Bearer |

### Request

```bash title="Ejemplo de petición"
curl --location 'https://dev.softwaresamm.com/sa_api/api/docs/listarRepuestos/71' \
--Authorization  'Bearer TOKEN'
```

### Response

```json title="Ejemplo de respuesta"
[
    {
        "id_documento": 71,
        "id_bodega": 1,
        "id_CentroCosto": 0,
        "id_tipodocumento": 1,
        "id_tipoPendiente": 1,
        "id_catalogo": 6,
        "cantidad": 1.0,
        "itemDocumento": "Repuesto Daniel F",
        "seccion": 1
    },
    {
        "id_documento": 71,
        "id_bodega": 1,
        "id_CentroCosto": 0,
        "id_tipodocumento": 1,
        "id_tipoPendiente": 1,
        "id_catalogo": 97,
        "cantidad": 1.0,
        "itemDocumento": "BATERIA",
        "seccion": 1
    }
]
```

:::tip Consejo
El campo `seccion` en la respuesta determina dónde se precarga cada repuesto en la APP: `1` ejecutados, `2` pendientes, `3` ambas.
:::

## Configuración

### Paso 1: Validación del procedimiento `mob_repuestosSugeridos`

Se debe garantizar la existencia del procedimiento almacenado `mob_repuestosSugeridos`, el cual recibe el `id` de la Orden de Trabajo (`@p_idOT`) y retorna los repuestos planeados del catálogo asociado, indicando la sección en la que deben precargarse (ejecutados, pendientes, o ambas).

```sql title="mob_repuestosSugeridos"
CREATE PROCEDURE [dbo].[mob_repuestosSugeridos]
	@p_idOT int
AS
BEGIN
	select
		i.id_documento as id_documento
		,iif(i.id_bodega = 0, 1, i.id_bodega) as id_bodega -- bodega para repuestos ejecutados, este campo es requerido
		,i.id_CentroCosto -- centro de costo para repuestos ejecutados
		,1 as id_tipodocumento -- tipodocumento para los repuestos pendientes, este campo es requerido
		,1 as id_tipoPendiente ---- tipopendiente para los repuestos pendientes
		,i.id_catalogo as id_catalogo
		,cantidadPlaneado as cantidad
		,itemDocumento as itemDocumento
		,1 as seccion --- 1 si se quiere que salga en los ejecutados, 2 si se quiere que salgan en los pendientes y 3 en ambos
	from
		doc_itemDocumento as i
		INNER JOIN cat_catalogo as c on c.id = i.id_catalogo and c.active = 1
		INNER JOIN cat_subtipocatalogo as sc on sc.id = c.id_subtipocatalogo and sc.active = 1
	where
		id_documento = @p_idOT
		AND sc.id_tipocatalogo = 2
END
```

:::note
El campo `seccion` controla dónde se precargan los repuestos: `1` para repuestos ejecutados, `2` para repuestos pendientes (sugeridos) y `3` para ambas secciones simultáneamente.
:::

:::important Importante
Los campos `id_bodega` e `id_tipodocumento` son obligatorios para que el registro se procese correctamente en sus respectivas secciones (ejecutados y pendientes).
:::

### Paso 2: Visualización en la APP

Una vez configurado el procedimiento, al ingresar a la Orden de Trabajo desde la APP, el servicio `listarRepuestos/{Idot}` consulta el procedimiento y los repuestos planeados aparecerán precargados automáticamente en la sección de **repuestos pendientes** o **repuestos ejecutados**, según el valor configurado en el campo `seccion`.

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Precarga automática de repuestos**: al abrir la Orden de Trabajo en la APP, los repuestos planeados se cargan automáticamente en la sección configurada (ejecutados, pendientes, o ambas), sin requerir actualizar la bandeja más de una vez.
2. **Consistencia con el catálogo planeado**: la cantidad precargada corresponde a `cantidadPlaneado` según lo definido en el `doc_itemDocumento` de la Orden de Trabajo.
3. **Eliminación de la doble actualización**: se resuelve el comportamiento previo en el que era necesario actualizar la bandeja dos veces para registrar los repuestos asignados.

## Resolución de Problemas

### No se precargan los repuestos en la APP

Verifique que:

- El procedimiento `mob_repuestosSugeridos` exista y esté actualizado en la base de datos
- El `id` de la Orden de Trabajo enviado (`@p_idOT` / `Idot`) corresponda a una orden con ítems planeados en `doc_itemDocumento`
- El catálogo asociado tenga `id_tipocatalogo = 2` y se encuentre activo
- Generar una nueva programacion.

### El servicio `listarRepuestos` retorna error de autenticación

Confirme que:

- El Bearer Token enviado en el header `Authorization` sea válido y no haya expirado

### Los repuestos aparecen en la sección incorrecta

Confirme que:

- El valor del campo `seccion` en el procedimiento corresponda a la sección deseada (`1` ejecutados, `2` pendientes, `3` ambas)

### Faltan repuestos esperados en la precarga

Revise que:

- El catálogo (`cat_catalogo`) y el subtipo de catálogo (`cat_subtipocatalogo`) asociados a cada ítem estén marcados como `active = 1`
- El ítem correspondiente en `doc_itemDocumento` tenga definida la `cantidadPlaneado`

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

:::tip Consejo
Verificar cada escenario tanto en la sección de repuestos ejecutados como en la de pendientes, según el valor de `seccion` configurado, y validar la respuesta del servicio `listarRepuestos`.
:::

**Escenario 1 — Precarga en repuestos ejecutados**

1. Configurar `seccion = 1` en `mob_repuestosSugeridos`.
2. Abrir en la APP una Orden de Trabajo con ítems planeados en `doc_itemDocumento`.
3. **Resultado esperado:** los repuestos planeados aparecen precargados en la sección de repuestos ejecutados, sin necesidad de actualizar la bandeja más de una vez.

**Escenario 2 — Precarga en repuestos pendientes (sugeridos)**

1. Configurar `seccion = 2` en `mob_repuestosSugeridos`.
2. Abrir en la APP la misma Orden de Trabajo.
3. **Resultado esperado:** los repuestos planeados aparecen precargados en la sección de repuestos pendientes.

**Escenario 3 — Consulta directa del servicio `listarRepuestos`**

1. Realizar una petición `GET` a `https://dev.softwaresamm.com/sa_api/api/docs/listarRepuestos/{Idot}` con un Bearer Token válido.
2. **Resultado esperado:** el servicio retorna un arreglo JSON con los repuestos planeados de la Orden de Trabajo, incluyendo el campo `seccion` para cada uno.

**Escenario 4 — Orden de Trabajo sin ítems planeados**

1. Abrir en la APP una Orden de Trabajo que no tenga ítems registrados en `doc_itemDocumento`.
2. **Resultado esperado:** no se precarga ningún repuesto en ninguna de las secciones, y el servicio retorna un arreglo vacío.