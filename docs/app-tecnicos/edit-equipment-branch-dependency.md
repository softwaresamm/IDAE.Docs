---
sidebar_position: 1
release_version: "V2.3.0.9"
release_module: "Gestión de Equipos"
---

# Dependencia de Sucursal al Editar Equipo

Este documento describe la mejora implementada en el módulo de **Gestión de Equipos**, donde el campo `Sucursal` pasa a ser dependiente del campo `Tercero` al momento de editar un equipo. Con esta configuración, solo se mostrarán las sucursales asociadas al tercero seleccionado, evitando que el usuario visualice sucursales de otros terceros durante el proceso de edición.

---

## Referencias

- [SO-561: Dependencia al momento de editar equipos, sucursales de un tercero](https://softwaresamm.atlassian.net/browse/SO-561)

---

## Información de Versiones

### Versión de Lanzamiento

:::info **V2.3.0.9**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción      |
| ---------- | -------------- | ---------------- |
| SAMMAPI    | >= 1.2.24.0    | API principal    |
| SAMMNEW    | >= 7.1.11.4    | Aplicación web   |

---

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Acceso a la base de datos con permisos de escritura sobre la tabla `_columnas`
- Conocimiento básico de la estructura de la tabla `equ_equipo` y sus columnas relacionadas

:::important Importante
Al tener acceso a la base de datos, se recomienda hacer cualquier accion con bastante cuidado
:::

---

## Información del Servicio

:::note Información
El servicio se utiliza para consultar los campos de información general y los atributos asociados a un modelo de equipo. Retorna la lista de campos activos que deben mostrarse en la API y en la aplicación, incluyendo la configuración del campo `Sucursal` con su dependencia al campo `Tercero`.
:::

### Parámetros del Servicio

| Parámetro   | Valor | Descripción                                      |
| ----------- | ----- | ------------------------------------------------ |
| id_modelo   | 18    | Identificador numérico del modelo de equipo      |

### Request

```bash title="Ejemplo de petición al servicio de atributos"
postman request 'https://dev.softwaresamm.com/sa_test/api/equ/campos/75' \
  --header 'Authorization: ••••••' \
  --header 'Cookie: .ASPXAUTH=2EEEC25FA7F5858BCA4D31F734F131FA75399638CC23ABDE6DBB5FB4D7BD3EE5010A44E77FF0D75FB717A66E69A1E192C55B3A16D7C3C7D622B5D0C2D10AAF72B97BC7EDEA7EA8C737D2463E2BB6E604B6A792E5; ASP.NET_SessionId=2u5322ztgmoviuqz2uvbcgco' \
  --auth-bearer-token 'xxxxxxxxx'
```
### Response

```json title="Ejemplo de respuesta del servicio de atributos"
{
  "principales": [
    {
      "id": "equipo",
      "item": "Equipo",
      "seccion": "secciones de atributos uno",
      "tipo": "textoLargo",
      "obligatorio": false
    },
    {
      "id": "equipo_codigo",
      "item": "Codigo",
      "seccion": "secciones de atributos uno",
      "tipo": "texto",
      "obligatorio": false,
      "longitud": "100"
    },
    {
      "id": "equipo_serial",
      "item": "Serial",
      "seccion": "secciones de atributos uno",
      "tipo": "texto",
      "obligatorio": false,
      "longitud": "100"
    },
    {
      "id": "observaciones",
      "item": "Observaciones",
      "seccion": "secciones de atributos uno",
      "tipo": "textoLargo",
      "obligatorio": false
    },
    {
      "id": "horometroActual",
      "item": "Horometro",
      "seccion": "secciones de atributos uno",
      "tipo": "numero",
      "obligatorio": false
    },
    {
      "filtro": "1=1",
      "busExacta": "0",
      "id": "id_catalogo_equipo",
      "item": "Modelo",
      "seccion": "secciones de atributos uno",
      "tipo": "lista",
      "obligatorio": false,
      "opciones": [
        { "id": 5,  "opcion": "Prueba modelo Equipos",           "codigo": "PME"     },
        { "id": 6,  "opcion": "prueba elemento componentes dos", "codigo": "pep"     },
        { "id": 7,  "opcion": "prueba elemento componentes tres","codigo": "pec"     },
        { "id": 18, "opcion": "equipo_conhorometro",             "codigo": "12"      },
        { "id": 35, "opcion": "modelo sammnew",                  "codigo": "2345321" },
        { "id": 39, "opcion": "IDEAPAD S145",                    "codigo": "S145"    },
        { "id": 43, "opcion": "MOTOG41L",                        "codigo": "S3RWS"   },
        { "id": 66, "opcion": "MODELO 1 GERMAN",                 "codigo": "geco1"   },
        { "id": 67, "opcion": "MODELO2 GERMAN",                  "codigo": "geco2"   },
        { "id": 73, "opcion": "equipos sin horometro",           "codigo": "equ_dani"}
      ],
      "tipoBusqueda": 1
    },
    {
      "filtro": "1=1",
      "busExacta": "0",
      "id": "id_sucursal",
      "item": "Sucursal",
      "seccion": "secciones de atributos uno",
      "tipo": "tabla",
      "obligatorio": false,
      "servicio": "api/buscar/sucursal",
      "tipoBusqueda": 1
    },
    {
      "filtro": "1=1",
      "busExacta": "0",
      "id": "id_tercero",
      "item": "Tercero",
      "seccion": "secciones de atributos uno",
      "tipo": "tabla",
      "obligatorio": false,
      "servicio": "api/buscar/tercero",
      "tipoBusqueda": 1
    }
  ],
  "atributos": []
}
```

:::tip Campos clave en el response
Se deben visualizar únicamente los campos que tengan activos los atributos `mostrarEnAPI` y `mostrarEnApp` en la tabla `_columnas`. El orden de presentación de los campos está controlado por la columna `orden` de la misma tabla.
:::

---

## Configuración

### Paso 1: Configuración en la tabla `_columnas` para `equ_equipo`

En este paso se habilitan las columnas necesarias para que el servicio las exponga correctamente en la API y en la aplicación web. Es necesario activar las columnas `mostrarEnAPI` y `mostrarEnApp` para las columnas `equipo_codigo`, `equipo_serial`, `id_tercero` e `id_sucursal` de la tabla `equ_equipo`.

#### Activar columnas en `_columnas`

Ejecute el siguiente script SQL en la base de datos del sistema:

```sql title="Activar columnas en _columnas para equ_equipo"
UPDATE _columnas
SET mostrarEnAPI = 1,
    mostrarEnApp = 1
WHERE tabla = 'equ_equipo'
  AND columna IN ('equipo_codigo', 'equipo_serial', 'id_tercero', 'id_sucursal');
```

:::tip Consejo
Verifique el resultado del `UPDATE` revisando el número de filas afectadas. Deben ser exactamente **4 filas**. Si el número es diferente, confirme que las columnas existen en la tabla `_columnas` para la tabla `equ_equipo`.
:::

:::note Nota sobre el orden de campos
Se debe dar orden a los campos desde la columna `orden` en la tabla `_columnas`. Asegúrese de que los campos `id_tercero` e `id_sucursal` tengan un orden coherente para que la dependencia funcione correctamente en el formulario de edición.
:::

---

## Resultado Esperado

Una vez completada la configuración:

1. **Campo Sucursal dependiente**: Al ingresar al formulario de edición de un equipo y seleccionar o cambiar el campo `Tercero`, el campo `Sucursal` mostrará únicamente las sucursales asociadas a ese tercero.
2. **Campos visibles en API y App**: Las columnas `equipo_codigo`, `equipo_serial`, `id_tercero` e `id_sucursal` estarán disponibles tanto en la API como en la aplicación web.

---

## Resolución de Problemas

---

## Errores Conocidos

No se registran errores conocidos sin resolver para esta funcionalidad en la versión `V2.3.0.9`.

---

### Escenario 1: Sucursal depende del Tercero seleccionado

**Descripción:** Verificar que al seleccionar un tercero en el formulario de edición de equipo, el campo Sucursal solo muestra las sucursales de ese tercero.

**Pasos:**

1. Ingresar al módulo **Gestión de Equipos**
2. Seleccionar un equipo existente y hacer clic en **Editar equipo**
3. En el campo `Tercero`, seleccionar un tercero con al menos dos sucursales registradas
4. Observar el campo `Sucursal`

**Resultado esperado:** El campo `Sucursal` muestra únicamente las sucursales asociadas al tercero seleccionado en el paso 3.

---
