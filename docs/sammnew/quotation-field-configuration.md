---
sidebar_position: 1
release_version: "7.1.19.1"
release_module: "Samm New"
---

# Parametrización de Campos de Cotización

Este documento describe cómo configurar la parametrización de información para el formulario de **Cotizaciones**. Esta funcionalidad permite personalizar qué campos clave (como Prioridad, Contacto, Cargo, Teléfono, Email, etc.) se deben solicitar, resolviendo la necesidad de adaptar el formulario a los procesos específicos del negocio de la misma manera que se hace actualmente con otros módulos (Solicitudes, Órdenes de Trabajo, y Órdenes de Compra).

## Referencias

- [SO-648: Extender la funcionalidad de Parametrizar información al módulo de cotizaciones, permitiendo configurar la visualización de campos clave para mejorar la personalización del formulario.](https://softwaresamm.atlassian.net/browse/SO-648)

## Información de Versiones

### Versión de Lanzamiento

:::info **v7.1.19.1**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción            |
| ------------- | -------------- | ---------------------- |
| SAMM LOGICA   | >= 5.6.28.0    | Lógica de negocio      |
| CAPA DATOS    | >= 2.1.19.2    | Capa de acceso a datos |
| BASE DE DATOS | >= C2.1.19.2   | Base de datos          |
| SAM CORE      | >= 2.0.28.2    | Core del sistema       |
| SAMMAPI       | >= 1.2.34.2    | API principal          |

## Requisitos Previos

No aplica para esta funcionalidad.

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Habilitar campos en parámetros generales

Debe dirigirse a la sección de parámetros generales del sistema para habilitar o deshabilitar los campos específicos que se visualizarán en el formulario principal de cotizaciones.

1. En el menú principal de Samm, navegue a **Configuración** > **Aplicación** > **Parámetros generales**.
2. Seleccione la pestaña superior de **Parametrización de información**.
3. Desplácese hasta localizar la nueva sección llamada **Campos Cotización**.
4. Configure los campos deseados marcando o desmarcando las casillas según la necesidad operativa. Los campos disponibles son: `Prioridad`, `Contacto`, `Cargo`, `Teléfono`, `email`, `Usuario Asignado`, `Codigo`, `Contactos` y `F.Sugerida`.

:::tip Consejo
Asegúrese de guardar los cambios en la pantalla de parámetros generales después de modificar las casillas de verificación para que la configuración se refleje correctamente en los formularios de los usuarios.
:::

![Sección Campos Cotización](./img/seccion_cot.png)

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Visualización de sección**: La sección "Campos Cotización" debe estar visible dentro de la pestaña de Parametrización de información.
2. **Disponibilidad de campos**: Deben estar disponibles para configurar exactamente los 9 campos listados: `Prioridad`, `Contacto`, `Cargo`, `Teléfono`, `email`, `Usuario Asignado`, `Codigo`, `Contactos` y `F.Sugerida`.
3. **Formulario dinámico**: Al ingresar al formulario de creación o edición de Cotizaciones, **solo se deben visualizar** y solicitar los campos que hayan sido habilitados desde la parametrización previa.

## Resolución de Problemas

### La sección "Campos Cotización" no aparece

Verifique que:

- Las versiones de todos los componentes (especialmente la base de datos `>= C2.1.19.2` y SAMMAPI `>= 1.2.34.2`) estén actualizadas correctamente en el ambiente.
- Se haya refrescado la caché del navegador pulsando `Ctrl + F5` o vaciando los datos de navegación.

### Los cambios no se reflejan en el formulario de Cotizaciones

Confirme que:

- Guardó correctamente los cambios en la pantalla de **Parámetros generales** antes de salir.
- El usuario está recargando el formulario de cotización tras el cambio de parámetros.
- Se está validando sobre el formulario dinámico correcto de la cotización y no en vistas estáticas de solo lectura.

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Habilitar nuevos campos en la cotización

1. Ingresar a **Configuración** > **Aplicación** > **Parámetros generales** > **Parametrización de información**.
2. En la sección **Campos Cotización**, marcar las casillas de `Prioridad`, `Cargo` y `F.Sugerida`.
3. Guardar los cambios de la parametrización.
4. Navegar al módulo de Cotizaciones y abrir el formulario para crear una nueva cotización.
5. **Resultado esperado:** Los campos `Prioridad`, `Cargo` y `F.Sugerida` deben estar visibles y permitir la entrada de datos en el formulario.

### Escenario 2: Ocultar campos en el formulario de cotización

1. Ingresar nuevamente a la sección de **Campos Cotización** en los parámetros generales.
2. Desmarcar explícitamente las casillas de `Teléfono`, `email` y `Usuario Asignado`.
3. Guardar los cambios.
4. Navegar al formulario de creación/edición de cotizaciones.
5. **Resultado esperado:** Los campos `Teléfono`, `email` y `Usuario Asignado` deben ocultarse y dejar de ser solicitados dentro de la interfaz del formulario.