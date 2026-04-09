---
sidebar_position: 1
---

# Configuración de Checklist Condicional para Tipos de Reporte

Este documento describe cómo configurar la funcionalidad de checklist condicional asociado al botón de operación, permitiendo la generación de diferentes tipos de reporte (como preoperacional, movimiento, entre otros) según la configuración definida en el modelo. Esta funcionalidad permite estandarizar la captura de información y automatizar la creación de reportes operativos.

---

## Referencias

- [SO-567: Implementación de checklist condicional en botón de operación](https://softwaresamm.atlassian.net/browse/SO-567)

---

## Información de Versiones

### Versión de Lanzamiento

:::info **APP v 2.3.0.1**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción       |
| ------------- | -------------- | ----------------- |
| SAMMAPI       | >= 1.2.22.0    | API principal     |
| SAMM LOGICA   | >= 5.6.24.2    | Lógica de negocio |
| SAMM CORE     | >= 2.0.19.3    | Core del sistema  |
| BASE DE DATOS | >= C2.1.10.0   | Base de datos     |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Acceso al módulo de configuración de modelos
- Permisos para parametrización de checklist
- Creacion de lista de chequeo condicional
- en la tabla _columnas que sea la tabla equ_equipo se debe desactivar mostrarenAPI

```
update _columnas
set mostrarEnAPI = 0
where tabla = 'equ_equipo'
and columna  not in ( 'horometroActual','equipo')
```

- en la tabla _columnas se debe desactivar requeridos
```
update _columnas
set requerido = 0
where tabla = 'equ_equipo'
and columna not in ('horometroActual')

- en la tabla _columnas que sea la tabla dis_evento se debe desactivar mostrarenAPI
```
update _columnas
set mostrarEnAPI = 0
where tabla = 'dis_evento'
```
update _columnas
set requerido = 0
where tabla = 'dis_evento'

```

:::important
La funcionalidad depende de una correcta configuración del modelo y del checklist asociado. Si no se configura adecuadamente, el comportamiento del botón de operación no ejecutará el flujo esperado.
:::

---

## Configuración

### Paso 1: Configuración del Modelo

En este paso se define el modelo sobre el cual se aplicará el checklist condicional.

#### Configuración requerida

- Asociar la lista de chequeo al modelo correspondiente
- Definir si el modelo tendrá checklist condicional
- Confirmar la creacion del procedimiento Almacenado mob_plantillasListaChequeoXEquipo
- Confirmar la creacion del procedimiento almacenado v_checklistTodas

:::tip Consejo
Se recomienda crear una lista de chequeo con opciones condicionales y sus atributos para diligenciar la información,se recomienda ajustar el SP mob_plantillasListaChequeoXEquipo para que solo retorne la lista de chequeo requerida
:::

#### Comportamiento esperado

-Se debe ingresar al menú Gestion de equipos y buscar el equipo requerido posterior a eso se debe visualizar de manera correcta el botón operación:

  - Al hacer clic en el botón de operación:
  - Se valida si el modelo tiene checklist configurado
  - El flujo debe trabajar de manera corecta
  - Se genera el tipo de reporte asociado
  - En la plataforma se visualizara la información en el botón produccion del equipo

![Información diligenciada en Produccion](./img/equipo_produccion.png)

  - Información ya diligenciada

![Datos dentro del checklist](./img/data.png)


---

## Resolución de Problemas

### El checklist no se ejecuta

Verifique que:

- El modelo tenga configurado un checklist
- La condición esté correctamente definida
- El procedimiento se encuentre creado

:::tip Consejo
Al momento de reportar el evento se tomara las coordenadas del dispositivo y la información se visualizara en el menú eventos campo evento codigo
:::

![Información diligenciada en Produccion](./img/menu_evento.png)
