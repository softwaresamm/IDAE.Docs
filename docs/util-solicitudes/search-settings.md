---
sidebar_position: 1
release_version: "0.7.5"
release_module: "Utilidades de Solicitudes"
---

# Configuración de Búsqueda en Campos Lista

Este documento describe cómo configurar campos tipo lista para controlar el comportamiento de búsqueda (exactitud o coincidencia) y establecer el criterio de búsqueda (por código, valor o ambos) que se aplicará al buscar información.

## Referencias

- [SO-395: SOL31785 - Campo NIT en la ventana de solicitudes](https://softwaresamm.atlassian.net/browse/SO-395)
- [SO-424: Al manejar busqueda exacta, al escribir y borrar el texto sobre el primer campo, no respeta la configuración y muestra opciones](https://softwaresamm.atlassian.net/browse/SO-424)

## Información de Versiones

### Versión de Lanzamiento

:::info **v0.7.6**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción   |
| ---------- | -------------- | ------------- |
| SAMMAPI    | >= 1.0.5.7     | API principal |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Permisos de administrador en el sistema
- Acceso a la base de datos del sistema
- Conocimiento del esquema de la tabla `_columnas`
- Capacidad para modificar procedimientos almacenados
- Acceso al servicio API: `{{urlAPI}}/api/docs/campos/{{subtipodocumento}}?aplicacion={{var1}}`

:::important Importante
Esta funcionalidad requiere la versión mínima especificada de SAMMAPI. Verifique su versión actual antes de continuar.
:::

## Información del Servicio

:::note Información
El servicio `api/docs/campos` retorna la configuración de todos los campos (principales y atributos) para un subtipo de documento específico.
:::

El servicio acepta un parámetro `aplicacion` que identifica desde qué aplicación se realiza la petición:

| Aplicación            | Valor | Descripción      |
| --------------------- | ----- | ---------------- |
| SAMMAPI (por defecto) | 0     | API principal    |
| SAMMWEB               | 1     | Aplicación web   |
| MVC                   | 2     | Aplicación MVC   |
| APPSAMM               | 3     | Aplicación móvil |
| APPKUBO               | 4     | Aplicación Kubo  |

### Request

```bash title="Ejemplo de petición"
curl --location 'https://app2.softwaresamm.com/sa_publicado//api/docs/campos/1?aplicacion=0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN1cGVyYWRtaW5pc3RyYWRvciIsIm5hbWUiOiJTdXBlciBBZG1pbiIsIklkVXNlciI6IjEiLCJFaWQiOiIwMSIsIlVpZCI6Ijc5QjctU1ctV1ExMS1BRDJYIiwiYXBwIjoiYXBwU2FtbSIsInZlcnNpb24iOiIxLjEuMCIsImlkX3RlcmNlcm8iOiIyOTM3IiwibmJmIjoxNzY1NDc5Mzc0LCJleHAiOjE3NjU0ODExNzQsImlhdCI6MTc2NTQ3OTM3NCwiaXNzIjoiaHR0cHM6Ly9hcHAyLnNvZnR3YXJlc2FtbS5jb20vc2FfcHVibGljYWRvLyIsImF1ZCI6Ijc5QjctU1ctV1ExMS1BRDJYIn0.2eiu6JYI4KR14tajqM3yRnSSRoLvjDzxnUHSlR7UTqw'
```

### Response

:::tip Campos Relevantes
Los campos `busExacta` y `tipoBusqueda` en la respuesta son los que controlan el comportamiento de búsqueda de cada campo lista.
:::

```json title="Ejemplo de respuesta"
{
  "principales": [
    {
      "filtro": "esCliente = 1",
      "busExacta": "1",
      "id": "id_tercero_cliente",
      "item": "Cliente",
      "seccion": "",
      "tipo": "tabla",
      "obligatorio": false,
      "servicio": "api/buscar/tercero",
      "tipoBusqueda": 3
    }
  ],
  "atributos": [
    {
      "id": 726,
      "item": "texto Corto",
      "seccion": "SOL 26707",
      "seccion_codigo": "sol",
      "tipo": "texto",
      "orden": "0",
      "dependiente": false,
      "obligatorio": true,
      "opciones": []
    }
  ]
}
```

## Configuración

### Paso 1: Configurar Búsqueda Exacta o por Coincidencia

Un campo realizará búsqueda exacta cuando el campo en la respuesta del servicio contenga `"busExacta": "1"`.

#### Valores Permitidos

| Valor | Tipo de Búsqueda          | Descripción                                   |
| ----- | ------------------------- | --------------------------------------------- |
| `1`   | Búsqueda exacta           | Busca coincidencia exacta del texto ingresado |
| `0`   | Búsqueda por coincidencia | Busca cualquier texto que contenga el valor   |

#### Modificar Procedimiento Almacenado

Debe ajustar el procedimiento almacenado `a_sel_columnas` para establecer qué campos utilizarán búsqueda exacta:

```sql title="Ejemplo de procedimiento a_sel_columnas"
CREATE PROCEDURE [dbo].[a_sel_columnas]
    @p_tabla AS VARCHAR(100) = ''
AS
BEGIN
    SELECT
        *,
        CASE
            WHEN columna IN ('id_tercero_cliente', 'otro_campo') THEN 1
            ELSE 0
        END AS busExacta
    FROM [_columnas]
    WHERE (@p_tabla = '' OR tabla = @p_tabla)
        AND mostrarEnGrilla > 0
    ORDER BY ordenGrilla
END
```

:::tip Consejo
Agregue los nombres de columnas que requieran búsqueda exacta dentro del `IN` del `CASE`, separados por comas.
:::

### Paso 2: Configurar Tipo de Búsqueda

Cada campo lista puede configurarse para buscar por código, por valor (opción) o por ambos criterios simultáneamente.

#### Tipos de Búsqueda Disponibles

| Tipo       | Valor | Descripción                                   | Ejemplo de Uso               |
| ---------- | ----- | --------------------------------------------- | ---------------------------- |
| Por Opción | `1`   | Busca únicamente por el nombre/valor mostrado | Buscar por nombre de cliente |
| Por Código | `2`   | Busca únicamente por el código del registro   | Buscar por NIT               |
| Por Ambas  | `3`   | Busca tanto por código como por nombre/valor  | Buscar por NIT o nombre      |

:::tip Recomendación

- Use **tipo 1** cuando los usuarios solo conozcan el nombre/descripción del registro
- Use **tipo 2** cuando los usuarios trabajen principalmente con códigos (NIT, serial, etc.)
- Use **tipo 3** para máxima flexibilidad, permitiendo buscar por código o nombre
  :::

#### Actualizar Configuración en Base de Datos

Modifique la columna `tipoBusqueda` en la tabla `_columnas` para el campo deseado:

```sql title="Actualizar tipo de búsqueda"
UPDATE _columnas
SET tipoBusqueda = 3 -- Reemplace con el valor deseado (1, 2 o 3)
WHERE tabla = 'doc_documento'
    AND columna = 'id_tercero_cliente';
```

:::important Importante
El valor de `tipoBusqueda` se reflejará en la respuesta del servicio en el campo `"tipoBusqueda"` para cada columna configurada.
:::

### Casos Especiales

:::note Comportamientos Predefinidos
Estos campos tienen lógica especial en el sistema y utilizan campos específicos para la búsqueda por código.
:::

Algunos tipos de campos tienen comportamientos de búsqueda predefinidos:

| Tipo de Campo | Campo de Búsqueda  | Descripción                                               |
| ------------- | ------------------ | --------------------------------------------------------- |
| Terceros      | `tercero_nit`      | La búsqueda por código utilizará el campo NIT del tercero |
| Catálogos     | `codigoInventario` | La búsqueda por código utilizará el código de inventario  |
| Equipos       | `equipo_serial`    | La búsqueda por código utilizará el serial del equipo     |

## Resultado Esperado

Una vez completada la configuración:

1. **Búsqueda Exacta**: Los campos configurados con `busExacta = 1` solo mostrarán resultados que coincidan exactamente con el texto ingresado
2. **Búsqueda por Coincidencia**: Los campos con `busExacta = 0` mostrarán todos los resultados que contengan el texto ingresado
3. **Tipo de Búsqueda**: El sistema buscará según el criterio configurado:
   - `tipoBusqueda = 1`: Solo busca en nombres/valores
   - `tipoBusqueda = 2`: Solo busca en códigos
   - `tipoBusqueda = 3`: Busca en ambos campos

## Resolución de Problemas

### El campo no realiza búsqueda exacta

Verifique que:

- El procedimiento `a_sel_columnas` incluya la columna en la lista del `CASE`
- El procedimiento retorne correctamente el campo `busExacta`
- La aplicación esté consultando la versión actualizada del procedimiento

### La búsqueda por código no funciona

Confirme que:

- El campo `tipoBusqueda` en la tabla `_columnas` tenga el valor `2` o `3`
- La respuesta del servicio incluya el campo `tipoBusqueda` con el valor correcto
- Los datos tengan el campo de código correctamente poblado

### No aparecen resultados al buscar

Revise que:

- Los datos existan en la tabla correspondiente
- El servicio configurado en el campo esté respondiendo correctamente
- Los filtros adicionales no estén bloqueando los resultados

## Errores Conocidos

- [SO-433: Manejo de dependencias en filtros de prioridades](https://softwaresamm.atlassian.net/browse/SO-433): No se respeta configuración de prioridades por subtipo de documento, actualmente se listan todas las prioridades disponibles por tipo de documento.
