---
sidebar_position: 1
---

# Configuración de Búsqueda en Campos Lista

Este documento establece cómo configurar un campo tipo lista para que pueda manejar la búsqueda por **_exactitud_** o por **_coincidencia_**, y además cumpla con un criterio de búsqueda para la información que se muestra en el campo (**_código_**, **_valor_** o **_ambos_**)

## Referencias

- [SOL31785 - Campo NIT en la ventana de solicitudes](https://softwaresamm.atlassian.net/browse/SO-395)

## Requisitos

- Configuración de la tabla `_columnas`
- Configuración del procedimiento almacenado `a_sel_columnas`
- Disponibilidad del servicio: `{{urlAPI}}/api/docs/campos/{{subtipodocumento}}?aplicacion={{var1}}`

## Información del Servicio

Actualmente existe una enumeración para cada aplicación que permite establecer el valor a enviar dentro del parámetro de la petición:

| Aplicación            | Valor |
| --------------------- | ----- |
| SAMMAPI (por defecto) | 0     |
| SAMMWEB               | 1     |
| MVC                   | 2     |
| APPSAMM               | 3     |
| APPKUBO               | 4     |

### Request

```bash title="Ejemplo de petición"
curl --location 'https://app2.softwaresamm.com/sa_publicado//api/docs/campos/1?aplicacion=0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN1cGVyYWRtaW5pc3RyYWRvciIsIm5hbWUiOiJTdXBlciBBZG1pbiIsIklkVXNlciI6IjEiLCJFaWQiOiIwMSIsIlVpZCI6Ijc5QjctU1ctV1ExMS1BRDJYIiwiYXBwIjoiYXBwU2FtbSIsInZlcnNpb24iOiIxLjEuMCIsImlkX3RlcmNlcm8iOiIyOTM3IiwibmJmIjoxNzY1NDc5Mzc0LCJleHAiOjE3NjU0ODExNzQsImlhdCI6MTc2NTQ3OTM3NCwiaXNzIjoiaHR0cHM6Ly9hcHAyLnNvZnR3YXJlc2FtbS5jb20vc2FfcHVibGljYWRvLyIsImF1ZCI6Ijc5QjctU1ctV1ExMS1BRDJYIn0.2eiu6JYI4KR14tajqM3yRnSSRoLvjDzxnUHSlR7UTqw'
```

### Response

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

## Configuración para Búsqueda Exacta o Coincidencia

Un campo realizará búsqueda exacta si y solo si el campo en la respuesta del servicio tiene `"busExacta": "1"`.

### ¿Cómo establecer el valor?

Se debe ajustar el procedimiento almacenado `a_sel_columnas`.

**Valores permitidos:**

- `1` = Búsqueda exacta
- `0` = Búsqueda por coincidencia

```sql title="Procedimiento a_sel_columnas"
CREATE PROCEDURE [dbo].[a_sel_columnas]
	@p_tabla as varchar(100) = ''
	AS
BEGIN
	SELECT
	*
	,case
		when columna in ('id_tercero_cliente') then 1 else 0
	end as busExacta
	FROM [_columnas]
	WHERE (@p_tabla='' or tabla = @p_tabla) and mostrarEnGrilla > 0
	ORDER BY ordenGrilla
END
```

## Configuración para Tipo de Búsqueda

Todo campo lista puede realizar la búsqueda por alguno de los siguientes criterios, con el fin de hallar la opción que el usuario seleccionará y la propiedad que se tendrá en cuenta en la respuesta del servicio `"tipoBusqueda": 1`:

| Criterio   | Valor |
| ---------- | ----- |
| Por Opción | 1     |
| Por Código | 2     |
| Por Ambas  | 3     |

### ¿Cómo establecer el valor?

Se debe actualizar la columna `tipoBusqueda` en la tabla `_columnas` para el campo deseado, asignando alguno de los tres valores mencionados anteriormente.

**Ejemplo:**

```sql title="Actualización del tipo de búsqueda"
update
  _columnas
set
  tipoBusqueda = 2
where
  tabla = 'doc_documento'
  and columna = 'id_tercero_cliente'
```

## Casos especiales

- Terceros: buscará por `tercero_nit`
- Cátalogos: buscará por `codigoInventario`
- Equipos: buscará por `equipo_serial`
