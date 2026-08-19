---
sidebar_position: 2
release_version: "7.1.10.9"
release_module: "SammNew"
slug: /util-reportes/DEPLOY-DOCKER-README
---

# Despliegue de IDAE Report Service con Docker

Esta guía detalla paso a paso cómo desplegar la aplicación completa (Backend + Frontend) usando Docker y Docker Compose en servidores Linux o Windows con Docker Desktop. El sistema proporciona una plataforma completa de generación y visualización de reportes SSRS (SQL Server Reporting Services).

**Versión:** 0.2.3-beta

## Referencias

_Esta sección será completada con tickets de Jira relacionados cuando estén disponibles._

## Información de Versiones

### Versión de Lanzamiento

:::info **v7.1.10.9**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción                           |
| ------------- | -------------- | ------------------------------------- |
| SAMMNEW       | >= 7.1.10.9    | Aplicación web principal              |
| SAMM LOGICA   | >= 5.6.23.4    | Lógica de negocio                     |
| BASE DE DATOS | >= C2.1.6.1    | Scripts de configuración de historial |

## Requisitos Previos

:::important Importante
Esta guía es para despliegue con **Docker** en servidores Linux, Windows Server con Docker Desktop, ambientes de desarrollo con Docker, o Kubernetes. Para despliegue en Windows Server con IIS nativo (sin Docker), consultar: `docs/util-reportes/deploy-iis-readme.md`
:::

Antes de iniciar el despliegue, asegúrese de tener:

### 1. Sistema operativo

**Servidores Linux:**

- Ubuntu 20.04 LTS o superior
- Debian 10 o superior
- CentOS 8 o superior
- Red Hat Enterprise Linux 8+

**Windows:**

- Windows Server 2019 o superior
- Windows 10/11 Pro (para desarrollo)
- WSL2 activado (para Windows Desktop)

### 2. Docker instalado

**Linux (Ubuntu/Debian):**

```bash title="Instalación de Docker en Linux"
# Actualizar sistema
sudo apt-get update
sudo apt-get upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Verificar instalación
docker --version
docker compose version
```

**Windows Server:**

```powershell title="Instalación de Docker en Windows"
# Descargar Docker Desktop para Windows Server
# https://docs.docker.com/desktop/install/windows-install/

# O usar Docker Engine directamente (sin Docker Desktop)
Install-Module -Name DockerMsftProvider -Repository PSGallery -Force
Install-Package -Name docker -ProviderName DockerMsftProvider

# Iniciar servicio
Start-Service Docker

# Verificar
docker --version
```

**Versiones mínimas requeridas:**

- Docker: 20.10 o superior
- Docker Compose: 2.0 o superior

### 3. Recursos del servidor

**Mínimos:**

- CPU: 2 cores
- RAM: 4 GB
- Disco: 20 GB libres
- Red: Acceso a SQL Server y SSRS

**Recomendados:**

- CPU: 4+ cores
- RAM: 8+ GB
- Disco: 50+ GB SSD
- Red: Gigabit Ethernet

### 4. Servicios externos requeridos

**SQL Server:**

- SQL Server 2019 o superior
- Base de datos creada (ej: `sai_basica`)
- Usuario con permisos de lectura/escritura

**SSRS (SQL Server Reporting Services):**

- SSRS 2019 o superior
- Accesible via HTTP/HTTPS
- Usuario con permisos para generar reportes
- URL ejemplo: `http://servidor/ReportServer`

### 5. Red y firewall

**Puertos que se deben abrir:**

| Puerto | Servicio | Descripción                        |
| ------ | -------- | ---------------------------------- |
| 80     | HTTP     | Acceso web (si usa Nginx)          |
| 443    | HTTPS    | Acceso web seguro (si usa Nginx)   |
| 3001   | Frontend | Next.js (si acceso directo)        |
| 7268   | Backend  | .NET API HTTPS (si acceso directo) |
| 5213   | Backend  | .NET API HTTP (si acceso directo)  |

**Acceso a servicios externos:**

- SQL Server (puerto 1433 por defecto)
- SSRS (puerto 80/443)

### 6. Certificados SSL (opcional pero recomendado)

Si vas a usar HTTPS, necesitas certificados:

```bash title="Generar certificado autofirmado (desarrollo)"
# Opción 1: Certificado autofirmado (solo para desarrollo)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certificate.key -out certificate.crt

# Convertir a PFX para .NET
openssl pkcs12 -export -out certificate.pfx \
  -inkey certificate.key -in certificate.crt -password pass:12345

# Opción 2: Certificado de Let's Encrypt (producción)
# Ver: https://letsencrypt.org/getting-started/
```

## Información del Sistema

### Descripción del sistema

Este sistema proporciona una plataforma completa de generación y visualización de reportes SSRS (SQL Server Reporting Services) con las siguientes características:

### Componentes de la aplicación

- **Backend API (.NET 8.0)**: Servicio WebAPI que se conecta a SSRS para generar reportes
- **Frontend Web (Next.js 15)**: Aplicación web con interfaz moderna para navegar y visualizar reportes
- **Nginx (opcional)**: Reverse proxy para enrutar tráfico HTTP/HTTPS
- **SQL Server**: Base de datos (debe estar instalado por separado)
- **SSRS**: SQL Server Reporting Services (debe estar instalado por separado)

### Características principales

- 🗂️ **Navegación jerárquica**: Reportes organizados en categorías y subcategorías
- 🔍 **Filtros dinámicos**: Parámetros con múltiples tipos de entrada
- 📄 **Visor PDF integrado**: Visualización instantánea de reportes
- 📊 **Exportación multi-formato**: PDF, Excel y Word
- 🎨 **UI moderna**: Construida con Radix UI y Tailwind CSS
- 🔐 **Autenticación por token**: Acceso seguro mediante tokens de sesión
- 📱 **Diseño responsivo**: Optimizado para diferentes tamaños de pantalla
- ⚡ **Alto rendimiento**: Next.js 15 con Turbopack
- 🐳 **Despliegue con Docker**: Fácil instalación y escalamiento

### Stack tecnológico

**Backend:**

- .NET 8.0 WebAPI
- Entity Framework Core
- Serilog (logging)
- SQL Server

**Frontend:**

- Next.js 15.5.3 (App Router)
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Radix UI Components
- TanStack Query (data fetching)
- Axios

**Infraestructura:**

- Docker & Docker Compose
- Nginx (reverse proxy opcional)
- SQL Server 2019+
- SSRS (SQL Server Reporting Services)

### Arquitectura de despliegue

```
┌─────────────────────────────────────────────────────┐
│                   Nginx (opcional)                   │
│          Reverse Proxy + Load Balancer              │
│          HTTP/HTTPS: 80/443 → Containers             │
└─────────────────┬───────────────────────────────────┘
                  │
      ┌───────────┴────────────┐
      │                        │
┌─────▼──────┐        ┌────────▼────────┐
│  Frontend  │        │     Backend     │
│  Next.js   │◄───────┤   .NET 8 API    │
│  Port 3001 │  HTTP  │   Port 7268     │
└────────────┘        └─────────┬───────┘
                                │
                    ┌───────────┴────────────┐
                    │                        │
              ┌─────▼─────┐          ┌──────▼──────┐
              │ SQL Server │          │    SSRS     │
              │  Database  │          │   Server    │
              └────────────┘          └─────────────┘
```

### Estructura de directorios

```
IDAE.UTIL.ReportService.Container/
├── docker-compose.nginx.yml           # Configuración con Nginx
├── docker-compose.sammai-rs-staging.yml  # Configuración staging
├── docker-compose.registry.yml        # Registry privado (opcional)
├── nginx/
│   ├── Dockerfile                    # Imagen Nginx personalizada
│   └── nginx.conf                    # Configuración Nginx
└── docker-registry/
    └── auth/                         # Autenticación registry (opcional)

IDAE.UTIL.ReportService.Backend/
└── Idae.Util.ReportService.Backend.WebApi/
    └── Dockerfile                    # Imagen .NET API

IDAE.UTIL.ReportService.Web/
└── Dockerfile                        # Imagen Next.js

Certificates/                          # Certificados SSL/TLS
└── certificate.pfx                   # Certificado para HTTPS
```

## Configuración

### Paso 1: Clonar el repositorio

```bash title="Clonar y preparar el entorno"
# En el servidor, crear directorio de trabajo
sudo mkdir -p /opt/idae
cd /opt/idae

# Clonar repositorio (ajustar URL según tu repositorio)
git clone <repository-url> IDAE.UTIL.ReportService
cd IDAE.UTIL.ReportService

# Verificar que existen los archivos necesarios
ls -la
```

:::tip Consejo
Si el servidor no tiene acceso directo a Git, puede transferir los archivos usando `scp`, `rsync`, o FTP.
:::

### Paso 2: Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto con las variables necesarias:

```bash title="Crear archivo .env"
cd /opt/idae/IDAE.UTIL.ReportService/IDAE.UTIL.ReportService.Container

# Crear archivo .env
nano .env
```

Contenido del archivo `.env`:

```env title="Configuración de variables de entorno"
# Backend API
API_VERSION=0.2.1-beta
ASPNETCORE_ENVIRONMENT=Staging
ASPNETCORE_URLS=https://+:7268;http://+:5213
ASPNETCORE_Kestrel__Certificates__Default__Path=/https/certificate.pfx
ASPNETCORE_Kestrel__Certificates__Default__Password=12345

# Database Connection
ConnectionStrings__DefaultConnection=Server=tu-servidor-sql;Database=sai_basica;User Id=usuario;Password=contraseña;TrustServerCertificate=True;

# SSRS Configuration
ReportServer__Url=http://tu-servidor-ssrs/ReportServer
ReportServer__Username=usuario_ssrs
ReportServer__Password=contraseña_ssrs
ReportServer__Domain=DOMINIO

# Frontend Web
FRONTEND_VERSION=0.2.1-beta
NEXT_PUBLIC_API_URL=http://rs-backend-webapi:5213
NODE_ENV=production

# Registry (si usas registry privado)
REGISTRY_URL=localhost:5000
```

:::important Importante
Asegúrese de reemplazar todos los valores de ejemplo con sus credenciales y configuraciones reales. NO incluya este archivo en control de versiones.
:::

### Paso 3: Copiar certificados SSL

```bash title="Copiar certificados al directorio correcto"
# Crear directorio de certificados si no existe
mkdir -p /opt/idae/IDAE.UTIL.ReportService/Certificates

# Copiar certificado PFX
cp /ruta/a/tu/certificate.pfx /opt/idae/IDAE.UTIL.ReportService/Certificates/

# Verificar permisos
chmod 600 /opt/idae/IDAE.UTIL.ReportService/Certificates/certificate.pfx
```

### Paso 4: Construir las imágenes Docker

#### Opción A: Construir localmente

```bash title="Construir imágenes en el servidor"
cd /opt/idae/IDAE.UTIL.ReportService

# Construir imagen del Backend
cd IDAE.UTIL.ReportService.Backend/Idae.Util.ReportService.Backend.WebApi
docker build -t sammai-rs-backend:0.2.1-beta .

# Construir imagen del Frontend
cd ../../IDAE.UTIL.ReportService.Web
docker build -t sammai-rs-frontend:0.2.1-beta .

# Verificar imágenes creadas
docker images | grep sammai-rs
```

:::tip Consejo
La construcción puede tardar varios minutos. Docker descargará las imágenes base necesarias (.NET SDK, Node.js) en la primera ejecución.
:::

#### Opción B: Usar registry privado

```bash title="Configurar y usar registry privado"
# Iniciar registry privado
cd /opt/idae/IDAE.UTIL.ReportService/IDAE.UTIL.ReportService.Container
docker compose -f docker-compose.registry.yml up -d

# Tag imágenes para el registry
docker tag sammai-rs-backend:0.2.1-beta localhost:5000/sammai-rs-backend:0.2.1-beta
docker tag sammai-rs-frontend:0.2.1-beta localhost:5000/sammai-rs-frontend:0.2.1-beta

# Push al registry
docker push localhost:5000/sammai-rs-backend:0.2.1-beta
docker push localhost:5000/sammai-rs-frontend:0.2.1-beta

# Verificar imágenes en registry
curl http://localhost:5000/v2/_catalog
```

### Paso 5: Iniciar los servicios

#### Opción A: Despliegue simple (sin Nginx)

```bash title="Iniciar aplicación sin proxy"
cd /opt/idae/IDAE.UTIL.ReportService/IDAE.UTIL.ReportService.Container

# Iniciar servicios
docker compose -f docker-compose.sammai-rs-staging.yml up -d

# Verificar que los contenedores están corriendo
docker compose -f docker-compose.sammai-rs-staging.yml ps
```

#### Opción B: Despliegue con Nginx

```bash title="Iniciar aplicación con Nginx"
cd /opt/idae/IDAE.UTIL.ReportService/IDAE.UTIL.ReportService.Container

# Iniciar todos los servicios incluyendo Nginx
docker compose -f docker-compose.nginx.yml up -d

# Verificar servicios
docker compose -f docker-compose.nginx.yml ps
```

:::note Información
Con Nginx, la aplicación estará disponible en el puerto 80 (HTTP) y 443 (HTTPS), con Nginx actuando como reverse proxy para ambos servicios.
:::

### Paso 6: Verificar el despliegue

```bash title="Verificar logs y estado"
# Ver logs de todos los servicios
docker compose -f docker-compose.sammai-rs-staging.yml logs -f

# Ver logs solo del backend
docker compose -f docker-compose.sammai-rs-staging.yml logs -f rs-backend-webapi

# Ver logs solo del frontend
docker compose -f docker-compose.sammai-rs-staging.yml logs -f rs-frontend-web

# Verificar salud de los contenedores
docker ps
```

#### Probar endpoints

```bash title="Pruebas de conectividad"
# Probar backend API
curl http://localhost:5213/api/health
# o
curl https://localhost:7268/api/health -k

# Probar frontend
curl http://localhost:3001

# Si usas Nginx
curl http://localhost/api/health
curl http://localhost/
```

### Paso 7: Configuración de Nginx (si aplica)

#### Actualizar configuración de Nginx

```bash title="Editar configuración de Nginx"
cd /opt/idae/IDAE.UTIL.ReportService/IDAE.UTIL.ReportService.Container/nginx

# Editar nginx.conf
nano nginx.conf
```

Ejemplo de configuración:

```nginx title="nginx.conf - Configuración del proxy"
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server rs-backend-webapi:5213;
    }

    upstream frontend {
        server rs-frontend-web:3001;
    }

    server {
        listen 80;
        server_name _;

        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    server {
        listen 443 ssl;
        server_name _;

        ssl_certificate /etc/nginx/ssl/certificate.crt;
        ssl_certificate_key /etc/nginx/ssl/certificate.key;

        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

:::tip Consejo
Después de modificar `nginx.conf`, reconstruye el contenedor de Nginx:
```bash
docker compose -f docker-compose.nginx.yml up -d --build nginx
```
:::

### Paso 8: Operaciones comunes

#### Detener servicios

```bash title="Detener la aplicación"
# Detener servicios
docker compose -f docker-compose.sammai-rs-staging.yml down

# Detener y eliminar volúmenes
docker compose -f docker-compose.sammai-rs-staging.yml down -v
```

#### Actualizar la aplicación

```bash title="Actualizar a nueva versión"
# Pull cambios del repositorio
cd /opt/idae/IDAE.UTIL.ReportService
git pull

# Reconstruir imágenes
docker compose -f IDAE.UTIL.ReportService.Container/docker-compose.sammai-rs-staging.yml build

# Reiniciar servicios
docker compose -f IDAE.UTIL.ReportService.Container/docker-compose.sammai-rs-staging.yml up -d
```

#### Reiniciar servicios

```bash title="Reiniciar contenedores"
# Reiniciar todos los servicios
docker compose -f docker-compose.sammai-rs-staging.yml restart

# Reiniciar servicio específico
docker compose -f docker-compose.sammai-rs-staging.yml restart rs-backend-webapi
docker compose -f docker-compose.sammai-rs-staging.yml restart rs-frontend-web
```

#### Ver logs en tiempo real

```bash title="Monitorear logs"
# Logs de todos los servicios
docker compose -f docker-compose.sammai-rs-staging.yml logs -f

# Logs solo del backend
docker compose -f docker-compose.sammai-rs-staging.yml logs -f rs-backend-webapi

# Logs solo del frontend
docker compose -f docker-compose.sammai-rs-staging.yml logs -f rs-frontend-web

# Ver últimas 100 líneas
docker compose -f docker-compose.sammai-rs-staging.yml logs --tail=100

# Guardar logs en archivo
docker compose -f docker-compose.sammai-rs-staging.yml logs > app-logs.txt
```

#### Escalar servicios

```bash title="Escalar instancias"
# Crear 3 instancias del frontend
docker compose -f docker-compose.sammai-rs-staging.yml up -d --scale rs-frontend-web=3

# Requiere configurar load balancer (Nginx) para distribuir carga
```

#### Backup y restore

```bash title="Gestión de backups"
# Backup de volúmenes (si se usan)
docker run --rm -v staging_data:/data -v $(pwd):/backup ubuntu \
  tar czf /backup/data-backup.tar.gz /data

# Restore
docker run --rm -v staging_data:/data -v $(pwd):/backup ubuntu \
  tar xzf /backup/data-backup.tar.gz -C /

# Backup de imágenes
docker save localhost:5000/sammai-rs-backend:0.2.1-beta \
  localhost:5000/sammai-rs-frontend:0.2.1-beta \
  | gzip > sammai-images-backup.tar.gz

# Restore de imágenes
docker load < sammai-images-backup.tar.gz
```

## Monitoreo y Mantenimiento

### Métricas de contenedores

```bash title="Ver estadísticas de recursos"
# Ver uso de CPU, memoria y red en tiempo real
docker stats

# Ver solo los contenedores de la aplicación
docker stats $(docker ps --filter name=sammai --format "{{.Names}}")
```

### Health checks

Agregar health checks al `docker-compose.yml`:

```yaml title="Configuración de health checks"
services:
  rs-backend-webapi:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5213/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  rs-frontend-web:
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3001"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

Ver estado de health:

```bash title="Verificar estado de salud"
docker compose -f docker-compose.sammai-rs-staging.yml ps
```

### Rotación de logs

Configurar Docker para limitar tamaño de logs. Editar `/etc/docker/daemon.json` (Linux):

```json title="/etc/docker/daemon.json"
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

Reiniciar Docker:

```bash title="Aplicar configuración de logs"
sudo systemctl restart docker
```

### Limpieza periódica

```bash title="Limpieza de recursos Docker"
# Eliminar contenedores detenidos
docker container prune -f

# Eliminar imágenes sin usar
docker image prune -a -f

# Eliminar volúmenes no usados
docker volume prune -f

# Eliminar redes no usadas
docker network prune -f

# Limpieza completa (cuidado!)
docker system prune -a --volumes -f
```

## Seguridad

### Configurar HTTPS con certificado válido

1. **Obtener certificado SSL/TLS** (Let's Encrypt o comercial)

2. **Copiar certificados:**

```bash title="Configurar certificados SSL"
# Copiar a carpeta Certificates
cp /ruta/fullchain.pem /opt/idae/IDAE.UTIL.ReportService/Certificates/certificate.crt
cp /ruta/privkey.pem /opt/idae/IDAE.UTIL.ReportService/Certificates/certificate.key

# Convertir a PFX para .NET
openssl pkcs12 -export -out /opt/idae/IDAE.UTIL.ReportService/Certificates/certificate.pfx \
  -inkey /opt/idae/IDAE.UTIL.ReportService/Certificates/certificate.key \
  -in /opt/idae/IDAE.UTIL.ReportService/Certificates/certificate.crt \
  -passout pass:TuPasswordSeguro
```

3. **Actualizar docker-compose.yml:**

```yaml
- ASPNETCORE_Kestrel__Certificates__Default__Password=TuPasswordSeguro
```

4. **Configurar Nginx para HTTPS:**

```nginx title="Configuración SSL en Nginx"
server {
    listen 443 ssl;
    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/certificate.key;
    # ... resto de configuración
}
```

### Buenas prácticas de seguridad

```bash title="Configuraciones de seguridad recomendadas"
# NO exponer puertos innecesarios
# En docker-compose.yml, remover:
ports:
  - "7268:7268"  # Solo si no usas acceso directo

# Usar secrets para contraseñas (Docker Swarm)
# Ver: https://docs.docker.com/engine/swarm/secrets/

# Escanear imágenes por vulnerabilidades
docker scan localhost:5000/sammai-rs-backend:0.2.1-beta

# Actualizar regularmente las imágenes base
# Reconstruir cuando haya actualizaciones de seguridad
```

## Despliegue en Producción

### Checklist de producción

- [ ] ✅ Certificados SSL válidos instalados
- [ ] ✅ Firewall configurado correctamente
- [ ] ✅ Backup automatizado configurado
- [ ] ✅ Monitoreo y alertas configurados
- [ ] ✅ Health checks habilitados
- [ ] ✅ Logs limitados y rotados
- [ ] ✅ Secrets protegidos (no en texto plano)
- [ ] ✅ Connection strings verificados
- [ ] ✅ CORS configurado correctamente
- [ ] ✅ HTTPS habilitado
- [ ] ✅ Variables de entorno de producción
- [ ] ✅ Documentación actualizada

### Monitoreo recomendado

**Herramientas:**

- Prometheus + Grafana (métricas)
- ELK Stack (logs centralizados)
- Sentry (errores de aplicación)
- UptimeRobot (disponibilidad)

**Métricas clave a monitorear:**

- CPU y memoria de contenedores
- Tiempos de respuesta API
- Errores HTTP (4xx, 5xx)
- Disponibilidad de servicio
- Uso de disco
- Tráfico de red

## Resultado Esperado

Una vez completada la configuración:

1. **Backend API funcionando**: El servicio WebAPI estará accesible en `http://localhost:5213` o `https://localhost:7268`, respondiendo correctamente a las peticiones de salud en `/api/health`.

2. **Frontend Web activo**: La aplicación Next.js estará disponible en `http://localhost:3001`, mostrando la interfaz de usuario para navegación de reportes.

3. **Nginx (si aplica)**: El reverse proxy estará enrutando correctamente el tráfico desde los puertos 80/443 hacia los servicios backend y frontend.

4. **Integración completa**: La aplicación web podrá comunicarse con el backend API, que a su vez se conectará correctamente con SQL Server y SSRS para generar reportes.

5. **Logs accesibles**: Los logs de cada contenedor estarán disponibles mediante los comandos de Docker Compose para monitoreo y troubleshooting.

## Resolución de Problemas

### Los contenedores no inician

Verifique que:

- Docker está corriendo: `docker ps`
- No hay conflictos de puertos: `netstat -tulpn | grep LISTEN`
- Las variables de entorno están configuradas correctamente en `.env`
- Los certificados SSL existen y tienen permisos correctos
- Hay suficiente espacio en disco: `df -h`

### Error de conexión a base de datos

Confirme que:

- El servidor SQL Server es accesible desde el contenedor
- Las credenciales en `ConnectionStrings__DefaultConnection` son correctas
- El firewall permite conexiones en el puerto 1433
- La opción `TrustServerCertificate=True` está en la connection string si usa certificado autofirmado

### Error de conexión a SSRS

Revise que:

- La URL del SSRS es correcta y accesible
- Las credenciales (`ReportServer__Username`, `ReportServer__Password`, `ReportServer__Domain`) son válidas
- El usuario tiene permisos para ejecutar reportes en SSRS
- El servidor SSRS responde correctamente: `curl http://tu-servidor-ssrs/ReportServer`

### Frontend no se conecta al backend

Verifique que:

- La variable `NEXT_PUBLIC_API_URL` apunta al backend correcto
- Si usa Nginx, la configuración del proxy está correcta
- Los contenedores están en la misma red de Docker
- El backend está respondiendo en el puerto configurado

### Certificados SSL no funcionan

Confirme que:

- El archivo `certificate.pfx` existe en `/Certificates/`
- La contraseña del certificado coincide con `ASPNETCORE_Kestrel__Certificates__Default__Password`
- Los permisos del archivo son correctos: `chmod 600 certificate.pfx`
- El certificado no ha expirado

### Contenedores se detienen inesperadamente

Revise que:

- Los logs de los contenedores: `docker compose logs`
- Hay suficiente memoria RAM disponible
- No hay errores en las variables de entorno
- Las dependencias entre servicios están configuradas correctamente en `docker-compose.yml`

## Comparación: Docker vs IIS

| Aspecto                     | Docker                                           | IIS Nativo                               |
| --------------------------- | ------------------------------------------------ | ---------------------------------------- |
| **Sistema operativo**       | Linux/Windows                                    | Solo Windows                             |
| **Portabilidad**            | ✅ Alta (mismo contenedor en cualquier servidor) | ❌ Baja (específico de Windows)          |
| **Facilidad de despliegue** | ✅ Muy fácil (`docker compose up`)               | ⚠️ Requiere configuración manual         |
| **Escalabilidad**           | ✅ Fácil escalar horizontalmente                 | ⚠️ Requiere balanceador de carga externo |
| **Aislamiento**             | ✅ Completo (cada contenedor aislado)            | ⚠️ Parcial (misma máquina)               |
| **Recursos**                | ⚠️ Mayor overhead (~200MB por contenedor)        | ✅ Menor overhead                        |
| **Actualizaciones**         | ✅ Fácil (rebuild + redeploy)                    | ⚠️ Manual, puede causar downtime         |
| **Rollback**                | ✅ Instantáneo (cambiar a imagen anterior)       | ⚠️ Requiere backup manual                |
| **Monitoreo**               | ✅ Herramientas maduras (Prometheus, Grafana)    | ⚠️ Monitoreo de Windows/IIS              |
| **Costo**                   | ✅ Gratis (Docker CE)                            | ✅ Incluido en Windows Server            |
| **Curva de aprendizaje**    | ⚠️ Requiere conocer Docker                       | ✅ Familiar para admins Windows          |

**¿Cuándo usar Docker?**

- ✅ Múltiples ambientes (dev, staging, prod)
- ✅ Necesitas escalar horizontalmente
- ✅ Quieres portabilidad entre servidores
- ✅ Despliegues frecuentes
- ✅ Equipos DevOps con experiencia en contenedores

**¿Cuándo usar IIS nativo?**

- ✅ Infraestructura 100% Windows
- ✅ Equipo experimentado en IIS
- ✅ Aplicación estable con pocos cambios
- ✅ Recursos de servidor limitados
- ✅ Políticas que no permiten contenedores

## Recursos Útiles

### Documentación oficial

- [Documentación oficial de Docker](https://docs.docker.com/)
- [Docker Compose reference](https://docs.docker.com/compose/compose-file/)
- [Next.js deployment with Docker](https://nextjs.org/docs/deployment)
- [ASP.NET Core in Docker](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/)

### Soporte

Para problemas o preguntas:

1. Revisar la sección de **Resolución de Problemas**
2. Verificar logs de contenedores
3. Consultar documentación oficial de Docker
4. Contactar al equipo de desarrollo

---

**Desarrollado con ❤️ por el equipo de IDAE Development**

**Licencia:** Proyecto privado - Todos los derechos reservados
