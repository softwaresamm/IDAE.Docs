---
sidebar_position: 1
release_version: "7.1.12.0"
release_module: "Integración Power BI"
---

# Autenticación de Conexión SAMM con Power BI

Este documento describe cómo configurar la autenticación por usuario para la integración de SAMM con Power BI, permitiendo que cada usuario acceda a los reportes embebidos bajo su propia identidad, garantizando trazabilidad y control de acceso granular.

## Referencias

- SO-614 [Manejo de autenticación para conexión de Samm con PBI]

---

## Información de Versiones

### Versión de Lanzamiento

:::info **v7.1.12.0**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción               |
| ------------- | -------------- | ------------------------- |
| SAMMAPI       | >= 1.2.25.0    | API principal             |
| SAMMNEW       | >= 7.1.12.0    | Aplicación web            |
| SAMM LOGICA   | >= 5.6.25.0    | Lógica de negocio         |
| SAMM CORE     | >= 2.0.20.0    | Core del sistema          |
| CAPA DATOS    | >= 2.1.11.0    | Capa de acceso a datos    |
| BASE DE DATOS | >= C2.1.11.0   | Base de datos             |

---

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Cuenta activa en **Microsoft Azure** con permisos para registrar aplicaciones en Azure Active Directory
- Licencia de **Power BI Pro** o superior asignada al usuario administrador de la integración
- Acceso al portal de **Power BI Service** con permisos de administrador sobre el workspace
- Acceso al archivo `web.config` del servidor de aplicaciones SAMM
- Permisos para publicar y modificar reportes en el workspace de Power BI destino

:::important Importante
Para habilitar el **embebido de reportes vía iframe**, cada usuario que acceda al reporte debe tener asignada una licencia de **Power BI Pro** activa. Sin esta licencia, el reporte no se renderizará correctamente. Adicionalmente, cada vez que se monte un nuevo indicador o reporte, se debe actualizar el valor de la key `pbi:ReportId` en el `web.config`.
:::

---

## Información del Servicio

:::note Información
La autenticación con Power BI se realiza mediante el protocolo **OAuth 2.0** a través de **Microsoft Identity Platform**. SAMM solicita un token de acceso en nombre del usuario autenticado, utilizando las credenciales de una aplicación registrada en Azure Active Directory. Este token es utilizado para consumir la API de Power BI REST y obtener el token de embed del reporte.
:::

### Parámetros del Servicio

| Parámetro       | Valor de ejemplo                         | Descripción                                      |
| --------------- | ---------------------------------------- | ------------------------------------------------ |
| `pbi:TenantId`  | `9fcdd101-73b0-4129-82ea-374815044389`   | ID del directorio (tenant) en Azure AD           |
| `pbi:ClientId`  | `b66fb065-5fea-4d1e-bd69-1e49d9b25963`   | ID de la aplicación registrada en Azure AD       |
| `pbi:ClientSecret` | ``                                     | Secreto de cliente generado en Azure AD     |
| `pbi:WorkspaceId` | `6b7de268-e42d-48da-b9c8-3a3f617d77fa` | ID del workspace (grupo) en Power BI Service     |
| `pbi:ReportId`  | `a83f027a-5c4e-4a7f-bf54-85a4f42b6333`   | ID del reporte a embeber dentro del workspace    |

### Request

```bash title="Ejemplo de petición de token a Microsoft Identity"
curl --location 'https://login.microsoftonline.com/{TenantId}/oauth2/v2.0/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_id={ClientId}' \
--data-urlencode 'client_secret={ClientSecret}' \
--data-urlencode 'scope=https://analysis.windows.net/powerbi/api/.default'
```

### Response

```json title="Respuesta de token exitosa"
{
  "token_type": "Bearer",
  "expires_in": 3599,
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6..."
}
```

:::tip Campos Importantes
- `access_token`: Token Bearer que se usa para autenticarse en la API REST de Power BI.
- `expires_in`: Tiempo de expiración en segundos (generalmente 3600 = 1 hora). Implemente refresco automático antes de que expire.
:::

---

## Configuración

### Paso 1: Registrar la Aplicación en Azure Active Directory

Ingrese al [Portal de Azure](https://portal.azure.com) y navegue a **Azure Active Directory → Registros de aplicaciones → Nueva registración**.

Complete los campos requeridos: nombre de la aplicación, tipo de cuenta compatible y URI de redirección si aplica. Una vez creada, la plataforma asignará automáticamente el `Application (client) ID` y el `Directory (tenant) ID`.

#### Cómo obtener el `TenantId`

Una vez dentro de su aplicación registrada (o desde **Azure AD → Overview**):

1. Diríjase a **Azure Active Directory**
2. En la sección **Overview**, ubique el campo **Directory (tenant) ID**
3. Copie ese valor: corresponde al `pbi:TenantId`

#### Cómo obtener el `ClientId`

1. Dentro de **App registrations**, seleccione su aplicación
2. En la sección **Overview**, ubique el campo **Application (client) ID**
3. Copie ese valor: corresponde al `pbi:ClientId`

:::tip Consejo
Ambos valores (`TenantId` y `ClientId`) están visibles en la pantalla **Overview** de su aplicación registrada sin necesidad de pasos adicionales.
:::

---

### Paso 2: Generar el Client Secret

Dentro de la aplicación registrada en Azure AD:

1. Diríjase a **Certificates & secrets → Client secrets**
2. Haga clic en **New client secret**
3. Asigne una descripción y seleccione el tiempo de expiración deseado
4. Haga clic en **Add**
5. Copie inmediatamente el campo **Value** generado: corresponde al `pbi:ClientSecret`

:::warning Precaución
El valor del secreto **solo se muestra una vez** al momento de su creación. Si no lo copia en ese momento, deberá generar uno nuevo. Nunca almacene este valor en repositorios de código fuente.
:::

---

### Paso 3: Asignar Permisos a la Aplicación en Power BI

Para que la aplicación pueda acceder a los reportes, debe ser añadida como miembro del workspace en Power BI Service:

1. Ingrese a [Power BI Service](https://app.powerbi.com)
2. Navegue al workspace donde se encuentra el reporte
3. Haga clic en **Configuración del workspace → Acceso**
4. Agregue el **nombre o Client ID de la aplicación** registrada en Azure AD como miembro con rol **Viewer** o superior

:::important Importante
Sin este paso, el token generado no tendrá acceso al workspace ni al reporte, y la API retornará un error `403 Forbidden`.
:::

---

### Paso 4: Obtener el `WorkspaceId` y el `ReportId`

Ambos valores se obtienen directamente desde la **URL del reporte** en Power BI Service.

#### Cómo obtener el `WorkspaceId`

1. Ingrese a Power BI Service y abra el workspace que contiene el reporte
2. En la barra de direcciones del navegador, la URL tendrá el siguiente formato:

```
https://app.powerbi.com/groups/{WorkspaceId}/list
```

3. Copie el GUID que aparece en el segmento `/groups/{WorkspaceId}/`: corresponde al `pbi:WorkspaceId`

#### Cómo obtener el `ReportId`

1. Dentro del workspace, haga clic sobre el reporte que desea embeber
2. En la barra de direcciones, la URL tendrá el siguiente formato:

```
https://app.powerbi.com/groups/{WorkspaceId}/reports/{ReportId}/...
```

3. Copie el GUID que aparece en el segmento `/reports/{ReportId}/`: corresponde al `pbi:ReportId`

:::tip Consejo
Cada vez que se publique un nuevo reporte o se reemplace el indicador embebido, el `ReportId` cambia. Recuerde actualizar el valor en el `web.config` y reiniciar el servicio de SAMM para que el cambio tome efecto.
:::

---

### Paso 5: Agregar las Keys en el `web.config`

Con todos los valores obtenidos en los pasos anteriores, agregue las siguientes keys dentro del bloque `<appSettings>` del archivo `web.config` del servidor de aplicaciones SAMM:

```xml title="Configuración en web.config"
<appSettings>
  <!-- ... otras keys existentes ... -->

  <add key="pbi:TenantId"     value="9fcdd101-73b0-4129-82ea-374815044389" />
  <add key="pbi:ClientId"     value="b66fb065-5fea-4d1e-bd69-1e49d9b25" />
  <add key="pbi:ClientSecret" value="" />
  <add key="pbi:WorkspaceId"  value="6b7de268-e42d-48da-b9c8-3a3f617d77fa" />
  <add key="pbi:ReportId"     value="a83f027a-5c4e-4a7f-bf54-85a4f42b6333" />
</appSettings>
```

Guarde el archivo y reinicie el pool de aplicaciones en IIS para que los cambios sean aplicados.

:::warning Precaución
El valor de `pbi:ClientSecret` es sensible. Asegúrese de que el `web.config` **no esté expuesto públicamente** y que esté excluido del repositorio de control de versiones mediante `.gitignore` o mecanismos equivalentes.
:::

---

## Casos Especiales

:::note Comportamientos Predefinidos
La integración presenta comportamientos específicos según el tipo de licencia del usuario y el modo de visualización del reporte.
:::

| Caso                          | Condición                        | Descripción                                                                 |
| ----------------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| Visualización directa         | Licencia PBI o PBI Pro           | El usuario puede ver el reporte embebido en SAMM                            |
| Visualización vía iframe      | Requiere licencia PBI Pro        | Sin PBI Pro el iframe no renderiza el reporte correctamente                 |
| Cambio de indicador           | Nuevo reporte publicado en PBI   | Se debe actualizar `pbi:ReportId` en `web.config` y reiniciar el servicio   |
| Token expirado                | Después de ~1 hora de sesión     | El sistema debe gestionar el refresco del token automáticamente             |

---

## Resultado Esperado

Una vez completada la configuración:

1. **Autenticación por usuario activa**: SAMM autentica cada solicitud a Power BI usando el token del usuario autenticado, no una cuenta de servicio compartida.
2. **Reporte embebido visible**: El reporte configurado en `pbi:ReportId` se renderiza correctamente dentro de SAMM para usuarios con licencia habilitada.
3. **Token gestionado automáticamente**: El sistema obtiene y renueva el token de acceso sin intervención manual del usuario.
4. **Keys correctamente referenciadas**: SAMMAPI lee las configuraciones desde `web.config` y establece la conexión con el workspace y reporte indicados.

---

## Resolución de Problemas

### El reporte no se muestra (iframe en blanco)

Verifique que:

- El usuario tenga asignada una licencia **Power BI Pro** activa en Microsoft 365
- La aplicación de Azure AD haya sido agregada como miembro del workspace en Power BI Service
- El `pbi:WorkspaceId` y `pbi:ReportId` correspondan exactamente al workspace y reporte publicado

### Error 401 Unauthorized al autenticar

Confirme que:

- El `pbi:ClientId` y `pbi:ClientSecret` son correctos y que el secreto no ha expirado en Azure AD
- El `pbi:TenantId` corresponde al directorio donde está registrada la aplicación
- El scope configurado en la solicitud de token sea `https://analysis.windows.net/powerbi/api/.default`

### Error 403 Forbidden al consumir la API de Power BI

Revise que:

- La aplicación registrada en Azure AD fue añadida con el rol correcto (mínimo **Viewer**) en el workspace de Power BI Service
- Los permisos de la API de Power BI (`Report.Read.All` u otros requeridos) estén configurados y consentidos en Azure AD

### Las keys no son leídas por SAMMAPI

Verifique que:

- Las keys estén dentro del bloque `<appSettings>` del `web.config` correcto (servidor de SAMMAPI)
- El pool de aplicaciones en IIS fue reiniciado después de guardar los cambios
- No existan duplicados de las keys en el archivo de configuración

---

## Errores Conocidos

- Ningún error conocido en el momento de la publicación de esta versión.
