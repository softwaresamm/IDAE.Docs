---
sidebar_position: 1
release_version: "7.1.16.0"
release_module: "SAMM New"
---

# Firma en SOL — Replicar Firma Adjunta en la Solicitud

Este documento describe cómo configurar la funcionalidad de **Firma en SOL** para que, mediante un cambio de estado, una Solicitud quede marcada como firmada utilizando el archivo adjunto `firma.png`, permitiendo replicar el comportamiento de una firma manual sin necesidad de ejecutarla directamente en el documento. Anteriormente era obligatorio firmar la Solicitud de forma manual para que el registro apareciera en la tabla `gen_firma`; con esta configuración basta con adjuntar la firma como archivo para que el sistema la asocie automáticamente al documento.

## Referencias

- [SO-2094: Replicar firma adjunta en la solicitud](https://softwaresamm.atlassian.net/browse/SO-2094)

## Información de Versiones

### Versión de Lanzamiento

:::info **v7.1.16.0**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción |
| --- | --- | --- |
| SAMMNEW | >= 7.1.16.0 | Aplicación web (SAMM New) |
| SAMMAPI | >= 1.2.32.0 | API principal |
| SAMM LOGICA | >= 5.6.26.5 | Lógica de negocio |
| SAMM CORE | >= 2.0.26.0 | Core del sistema |
| CAPA DATOS | >= 2.1.17.0 | Capa de acceso a datos |
| BASE DE DATOS | >= C2.1.17.0 | Base de datos |

## Requisitos Previos

No aplica para esta funcionalidad.

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Validación de `web.config`

En el archivo `web.config` del sitio **SN** se debe garantizar la existencia de la siguiente key, la cual habilita el reconocimiento del estado como disparador del proceso de firma.

```xml title="web.config"
<add key="imgAsSign" value="doc_documento_solicitud-FIR" />
```

### Paso 2: Crear estado con código `FIR` en la Solicitud

Se debe crear un **estado** cuyo código sea `FIR` en el tipo de documento **Solicitud**. Este código le indica al sistema que, al llegar a ese estado, debe ejecutarse el proceso de inserción del registro en la tabla `gen_firma`.

:::important Importante
El código del estado debe ser exactamente `FIR`. Si el código difiere, el sistema no ejecutará el proceso de inserción en `gen_firma`.
:::

### Paso 3: Garantizar el flujo de estados

Una vez creado el estado `FIR`, se debe configurar el **flujo de estados** correspondiente para el momento en que se desea que la firma quede registrada en `gen_firma`.

:::tip Consejo
Este paso debe repetirse por cada **subtipo** de Solicitud existente en el que se desee habilitar este comportamiento; el flujo no se hereda automáticamente entre subtipos.
:::

### Paso 4: Adjuntar la firma en la Solicitud

Para cada documento **Solicitud** en el que se quiera aplicar este comportamiento, es necesario adjuntar el archivo de firma con el nombre exacto `firma.png`.

:::warning
El nombre del archivo adjunto debe ser exactamente `firma.png`. Un nombre distinto impedirá que el sistema lo reconozca como la firma a replicar.
:::

### Paso 5: Realizar el cambio de estado

Con toda la configuración anterior completa, se procede a realizar el **cambio de estado** de la Solicitud al estado `FIR`. A nivel de base de datos, se generará un nuevo registro en `gen_firma` con las siguientes características:

- `firma_codigo`: contendrá el valor `replica`
- `tabla`: `doc_documento_solicitud`
- `idobjeto`: corresponderá al `id` de la Solicitud

```sql title="Verificación del registro insertado en gen_firma"
SELECT *
FROM gen_firma
WHERE tabla = 'doc_documento_solicitud'
  AND idobjeto = @idSolicitud
  AND firma_codigo = 'replica';
```

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Registro automático en `gen_firma`**: al cambiar el estado de la Solicitud hacia el código `FIR`, el sistema inserta automáticamente un registro con `firma_codigo = 'replica'`, `tabla = 'doc_documento_solicitud'` e `idobjeto` igual al `id` de la Solicitud.
2. **Visualización como firma manual**: la Solicitud se muestra como firmada, visualizando `firma.png` como si correspondiera a una firma realizada de forma manual.
3. **Comportamiento consistente por subtipo**: el proceso se replica en cada subtipo de Solicitud donde se haya configurado el flujo de estados con el código `FIR`.

## Resolución de Problemas

### No se genera el registro en `gen_firma` al cambiar de estado

Verifique que:

- La key `imgAsSign` exista en el `web.config` del sitio SN
- El valor de la key sea exactamente `doc_documento_solicitud-FIR`
- El sitio haya sido reiniciado o recargado tras el cambio en `web.config`

### El cambio de estado no dispara el proceso de firma

Confirme que:

- El código del estado sea exactamente `FIR` (sin espacios ni variaciones)
- El estado `FIR` pertenezca al tipo de documento Solicitud correcto

### La firma no aparece en un subtipo específico

Revise que:

- El flujo de estados haya sido configurado para ese subtipo en particular
- El estado `FIR` esté incluido en la ruta del flujo hacia donde se está transicionando

### El sistema no reconoce el archivo como firma

Confirme que:

- El archivo adjunto se llame exactamente `firma.png`
- El archivo esté adjunto en la Solicitud correcta antes de ejecutar el cambio de estado

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

:::tip Consejo
Verificar cada escenario tanto a nivel visual (documento marcado como firmado) como a nivel de base de datos (registro en `gen_firma`).
:::

**Escenario 1 — Flujo exitoso**

1. Adjuntar el archivo `firma.png` a una Solicitud.
2. Realizar el cambio de estado hacia el código `FIR` configurado en el flujo del subtipo correspondiente.
3. **Resultado esperado:** se crea un registro en `gen_firma` con `firma_codigo = 'replica'`, `tabla = 'doc_documento_solicitud'` e `idobjeto` igual al `id` de la Solicitud; la Solicitud se visualiza como firmada.

**Escenario 2 — Archivo adjunto con nombre incorrecto**

1. Adjuntar un archivo de firma con un nombre distinto a `firma.png` (por ejemplo `firma1.png`).
2. Realizar el cambio de estado hacia el código `FIR`.
3. **Resultado esperado:** el sistema no genera el registro en `gen_firma`, dado que no reconoce el archivo como la firma válida.

**Escenario 3 — Subtipo sin flujo de estados configurado**

1. Sobre un subtipo de Solicitud donde el flujo de estados no fue configurado con el código `FIR`, adjuntar `firma.png` y realizar el cambio de estado.
2. **Resultado esperado:** no se inserta el registro en `gen_firma`, ya que el flujo de ese subtipo no contempla el proceso de firma.