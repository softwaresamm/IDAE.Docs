---
sidebar_position: 2
release_version: "7.1.10.9"
release_module: "SammNew"
---
### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción                           |
| ------------- | -------------- | ------------------------------------- |
| SAMMNEW       | >= 7.1.10.9    | Aplicación web principal              |
| SAMM LOGICA   | >= 5.6.23.4    | Lógica de negocio                     |
| BASE DE DATOS | >= C2.1.6.1    | Scripts de configuración de historial |

# Despliegue de IDAE Report Service con Docker - Guía Completa

Esta guía detalla paso a paso cómo desplegar la aplicación completa (Backend + Frontend) usando Docker y Docker Compose en servidores Linux o Windows con Docker Desktop.

**Versión:** 0.2.3-beta

## ⚠️ IMPORTANTE: ¿Cuándo usar esta guía?

Esta guía es para despliegue con **Docker** en:

- ✅ Servidores Linux (Ubuntu, Debian, CentOS, etc.)
- ✅ Windows Server con Docker Desktop
- ✅ Ambientes de desarrollo con Docker
- ✅ Kubernetes (usando las imágenes Docker generadas)

**Para despliegue en Windows Server con IIS nativo (sin Docker):**

- Ver: `IDAE.UTIL.ReportService.Web/DEPLOY-IIS-README.md`

## 📋 Descripción del sistema

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

## 🏗️ Arquitectura del sistema

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

## Requisitos previos del servidor

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

```bash
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

```powershell
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

```bash
# Opción 1: Certificado autofirmado (solo para desarrollo)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certificate.key -out certificate.crt

# Convertir a PFX para .NET
openssl pkcs12 -export -out certificate.pfx \
  -inkey certificate.key -in certificate.crt -password pass:12345

# Opción 2: Certificado de Let's Encrypt (producción)
# Ver: https://letsencrypt.org/getting-started/
```

## 🚀 Guía de instalación paso a paso

### Paso 1: Clonar el repositorio

```bash
# En el servidor, crear directorio de trabajo
sudo mkdir -p /opt/idae
cd /opt/idae

# Clonar repositorio (ajustar URL según tu repositorio)
git clone <repository-url> IDAE.UTIL.ReportService
cd IDAE.UTIL.ReportService

# O copiar archivos manualmente si no tienes git:
# Transferir carpetas completas:
# - IDAE.UTIL.ReportService.Backend/
# - IDAE.UTIL.ReportService.Web/
# - IDAE.UTIL.ReportService.Container/
# - Certificates/
```

### Paso 2: Preparar certificados SSL (opcional)

```bash
# Si usas HTTPS, copiar certificados a la carpeta Certificates/
cd /opt/idae/IDAE.UTIL.ReportService
mkdir -p Certificates

# Copiar tu certificado PFX
cp /ruta/tu/certificate.pfx Certificates/

# O crear uno autofirmado para pruebas:
cd Certificates
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certificate.key -out certificate.crt \
  -subj "/C=MX/ST=Estado/L=Ciudad/O=IDAE/CN=localhost"

openssl pkcs12 -export -out certificate.pfx \
  -inkey certificate.key -in certificate.crt \
  -passout pass:12345

# Dar permisos
chmod 644 certificate.pfx
```

### Paso 3: Configurar variables de entorno

Editar el archivo `docker-compose.sammai-rs-staging.yml`:

```bash
cd /opt/idae/IDAE.UTIL.ReportService/IDAE.UTIL.ReportService.Container
nano docker-compose.sammai-rs-staging.yml
```

**Configurar las siguientes variables:**

```yaml
services:
  rs-backend-webapi:
    environment:
      # ⚠️ CAMBIAR: Conexión a tu SQL Server
      - ProjectSettings__ConnectionStrings__DefaultConnection=Server=TU_SERVIDOR_SQL;Database=sai_basica;User Id=TU_USUARIO;pwd=TU_PASSWORD;Encrypt=False;TrustServerCertificate=True;

      # ⚠️ CAMBIAR: URL de tu SSRS
      - ProjectSettings__Report__SSRS__BaseRoute=http://TU_SERVIDOR_SSRS/ReportServer

      # ⚠️ CAMBIAR: Usuario SSRS
      - ProjectSettings__Report__SSRS__Authentication__Basic__Username=DOMINIO\\usuario_ssrs
      - ProjectSettings__Report__SSRS__Authentication__Basic__Password=PASSWORD_SSRS

      # ⚠️ CAMBIAR: Password del certificado (si usas HTTPS)
      - ASPNETCORE_Kestrel__Certificates__Default__Password=12345

  rs-frontend-web:
    build:
      args:
        # ⚠️ CAMBIAR: URL del backend según tu servidor
        NEXT_PUBLIC_API_URL: http://TU_SERVIDOR:3001

        # ⚠️ CAMBIAR: Base path si usas Nginx con proxy
        NEXT_PUBLIC_BASE_PATH: /sammai
    environment:
      # Puerto del frontend (dejar 3001 o cambiar si hay conflicto)
      - PORT=3001
```

**Ejemplo con valores reales:**

```yaml
# Backend
- ProjectSettings__ConnectionStrings__DefaultConnection=Server=192.168.1.100;Database=sai_basica;User Id=sa;pwd=MiPassword123!;Encrypt=False;TrustServerCertificate=True;
- ProjectSettings__Report__SSRS__BaseRoute=http://192.168.1.100/ReportServer
- ProjectSettings__Report__SSRS__Authentication__Basic__Username=MIDOMINIO\\ssrs_admin
- ProjectSettings__Report__SSRS__Authentication__Basic__Password=SsrsPass456!

# Frontend
NEXT_PUBLIC_API_URL: http://192.168.1.200:3001
NEXT_PUBLIC_BASE_PATH: /sammai
```

### Paso 4: Crear red Docker (primera vez)

```bash
# Crear red Docker para comunicación entre contenedores
docker network create staging.sammai-network

# Verificar que se creó
docker network ls | grep sammai
```

### Paso 5: Construir las imágenes Docker

```bash
cd /opt/idae/IDAE.UTIL.ReportService/IDAE.UTIL.ReportService.Container

# Construir ambas imágenes (Backend + Frontend)
docker compose -f docker-compose.sammai-rs-staging.yml build

# Ver progreso:
# - Building backend... (puede tardar 2-5 minutos)
# - Building frontend... (puede tardar 3-7 minutos)
```

**Si hay errores de build:**

```bash
# Build con más detalles
docker compose -f docker-compose.sammai-rs-staging.yml build --progress=plain

# Build sin cache (si hubo cambios)
docker compose -f docker-compose.sammai-rs-staging.yml build --no-cache
```

### Paso 6: Iniciar los contenedores

```bash
# Iniciar en modo detached (background)
docker compose -f docker-compose.sammai-rs-staging.yml up -d

# Ver logs de inicio
docker compose -f docker-compose.sammai-rs-staging.yml logs -f

# Presionar Ctrl+C para salir de los logs (contenedores siguen corriendo)
```

**Salida esperada:**

```
Creating sammai-staging.rs.backend.webapi-container ... done
Creating sammai-staging.rs.frontendweb-container ... done

▲ Next.js 15.5.3
- Local:        http://localhost:3001
✓ Ready in 2s

.NET API listening on https://+:7268 and http://+:5213
```

### Paso 7: Verificar que los contenedores están corriendo

```bash
# Ver estado de contenedores
docker compose -f docker-compose.sammai-rs-staging.yml ps

# Salida esperada:
# NAME                                      STATUS    PORTS
# sammai-staging.rs.backend.webapi-container   Up    0.0.0.0:7268->7268/tcp, 0.0.0.0:5213->5213/tcp
# sammai-staging.rs.frontendweb-container      Up    0.0.0.0:3001->3001/tcp

# Ver logs en tiempo real
docker compose -f docker-compose.sammai-rs-staging.yml logs -f rs-backend-webapi
docker compose -f docker-compose.sammai-rs-staging.yml logs -f rs-frontend-web
```

### Paso 8: Probar la aplicación

**Probar Backend API:**

```bash
# Desde el servidor
curl http://localhost:5213/api/health
# O si usas HTTPS:
curl -k https://localhost:7268/swagger

# Desde otro equipo en la red
curl http://IP_SERVIDOR:5213/api/health
```

**Probar Frontend:**

```bash
# Desde el servidor
curl http://localhost:3001

# Desde navegador en otro equipo
http://IP_SERVIDOR:3001/?ssn=TOKEN_SESION
```

**URLs completas:**

```
Backend API:     http://IP_SERVIDOR:5213
Backend Swagger: http://IP_SERVIDOR:5213/swagger (o https://IP_SERVIDOR:7268/swagger)
Frontend Web:    http://IP_SERVIDOR:3001
```

## 🔧 Configuración con Nginx (Opcional pero recomendado)

Si quieres tener un único punto de entrada (puerto 80/443) con URLs limpias:

### Paso 1: Usar docker-compose con Nginx

```bash
cd /opt/idae/IDAE.UTIL.ReportService/IDAE.UTIL.ReportService.Container

# Iniciar con Nginx
docker compose -f docker-compose.nginx.yml up -d
```

### Paso 2: Configurar nginx.conf

Editar `nginx/nginx.conf`:

```nginx
upstream backend {
    server rs-backend-webapi:5213;
}

upstream frontend {
    server rs-frontend-web:3001;
}

server {
    listen 80;
    server_name _;

    # Backend API en /api
    location /api {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Swagger en /swagger
    location /swagger {
        proxy_pass http://backend;
        proxy_set_header Host $host;
    }

    # Frontend en /sammai
    location /sammai {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

**Con Nginx, las URLs quedan:**

```
Backend API:    http://servidor/api
Swagger:        http://servidor/swagger
Frontend:       http://servidor/sammai
```

## Troubleshooting - Solución de problemas

### ❌ Error: "Cannot connect to Docker daemon"

**Causa:** Docker no está corriendo o el usuario no tiene permisos

**Solución:**

```bash
# Iniciar Docker (Linux)
sudo systemctl start docker
sudo systemctl enable docker

# Verificar estado
sudo systemctl status docker

# Agregar usuario a grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Windows Server
Start-Service Docker
```

### ❌ Error: "network staging.sammai-network not found"

**Causa:** La red Docker no fue creada

**Solución:**

```bash
# Crear la red
docker network create staging.sammai-network

# Verificar
docker network ls | grep sammai
```

### ❌ Error al construir: "failed to solve with frontend dockerfile.v0"

**Causa:** Error en Dockerfile o dependencias no disponibles

**Solución:**

```bash
# Ver logs detallados
docker compose -f docker-compose.sammai-rs-staging.yml build --progress=plain 2>&1 | tee build.log

# Limpiar cache y reintentar
docker builder prune -a
docker compose -f docker-compose.sammai-rs-staging.yml build --no-cache
```

### ❌ Backend no se conecta a SQL Server

**Causa:** Connection string incorrecta o SQL Server no accesible

**Solución:**

```bash
# Ver logs del backend
docker logs sammai-staging.rs.backend.webapi-container

# Probar conexión desde el contenedor
docker exec sammai-staging.rs.backend.webapi-container \
  ping -c 3 IP_SQL_SERVER

# Verificar connection string
docker compose -f docker-compose.sammai-rs-staging.yml config | grep ConnectionString

# Opciones de connection string:
# Si SQL Server está en el host:
Server=host.docker.internal;...

# Si SQL Server está en la red:
Server=IP_SQL_SERVER;...

# Si SQL Server está en otro contenedor:
Server=nombre_contenedor_sql;...
```

### ❌ Frontend no carga o muestra error 404

**Causa:** Variables de entorno incorrectas o basePath no coincide

**Solución:**

```bash
# Ver logs del frontend
docker logs sammai-staging.rs.frontendweb-container

# Verificar variables de entorno
docker inspect sammai-staging.rs.frontendweb-container | grep -A 10 Env

# Verificar NEXT_PUBLIC_BASE_PATH
# Si usas /sammai, acceder a: http://servidor:3001/sammai
# NO acceder a: http://servidor:3001/

# Reconstruir con variables correctas
docker compose -f docker-compose.sammai-rs-staging.yml build rs-frontend-web
docker compose -f docker-compose.sammai-rs-staging.yml up -d rs-frontend-web
```

### ❌ Contenedor se detiene inmediatamente

**Causa:** Error en la aplicación o configuración

**Solución:**

```bash
# Ver logs del contenedor detenido
docker logs sammai-staging.rs.backend.webapi-container
docker logs sammai-staging.rs.frontendweb-container

# Ver últimos eventos
docker events --since 10m

# Intentar correr en modo interactivo
docker run -it --rm --entrypoint /bin/sh localhost:5000/sammai-rs-frontend:0.2.1-beta

# Dentro del contenedor, probar manualmente:
node server.js
```

### ❌ Error: "port is already allocated"

**Causa:** Puerto ya está en uso por otro servicio

**Solución:**

```bash
# Ver qué está usando el puerto (Linux)
sudo netstat -tulpn | grep :3001
sudo lsof -i :3001

# Ver qué está usando el puerto (Windows)
netstat -ano | findstr :3001

# Opción 1: Detener el servicio que usa el puerto
# Opción 2: Cambiar puerto en docker-compose.yml:
ports:
  - "3002:3001"  # Puerto 3002 en host, 3001 en contenedor
```

### ❌ No se puede acceder desde otro equipo

**Causa:** Firewall bloqueando puertos

**Solución:**

```bash
# Linux (UFW)
sudo ufw allow 3001/tcp
sudo ufw allow 5213/tcp
sudo ufw allow 7268/tcp
sudo ufw status

# Linux (firewalld)
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --permanent --add-port=5213/tcp
sudo firewall-cmd --reload

# Windows Server
New-NetFirewallRule -DisplayName "Docker Frontend" -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Docker Backend HTTP" -Direction Inbound -LocalPort 5213 -Protocol TCP -Action Allow
```

### ❌ CORS error al llamar API desde Frontend

**Causa:** Backend no tiene configurado el origen del Frontend

**Solución:**

Verificar en el archivo `appsettings.Docker.json` del backend:

```json
{
  "ProjectSettings": {
    "CorsOrigins": [
      "http://localhost:3001",
      "http://IP_SERVIDOR:3001",
      "http://frontend:3001"
    ]
  }
}
```

Si necesitas cambiar sin reconstruir:

```bash
# Editar environment en docker-compose.yml
- ProjectSettings__CorsOrigins__0=http://localhost:3001
- ProjectSettings__CorsOrigins__1=http://IP_SERVIDOR:3001

# Reiniciar backend
docker compose -f docker-compose.sammai-rs-staging.yml restart rs-backend-webapi
```

### 🔍 Comandos útiles para diagnóstico

```bash
# Ver todos los contenedores (incluso detenidos)
docker ps -a

# Ver logs en tiempo real de todos los servicios
docker compose -f docker-compose.sammai-rs-staging.yml logs -f

# Inspeccionar un contenedor
docker inspect sammai-staging.rs.backend.webapi-container

# Entrar a un contenedor para debugging
docker exec -it sammai-staging.rs.backend.webapi-container /bin/bash
docker exec -it sammai-staging.rs.frontendweb-container /bin/sh

# Ver uso de recursos
docker stats

# Ver redes Docker
docker network ls
docker network inspect staging.sammai-network

# Ver imágenes construidas
docker images | grep sammai

# Limpiar recursos no usados
docker system prune -a

# Ver espacio usado por Docker
docker system df
```

## Operaciones comunes

### Detener la aplicación

```bash
cd /opt/idae/IDAE.UTIL.ReportService/IDAE.UTIL.ReportService.Container

# Detener contenedores (mantiene datos)
docker compose -f docker-compose.sammai-rs-staging.yml stop

# Detener y eliminar contenedores (mantiene imágenes)
docker compose -f docker-compose.sammai-rs-staging.yml down

# Detener y eliminar TODO (contenedores, imágenes, volúmenes)
docker compose -f docker-compose.sammai-rs-staging.yml down --rmi all --volumes
```

### Reiniciar la aplicación

```bash
# Reiniciar ambos servicios
docker compose -f docker-compose.sammai-rs-staging.yml restart

# Reiniciar solo backend
docker compose -f docker-compose.sammai-rs-staging.yml restart rs-backend-webapi

# Reiniciar solo frontend
docker compose -f docker-compose.sammai-rs-staging.yml restart rs-frontend-web
```

### Actualizar la aplicación

```bash
# 1. Obtener nuevos cambios del código
cd /opt/idae/IDAE.UTIL.ReportService
git pull origin main

# 2. Detener contenedores actuales
cd IDAE.UTIL.ReportService.Container
docker compose -f docker-compose.sammai-rs-staging.yml down

# 3. Reconstruir imágenes con nuevos cambios
docker compose -f docker-compose.sammai-rs-staging.yml build --no-cache

# 4. Iniciar con nuevas imágenes
docker compose -f docker-compose.sammai-rs-staging.yml up -d

# 5. Verificar logs
docker compose -f docker-compose.sammai-rs-staging.yml logs -f
```

### Ver logs

```bash
# Logs en tiempo real de todos los servicios
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

### Escalar servicios

```bash
# Crear 3 instancias del frontend
docker compose -f docker-compose.sammai-rs-staging.yml up -d --scale rs-frontend-web=3

# Requiere configurar load balancer (Nginx) para distribuir carga
```

### Backup y restore

```bash
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

## Monitoreo y mantenimiento

### Métricas de contenedores

```bash
# Ver uso de CPU, memoria y red en tiempo real
docker stats

# Ver solo los contenedores de la aplicación
docker stats $(docker ps --filter name=sammai --format "{{.Names}}")
```

### Health checks

Agregar health checks al `docker-compose.yml`:

```yaml
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

```bash
docker compose -f docker-compose.sammai-rs-staging.yml ps
```

### Rotación de logs

Configurar Docker para limitar tamaño de logs:

Editar `/etc/docker/daemon.json` (Linux):

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

Reiniciar Docker:

```bash
sudo systemctl restart docker
```

### Limpieza periódica

```bash
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

```bash
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

```nginx
server {
    listen 443 ssl;
    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/certificate.key;
    # ... resto de configuración
}
```

### Buenas prácticas de seguridad

```bash
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

## Despliegue en producción

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

## 📋 Comparación: Docker vs IIS

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

## 📄 Licencia

Proyecto privado - Todos los derechos reservados

## 👥 Soporte

Para problemas o preguntas:

1. Revisar la sección de **Troubleshooting**
2. Verificar logs de contenedores
3. Consultar documentación oficial de Docker
4. Contactar al equipo de desarrollo

### Recursos útiles

- [Documentación oficial de Docker](https://docs.docker.com/)
- [Docker Compose reference](https://docs.docker.com/compose/compose-file/)
- [Next.js deployment with Docker](https://nextjs.org/docs/deployment)
- [ASP.NET Core in Docker](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/)

---

**Desarrollado con ❤️ por el equipo de IDAE Development**

```

```
