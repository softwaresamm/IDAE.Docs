---
sidebar_position: 1
release_version: "4.5.1"
release_module: "URT"
---

# Mostrar Repuestos Planeados de la OT en el Utilitario de Reporte Técnico

Este documento describe cómo configurar el procedimiento `mob_repuestosSugeridos` para que el Utilitario de Reporte Técnico (URT) consulte y muestre los repuestos planeados de la Orden de Trabajo (OT), permitiendo al técnico contar con un punto de partida en su reporte. Antes de esta mejora, los repuestos se registraban manualmente uno por uno, sin considerar los ya planeados para la OT, lo que implicaba mayor esfuerzo y riesgo de omisiones.

## Referencias

- [SO-2178: Mostrar repuestos planeados de la OT en el utilitario de reporte técnico](https://softwaresamm.atlassian.net/jira/browse/SO-2178)

## Información de Versiones

### Versión de Lanzamiento

:::info **URT v4.5.1**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción            |
| ------------- | -------------- | ---------------------- |
| URT           | >= 4.5.1       | Utilitario de reporte técnico |
| SAMMAPI       | >= 1.2.35.1    | API principal          |
| SAMM LOGICA   | >= 5.6.28.0    | Lógica de negocio      |
| CAPADATOS     | >= 2.1.22.0    | Capa de acceso a datos |
| SAMCORE       | >= 2.0.30.0    | Core del sistema       |
| BASE DE DATOS | >= C2.1.22.0   | Base de datos          |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Todas las aplicaciones actualizadas a las versiones mínimas indicadas en la tabla anterior
- Acceso a la base de datos del cliente
- Permisos para crear o modificar procedimientos almacenados, según el caso
- Conocimientos básicos de SQL Server

:::important Importante
La base de datos debe estar en la versión `C2.1.22.0` o superior. Modificar el procedimiento `mob_repuestosSugeridos` cambia directamente lo que el técnico visualiza en el reporte; realice cualquier ajuste primero en un ambiente de pruebas.
:::

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
curl --location 'https://localhost.com/sa_api/api/docs/listarRepuestos/{idOT}' \
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

## Configuración

### Paso 1: Validar el procedimiento `mob_repuestosSugeridos`

Garantice que exista el procedimiento almacenado `mob_repuestosSugeridos`. Este recibe el id de la Orden de Trabajo (`@p_idOT`) y retorna los repuestos planeados del catálogo asociado, indicando la sección en la que deben precargarse (ejecutados, pendientes o ambas).

```sql title="Procedimiento mob_repuestosSugeridos"
CREATE PROCEDURE [dbo].[mob_repuestosSugeridos]
	@p_idOT int
AS
BEGIN
	select
		i.id_documento as id_documento
		,iif(i.id_bodega = 0, 1, i.id_bodega) as id_bodega -- bodega para repuestos ejecutados, este campo es requerido
		,i.id_CentroCosto -- centro de costo para repuestos ejecutados
		,1 as id_tipodocumento -- tipodocumento para los repuestos pendientes, este campo es requerido
		,1 as id_tipoPendiente -- tipopendiente para los repuestos pendientes
		,i.id_catalogo as id_catalogo
		,cantidadPlaneado as cantidad
		,itemDocumento as itemDocumento
		,1 as seccion -- 1 si se quiere que salga en los ejecutados, 2 si se quiere que salgan en los pendientes y 3 en ambos
	from
		doc_itemDocumento as i
		INNER JOIN cat_catalogo as c on c.id = i.id_catalogo and c.active = 1
		INNER JOIN cat_subtipocatalogo as sc on sc.id = c.id_subtipocatalogo and sc.active = 1
	where
		id_documento = @p_idOT
		AND sc.id_tipocatalogo = 2
END
```

:::note Nota
Los campos `id_bodega` e `id_tipodocumento` son obligatorios para que el registro se procese correctamente en sus respectivas secciones (ejecutados y pendientes).
:::

### Paso 2: Definir la sección de precarga

Según el comportamiento que requiera el cliente, modifique en el procedimiento el valor del campo `seccion`, que controla dónde se precargan los repuestos planeados.

```sql title="Línea del procedimiento que define la sección (ejemplo: ambas secciones)"
,3 as seccion
```

| Valor de `seccion` | Repuestos se precargan en        |
| ------------------ | -------------------------------- |
| `1`                | Repuestos ejecutados (instalados) |
| `2`                | Repuestos pendientes (sugeridos) |
| `3`                | Ambas secciones                  |

:::tip Consejo
Después de modificar el procedimiento, pruebe con una OT que tenga repuestos planeados y compare el resultado de `EXEC mob_repuestosSugeridos @p_idOT = [id de la OT]` con lo que muestra el URT.
:::

## Casos Especiales

:::note Comportamientos Predefinidos
El campo `seccion` y los campos obligatorios del procedimiento determinan cómo se procesan los repuestos precargados.
:::

| Caso                      | Campo/Valor        | Descripción                                                                  |
| ------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| Solo ejecutados           | `seccion = 1`      | Los repuestos se precargan únicamente en Repuestos ejecutados                |
| Solo pendientes           | `seccion = 2`      | Los repuestos se precargan únicamente en Repuestos pendientes (sugeridos)    |
| Ambas secciones           | `seccion = 3`      | Los repuestos se precargan en ejecutados y pendientes simultáneamente        |
| Sin precarga              | `seccion = 0`      | Aunque existan repuestos planeados, no se visualizan en ninguna sección      |
| Bodega sin definir        | `id_bodega = 0`    | Se reemplaza por la bodega `1`                                               |
| Campos obligatorios       | `id_bodega`, `id_tipodocumento` | Son requeridos para que el registro se procese en cada sección  |

## Resultado Esperado

Una vez completada la configuración:

1. **Repuestos planeados visibles**: El técnico visualiza en el URT el listado de repuestos planeados de la OT que está reportando, como base de partida en lugar de agregarlos uno por uno.
2. **Datos consistentes con la fuente**: La información mostrada se obtiene del procedimiento `mob_repuestosSugeridos` y coincide exactamente con su resultado para la misma OT.
3. **Precarga según configuración**: Los repuestos aparecen en las secciones definidas por el campo `seccion` (ejecutados, pendientes o ambas).
4. **Reporte generado sin errores**: Al generar el reporte, el documento muestra la remisión de salida de los repuestos instalados y los repuestos planeados en la sección de sugeridos.

## Resolución de Problemas

### Los repuestos planeados no aparecen en el utilitario

Verifique que:

- El procedimiento `mob_repuestosSugeridos` exista en la base de datos
- La base de datos esté en la versión `C2.1.22.0` o superior
- El valor de `seccion` no sea `0`
- La OT tenga repuestos planeados (`cantidadPlaneado`) en `doc_itemDocumento`

### El procedimiento no retorna registros para una OT con repuestos

Confirme que:

- Los repuestos pertenezcan a un catálogo activo (`cat_catalogo.active = 1`)
- El subtipo de catálogo esté activo (`cat_subtipocatalogo.active = 1`)
- El subtipo corresponda a `id_tipocatalogo = 2`
- El parámetro `@p_idOT` corresponda al id de la OT correcta

### Los repuestos aparecen en una sección distinta a la esperada

Revise que:

- El valor de `seccion` en el procedimiento sea el correcto (`1`, `2` o `3`)
- El procedimiento modificado se haya guardado en la base de datos correcta
- No exista otra versión del procedimiento en un esquema distinto a `dbo`

### El registro del repuesto no se procesa al generar el reporte

Revise que:

- El campo `id_bodega` retorne un valor válido (mayor a `0`)
- El campo `id_tipodocumento` esté presente en el resultado del procedimiento
- Los campos `id_tipoPendiente` e `id_CentroCosto` retornen valores válidos para la sección correspondiente

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Acceso y redirección al Reporte Técnico

**Precondiciones:** Usuario autorizado y programaciones disponibles.

| Paso | Acción                                                                                         | Resultado esperado                                                                                  |
| ---- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1    | Ingresar a la plataforma web con un usuario autorizado                                         | **El acceso se realiza correctamente**, sin errores de autenticación ni navegación                  |
| 2    | Abrir el formulario de Programación                                                            | El formulario carga y permite consultar las programaciones                                          |
| 3    | Seleccionar una programación no disponible                                                     | El sistema redirige al frontend de Reporte Técnico dinámico asociado a la programación              |
| 4    | Dejar la clave `urlTechnicalReport` sin valor y repetir el paso 3                              | El sistema redirige al Reporte Técnico dinámico según el comportamiento definido para esta ausencia |
| 5    | Configurar `urlTechnicalReport` con una dirección válida y repetir el paso 3                   | El sistema redirige de acuerdo con la configuración, sin errores                                    |
| 6    | Revisar las secciones del Reporte Técnico dinámico                                             | No se muestran las secciones Firmas, Archivos adjuntos, Repuestos sugeridos ni Repuestos ejecutados |

### Escenario 2: Visualización de repuestos según el valor de `seccion`

**Precondiciones:** OT con repuestos planeados y acceso para modificar `mob_repuestosSugeridos`.

| Paso | Configuración         | Resultado esperado                                                                                   |
| ---- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| 1    | `seccion = 0`         | **Los repuestos no se visualizan** en Repuestos sugeridos ni en Repuestos instalados                 |
| 2    | `seccion = 1`         | Los repuestos se visualizan en Repuestos instalados, pero no en Repuestos sugeridos                  |
| 3    | `seccion = 2`         | Los repuestos se visualizan en Repuestos sugeridos, pero no en Repuestos instalados                  |
| 4    | `seccion = 3`         | **Los repuestos se visualizan en ambas secciones**, sin omisiones                                    |
| 5    | `seccion = 0` con una programación sin repuestos planeados | Ninguna sección muestra repuestos y el reporte puede consultarse correctamente |

### Escenario 3: Generación del Reporte Técnico y consistencia de datos

**Precondiciones:** Programación con repuestos planeados y `seccion = 3`.

| Paso | Acción                                                                             | Resultado esperado                                                                                      |
| ---- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1    | Seleccionar la programación y generar el Reporte Técnico                           | El reporte se genera correctamente, sin errores que impidan completar la operación                      |
| 2    | En el documento generado, abrir la pestaña **Documentos**                          | Se muestra la remisión de salida asociada a los repuestos instalados                                    |
| 3    | En el documento generado, abrir la pestaña de Repuestos sugeridos                  | Se muestran los repuestos planeados asociados al reporte                                                |
| 4    | Comparar los repuestos del reporte con los del documento y con el resultado de `EXEC mob_repuestosSugeridos @p_idOT = [id de la OT]` | **La información coincide** con los registros asociados y con la configuración de `seccion` |