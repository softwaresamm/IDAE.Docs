# Configuración de Campo Obligatorio: Persona Encuestada en Evaluaciones

## Descripción General

Esta funcionalidad permite configurar si el campo "Persona Encuestada" es obligatorio u opcional al momento de diligenciar evaluaciones en el sistema. La configuración se realiza a nivel de base de datos y aplica tanto para la aplicación web como para las integraciones vía API.

## Referencias

- [SO-403: Agregar propiedad que indicará si el campo "persona encuestada" es obligatorio o no, en servicio de encuestas](https://softwaresamm.atlassian.net/browse/SO-403)

## ¿A quién está dirigida esta funcionalidad?

Esta característica es especialmente útil para consultores y administradores del sistema que necesitan:

- Controlar la obligatoriedad del campo "Persona Encuestada" según los requisitos del negocio
- Garantizar la trazabilidad de quién realiza las evaluaciones cuando sea necesario
- Mantener flexibilidad en el diligenciamiento de evaluaciones cuando no se requiera este dato

## ¿Cómo funciona?

El sistema determina automáticamente si el campo "Persona Encuestada" es obligatorio consultando la configuración en la tabla `[_columnas]` de la base de datos.

### Criterio de validación

El campo será **obligatorio** cuando exista un registro en la tabla `[_columnas]` que cumpla con las siguientes condiciones:

- `[tabla]` = `'doc_documento_evaluacion'`
- `[columna]` = `'personaEncuestada'`
- `[requerido]` = `1`

Si existe al menos un registro con estas características, el sistema marcará el campo como obligatorio. En caso contrario, será opcional.

## Implementación en API

### Endpoint afectado
```
GET {{urlAPI}}/api/docs/evaluaciones/{idSubtipoDocumento}
```

### Nueva propiedad en la respuesta

El endpoint ahora incluye la propiedad `esRequeridoPersonaEncuestada` en el JSON de respuesta:
```json
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

### Descripción de la propiedad

- **esRequeridoPersonaEncuestada** (boolean): Indica si es obligatorio que la persona encuestada agregue su nombre al diligenciar la evaluación.
  - `true`: El campo "Persona Encuestada" es obligatorio
  - `false`: El campo "Persona Encuestada" es opcional

## Implementación en Aplicación Web

### Pantallas afectadas

La validación de campo obligatorio aplica en las siguientes pantallas:

1. **Formulario de documento con evaluaciones**
   - Ruta: `/forms/doc/doc_documento_ot.aspx`
   - Ubicación: Tab "Evaluaciones"
     ![alt text](img/surveyed-person-image.png)

2. **Pantalla dedicada de evaluación**
   - Ruta: `/servicios/srv/evaluacion.aspx`
     ![alt text](img/surveyed-person-image-1.png)
### Comportamiento

Cuando el sistema identifica que el campo es obligatorio según la configuración:

- El campo "Persona Encuestada" se marca como requerido en el formulario
- El usuario no podrá guardar o enviar la evaluación sin completar este campo
- Se muestra una indicación visual de campo obligatorio

Cuando el campo no es obligatorio:

- El usuario puede completar la evaluación sin llenar "Persona Encuestada"
- El formulario permite guardar la información sin este dato

## Configuración

### Hacer el campo obligatorio

Para activar la obligatoriedad del campo "Persona Encuestada", debe existir un registro en la tabla `[_columnas]` con los siguientes valores:
```sql
INSERT INTO [_columnas] ([tabla], [columna], [requerido])
VALUES ('doc_documento_evaluacion', 'personaEncuestada', 1)
```

### Hacer el campo opcional

Para desactivar la obligatoriedad, elimine o modifique el registro correspondiente:
```sql
DELETE FROM [_columnas]
WHERE [tabla] = 'doc_documento_evaluacion'
  AND [columna] = 'personaEncuestada'
  AND [requerido] = 1
```

O actualice el campo `[requerido]` a `0`:
```sql
UPDATE [_columnas]
SET [requerido] = 0
WHERE [tabla] = 'doc_documento_evaluacion'
  AND [columna] = 'personaEncuestada'
```

## Casos de Uso

### Caso 1: Evaluaciones de satisfacción anónimas

Si su organización desea permitir evaluaciones anónimas, configure el campo como opcional. Esto permite a los usuarios completar las evaluaciones sin proporcionar su identidad.

### Caso 2: Auditoría y trazabilidad

Si requiere mantener un registro completo de quién realiza cada evaluación para fines de auditoría, configure el campo como obligatorio. Esto garantiza que todas las evaluaciones tengan identificada a la persona que las completó.

### Caso 3: Evaluaciones mixtas

La configuración se puede modificar en cualquier momento según las necesidades del proceso o proyecto específico.

## Versiones

Esta funcionalidad está disponible desde las siguientes versiones:

| Componente | Versión |
|------------|---------|
| sammnew | snw7.1.10.5 |
| sammapi | api1.2.19.4 |
| samcore | 2.0.18.3 |
| capadatos | C2.1.7.0 |

**Nota:** La implementación en capadatos solo requiere actualización de código, no incluye scripts de base de datos.

## Soporte

Para consultas adicionales sobre esta funcionalidad o para reportar incidencias, por favor contacte al equipo de soporte técnico.