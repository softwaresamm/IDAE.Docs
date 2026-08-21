---
sidebar_position: 1
release_version: "2.3.4.6"
release_module: "SAMM Técnico (App)"
---

# Requisitos de Dispositivos

Este documento define los requisitos técnicos mínimos y recomendados que deben cumplir los dispositivos móviles (celulares y tabletas) para ejecutar la aplicación **SAMM Técnico** de manera estable en campo.

Las especificaciones se actualizaron tras la migración a **React Native 0.83 con Nueva Arquitectura (Fabric + TurboModules)**, que incorpora un motor gráfico más exigente (cámara, edición de imágenes, animaciones y firma digital) y builds exclusivamente de **64 bits**. Los requisitos anteriores (basados en versiones previas del app) quedaron desactualizados en RAM, almacenamiento, arquitectura de CPU y sensores.

## Información de Versiones

### Versión de Lanzamiento

:::info **v2.3.4.6**
:::

### Plataformas soportadas

| Plataforma | Versión mínima | Notas |
| ---------- | -------------- | ----- |
| Android    | 11 (API 30)    | `targetSdkVersion` = Android 16 (API 36); build **solo 64 bits** (`arm64-v8a`) |
| iOS        | 26 (validado)  | iPhone y iPad de 64 bits. Ver advertencia sobre versiones inferiores |

:::important Arquitectura de CPU
La aplicación se compila **únicamente para procesadores de 64 bits** (ARMv8 / `arm64-v8a`). Se excluyó el soporte de 32 bits (`armeabi-v7a`), por lo que dispositivos antiguos con CPU de 32 bits **no podrán instalar ni ejecutar** el app. En la práctica cualquier equipo con Android 11 o superior cumple este requisito.
:::

:::warning iOS: **iOS 26 como mínimo** para dispositivos Apple.
:::

## Requisitos de Celulares (Android)

| Característica           | Mínimo                          | Recomendado                     |
| ----------------------- | ------------------------------- | ------------------------------- |
| Sistema operativo       | Android 11                      | Android 13 o superior           |
| Procesador              | 64 bits (ARMv8)                 | 64 bits, 8 núcleos              |
| Memoria RAM             | 4 GB                            | 8 GB                          |
| Almacenamiento libre    | 4 GB                            | 8 GB o más                      |
| Cámara                  | Trasera con autoenfoque         | Trasera con autoenfoque         |
| GPS                     | Obligatorio                     | Obligatorio                     |
| NFC                     | Opcional                        | Recomendado (lectura de equipos)|
| Conexión a internet     | 5 Mbps (para sincronización)    | 5 Mbps o más                    |

### Memoria RAM según el tamaño de la lista de chequeo

La RAM necesaria depende de la complejidad de las listas de chequeo utilizadas:

| Tipo de lista de chequeo                                   | RAM recomendada |
| --------------------------------------------------------- | --------------- |
| Pequeñas (sin fotos ni campos condicionales)              | 4 GB            |
| Medianas (hasta ~50 ítems, con fotos o condicionales)     | 8 GB            |
| Extensas (muchos ítems, fotos y condicionales)            | 8 GB            |

:::warning RAM mínima real
La Nueva Arquitectura, el motor de cámara (Vision Camera), la edición de imágenes (Skia) y las animaciones (Reanimated) elevaron el consumo de memoria. En equipos de 2–3 GB el app puede cerrarse por falta de memoria al tomar fotos o abrir listas grandes.
:::

## Requisitos de Tabletas (Android)

Aplican los mismos requisitos de celulares, más:

- **Resolución de pantalla:** 1024 × 600 píxeles o superior.
- **Tamaño de pantalla:** 7 pulgadas o más (recomendado).
- **Tipo de panel:** se recomienda **IPS** sobre TFT, para mejorar los ángulos de visión en campo bajo luz directa.
- **Stylus (opcional):** lápiz de firma de marca reconocida (Targus, Bamboo, etc.) para mayor precisión en la captura de firmas.

## Requisitos de iOS (iPhone / iPad)

| Característica        | Mínimo            | Recomendado       |
| -------------------- | ----------------- | ----------------- |
| Sistema operativo    | iOS 26 | iOS 26 o superior |
| Dispositivo          | iPhone/iPad 64 bits | iPhone/iPad reciente |
| Almacenamiento libre | 4 GB              | 8 GB o más        |
| GPS y cámara         | Obligatorios      | Obligatorios      |

## Sensores y permisos requeridos

La aplicación solicita en tiempo de ejecución los siguientes accesos de hardware; algunos son obligatorios para el flujo principal y otros habilitan funciones específicas:

| Sensor / permiso        | Uso en la aplicación                                             | Obligatorio |
| ----------------------- | --------------------------------------------------------------- | ----------- |
| Cámara                  | Captura de fotos en reportes y lectura de códigos QR            | Sí          |
| Ubicación (GPS)         | Geolocalización de reportes y seguimiento en segundo plano      | Sí          |
| Almacenamiento          | Guardado de imágenes, adjuntos y datos offline                  | Sí          |
| NFC                     | Lectura e identificación de equipos por etiqueta NFC            | No (opcional)|

:::note Ubicación en segundo plano
La app utiliza un *foreground service* de ubicación para registrar la posición durante la ejecución de tareas en campo, por lo que solicita el permiso de **ubicación en segundo plano**. En Android 11+ el usuario debe otorgarlo explícitamente desde ajustes ("Permitir todo el tiempo").
:::

## Conectividad y operación offline

SAMM Técnico es una aplicación **offline-first**: está diseñada para operar sin conexión durante la jornada y **sincronizar automáticamente** con el backend cuando recupera red.

- Se requiere conexión de **5 Mbps o más** para las ventanas de sincronización (descarga de programación, subida de reportes, adjuntos e imágenes).
- Entre sincronizaciones, el técnico puede trabajar completamente offline; los cambios se almacenan localmente (cola de salida) y se envían al reconectar.
- Existe un **modo avión** interno que suspende todo I/O de red de forma intencional.

:::tip Almacenamiento y sincronización
Como las imágenes se almacenan localmente (codificadas) hasta completarse la sincronización, un dispositivo con poco almacenamiento libre puede bloquear el envío de reportes. Se recomienda mantener **al menos 4 GB libres**, y sincronizar con frecuencia para liberar la cola de imágenes.
:::

## Resolución de Problemas

### La aplicación no se instala en el dispositivo

Verifique que:

- El dispositivo tenga **Android 11 (API 30) o superior**, o **iOS 26 o superior**.
- El procesador sea de **64 bits** (no se admiten equipos de 32 bits).
- Haya suficiente almacenamiento libre para la instalación y los datos offline.

### La aplicación se cierra al tomar fotos o abrir listas grandes

Confirme que:

- El dispositivo cuente con al menos **4 GB de RAM** (8 GB para listas medianas o extensas).
- Existan **varios GB de almacenamiento libre** para las imágenes en cola.
- No haya muchas otras aplicaciones consumiendo memoria en segundo plano.

### El reporte no se sincroniza

Revise que:

- Exista conexión a internet estable (**5 Mbps o más**) al momento de sincronizar.
- El **modo avión** interno del app esté desactivado.
- Haya almacenamiento libre suficiente para completar el envío de imágenes.

### En iPhone/iPad la app abre en pantalla negra

Verifique que:

- El dispositivo tenga **iOS 26 o superior**. En versiones inferiores el app se instala desde TestFlight pero no monta la interfaz (pantalla negra al abrir), por la inconsistencia de *deployment target* descrita arriba.
- Sea el binario más reciente publicado en TestFlight.

### La lectura de equipos por NFC no funciona

Verifique que:

- El dispositivo cuente con **hardware NFC** y esté habilitado en ajustes del sistema.
- La etiqueta esté correctamente asociada al equipo en el backend.
