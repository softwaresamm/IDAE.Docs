---
sidebar_position: 3
release_version: "7.1.10.5"
release_module: "SammNew"
---

# Configuración de Campo Obligatorio: Persona Encuestada en Evaluaciones

Este documento describe cómo configurar si el campo "Persona Encuestada" es obligatorio u opcional al momento de diligenciar evaluaciones en el sistema. La configuración se realiza a nivel de base de datos y aplica tanto para la aplicación web como para las integraciones vía API.

## Referencias

- [SO-403: Agregar propiedad esRequeridoPersonaEncuestada en endpoint de evaluaciones](https://softwaresamm.atlassian.net/browse/SO-403)

## Información de Versiones

### Versión de Lanzamiento

:::info **snw7.1.10.5**
:::

:::info **api1.2.19.4**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción                              |
| ---------- | -------------- | ---------------------------------------- |
| sammnew    | >= 7.1.10.5    | Aplicación web principal                 |
| sammapi    | >= 1.2.19.4    | API REST para integraciones              |
| samcore    | >= 2.0.18.3    | Componente core del sistema              |
| capadatos  | >= 2.1.7.0     | Capa de acceso a datos (sin scripts SQL) |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Permisos de administrador en el sistema
- Acceso a la base de datos del sistema
- Conocimiento de los requisitos del negocio respecto a la obligatoriedad del campo

:::tip Preparación
Determine previamente si su organización requiere trazabilidad completa de quién realiza las evaluaciones o si permite evaluaciones anónimas.
:::

## Descripción de la Funcionalidad

### ¿Cómo funciona?

El sistema determina automáticamente si el campo "Persona Encuestada" es obligatorio consultando la configuración en la tabla `[_columnas]` de la base de datos.

#### Criterio de validación

El campo será **obligatorio** cuando exista un registro en la tabla `[_columnas]` que cumpla con las siguientes condiciones:

- `[tabla]` = `'doc_documento_evaluacion'`
- `[columna]` = `'personaEncuestada'`
- `[requerido]` = `1`

Si existe al menos un registro con estas características, el sistema marcará el campo como obligatorio. En caso contrario, será opcional.

### Implementación en API

### Request

```bash title="Ejemplo de petición"
curl --location 'https://app2.softwaresamm.com/sa_publicado/api/docs/evaluaciones/{idSubtipoDocumento}' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN1cGVyYWRtaW5pc3RyYWRvciIsIm5hbWUiOiJTdXBlciBBZG1pbiIsIklkVXNlciI6IjEiLCJFaWQiOiIwMSIsIlVpZCI6Ijc5QjctU1ctV1ExMS1BRDJYIiwiYXBwIjoiYXBwU2FtbSIsInZlcnNpb24iOiIxLjEuMCIsImlkX3RlcmNlcm8iOiIyOTM3IiwibmJmIjoxNzY1NDc5Mzc0LCJleHAiOjE3NjU0ODExNzQsImlhdCI6MTc2NTQ3OTM3NCwiaXNzIjoiaHR0cHM6Ly9hcHAyLnNvZnR3YXJlc2FtbS5jb20vc2FfcHVibGljYWRvLyIsImF1ZCI6Ijc5QjctU1ctV1ExMS1BRDJYIn0.2eiu6JYI4KR14tajqM3yRnSSRoLvjDzxnUHSlR7UTqw'
```

### Response

:::tip Campos Relevantes
El campo `esRequeridoPersonaEncuestada` en la respuesta es el que determina si será o no obligatorio el llenado del campo Persona Encuestada.
:::

```json title="Ejemplo de respuesta"
{
  "evaluaciones": [
    {
      "id": "number",
      "evaluacion": "string",
      "codigo": "string",
      "preguntas": [
        {
          "id": "number",
          "pregunta": "string",
          "codigo": "string",
          "orden": "string",
          "valor": "string",
          "opcResp": [
            {
              "id": "number",
              "opcionRespuesta": "string",
              "codigo": "string",
              "orden": "string",
              "valor": "string"
            }
          ]
        }
      ]
    }
  ],
  "esRequeridoPersonaEncuestada": "boolean"
}
```

#### Descripción de la nueva propiedad

| Campo                          | Tipo    | Descripción                                                                      |
| ------------------------------ | ------- | -------------------------------------------------------------------------------- |
| `esRequeridoPersonaEncuestada` | boolean | Indica si es obligatorio que la persona encuestada agregue su nombre             |
|                                |         | `true`: El campo "Persona Encuestada" es obligatorio                             |
|                                |         | `false`: El campo "Persona Encuestada" es opcional                               |

### Implementación en Aplicación Web

#### Pantallas afectadas

La validación de campo obligatorio aplica en las siguientes pantallas:

1. **Formulario de documento con evaluaciones**
   - Ruta: `/forms/doc/doc_documento_ot.aspx`
   - Ubicación: Tab "Evaluaciones"

     ![alt OT - Tab Evaluaciones](img/surveyed-person-image.png)

2. **Pantalla dedicada de evaluación**
   - Ruta: `/servicios/srv/evaluacion.aspx`
   
     ![alt Evaluación](img/surveyed-person-image-1.png)

#### Comportamiento

**Cuando el campo es obligatorio:**
- El campo "Persona Encuestada" se marca como requerido en el formulario
- El usuario no podrá guardar o enviar la evaluación sin completar este campo
- Se muestra una indicación visual de campo obligatorio

**Cuando el campo no es obligatorio:**
- El usuario puede completar la evaluación sin llenar "Persona Encuestada"
- El formulario permite guardar la información sin este dato

## Configuración

### Paso 1: Verificar Configuración Actual

Ejecute la siguiente consulta para verificar si el campo ya está configurado como obligatorio:
```sql title="Verificar configuración actual"
SELECT *
FROM [_columnas]
WHERE [tabla] = 'doc_documento_evaluacion'
  AND [columna] = 'personaEncuestada'
  AND [requerido] = 1;
```

### Paso 2: Configurar Campo como Obligatorio

#### 2.1 Insertar Registro (si no existe)

Si la consulta anterior no retorna resultados y desea hacer el campo obligatorio:
```sql title="Hacer el campo obligatorio"
INSERT INTO [_columnas] ([tabla], [columna], [requerido])
VALUES ('doc_documento_evaluacion', 'personaEncuestada', 1);
```

:::important Importante
Después de insertar este registro, el campo "Persona Encuestada" será obligatorio en todas las evaluaciones del sistema.
:::

### Paso 3: Configurar Campo como Opcional (si aplica)

#### 3.1 Actualizar Registro (alternativa)

O actualice el campo `[requerido]` a `0`:
```sql title="Hacer el campo opcional - Opción 2"
UPDATE [_columnas]
SET [requerido] = 0
WHERE [tabla] = 'doc_documento_evaluacion'
  AND [columna] = 'personaEncuestada';
```

### Valores de Configuración

| Campo       | Valor                       | Descripción                                 |
| ----------- | --------------------------- | ------------------------------------------- |
| `[tabla]`   | `doc_documento_evaluacion`  | Tabla del sistema relacionada con el módulo |
| `[columna]` | `personaEncuestada`         | Nombre de la columna a validar              |
| `[requerido]` | `1` (obligatorio) / `0` (opcional) | Estado de obligatoriedad del campo   |

:::warning Precaución
Los cambios en la configuración se aplicarán inmediatamente. Asegúrese de comunicar estos cambios a los usuarios que diligencian evaluaciones.
:::

## Casos de Uso

### Caso 1: Evaluaciones de Satisfacción Anónimas

Si su organización desea permitir evaluaciones anónimas, configure el campo como opcional. Esto permite a los usuarios completar las evaluaciones sin proporcionar su identidad.

**Configuración recomendada:** Campo opcional (`[requerido] = 0`)

### Caso 2: Auditoría y Trazabilidad

Si requiere mantener un registro completo de quién realiza cada evaluación para fines de auditoría, configure el campo como obligatorio. Esto garantiza que todas las evaluaciones tengan identificada a la persona que las completó.

**Configuración recomendada:** Campo obligatorio (`[requerido] = 1`)

### Caso 3: Evaluaciones Mixtas

La configuración se puede modificar en cualquier momento según las necesidades del proceso o proyecto específico. Por ejemplo, puede requerirse obligatoriedad durante auditorías y opcionalidad en períodos normales.

**Configuración recomendada:** Ajustar según necesidad temporal

## Resultado Esperado

:::note Comportamiento del Sistema
Estos cambios afectarán a todos los usuarios que diligencien evaluaciones en el sistema, tanto en la aplicación web como en aplicaciones que consuman la API.
:::

### En la Aplicación Web

Una vez completada la configuración, al diligenciar una evaluación:

- **Si el campo es obligatorio:**
  - El campo "Persona Encuestada" mostrará un indicador visual de requerido
  - No se podrá guardar la evaluación sin completar este campo
  - Se mostrará un mensaje de validación si se intenta guardar sin completarlo

- **Si el campo es opcional:**
  - El campo "Persona Encuestada" no mostrará indicador de obligatoriedad
  - Se podrá guardar la evaluación con o sin este dato

### En las Integraciones API

Las aplicaciones que consuman el endpoint de evaluaciones recibirán la propiedad `esRequeridoPersonaEncuestada` y podrán implementar sus propias validaciones basadas en este valor.

## Resolución de Problemas

### El campo no se marca como obligatorio

Confirme que:

- El registro existe en la tabla `[_columnas]` con los valores correctos
- El campo `[requerido]` tiene el valor `1`
- Los nombres de tabla y columna están escritos exactamente como se especifica (respetando mayúsculas/minúsculas si aplica)
- La aplicación ha refrescado la configuración (puede requerir reinicio en algunos casos)

### La API no retorna la propiedad esRequeridoPersonaEncuestada

Verifique que:

- La versión de sammapi sea al menos `api1.2.19.4`
- La versión de capadatos sea al menos `C2.1.7.0`
- El endpoint esté siendo llamado correctamente con un `idSubtipoDocumento` válido

### Los cambios no se reflejan inmediatamente

:::tip Solución
En algunos casos, puede ser necesario limpiar la caché de la aplicación o reiniciar el servicio para que los cambios en la configuración se apliquen completamente.
:::