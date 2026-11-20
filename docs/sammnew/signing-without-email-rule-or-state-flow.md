---
sidebar_position: 7
release_version: "Por definir"
release_module: "SAMM New"
---

# Firma de Requisiciones sin Regla de Correo ni Flujo de Estados

Este documento describe el comportamiento de la pantalla de firma de requisiciones (y de su enlace público de firma), en la que el botón **Guardar** ya no depende de que exista una regla de envío de correo ni un flujo de estados. Antes de esta corrección, al abrir la firma de una requisición el botón Guardar permanecía inactivo si no había una regla de envío de correo configurada y una transición de estado permitida para el rol del usuario, lo que impedía guardar la firma (por ejemplo, cuando se envía el enlace de firma al operario que recibe los elementos en campo). Ahora la firma siempre se puede guardar y el cambio de estado del documento solo ocurre cuando la configuración lo permite.

## Referencias

- [SO-486: Habilitar guardado de firma en requisición sin regla de correo ni flujo de estados](https://softwaresamm.atlassian.net/browse/SO-486)

## Información de Versiones

### Versión de Lanzamiento

:::info **Por definir**
La versión de lanzamiento se asigna al liberar el ticket SO-486.
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción        |
| ---------- | -------------- | ------------------ |
| SR         | Por definir    | Servicio / Reporte |

## Requisitos Previos

Antes de usar la firma, asegúrese de tener:

- La aplicación actualizada a la versión indicada en la tabla anterior
- Un perfil con acceso al reporte de la requisición y al botón de firma

:::note Nota
Para que se envíe un correo o cambie el estado al firmar sigue siendo necesaria la regla de envío de correo del caso **firmar** y un flujo de estados con la transición permitida para el rol. Ya no son requisitos para poder firmar.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

No requiere configuración adicional.

## Casos Especiales

:::note Comportamientos Predefinidos
El comportamiento aplica tanto a la firma desde la pantalla del reporte como a la firma desde el enlace público. También aplica a cotizaciones y órdenes de compra, que comparten la misma pantalla de firma.
:::

| Caso                                              | Configuración                                          | Descripción                                                                                  |
| ------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Sin regla de correo ni flujo de estados           | No existe regla de envío de correo del caso firmar     | El botón Guardar está habilitado; se guarda la firma y el estado del documento no cambia     |
| Regla de correo y flujo de estados válidos        | Existe la regla y la transición está permitida al rol  | Se guarda la firma y el documento cambia de estado, como antes                               |
| Regla de correo sin transición permitida al rol   | Existe la regla pero el flujo no permite la transición | Se guarda la firma; el estado no cambia y no se muestra error ni el mensaje de estado no permitido |

## Resultado Esperado

1. **Botón Guardar habilitado**: al abrir la firma de una requisición, el botón Guardar está activo sin importar la configuración de correo o de estados.
2. **Firma guardada**: la firma queda registrada para el documento, tanto desde la pantalla como desde el enlace público.
3. **Cambio de estado condicionado**: el documento solo cambia de estado si existe regla de correo y el flujo permite la transición para el rol.

## Resolución de Problemas

### El documento no cambió de estado después de firmar

Verifique que:

- Exista una regla de envío de correo del caso **firmar** para el subtipo de documento
- La regla tenga un estado destino configurado
- El flujo de estados permita esa transición para el rol del usuario

### La firma no se muestra en la pantalla

Confirme que:

- El documento no tenga ya una firma registrada, ya que en ese caso el control de firma se oculta
- El usuario tenga acceso al reporte desde su perfil
