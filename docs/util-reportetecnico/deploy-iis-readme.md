---
sidebar_position: 1
release_version: "3.3.0"
release_module: "Utilitario Reporte Técnico"
---

# Despliegue de Utilitario de Reporte Técnico (RT Web) en IIS

Esta guía detalla paso a paso cómo desplegar el Frontend (Next.js 15.3.2 + React 19 + TypeScript, `IDAE.UTIL.TechnicalReport`) en Windows Server usando IIS. Esta aplicación **no incluye backend .NET propio**: es un frontend Next.js standalone que consume la API SAMM ya desplegada, con autenticación vía NextAuth v4. IIS ejecuta el proceso Node.js a través de AspNetCore Module V2, usado aquí solo como gestor de procesos/reverse proxy — no porque la aplicación sea .NET.

## Referencias

_Esta sección será completada con tickets de Jira relacionados cuando estén disponibles._

## Información de Versiones

### Versión de Lanzamiento

:::info **v3.3.0**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción |
| ---------- | --------------- | ----------- |
| SAMMAPI    | _por confirmar con el equipo de desarrollo_ | API SAMM consumida por el frontend |

## Requisitos Previos

Antes de iniciar el despliegue, asegúrese de tener:

### 1. Windows Server con IIS instalado

- Windows Server 2019 o superior (Windows 10/11 también funciona para pruebas)
- Windows Server con rol IIS instalado

#### Recursos del servidor

**Mínimos:** 2 cores CPU, 4 GB RAM, 20 GB disco libres, acceso de red a la API SAMM.

**Recomendados:** 4+ cores CPU, 8+ GB RAM, 50+ GB SSD, Gigabit Ethernet.

#### Servicios externos requeridos

- **API SAMM**: instancia accesible por HTTP/HTTPS desde el servidor IIS (URL confirmada por el equipo de infraestructura al momento del despliegue).

#### Red y firewall

| Puerto | Servicio | Descripción |
| ------ | -------- | ----------- |
| 80     | HTTP     | Acceso web  |
| 443    | HTTPS    | Acceso web seguro (recomendado) |

#### Certificados SSL (opcional pero recomendado)

Ver la sección "Certificados SSL" de la guía de despliegue de `IDAE.UTIL.ReportService.Web` (`docs/util-reportes/deploy-iis-readme.md`) — el procedimiento de generación/importación de certificados es idéntico para todas las apps Next.js sobre IIS de esta familia de utilitarios.

### 2. Instalar IIS con las características necesarias

```powershell title="Habilitar características de IIS"
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServer
Enable-WindowsOptionalFeature -Online -FeatureName IIS-CommonHttpFeatures
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpErrors
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpRedirect
Enable-WindowsOptionalFeature -Online -FeatureName IIS-ApplicationDevelopment
Enable-WindowsOptionalFeature -Online -FeatureName IIS-NetFxExtensibility45
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HealthAndDiagnostics
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpLogging
Enable-WindowsOptionalFeature -Online -FeatureName IIS-LoggingLibraries
Enable-WindowsOptionalFeature -Online -FeatureName IIS-RequestMonitor
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpTracing
Enable-WindowsOptionalFeature -Online -FeatureName IIS-Security
Enable-WindowsOptionalFeature -Online -FeatureName IIS-RequestFiltering
Enable-WindowsOptionalFeature -Online -FeatureName IIS-Performance
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerManagementTools
Enable-WindowsOptionalFeature -Online -FeatureName IIS-IIS6ManagementCompatibility
Enable-WindowsOptionalFeature -Online -FeatureName IIS-Metabase
Enable-WindowsOptionalFeature -Online -FeatureName IIS-ManagementConsole
Enable-WindowsOptionalFeature -Online -FeatureName IIS-BasicAuthentication
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WindowsAuthentication
Enable-WindowsOptionalFeature -Online -FeatureName IIS-StaticContent
Enable-WindowsOptionalFeature -Online -FeatureName IIS-DefaultDocument
Enable-WindowsOptionalFeature -Online -FeatureName IIS-DirectoryBrowsing
Enable-WindowsOptionalFeature -Online -FeatureName IIS-ISAPIExtensions
Enable-WindowsOptionalFeature -Online -FeatureName IIS-ISAPIFilter
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpCompressionStatic
Enable-WindowsOptionalFeature -Online -FeatureName IIS-ASPNET45
```

### 3. Instalar Node.js LTS (64-bit)

```powershell title="Instalación de Node.js"
winget install OpenJS.NodeJS.LTS
# o descargar desde https://nodejs.org/
```

:::note Información
Confirme con Infraestructura/Alta Disponibilidad la versión LTS exacta ya estandarizada en los servidores IIS del cliente antes del primer despliegue — no hay un mínimo de Node.js declarado en `package.json` de este proyecto.
:::

```powershell title="Verificar instalación"
node -v
npm -v
```

### 4. Instalar ASP.NET Core Hosting Bundle 8.0

:::important Crítico
Este módulo es el que permite que IIS ejecute Node.js a través de `AspNetCoreModuleV2`, aunque la aplicación no sea .NET.
:::

Descargar e instalar desde https://dotnet.microsoft.com/download/dotnet/8.0 (buscar "Hosting Bundle" para Windows). Después de instalar, reiniciar el servidor o ejecutar:

```powershell title="Reiniciar servicios IIS"
net stop was /y
net start w3svc
```

```powershell title="Verificar módulo AspNetCore"
Get-WebGlobalModule | Where-Object { $_.Name -like '*AspNetCore*' }
# Debe mostrar: AspNetCoreModuleV2
```

### 5. Instalar URL Rewrite Module (Opcional pero recomendado)

Descargar desde https://www.iis.net/downloads/microsoft/url-rewrite e instalar el MSI.

### 6. ❌ NO instalar iisnode

:::warning Advertencia
**iisnode v0.2.26 (última versión de 2017) NO funciona con Node.js moderno**. Se usa AspNetCore Module V2 en su lugar.
:::

### 7. Valores que debe tener a la mano antes de compilar

El script de compilación (`build-for-iis.ps1`) requiere estos 5 valores por cliente/despliegue:

| Parámetro | Descripción | Ejemplo |
| --- | --- | --- |
| `-Client` | Nombre corto del cliente, define la carpeta de salida | `sa_cliente` |
| `-BasePath` | Sub-ruta pública de la app (se hornea en build) | `/rt_web` |
| `-ApiUrl` | URL base de la API SAMM | `https://tu.dominio:8443/sr_api/api` |
| `-NextAuthUrl` | URL pública completa **incluyendo el BasePath** | `https://tu.dominio:8443/rt_web` |
| `-NextAuthSecret` | Secreto único de este despliegue para NextAuth | generar uno nuevo, no reutilizar |

:::important NextAuth
`NEXTAUTH_URL` debe ser la URL pública completa **incluyendo el BasePath**. Si se omite el BasePath, NextAuth construye las URLs de callback sin él y termina redirigiendo a `/api/auth/error` en vez de `/rt_web/api/auth/error`. `NEXTAUTH_SECRET` debe ser único por cliente/despliegue — no reutilizar el mismo secreto entre clientes.
:::

## Información del Sistema

- **Frontend Web (Next.js 15.3.2 / React 19 / TypeScript)**: única aplicación del repo, sin backend propio.
- **NextAuth v4** para autenticación de sesión (`NEXTAUTH_URL`/`NEXTAUTH_SECRET`).
- **IIS + AspNetCore Module V2**: gestiona el proceso Node.js standalone generado por `next build`.
- Consume la **API SAMM** externa vía `API_URL`.
- Test runner del proyecto: **Vitest**.

## Configuración

### Paso 1: Compilar el proyecto con `build-for-iis.ps1`

Ejecutar desde la raíz del repo `IDAE.UTIL.TechnicalReport` (donde está `package.json`):

```powershell title="Compilar para un cliente"
.\build-for-iis.ps1 -Client sa_cliente `
  -BasePath "/rt_web" `
  -ApiUrl "https://tu.dominio:8443/sr_api/api" `
  -NextAuthUrl "https://tu.dominio:8443/rt_web" `
  -NextAuthSecret "<secreto-unico>"
```

El script instala dependencias (`npm install`), compila Next.js en modo standalone (`npm run build`), copia `.next/standalone`, `.next/static` y `public/` a `%USERPROFILE%\Downloads\<Client>`, y genera `.env.production`,`iis-server.js` y `web.config`.

`BasePath` se hornea en tiempo de compilación (Next.js no soporta cambiarlo en runtime), por lo que se compila una vez por cliente. `ApiUrl`/`NextAuthUrl`/`NextAuthSecret` en cambio quedan en `web.config` y se leen en runtime — un cliente ya desplegado se puede repuntar (cambio de ambiente o de host de API) editando `web.config` en el servidor, sin recompilar.

### Paso 2: Copiar los archivos compilados al servidor

```powershell title="Copiar archivos al servidor"
New-Item -ItemType Directory -Path "C:\Samm\rt_web" -Force
Copy-Item -Path "$env:USERPROFILE\Downloads\<Client>\*" -Destination "C:\Samm\rt_web" -Recurse -Force
New-Item -ItemType Directory -Path "C:\Samm\rt_web\logs" -Force
```

### Paso 3: Crear el Application Pool y el sitio/aplicación en IIS

```powershell title="Crear Application Pool rt_web"
Import-Module WebAdministration
New-WebAppPool -Name "rt_web"
Set-ItemProperty -Path "IIS:\AppPools\rt_web" -Name "managedRuntimeVersion" -Value ""
Set-ItemProperty -Path "IIS:\AppPools\rt_web" -Name "processModel.identityType" -Value "ApplicationPoolIdentity"
Set-ItemProperty -Path "IIS:\AppPools\rt_web" -Name "enable32BitAppOnWin64" -Value $false
Set-ItemProperty -Path "IIS:\AppPools\rt_web" -Name "startMode" -Value "AlwaysRunning"
Restart-WebAppPool -Name "rt_web"
```

```powershell title="Crear aplicación rt_web en IIS"
New-WebApplication -Name "rt_web" -Site "Default Web Site" -PhysicalPath "C:\Samm\rt_web" -ApplicationPool "rt_web"
Get-WebApplication -Name "rt_web" -Site "Default Web Site"
```

```powershell title="Configurar permisos"
$acl = Get-Acl "C:\Samm\rt_web"
$permission = "IIS AppPool\rt_web", "ReadAndExecute", "ContainerInherit,ObjectInherit", "None", "Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl "C:\Samm\rt_web" $acl

$aclLogs = Get-Acl "C:\Samm\rt_web\logs"
$permissionLogs = "IIS AppPool\rt_web", "Modify", "ContainerInherit,ObjectInherit", "None", "Allow"
$accessRuleLogs = New-Object System.Security.AccessControl.FileSystemAccessRule $permissionLogs
$aclLogs.SetAccessRule($accessRuleLogs)
Set-Acl "C:\Samm\rt_web\logs" $aclLogs
```

### Paso 4: Verificar `iis-server.js` y `web.config` generados

El script del Paso 1 ya generó ambos archivos — no es necesario crearlos a mano:

- **`iis-server.js`**: wrapper que traduce `ASPNETCORE_PORT` a `PORT` para que lo use el `server.js` standalone de Next.js, y carga manualmente `.env.production` (si existe) rellenando solo las claves que `web.config` no haya provisto ya.
- **`web.config`**: usa `hostingModel="OutOfProcess"` con `AspNetCoreModuleV2`, y define `NODE_ENV`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `API_URL` como `<environmentVariables>` — estos son los valores que realmente rigen en runtime.

Confirme que ambos archivos existen en `C:\Samm\rt_web\` antes de continuar.

### Paso 5: Reiniciar el Application Pool y probar

```powershell title="Reiniciar y probar"
Restart-WebAppPool -Name "rt_web"
Start-Process "http://localhost/rt_web"
Invoke-WebRequest -Uri "http://localhost/rt_web" -UseBasicParsing
```

### Paso 6: Configurar HTTPS (Opcional)

```powershell title="Importar certificado y agregar binding HTTPS"
$certPassword = ConvertTo-SecureString -String "TuPassword" -Force -AsPlainText
Import-PfxCertificate -FilePath "C:\Certificates\certificate.pfx" -CertStoreLocation Cert:\LocalMachine\My -Password $certPassword

New-WebBinding -Name "Default Web Site" -Protocol "https" -Port 443 -HostHeader "" -SslFlags 0
$cert = Get-Item "Cert:\LocalMachine\My\THUMBPRINT"
$binding = Get-WebBinding -Name "Default Web Site" -Protocol "https"
$binding.AddSslCertificate($cert.Thumbprint, "my")
```

### Paso 7: Configuraciones de seguridad y operaciones comunes (Opcional)

```powershell title="Seguridad y compresión"
Set-WebConfigurationProperty -Filter /system.webServer/directoryBrowse `
  -Name enabled -Value $false -PSPath "IIS:\Sites\Default Web Site\rt_web"

Set-WebConfigurationProperty -Filter /system.webServer/security/requestFiltering/requestLimits `
  -Name maxAllowedContentLength -Value 52428800 -PSPath "IIS:\Sites\Default Web Site\rt_web"

Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpCompressionStatic
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpCompressionDynamic
```

```powershell title="Operaciones comunes"
# Reiniciar / detener / iniciar
Restart-WebAppPool -Name "rt_web"
Stop-WebAppPool -Name "rt_web"
Start-WebAppPool -Name "rt_web"

# Actualizar a nueva versión
Stop-WebAppPool -Name "rt_web"
Copy-Item -Path "$env:USERPROFILE\Downloads\<Client>\*" -Destination "C:\Samm\rt_web" -Recurse -Force
Start-WebAppPool -Name "rt_web"
```

## Resultado Esperado

1. **Frontend Web activo**: la aplicación estará disponible en `http://localhost/rt_web` (o el `BasePath` configurado).
2. **Application Pool activo**: `rt_web` en estado "Started", con `startMode` `AlwaysRunning`.
3. **Login funcional**: el flujo de autenticación de NextAuth completa correctamente y redirige dentro del `BasePath` configurado, sin caer en `/api/auth/error`.
4. **Comunicación con la API SAMM**: la aplicación consulta correctamente `ApiUrl` sin errores de conexión.
5. **Logs accesibles**: en `C:\Samm\rt_web\logs\stdout_*.log` / `stderr_*.log`.

## Resolución de Problemas

### Error 500.19: No se puede leer web.config

Verifique que el archivo `web.config` existe, tiene formato XML válido y el usuario del Application Pool tiene permisos de lectura.

### Error 502.5: Process Failure

Confirme que `AspNetCoreModuleV2` está instalado, que Node.js está en `C:\Program Files\nodejs\node.exe`, y que `server.js`/`iis-server.js` existen en la carpeta. Revise `C:\Samm\rt_web\logs\stdout_*.log`.

### Frontend no carga archivos estáticos

Verifique que `.next/static` existe con contenido, que los permisos del Application Pool incluyen lectura en toda la carpeta, y que `NEXT_PUBLIC_BASE_PATH` se compiló con el valor correcto (requiere recompilar si está mal).

### Node.js no inicia o crashea

Confirme la versión de Node.js instalada, que `iis-server.js` existe con sintaxis correcta, y revise `C:\Samm\rt_web\logs\stderr_*.log`.

### NextAuth redirige a `/api/auth/error` en vez de `/rt_web/api/auth/error`

Verifique que `NEXTAUTH_URL` en `web.config` incluye el `BasePath` completo (`https://.../rt_web`, no solo `https://...`). Este es el error más común al desplegar apps con NextAuth sobre un sub-path de IIS.

### Error de conexión a la API SAMM

Revise que `API_URL` en `web.config` apunta al host correcto, que la API responde desde el servidor IIS, y que no hay firewall bloqueando la comunicación.

### Application Pool se detiene constantemente

Revise los logs de la aplicación, la memoria disponible, Event Viewer (`Get-EventLog -LogName Application -Source "IIS AspNetCore Module V2" -Newest 10`), y que `startMode` sea `AlwaysRunning`.

### Logs vacíos o no se generan

Confirme `stdoutLogEnabled="true"` en `web.config`, que la carpeta `logs` existe y tiene permisos de escritura para el Application Pool.

## Recursos Útiles

- [IIS Documentation](https://docs.microsoft.com/en-us/iis/)
- [ASP.NET Core Module](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/aspnet-core-module)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Next.js Standalone Output](https://nextjs.org/docs/advanced-features/output-file-tracing)

---

**Desarrollado con ❤️ por el equipo de IDAE Development**

**Licencia:** Proyecto privado - Todos los derechos reservados
