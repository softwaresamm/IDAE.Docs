---
sidebar_position: 1
release_version: "0.3.2-beta"
release_module: "Utilitario Reportes"
---

# Centrado de Imágenes en Formatos

Este documento describe cómo utilizar los parámetros opcionales `cw` y `ch` en el servicio de imágenes del Utilitario de Reportes, con el fin de lograr el centrado visual de imágenes dentro de los formatos generados. Antes de esta mejora, las imágenes no contaban con parámetros de dimensionamiento, lo que impedía su correcta alineación y centrado en los reportes.

---

## Referencias

- [SO-682: Centrado de imágenes en formato](https://softwaresamm.atlassian.net/browse/SO-682)

---

## Información de Versiones

### Versión de Lanzamiento

:::info **v0.3.2-beta**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción              |
| ------------- | -------------- | ------------------------ |
| SAMMAPI       | >= 1.2.26.0    | API principal            |
| SAMM LOGICA   | >= 5.6.26.0    | Lógica de negocio        |
| SAMM CORE     | >= 2.0.21.0    | Core del sistema         |
| CAPA DATOS    | >= 2.1.12.0    | Capa de acceso a datos   |
| BASE DE DATOS | >= C2.1.12.0   | Base de datos            |

---

## Requisitos Previos

Antes de utilizar esta funcionalidad, asegúrese de contar con:

- Acceso al módulo **Utilitario de Reportes** (Report Service).
- Un token de autenticación JWT válido para realizar la solicitud al endpoint.
- Conocimiento del `id` de la imagen que se desea consultar.
- Acceso a la documentación Swagger del entorno correspondiente para consultar el endpoint disponible.

:::important Importante
Esta funcionalidad aplica **exclusivamente** para el servicio `report-service`. Los parámetros `cw` y `ch` no tienen efecto en otros servicios o módulos del sistema.
:::

---

## Información del Servicio

:::note Información
El endpoint `/api/report-service/file/image/{id}` permite obtener una imagen asociada a un reporte. Con la incorporación de los parámetros `cw` y `ch`, el servicio ajusta el espacio contenedor de la imagen para simular su centrado dentro del formato, añadiendo márgenes blancos proporcionales alrededor de la imagen original.
:::

### Parámetros del Servicio

| Parámetro | Tipo   | Obligatorio | Descripción                                                                 |
| --------- | ------ | ----------- | --------------------------------------------------------------------------- |
| `id`      | path   | Sí          | Identificador único de la imagen en el sistema                              |
| `t`       | query  | Sí          | Token JWT de autenticación                                                  |
| `cw`      | query  | No          | Ancho del cuadro contenedor de la imagen (en unidades del formato)          |
| `ch`      | query  | No          | Alto del cuadro contenedor de la imagen (en unidades del formato)           |

### Request

```bash title="Ejemplo de petición con parámetros de centrado"
curl --location 'http://{host}/sr_api/api/report-service/file/image/{id}?t={TOKEN}&cw=9.76506&ch=6.37014' \
--header 'Authorization: Bearer {TOKEN}'
```

:::tip Campos destacados
- **`cw`**: Define el ancho total del cuadro donde se renderizará la imagen. El espacio sobrante se distribuye como margen blanco a los lados.
- **`ch`**: Define el alto total del cuadro. El espacio sobrante se distribuye como margen blanco arriba y abajo.
- Ambos parámetros trabajan en conjunto para crear la ilusión de centrado dentro del formato del reporte.
:::

---

## Configuración

### Paso 1: Identificar el ID de la imagen

Antes de construir la URL, es necesario conocer el identificador (`id`) de la imagen que se desea mostrar en el formato. Este valor generalmente se obtiene de una consulta a la base de datos o de los datos dinámicos del reporte.

```sql title="Ejemplo de consulta para obtener el ID de imagen"
-- Obtener el ID de imagen asociado a una orden de trabajo
SELECT ga.id, ga.descripcion
FROM gen_archvio ga
WHERE ga.idobjeto = @p_id
  AND ga.tabla = 'ort_reportetecnico'
```

:::tip Consejo
En contextos de reportes dinámicos, el `id` de la imagen se puede concatenar directamente en la URL usando `CONVERT(VARCHAR(MAX), ga.id)` dentro del script SQL del reporte.
:::

---

### Paso 2: Determinar los valores de `cw` y `ch`

Los valores de `cw` (ancho) y `ch` (alto) deben corresponder al tamaño del contenedor definido en el diseño del formato del reporte. Estos valores representan las dimensiones en unidades del formato (generalmente centímetros según la configuración del reporte).

:::note Nota
Los parámetros `cw` y `ch` **no son obligatorios**. Si no se envían, la imagen se mostrará en su tamaño original sin ajuste de centrado.
:::

**Ejemplo de referencia de dimensiones:**

| Parámetro | Valor de ejemplo | Descripción                              |
| --------- | ---------------- | ---------------------------------------- |
| `cw`      | `9.76506`        | Ancho del contenedor en el formato       |
| `ch`      | `6.37014`        | Alto del contenedor en el formato        |

---

### Paso 3: Construir la URL del endpoint

Una vez obtenidos el `id`, el token de autenticación y los valores de `cw` y `ch`, se construye la URL completa según la siguiente estructura:

```bash title="Estructura de la URL"
http://{host}/sr_api/api/report-service/file/image/{id}?t={TOKEN}&cw={ANCHO}&ch={ALTO}
```

**Ejemplo construido dinámicamente en SQL dentro de un reporte:**

```sql title="Construcción dinámica de la URL en script de reporte"
SELECT
  'http://192.168.0.23/sr_api/api/report-service/file/image/'
  + CONVERT(VARCHAR(MAX), ga.id)
  + '?t=' + @p_token
  + '&cw=9.76506'
  + '&ch=6.37014' AS url_imagen
FROM galeria_archivos ga
WHERE ga.id = @p_id_imagen
```

**Ejemplo de URL completa:**

```bash title="URL completa con token y parámetros de centrado"
http://192.168.0.23/sr_api/api/report-service/file/image/17402?t=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&cw=9.76506&ch=6.37014
```

:::warning Precaución
El token JWT (`t`) tiene un tiempo de expiración. Asegúrese de que el token utilizado en los reportes sea generado dinámicamente para evitar errores de autenticación en tiempo de ejecución.
:::

---

### Paso 4: Validar el endpoint en Swagger

Puede verificar el comportamiento del endpoint directamente desde la documentación Swagger del entorno del cliente, buscando la ruta:

```
GET /api/report-service/file/image/{id}
```

Desde allí es posible probar los parámetros `cw` y `ch` de forma interactiva antes de integrarlos en el reporte.

---

## Casos Especiales

No aplica para esta funcionalidad.

---

## Resultado Esperado

Una vez configurados correctamente los parámetros `cw` y `ch` en la URL del endpoint:

1. **Imagen centrada visualmente**: La imagen se renderiza dentro de un cuadro de las dimensiones especificadas, con espacios en blanco distribuidos proporcionalmente para simular el centrado.
2. **Sin distorsión de la imagen original**: La imagen original no se redimensiona ni se recorta; el centrado se logra mediante el espacio contenedor.
3. **Compatibilidad con formatos de reporte**: El comportamiento es consistente en todos los formatos que utilicen el servicio `report-service` para renderizar imágenes.
4. **Comportamiento sin parámetros**: Si `cw` y `ch` se omiten, la imagen se muestra en su tamaño original sin ajuste de centrado, manteniendo retrocompatibilidad.

---

## Resolución de Problemas

### La imagen no se centra correctamente

Verifique que:

- Los valores de `cw` y `ch` correspondan exactamente a las dimensiones del contenedor definido en el diseño del formato del reporte.
- Los parámetros estén correctamente separados con `&` en la URL (ej: `&cw=9.76506&ch=6.37014`).
- No haya espacios ni caracteres especiales sin codificar en la URL.

### La imagen no se muestra (error de autenticación)

Confirme que:

- El token JWT (`t`) sea válido y no haya expirado en el momento de la solicitud.
- El token se esté generando dinámicamente en el contexto del reporte y no sea un valor estático hardcodeado.
- El usuario cuente con los permisos necesarios para acceder al módulo de `report-service`.

### El endpoint no responde o devuelve error 404

Revise que:

- El `id` de la imagen exista y corresponda a un registro activo en la base de datos.
- La URL del host del cliente sea correcta y el servicio `sr_api` esté en ejecución.
- Las versiones de `SAMMAPI` y `SAMM LOGICA` sean iguales o superiores a las indicadas en la tabla de versiones requeridas.
- El endpoint esté disponible en el Swagger del entorno del cliente bajo la ruta `/api/report-service/file/image/{id}`.

### Los valores de `cw` y `ch` se ignoran

Verifique que:

- La versión de `SAMMAPI` desplegada sea `>= 1.2.26.0`, ya que versiones anteriores no soportan estos parámetros.
- Los parámetros se estén enviando como `query params` en la URL y no como headers o en el body.

---

## Errores Conocidos

No aplica para esta versión.

---

## QA — Pruebas

### Escenario 1: Solicitud con parámetros `cw` y `ch` válidos

**Objetivo:** Verificar que la imagen se renderiza con el centrado esperado cuando se envían ambos parámetros.

**Precondiciones:**
- Token JWT válido disponible.
- `id` de imagen existente en el sistema.

**Pasos:**
1. Construir la URL con el `id` de una imagen existente y los parámetros `cw` y `ch`.
2. Ejecutar la petición GET al endpoint.
3. Observar la imagen retornada.

**Resultado esperado:** La imagen se muestra dentro de un cuadro del tamaño especificado por `cw` y `ch`, con espacios en blanco en los bordes que simulan el centrado.

---

### Escenario 2: Solicitud sin los parámetros `cw` y `ch`

**Objetivo:** Verificar la retrocompatibilidad del endpoint cuando no se envían los parámetros opcionales.

**Precondiciones:**
- Token JWT válido disponible.
- `id` de imagen existente en el sistema.

**Pasos:**
1. Construir la URL con el `id` de una imagen existente, sin incluir `cw` ni `ch`.
2. Ejecutar la petición GET al endpoint.
3. Observar la imagen retornada.

**Resultado esperado:** La imagen se muestra en su tamaño original sin ningún ajuste de centrado. No se generan errores.

---

### Escenario 3: Solicitud con token expirado o inválido

**Objetivo:** Verificar que el sistema rechaza correctamente solicitudes con autenticación inválida.

**Pasos:**
1. Construir la URL con un token JWT expirado o malformado.
2. Ejecutar la petición GET al endpoint.

**Resultado esperado:** El servicio retorna un error de autenticación (HTTP 401 o equivalente). La imagen no se entrega.

---

### Escenario 4: Solicitud con `id` de imagen inexistente

**Objetivo:** Verificar el comportamiento del endpoint ante un identificador inválido.

**Pasos:**
1. Construir la URL con un `id` que no exista en la base de datos.
2. Ejecutar la petición GET al endpoint.

**Resultado esperado:** El servicio retorna un error de recurso no encontrado (HTTP 404 o equivalente). No se produce una excepción no controlada.
