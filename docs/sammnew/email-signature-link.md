---
sidebar_position: 7
release_version: "7.1.27.0"
release_module: "SAMM New"
---

# Enlace Público de Firma en Correos

Este documento describe cómo configurar una regla de **Envío de Correo** para que el correo incluya el enlace público de firma del documento, permitiendo que el cliente firme sin iniciar sesión en SAMM. Antes de esta mejora, el botón **Firmar** generaba el enlace público, pero los correos configurados en `gen_envioCorreo` no podían incluirlo. Ahora la vista de la regla decide si el correo lleva el enlace y a qué reporte apunta, de modo que se puede incluir, por ejemplo, solo en las órdenes de trabajo de servicios preventivos.

## Referencias

- [SO-2291: SOL-34335 | Incluir link público de firma en correos configurados de envío](https://softwaresamm.atlassian.net/browse/SO-2291)
- [SO-2290: OTT-3904 | Mostrar encuesta y exigirla para firmar en documentos doc_documento del reporteador](https://softwaresamm.atlassian.net/browse/SO-2290)
- [SO-2251: Exigir encuesta para firmar el reporte solo cuando es obligatoria](https://softwaresamm.atlassian.net/browse/SO-2251)

## Información de Versiones

### Versión de Lanzamiento

:::info **SN 7.1.27.0 (provisional)**
:::

:::warning Versión provisional
La versión de lanzamiento es provisional; confirmarla con la fix version real al liberar.
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción                                   |
| ------------- | -------------- | --------------------------------------------- |
| SAMMNEW       | >= 7.1.27.0    | Aplicación web (plantilla estándar de correo) |
| SAMM LOGICA   | >= 5.6.30.3    | Motor de plantillas de correo                 |
| SR            | >= 6.0.0.17    | Página pública de firma (sitio de reportes)   |

:::note Nota
Los valores de SAMM LOGICA y SR deben ajustarse a la versión real que incluya el cambio. SR no requiere cambios para esta funcionalidad: la página pública de firma ya existía.
:::

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Las aplicaciones actualizadas a las versiones mínimas indicadas
- Una regla de correo existente en `gen_envioCorreo` (pantalla **Envío Correo**), con su vista en el campo **Tabla**
- Acceso para modificar la vista de la regla (normalmente a cargo del consultor)
- La clave `urlSAMMReportes` configurada en el `Web.config` de SAMM New, apuntando al sitio de reportes
- Un formato de reporte (`rep_reporte`) activo con el que el cliente firmará

:::important Importante
La plantilla estándar (`estandar.htm`) ahora incluye el marcador `[LINK_FIRMA]` debajo del cuerpo. Las reglas cuya vista no tenga la columna `LINK_FIRMA` siguen enviando el correo igual que antes: el marcador se reemplaza por vacío.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Agregar las columnas del enlace a la vista

En la vista de la regla (campo **Tabla** de **Envío Correo**, por ejemplo `v_OT_correo_creacion`) agregue al final del `SELECT` las columnas `qry_firma` y `LINK_FIRMA`. La vista debe exponer además la columna `id` del documento, que es la misma que el sistema usa para generar el PDF adjunto.

```sql title="Columnas a agregar a la vista de la regla (ejemplo con OT)"
-- t = código del documento, r = id del reporte con el que se firma
't=doc_documento_ot&key=f&r=' + CONVERT(varchar(20),
    (SELECT TOP 1 rr.id FROM rep_reporte rr
      WHERE rr.reporte_codigo = 'formatos/pri_OT' AND rr.active = 1
      ORDER BY rr.id))
  + '&id=' + CONVERT(varchar(20), [doc_documento.ot].[id]) + '&acep=1' AS [qry_firma],

-- Bloque que la plantilla muestra en el marcador [LINK_FIRMA]
'<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;">Para firmar el documento haga clic en el siguiente enlace: <a href="[[urlFirma]][[[qry_firma]]]">Firmar documento</a></p>' AS [LINK_FIRMA]
```

#### Parámetros de `qry_firma`

| Parámetro | Valor de ejemplo                   | Descripción                                                                 |
| --------- | ---------------------------------- | --------------------------------------------------------------------------- |
| `t`       | `doc_documento_ot`                 | Código del documento. El consultor lo cambia según el documento a firmar    |
| `key`     | `f`                                | Indica que es un enlace de firma. No se modifica                            |
| `r`       | `formatos/pri_OT` (por subconsulta) | Id del reporte (`rep_reporte`). Puede ir por subconsulta o con un id fijo   |
| `id`      | `[doc_documento.ot].[id]`          | Id del documento que se firma                                               |
| `acep`    | `1`                                | Fijo para el enlace de firma                                                |

:::tip Consejo
El consultor puede cambiar el valor de `t` y el formato de reporte (`reporte_codigo`) directamente en la vista, o reemplazar la subconsulta por el id del reporte "quemado", según le resulte más sencillo.
:::

### Paso 2: Restringir el enlace por tipo de documento (opcional)

Para que el enlace salga solo en algunos casos, envuelva `LINK_FIRMA` en un `CASE` que devuelva cadena vacía en los demás. Con cadena vacía el correo se envía sin enlace.

```sql title="Ejemplo: enlace solo para un subtipo de documento"
CASE WHEN [doc_documento_ot].[id_subtipoDocumento] = <id_subtipo_con_firma>
     THEN '<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;">Para firmar el documento haga clic en el siguiente enlace: <a href="[[urlFirma]][[[qry_firma]]]">Firmar documento</a></p>'
     ELSE ''
END AS [LINK_FIRMA]
```

### Paso 3: Usar la plantilla estándar

En la regla, deje la plantilla estándar (código `<n>_estandar` en **Envío Correo Código**). La plantilla ya incluye `[LINK_FIRMA]` debajo del cuerpo del correo (`[CUERPO]`), por lo que no requiere ningún cambio adicional.

Si el cliente usa una plantilla propia, agregue el marcador `[LINK_FIRMA]` en el punto del HTML donde debe aparecer el enlace.

### Paso 4: Probar el envío

Cambie el estado de un documento que dispare la regla (según su estrategia, subtipo y estado) y revise el correo recibido.

## Casos Especiales

:::note Comportamientos Predefinidos
El enlace público de firma no incluye datos de sesión del usuario: cualquier persona con el enlace puede abrir la página de firma del documento. Envíelo únicamente a los destinatarios previstos.
:::

| Caso                               | Configuración                                      | Descripción                                                                                           |
| ---------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Vista sin columna `LINK_FIRMA`     | Reglas existentes                                  | El correo se envía como antes; el marcador `[LINK_FIRMA]` se reemplaza por vacío                      |
| Enlace restringido por subtipo     | `CASE` en `LINK_FIRMA`                             | Solo los documentos que cumplen la condición llevan el enlace                                         |
| Sitio de reportes clásico          | `tipoReportServices` distinto de `2`               | El enlace abre `.../servicios/reporte/rep_indicador.aspx` del sitio configurado en `urlSAMMReportes`  |
| Servicio de reportes nuevo         | `tipoReportServices` en `2`                        | El enlace se arma como `.../firma` sobre `urlSAMMReportes`                                            |
| Encuesta obligatoria               | Encuesta con **Obligatoria** en Sí                 | La firma por enlace exige diligenciar la encuesta, ver [Encuesta obligatoria para firmar](./mandatory-survey-before-signing.md) |

:::warning Servicio de reportes nuevo
Con `tipoReportServices` en `2` el enlace apunta a la ruta `/firma` del servicio de reportes, que aún no está disponible en esta versión. Mientras tanto, use el sitio de reportes clásico para los enlaces de firma.
:::

## Resultado Esperado

Una vez completada la configuración:

1. **Enlace en el correo**: el correo de la regla muestra, debajo del cuerpo, el texto "Para firmar el documento haga clic en el siguiente enlace: Firmar documento".
2. **Firma sin sesión**: al abrir el enlace, el cliente accede a la página pública de firma del documento y puede firmarlo sin iniciar sesión.
3. **Correos sin enlace**: las reglas cuya vista no tiene `LINK_FIRMA`, o cuyo `CASE` devuelve vacío, se envían sin enlace y sin texto residual.

### Correo con el enlace de firma

![Correo de aprobación de orden de trabajo con el enlace Firmar documento al final del mensaje](./img/email-signature-link-result.png)

## Resolución de Problemas

### El correo no muestra el enlace

Verifique que:

- La vista de la regla tenga la columna `LINK_FIRMA` y que no esté devolviendo vacía por el `CASE`
- La plantilla de la regla sea la estándar actualizada o incluya el marcador `[LINK_FIRMA]`
- SAMM New y SAMM LOGICA estén en las versiones mínimas indicadas

### El enlace no abre la página de firma

Confirme que:

- La clave `urlSAMMReportes` del `Web.config` apunte al sitio de reportes correcto
- La columna `qry_firma` devuelva un valor completo (`t`, `key`, `r`, `id` y `acep`); si la subconsulta de `r` no encuentra el formato, el valor queda incompleto
- El formato de reporte (`rep_reporte.reporte_codigo`) exista y esté activo

### El enlace abre pero la página no carga el documento

Revise que:

- El valor de `t` corresponda al código del documento a firmar
- El `id` de `qry_firma` sea el del documento que dispara la regla

### El enlace muestra texto cifrado o un valor extraño en lugar del botón

Revise que:

- La vista tenga la columna `qry_firma` con ese nombre exacto; si falta, el sistema cifra el texto del marcador y el enlace no funciona

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Correo con enlace de firma

**Criterio de aceptación:** Un consultor puede agregar `qry_firma` y `LINK_FIRMA` a la vista de una regla para que el correo incluya el enlace público de firma.

**Precondiciones:** Regla activa en **Envío Correo** con la plantilla estándar y la vista con las dos columnas; `urlSAMMReportes` configurada.

| Paso | Acción                                                           | Resultado esperado                                                            |
| ---- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 1    | Disparar la regla cambiando el estado de un documento            | Se envía el correo de la regla                                                |
| 2    | Revisar el correo recibido                                       | **Se muestra el enlace "Firmar documento"** debajo del cuerpo                 |
| 3    | Abrir el enlace sin sesión iniciada en SAMM                      | Se abre la página pública de firma del documento                              |
| 4    | Firmar el documento                                              | La firma queda registrada en el documento                                     |

### Escenario 2: Enlace restringido por subtipo

**Criterio de aceptación:** El consultor puede enviar el enlace solo para ciertos subtipos de documento.

**Precondiciones:** `LINK_FIRMA` con `CASE` que limita el enlace a un subtipo; dos documentos, uno de cada subtipo.

| Paso | Acción                                                       | Resultado esperado                              |
| ---- | ------------------------------------------------------------ | ----------------------------------------------- |
| 1    | Disparar la regla con el documento del subtipo configurado   | El correo incluye el enlace                     |
| 2    | Disparar la regla con el documento del otro subtipo          | **El correo se envía sin enlace y sin texto residual** |

### Escenario 3: Reglas existentes no cambian

**Criterio de aceptación:** Los correos que usan la plantilla estándar con otras vistas no se ven afectados.

**Precondiciones:** Regla con la plantilla estándar cuya vista no tiene `LINK_FIRMA`.

| Paso | Acción                                      | Resultado esperado                                                          |
| ---- | ------------------------------------------- | --------------------------------------------------------------------------- |
| 1    | Disparar la regla                           | El correo llega igual que antes                                             |
| 2    | Revisar el final del cuerpo                 | **No aparece el texto `[LINK_FIRMA]` ni un enlace vacío**                   |
