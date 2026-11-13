---
sidebar_position: 1
release_version: "7.1.25.0"
release_module: "SAMM New"
---

# Permisos para visualizar y configurar opciones en documentos

Actualmente, la sección **Opciones**, utilizada para agrupar ítems y ofrecer alternativas al cliente, está disponible para todos los perfiles y documentos sin ningún tipo de control de acceso. Esto impide restringir su uso a los perfiles que efectivamente requieren gestionar esta funcionalidad.

Esta mejora incorpora los permisos **Ver Opciones** y **Configurar Opciones**, que controlan de forma independiente la visualización de la sección y la capacidad de configurarla (crear, editar o gestionar opciones). Así, los administradores pueden habilitar o restringir el acceso según el perfil de usuario, con mayor control y seguridad sobre esta característica.

:::note Documentación de la funcionalidad
Este documento cubre únicamente los permisos. Para conocer cómo funciona la sección **Opciones**, consulte la documentación de esa funcionalidad.
:::

## Referencias

| Ticket | Descripción | Enlace |
| :-: | --- | --- |
| SO-2197 | Permisos de opciones de control | [Ver en Jira](https://softwaresamm.atlassian.net/jira/browse/SO-2197) |

## Información de Versiones

:::info Versión de lanzamiento
Esta mejora corresponde al módulo **SAMM New** y está disponible desde la versión `SN V7.1.25.0`.
:::

| Aplicación | Versión mínima |
| --- | :-: |
| `samm_logica` | `5.6.28.0` |
| `capadatos` | `2.1.22.1` |
| `recursos` | No aplica |
| `bd` | `C2.1.22.1` |
| `samcore` | `2.0.30.0` |
| `sammapi` | `1.2.35.2` |

## Requisitos Previos

- Las aplicaciones actualizadas a las versiones mínimas indicadas.
- Un usuario administrador con acceso a la configuración de perfiles.
- Un perfil de prueba con un usuario asociado.
- Un documento que contenga ítems, por ejemplo una cotización con ítems registrados.

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Ingresar a la configuración del perfil

Acceda a SAMM New con un usuario administrador y abra la configuración del perfil al que desea asignar los permisos.

### Paso 2: Ubicar los permisos del documento

En los permisos del perfil, ubique el documento que contiene ítems, por ejemplo `Cotizaciones`. Los permisos de ítems aparecen dentro de cada documento.

```text title="Permisos disponibles por documento"
Ver Opciones
Configurar Opciones
```

### Paso 3: Asignar los permisos según el acceso requerido

Active o desactive cada permiso de forma independiente, según la combinación que necesite el perfil.

| `Ver Opciones` | `Configurar Opciones` | Comportamiento |
| :-: | :-: | --- |
| Desactivado | Desactivado | La sección `Opciones` no se visualiza. |
| Activado | Desactivado | La sección `Opciones` se visualiza en modo de solo lectura. |
| Activado | Activado | El usuario puede visualizar, crear, editar y gestionar opciones. |

### Paso 4: Repetir para los demás documentos

Repita el procedimiento en cada documento que contenga ítems.

:::important Importante
Los permisos son independientes por documento. Activarlos en `Cotizaciones` no los activa en los demás documentos.
:::

## Casos Especiales

- Los permisos se pueden asignar o quitar de manera independiente entre sí.
- Los permisos están disponibles en cada tipo de documento que contiene ítems y deben activarse individualmente según el perfil.

:::warning Perfiles existentes
El criterio de aceptación indica que los perfiles existentes deben conservar el acceso habilitado tras el despliegue. En las pruebas, los permisos quedaron **desactivados por defecto** en un perfil existente, por lo que el administrador debe seleccionarlos. Este comportamiento debe revisarse.
:::

## Resultado Esperado

- Un usuario sin `Ver Opciones` **no visualiza** la sección `Opciones` en ningún documento.
- Un usuario con solo `Ver Opciones` **consulta** la sección en **modo de solo lectura**.
- Un usuario con ambos permisos **visualiza, crea, edita y gestiona** las opciones asociadas a los ítems.

Video de validación del permiso: [Ver evidencia de la funcionalidad](https://www.youtube.com/watch?v=3ngyOozLTfg)

## Resolución de Problemas

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| El usuario no ve la sección `Opciones`. | El permiso `Ver Opciones` está desactivado en el documento. | Active `Ver Opciones` en el perfil, dentro del documento correspondiente. |
| El usuario ve la sección, pero no puede crear ni editar opciones. | Solo tiene `Ver Opciones`; falta `Configurar Opciones`. | Active `Configurar Opciones` en el mismo documento. |
| Los permisos funcionan en un documento y en otro no. | Los permisos son independientes por documento. | Asigne los permisos en cada documento que contenga ítems. |
| Un perfil existente perdió el acceso a `Opciones` tras la actualización. | Los permisos quedan desactivados por defecto. | Active los permisos manualmente en el perfil. |

## Errores Conocidos

No hay tickets abiertos asociados a esta versión. Queda pendiente revisar el comportamiento por defecto de los perfiles existentes descrito en [Casos Especiales](#casos-especiales).

## QA — Pruebas

### Criterios de aceptación

| Criterio | Historia de usuario | Validación esperada |
| :-: | --- | --- |
| 1 | Como administrador del sistema, debería poder asignar o quitar el permiso `Ver Opciones` a un perfil específico, para controlar qué perfiles pueden visualizar la sección de Opciones. | El permiso se asigna o se quita por perfil y controla la visualización de la sección. |
| 2 | Como administrador del sistema, debería poder asignar o quitar el permiso `Configurar Opciones` a un perfil específico, para controlar qué perfiles pueden crear, editar o gestionar las opciones. | El permiso se asigna o se quita por perfil y controla la creación, edición y gestión de opciones. |
| 3 | Como usuario sin el permiso `Ver Opciones`, no debería visualizar la sección de Opciones en ningún documento, para asegurar que el acceso esté restringido correctamente. | La sección `Opciones` no se muestra. |
| 4 | Como usuario con `Ver Opciones` pero sin `Configurar Opciones`, debería poder visualizar la sección en modo solo lectura, para diferenciar los niveles de acceso. | La sección se muestra, pero no permite crear, editar ni gestionar opciones. |
| 5 | Como perfil existente previo a esta implementación, debería mantener su comportamiento actual (acceso habilitado) tras el despliegue, para evitar afectar operaciones en curso, salvo que un administrador modifique explícitamente el permiso. | El perfil conserva el acceso habilitado. Ver la observación en Casos Especiales. |

### Casos de prueba

| # | Criterio | Caso | Descripción | Resultado esperado |
| :-: | :-: | --- | --- | --- |
| 1 | 1 | Asignación de `Ver Opciones` | En la configuración del perfil, ubicar `Cotizaciones` y activar o desactivar `Ver Opciones`. | El permiso se asigna o se quita de forma independiente y controla la visualización de la sección `Opciones`. |
| 2 | 2 | Asignación de `Configurar Opciones` | En la configuración del perfil, ubicar `Cotizaciones` y activar o desactivar `Configurar Opciones`. | El permiso se asigna o se quita de forma independiente y controla la creación, edición y gestión de opciones. |
| 3 | 3 | Usuario sin permisos | Desactivar ambos permisos, iniciar sesión con el usuario del perfil e ingresar a una cotización con ítems. | El usuario no visualiza la sección `Opciones`. |
| 4 | 4 | Solo lectura | Activar solo `Ver Opciones` e ingresar a una cotización con ítems. | El usuario consulta la sección, pero no puede crear, editar ni gestionar opciones. |
| 5 | 2 y 4 | Acceso completo | Activar ambos permisos e ingresar a una cotización con ítems. | El usuario visualiza la sección y crea, edita y gestiona las opciones. |
| 6 | General | Permisos por documento | Revisar los permisos de los documentos que contienen ítems. | Ambos permisos están disponibles en cada documento y se activan individualmente. |
| 7 | 5 | Perfil existente tras la actualización | Revisar el estado de los permisos en un perfil existente después del despliegue. | Los permisos se encuentran desactivados por defecto. Revisar frente al criterio de conservar el acceso habilitado. |