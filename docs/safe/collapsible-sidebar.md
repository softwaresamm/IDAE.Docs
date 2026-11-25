---
sidebar_position: 8
release_version: "0.15.0"
release_module: "SAFE"
---

# Contraer y Expandir el Menú Lateral

Este documento describe cómo contraer el menú lateral de SAFE a solo íconos y expandirlo de nuevo. Contraer el menú da más espacio a las tablas y formularios amplios; la preferencia se recuerda al navegar y al recargar la página.

## Referencias

- [SO-2285: Permitir expandir y contraer el menú lateral de la aplicación](https://softwaresamm.atlassian.net/browse/SO-2285)

## Información de Versiones

### Versión de Lanzamiento

:::info **FEB V.0.15.0**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción                |
| ---------- | -------------- | -------------------------- |
| SAFE       | >= v0.15.0     | Plataforma SAFE (frontend) |

## Requisitos Previos

Antes de usar la funcionalidad, asegúrese de tener:

- La aplicación actualizada a la versión mínima indicada en la tabla anterior
- Una pantalla de escritorio (1024 px de ancho o más)

## Configuración

### Paso 1: Actualizar la aplicación

Esta funcionalidad no requiere configuración ni cambios en la base de datos ni en la API.

### Paso 2: Contraer o expandir el menú

1. Haga clic en el botón ubicado junto al nombre **SAFE**, en la parte superior del menú lateral (**Contraer menú lateral**).
2. El menú queda solo con íconos. Para volver a verlo completo, haga clic en el mismo botón (**Expandir menú lateral**).

### Paso 3: Navegar con el menú contraído

| Opción del menú                                      | Comportamiento contraído                                         |
| ---------------------------------------------------- | ---------------------------------------------------------------- |
| Opciones directas (Dashboard, Preferencias, Cerrar sesión, …) | Al pasar el cursor se muestra su nombre                 |
| Secciones con varias opciones (**Asociados**, **Novedades**, **Cartera y Créditos**) | Al hacer clic se abre un menú flotante a la derecha con sus opciones; se cierra al navegar |

## Casos Especiales

| Caso                                  | Resultado                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------- |
| Pantalla móvil (menos de 1024 px)     | El menú se abre desde el botón de menú del encabezado y siempre se ve expandido; no aparece el botón para contraer |
| Recarga de la página o cambio de pantalla | Se conserva el estado expandido o contraído                          |
| Otro navegador o equipo               | La preferencia se guarda por navegador: inicia expandido                  |

## Resultado Esperado

Una vez actualizada la aplicación:

1. **Más espacio**: con el menú contraído, las pantallas ganan ancho.
2. **Navegación sin expandir**: los nombres aparecen al pasar el cursor y las secciones abren su menú flotante.
3. **Preferencia recordada**: el menú queda como lo dejó el usuario.

## Resolución de Problemas

### El menú vuelve a aparecer expandido

Verifique que el navegador permita guardar datos del sitio (no esté en modo privado ni con el almacenamiento bloqueado). Sin almacenamiento el botón funciona, pero la preferencia no se conserva al recargar.
