---
sidebar_position: 1
release_version: "0.7.5"
release_module: "Utilidades de Solicitudes"
---

# Configuración de Permisos

Este documento describe cómo configurar permisos a nivel de usuario para controlar acciones específicas sobre el aplicativo, permitiendo habilitar o deshabilitar funcionalidades como la carga de imágenes desde la galería y la edición de descripciones de repuestos en las secciones de repuestos sugeridos e instalados.

## Referencias

- [SO-414: Configurar edición de referencias de repuestos](https://softwaresamm.atlassian.net/browse/SO-414)
- [SO-308: Permiso para tomar fotos desde la galería](https://softwaresamm.atlassian.net/browse/SO-308)

## Información de Versiones

### Versión de Lanzamiento

:::info **v2.1.4.2**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción       |
| ------------- | -------------- | ----------------- |
| SAMMAPI       | >= 1.2.19.6    | API principal     |
| SAMMNEW       | >= 7.1.10.7    | Aplicación web    |
| SAMM LOGICA   | >= 5.6.23.3    | Lógica de negocio |
| SAMM CORE     | >= 2.0.18.5    | Core del sistema  |
| BASE DE DATOS | >= C2.1.7.2    | Base de datos     |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Permisos de administrador en el sistema
- Acceso a la base de datos del sistema
- Conocimiento de la estructura de la tabla `gui_funcionalidad`
- Acceso al repositorio SAMM.DBObjects (para creación de funcionalidades)

:::important Importante
Esta funcionalidad requiere las versiones mínimas especificadas. Verifique sus versiones actuales antes de continuar.
:::

## Información del Servicio

:::note Información
El servicio `/api/seg/obtenerPermiso/{{nombreControl}}` confirma si el usuario tiene permiso para una funcionalidad específica.
:::

El servicio acepta un parámetro `nombreControl` que identifica la funcionalidad a verificar.

#### Funcionalidades Disponibles

| Funcionalidad           | Nombre de Control        | Descripción                                              |
| ----------------------- | ------------------------ | -------------------------------------------------------- |
| Editar nombre repuesto  | editarNombreRepuestoAPP  | Permite editar descripciones de repuestos                |
| Cargar imágenes galería | cargarImagenesGaleriaApp | Permite cargar imágenes desde la galería del dispositivo |

### Request

```bash title="Ejemplo de petición"
curl --location 'https://test.softwaresamm.com/sa_firstmedical//api/seg/obtenerPermiso/cargarImagenesGaleriaApp' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN1cGVyYWRtaW5pc3RyYWRvciIsImFwcCI6ImFwcFNhbW0iLCJ2ZXJzaW9uIjoiMS4xLjAiLCJuYmYiOjE3NjY1MzQyNDgsImV4cCI6MTc2NjUzNjA0OCwiaWF0IjoxNzY2NTM0MjQ4LCJpc3MiOiJodHRwczovL3Rlc3Quc29mdHdhcmVzYW1tLmNvbS9zYV9maXJzdG1lZGljYWwvIiwiYXVkIjoiNzlCNy1TVy1XQTExLTdZR1YifQ.Lq3TFpMdw3k3m4SRuWHL3XOoj46KW8L_cgtpk-WosuY'
```

### Response

```json title="Ejemplo de respuesta"
{
  "tienePermiso": true
}
```

## Configuración

### Paso 1: Verificar existencia de funcionalidades

Asegúrese de que las funcionalidades que desea controlar estén definidas en el sistema. Si no existen, deberá crearlas.

```sql title="Verificar funcionalidades existentes"
select *
from gui_funcionalidad
where nombreControl in ('editarNombreRepuestoAPP','cargarImagenesGaleriaApp')
```

:::tip Consejo
Si las funcionalidades no existen en la tabla, deberá crearlas antes de asignar permisos.
:::

### Paso 2: Creación de Funcionalidades

Si las funcionalidades no existen, créelas utilizando el siguiente script del repositorio SAMM.DBObjects:

**Script de referencia:**
[SAMMAPI/Versions/Grupo2/2.1.7.1/SO_413_2.sql](https://github.com/softwaresamm/SAMM.DBObjects/blob/develop/SAMM.DBObjects/SAMMAPI/Versions/Grupo2/2.1.7.1/SO_413_2.sql)

:::note Información
Este script crea las funcionalidades necesarias en la tabla `gui_funcionalidad` con sus respectivos códigos de control.
:::

### Paso 3: Asignar Permisos a Perfiles

Una vez creadas las funcionalidades, asigne los permisos correspondientes a los perfiles de usuario que requieran acceso a estas funcionalidades.

:::tip Recomendación
Asigne permisos de manera granular, solo a los perfiles que necesiten estas funcionalidades específicas.
:::

## Resultado Esperado

Una vez completada la configuración:

1. **Visualización de Permisos**: Los permisos configurados aparecerán en el árbol de funcionalidades dentro del perfil de usuario
2. **Control de Carga de Imágenes**: Los usuarios con el permiso `cargarImagenesGaleriaApp` podrán cargar imágenes desde la galería del dispositivo
3. **Control de Edición de Repuestos**: Los usuarios con el permiso `editarNombreRepuestoAPP` podrán editar las descripciones de los repuestos

### Visualización de Permisos en Árbol dentro del Perfil

![alt text](./img//permissions.png)

### Cargue de Imágenes desde Galería

![alt text](./img/gallery-permission.png)

### Edición de Descripciones de Repuestos

![alt text](./img//spare-parts-edition.png)

## Resolución de Problemas

### El servicio no retorna el permiso correctamente

Verifique que:

- Las funcionalidades existan en la tabla `gui_funcionalidad`
- El campo `nombreControl` coincida exactamente con el valor configurado
- El usuario tenga el permiso asignado en su perfil
- El token de autorización sea válido y no haya expirado

### Los permisos no aparecen en el árbol de funcionalidades

Confirme que:

- Las funcionalidades estén correctamente creadas con el script proporcionado
- El perfil del usuario tenga asignadas estas funcionalidades
- La aplicación esté consultando la versión actualizada de la base de datos

### El usuario tiene el permiso pero no puede ejecutar la acción

Revise que:

- La versión de la aplicación móvil sea compatible (>= 2.1.4.2)
- El servicio API esté respondiendo correctamente con `"tienePermiso": true`
- No haya restricciones adicionales a nivel de configuración del dispositivo
