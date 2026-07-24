---
sidebar_position: 1
release_version: "2.3.3.1"
release_module: "App Técnicos"
---

# Creación de Equipos en el Menú de Gestión de Equipos

Este documento describe la nueva opción de **creación de equipos** disponible en el menú de **Gestión de Equipos** de la App Técnicos, la cual permite registrar nuevos equipos directamente desde la aplicación móvil. Anteriormente, este menú solo permitía consultar y editar equipos existentes, sin ofrecer la posibilidad de crear nuevos registros desde el dispositivo.

## Referencias

- **SO-722 / SOL-33123**: Creación de equipos en el menú de gestión de equipos *(URL de Jira pendiente de asignar)*

## Información de Versiones

### Versión de Lanzamiento

:::info **v2.3.3.1**
:::

### Versiones Requeridas

| Aplicación      | Versión Mínima | Descripción                    |
| --------------- | --------------- | ------------------------------- |
| SAMM NEW        | >= 7.1.14.0     | Aplicación web                  |
| SAMM LOGICA     | >= 5.6.26.1     | Lógica de negocio               |
| CAPA DE DATOS   | >= 2.1.15.1     | Capa de acceso a datos          |
| RECURSOS        | -               | No aplica versión mínima        |
| SAM CORE        | >= 2.0.24.1     | Core del sistema                |
| SAMMAPI         | >= 1.2.30.1     | API principal                   |
| BASE DE DATOS   | >= C2.1.15.1    | Base de datos                   |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- La **App Técnicos** instalada en la versión `2.3.3.1` o superior.
- Acceso con permisos de administrador a la base de datos de SAMM para editar la tabla `_columnas`.
- Conocimientos básicos de **SQL Server** para ejecutar sentencias `SELECT` y `UPDATE`.

:::important Importante
Los campos que se mostrarán en el formulario de creación de equipos dependen directamente de la parametrización realizada en la tabla `_columnas`. Si esta configuración no se realiza correctamente, el formulario de creación podría no mostrar los campos esperados.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Verificar la versión de la app instalada

Confirme que el dispositivo cuenta con la **App Técnicos** en la versión `2.3.3.1` o superior, ya que esta versión incluye la nueva opción de creación de equipos en el menú de Gestión de Equipos.

### Paso 2: Configuración de la tabla `_columnas`

Este paso define qué campos estarán disponibles y en qué orden se mostrarán en el formulario de creación de equipos dentro del app.

#### 2.1 Validar campos disponibles

Ejecute la siguiente consulta para identificar los campos habilitados para mostrarse en el API:

```sql title="Consulta de campos disponibles para creación de equipos"
SELECT tabla, columna, *
FROM _columnas
WHERE tabla = 'equ_equipo'
  AND mostrarEnAPI = 1
ORDER BY ordenEdicion;
```

#### 2.2 Configurar el orden de edición de los campos básicos

Ejecute las siguientes sentencias para definir el orden en que se mostrarán los campos básicos en el formulario de creación:

```sql title="Configuración del orden de edición de campos básicos"
UPDATE _columnas SET ordenEdicion = '1'  WHERE tabla = 'equ_equipo' AND columna = 'equipo';
UPDATE _columnas SET ordenEdicion = '2'  WHERE tabla = 'equ_equipo' AND columna = 'equipo_codigo';
UPDATE _columnas SET ordenEdicion = '3'  WHERE tabla = 'equ_equipo' AND columna = 'equipo_serial';
UPDATE _columnas SET ordenEdicion = '4'  WHERE tabla = 'equ_equipo' AND columna = 'id_zona';
UPDATE _columnas SET ordenEdicion = '5'  WHERE tabla = 'equ_equipo' AND columna = 'ubicacion';
UPDATE _columnas SET ordenEdicion = '6'  WHERE tabla = 'equ_equipo' AND columna = 'fechaPuestaMarcha_fh';
UPDATE _columnas SET ordenEdicion = '7'  WHERE tabla = 'equ_equipo' AND columna = 'horometroActual';
UPDATE _columnas SET ordenEdicion = '8'  WHERE tabla = 'equ_equipo' AND columna = 'id_catalogo.equipo';
UPDATE _columnas SET ordenEdicion = '9'  WHERE tabla = 'equ_equipo' AND columna = 'id_tercero';
UPDATE _columnas SET ordenEdicion = '10' WHERE tabla = 'equ_equipo' AND columna = 'id_sucursal';
UPDATE _columnas SET ordenEdicion = '11' WHERE tabla = 'equ_equipo' AND columna = 'id_estadoEquipo';
```

:::tip Consejo
Después de ejecutar los `UPDATE`, vuelva a ejecutar la consulta del punto 2.1 para confirmar que los campos quedaron correctamente parametrizados y en el orden esperado.
:::

### Resultado de la Parametrización

![Consulta de columnas parametrizadas para la creación de equipos](./img/Consulta%20creacion%20equipos.png)

### Paso 3: Validación de campos en el app

Ingrese al menú de **Gestión de Equipos** en la App Técnicos y verifique que los campos configurados en el Paso 2 se muestren correctamente en el formulario de creación de un nuevo equipo, respetando el orden definido en `ordenEdicion`.

![Formulario de creación de equipos en la App Técnicos](./img/creación%20equipos%20app.png)

Para una mayor compresion ver el video de apoyo del resultado esperado https://youtu.be/qIcpbUeYbNo

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Formulario de creación disponible**: El menú de Gestión de Equipos en la App Técnicos muestra la opción de creación de un nuevo equipo con los campos parametrizados en `_columnas`.
2. **Registro exitoso**: Al completar y guardar el formulario, el equipo queda creado y visible tanto en la aplicación web (SAMM New) como en el app.
3. **Confirmación visual**: La app muestra el mensaje **"Equipo creado"** al finalizar exitosamente el registro.

## Resolución de Problemas

### El formulario de creación no muestra los campos esperados

Verifique que:

- Los registros correspondientes en `_columnas` tengan `mostrarEnAPI = 1` para la tabla `equ_equipo`.
- Los valores de `ordenEdicion` se hayan actualizado correctamente según el Paso 2.2.
- El dispositivo tenga instalada la versión `2.3.3.1` o superior de la App Técnicos.

### El equipo no se crea o no aparece el mensaje "Equipo creado"

Confirme que:

- Las versiones mínimas de `SAMM NEW`, `SAMM LOGICA`, `CAPA DE DATOS`, `SAM CORE` y `SAMMAPI` cumplen con lo indicado en la tabla de Versiones Requeridas.
- El usuario cuenta con los permisos necesarios para crear equipos desde la app.
- No existan errores de conexión entre la app y el API al momento de enviar el formulario.

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Creación exitosa de un equipo con campos parametrizados

1. Ingresar al menú de **Gestión de Equipos** en la App Técnicos.
2. Seleccionar la opción de **crear nuevo equipo**.
3. Completar todos los campos parametrizados en `_columnas` (equipo, código, serial, zona, ubicación, etc.).
4. Guardar el registro.
5. **Resultado esperado**: La app muestra el mensaje `Equipo creado` y el equipo queda visible en la web SAMM New.

### Escenario 2: Validación del orden de los campos en el formulario

1. Ejecutar la consulta de validación sobre `_columnas` (Paso 2.1).
2. Ingresar al formulario de creación de equipos en la app.
3. **Resultado esperado**: Los campos se muestran en el mismo orden definido por el valor de `ordenEdicion` en la base de datos.

