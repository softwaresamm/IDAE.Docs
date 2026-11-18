---
sidebar_position: 7
release_version: "7.1.26.0"
release_module: "SAMM New"
---

# Carga de Festivos por País

Este documento describe cómo cargar los días festivos de un país en la pantalla **Configuración > Aplicación > Festivos**, para que aparezcan en el calendario de programaciones y sean tenidos en cuenta por la programación, los cronogramas y los contratos.

## Referencias

- [SO-484: SOL-23982 | SAMM NEW: no se están cargando los festivos de otros países](https://softwaresamm.atlassian.net/browse/SO-484)

## Información de Versiones

### Versión de Lanzamiento

:::info **v7.1.26.0 (provisional)**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción              |
| ---------- | -------------- | ------------------------ |
| SAMMNEW    | >= 7.1.26.0    | Aplicación web principal |

:::important Importante
La versión de lanzamiento es provisional hasta que se confirme el release que incluye SO-484.
:::

## Requisitos Previos

Antes de iniciar, asegúrese de tener:

- Acceso a la pantalla **Configuración > Aplicación > Festivos**
- Los archivos de festivos desplegados con la aplicación en `plantillas/festivos`

## Configuración

### Paso 1: Seleccionar el país

En la pantalla de festivos, abra la lista de países y elija uno. La lista se arma con los archivos `.hol` de la carpeta `plantillas/festivos`.

| Opción                  | Contenido                         |
| ----------------------- | --------------------------------- |
| `Chile2019-2035`        | Festivos de Chile                 |
| `Colombia2019-2035`     | Festivos de Colombia              |
| `Ecuador2019-2035`      | Festivos de Ecuador               |
| `Panamá2019-2035`       | Festivos de Panamá                |
| `Perú2019-2035`         | Festivos de Perú                  |
| `Domingos2019-2035`     | Todos los domingos del periodo    |

:::note Información
Seleccionar el país no carga nada por sí solo; la carga se hace en el paso siguiente.
:::

### Paso 2: Cargar los festivos

Pulse **Aceptar**. El sistema lee el archivo del país seleccionado y, por cada fecha:

1. Si la fecha **no existe** en la tabla `gen_diaFestivo`, la inserta.
2. Si la fecha **ya existe**, actualiza el nombre y la reactiva.

Al terminar muestra un mensaje con el resumen: festivos agregados, actualizados y con error. Si hubo errores, el mensaje incluye el primero.

```text title="Ejemplo de mensaje al terminar"
Festivos agregados: 313. Actualizados: 0. Con error: 0.
```

:::tip Consejo
Puede volver a cargar el mismo país sin riesgo: los festivos existentes se actualizan y no se duplican.
:::

### Paso 3: Ajustar fechas

Una vez cargados, los festivos se pueden ajustar desde el calendario de la misma pantalla (agregar, editar el motivo o quitar una fecha). Esos cambios no modifican los archivos de origen.

## Casos Especiales

:::note Comportamientos Predefinidos
Los archivos cubren el periodo 2019–2035 y se generaron a partir de Nager.Date (fuente: `date.nager.at`), salvo `Domingos`, que se calculó.
:::

| Caso                         | Detalle                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| Colombia, 13 de julio        | Incluye "Día de la Virgen de Chiquinquirá" desde 2026, festivo nuevo.                            |
| Varios países cargados       | `gen_diaFestivo` no tiene columna de país: los festivos de todos los países comparten la tabla.  |
| Festivos que se corren       | Las fechas de años lejanos de los festivos móviles son proyecciones y pueden cambiar por ley.    |

La estructura de la tabla está en el [diccionario de datos de `gen_diaFestivo`](./database/general/gen_diaFestivo.md).

## Resultado Esperado

Una vez cargado el país:

1. **Festivos registrados**: las fechas quedan activas en `gen_diaFestivo`.
2. **Resumen de carga**: el sistema informa agregados, actualizados y errores.
3. **Calendario**: los días festivos se marcan en el calendario de la pantalla y en el calendario de programaciones.
4. **Nombres correctos**: los nombres conservan tildes y la letra ñ.

## Resolución de Problemas

### No aparece el país en la lista

Verifique que:

- El archivo `.hol` del país exista en `plantillas/festivos` del sitio desplegado
- El archivo tenga la extensión `.hol`

### El mensaje reporta errores

Revise que:

- Cada línea del archivo tenga el formato `Nombre,yyyy/MM/dd`
- La conexión con la base de datos esté disponible

### Los festivos no se ven en el calendario de programaciones

Confirme que:

- El año consultado está dentro del periodo cargado (2019–2035)
- Las fechas quedaron activas en `gen_diaFestivo`
