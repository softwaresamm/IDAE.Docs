---
sidebar_position: 1
release_version: "7.1.16.0"
release_module: "SAMM New"
---

# Permisos para Perfiles: Agregar Sugeridos con OT Cerrada

Este documento describe cómo configurar el permiso que habilita la adición de sugeridos en órdenes de trabajo finalizadas, permitiendo a los perfiles autorizados incorporar nuevos elementos en el tab de **Sugeridos** aun cuando la orden de trabajo se encuentre cerrada.

## Referencias

- [SO-2137: Habilitar permiso para adicionar sugeridos en órdenes de trabajo finalizadas](https://softwaresamm.atlassian.net/browse/SO-2137)

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

- Acceso al módulo de **Avanzado > Funcionalidad** en SAMM New
- Permisos de administración sobre perfiles y árbol de permisos
- Conocimiento de la estructura del árbol de permisos de Órdenes de Trabajo

:::important Importante
Anteriormente, al cerrar una orden de trabajo no era posible editar información del tab de **Sugeridos**. Este permiso habilita explícitamente dicha excepción, por lo que debe asignarse únicamente a los perfiles que realmente requieran esta autorización.
:::

En caso de tener dudas consultar el siguiente video https://youtu.be/siEdpBNkspA

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Validar que la funcionalidad exista

Revisar en **Avanzado > Funcionalidad** que exista el permiso creado con el nombre `Agregar sugeridos con OT cerrada`.

:::warning Precaución
Si el permiso no se encuentra creado, revise la ejecución de los scripts de actualización correspondientes a esta versión. En caso de no existir, deberá crearse manualmente.
:::

### Paso 2: Asignar el permiso

Asigne el permiso a los perfiles que deban tener la autorización para agregar sugeridos con la orden de trabajo cerrada. Diríjase al perfil correspondiente y navegue por el árbol de permisos siguiendo la siguiente ruta:

`Ordenes de trabajo (Formulario)` → `Todas las Ots (Formulario)` → `Sugeridos (Tab)` → `Agregar sugeridos con OT cerrada (Acción)`

:::tip Consejo
Habilite este permiso únicamente en los perfiles que deban gestionar sugeridos posteriores al cierre de la orden de trabajo, evitando así asignaciones innecesarias que puedan generar inconsistencias en el control de cierre de OTs.
:::

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Permiso disponible**: El permiso `Agregar sugeridos con OT cerrada` aparece en el árbol de permisos dentro de la ruta `Ordenes de trabajo > Todas las Ots > Sugeridos`.
2. **Adición habilitada**: Los perfiles con el permiso asignado pueden agregar nuevos elementos en el tab de **Sugeridos**, incluso con la orden de trabajo cerrada.
3. **Restricción para perfiles sin permiso**: Los perfiles que no tengan el permiso asignado mantienen el comportamiento anterior, sin poder editar el tab de **Sugeridos** en órdenes de trabajo cerradas.

## Resolución de Problemas

### El permiso no aparece en el árbol de permisos

Verifique que:

- La versión de SAMM New instalada sea igual o superior a `7.1.16.0`
- Se hayan ejecutado correctamente los scripts de actualización de esta versión
- El permiso `Agregar sugeridos con OT cerrada` haya sido creado manualmente en caso de no existir tras la actualización

### El perfil no puede agregar sugeridos con la OT cerrada

Confirme que:

- El permiso `Agregar sugeridos con OT cerrada` esté asignado explícitamente al perfil del usuario
- La ruta de permisos seguida sea la correcta: `Ordenes de trabajo (Formulario) > Todas las Ots (Formulario) > Sugeridos (Tab) > Agregar sugeridos con OT cerrada (Acción)`
- El usuario haya cerrado sesión e ingresado nuevamente después de la asignación del permiso, si la aplicación lo requiere para refrescar permisos

### Otros perfiles sin el permiso también pueden editar sugeridos

Revise que:

- El permiso no haya sido asignado accidentalmente a un perfil o rol general que agrupe a más usuarios de los previstos
- No existan permisos heredados desde un perfil padre que otorguen esta autorización de forma no intencionada

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Perfil con permiso asignado

1. Asignar el permiso `Agregar sugeridos con OT cerrada` a un perfil de prueba.
2. Cerrar una orden de trabajo y acceder al tab de **Sugeridos**.
3. Intentar agregar un nuevo sugerido.
4. **Resultado esperado**: El sistema permite agregar el sugerido correctamente a pesar de que la orden de trabajo esté cerrada.

### Escenario 2: Perfil sin permiso asignado

1. Utilizar un perfil de prueba que no tenga asignado el permiso `Agregar sugeridos con OT cerrada`.
2. Cerrar una orden de trabajo y acceder al tab de **Sugeridos**.
3. Intentar agregar un nuevo sugerido.
4. **Resultado esperado**: El sistema no permite la edición del tab de **Sugeridos**, manteniendo el comportamiento previo a esta funcionalidad.