---
sidebar_position: 1
release_version: "2.3.7.1"
release_module: "SAMM App"
---

# Lectura de Valores por Defecto en la Creación de Equipos y Documentos

Este documento describe cómo configurar los valores por defecto de los campos de creación de equipos y documentos en SAMM App mediante la columna `defecto` de las tablas `_columnas`, permitiendo que los campos parametrizados se llenen automáticamente con el valor definido por cada cliente.

Para crear equipos y documentos desde la app, los campos requeridos se parametrizan como visibles con la columna `mostrarEnApp` de las tablas `_columnas`. Algunos clientes necesitan que varios de estos campos ya tengan un valor predefinido, y aunque la columna `defecto` existía en `_columnas`, la app no leía su valor. A partir de esta versión la app lee `defecto` y completa esos campos al guardar.

## Referencias

- [SO-2213: Incorporar lectura de columna "defecto" en tabla _columnas para creación de documentos](https://softwaresamm.atlassian.net/browse/SO-2213)
- [SO-2139: Incorporar lectura de columna "defecto" en tabla _columnas para creación de documentos](https://softwaresamm.atlassian.net/browse/SO-2139)

## Información de Versiones

### Versión de Lanzamiento

:::info **APP 2.0 v2.3.7.1**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción            |
| ------------- | -------------- | ---------------------- |
| SAMM APP      | >= 2.3.7.1     | Aplicación móvil (2.0) |
| SAMMAPI       | >= 1.2.34.5    | API principal          |
| SAMM LOGICA   | >= 5.6.28.0    | Lógica de negocio      |
| CAPADATOS     | >= 2.1.21.1    | Capa de acceso a datos |
| SAMM CORE     | >= 2.0.29.1    | Core del sistema       |
| BASE DE DATOS | >= C2.1.21.1   | Base de datos          |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Las aplicaciones actualizadas a las versiones mínimas indicadas en la sección anterior
- Acceso a la base de datos SAMM con permisos de lectura y actualización sobre las tablas `_columnas`
- Los campos de creación de equipos o documentos ya parametrizados como visibles en la app con `mostrarEnApp`
- Conocimiento del tipo de dato de cada campo, indicado en la columna `tipo`

:::important Importante
El valor de la columna `defecto` debe ser compatible con el tipo de dato definido en la columna `tipo` del mismo registro. No modifique la columna `tipo` al configurar los valores por defecto.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Identificar los campos visibles en la app

Consulte la tabla `_columnas` correspondiente al equipo o al documento y ubique los campos con `mostrarEnApp` activo. Revise el valor actual de `defecto` y el `tipo` de cada campo.

```sql title="Consulta de campos visibles en la app, con su tipo y valor por defecto"
SELECT *
FROM [dbo].[_columnas]
WHERE mostrarEnApp = 1
and tabla='equ_equipo';
```

:::note Nota
Reemplace `equ_equipo` por la tabla  que desea configurar.
:::

### Paso 2: Parametrizar el valor por defecto

Defina en la columna `defecto` el valor con el que debe llenarse cada campo al crear el equipo o el documento. El valor debe respetar el `tipo` del campo.

```sql title="Actualización del valor por defecto de un campo"
UPDATE [dbo].[_columnas]
SET defecto = '<valor por defecto>'
WHERE tabla = <nombre del registro de la columna>
and Columna='nombre de la columna a modificar'
;
```

:::tip Consejo
Valide primero la configuración en un ambiente de pruebas. Confirme el valor guardado con la consulta del paso anterior antes de crear equipos o documentos desde la app.
:::

### Paso 3: Crear un equipo o documento desde la app

Cree un equipo o un documento desde SAMM App, diligencie los campos que requiera y guarde. La app completa los campos configurados con el valor de `defecto` de `_columnas`.

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Valores por defecto aplicados**: al guardar o intentar crear un equipo o un documento, los campos configurados se llenan con el valor de la columna `defecto` de `_columnas`.
2. **Datos del usuario conservados**: el equipo o documento se crea con los valores por defecto más los datos que el usuario diligenció en la app.
3. **Tipo de dato respetado**: cada valor por defecto se guarda conforme al `tipo` definido para el campo.

## Resolución de Problemas

### El campo no se llena con el valor por defecto

Verifique que:

- La columna `defecto` tenga un valor en el registro del campo
- El campo tenga `mostrarEnApp` activo en `_columnas`
- Las aplicaciones cumplan las versiones mínimas de la sección **Versiones Requeridas**
- Se esté editando la tabla `_columnas` correcta (equipo o documento)

### No se puede crear el equipo o el documento

Confirme que:

- El valor de `defecto` sea compatible con el `tipo` del campo
- El valor corresponda a un dato válido para el campo (por ejemplo, que exista en el catálogo relacionado)
- No se haya modificado la columna `tipo` durante la configuración

### El valor por defecto no es el esperado

Revise que:

- El registro actualizado sea el del campo correcto (`id` del `UPDATE`)
- No existan otros registros de `_columnas` con el mismo campo y un `defecto` distinto
- El valor se haya guardado sin espacios ni caracteres adicionales

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Creación de equipo con valor por defecto

**Precondición:** un campo del equipo con `mostrarEnApp` activo y `defecto` configurado.

1. Abra la creación de equipos en SAMM App.
2. Diligencie los demás campos requeridos.
3. Guarde el equipo.

**Resultado esperado:** el equipo **se crea** con el valor de `defecto` en el campo configurado y con los datos diligenciados por el usuario.

### Escenario 2: Creación de documento con valor por defecto

**Precondición:** un campo del documento con `mostrarEnApp` activo y `defecto` configurado.

1. Abra la creación de documentos en SAMM App.
2. Diligencie los demás campos requeridos.
3. Guarde el documento.

**Resultado esperado:** el documento **se crea** con el valor de `defecto` en el campo configurado y con los datos diligenciados por el usuario.

### Escenario 3: Campo sin valor por defecto

**Precondición:** un campo con `mostrarEnApp` activo y `defecto` sin valor.

1. Cree un equipo o un documento desde la app.
2. Diligencie el campo manualmente y guarde.

**Resultado esperado:** el registro **se crea** con el valor que ingresó el usuario, sin ningún valor automático.