---
sidebar_position: 5
release_version: "5.5.27.0"
release_module: "SammWeb"
---

# Configuración de Envío JSON en Integraciones

Este documento describe las diferentes formas de manejar el envío de JSON al transmitir información en puntos de integración, permitiendo configurar el formato como JSON nativo o como cadena de texto (JSON_STRING). Esta funcionalidad proporciona flexibilidad para adaptarse a los requisitos específicos de cada proveedor externo.

## Referencias

- [SO-392: Agregar constante "JSON_STRING" para que el json de la Máscara quede en string](https://softwaresamm.atlassian.net/browse/SO-392)

## Información de Versiones

### Versión de Lanzamiento

:::info **v5.5.27.0**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción                           |
| ------------- | -------------- | ------------------------------------- |
| SAMMWEB       | >= 5.5.27.0    | Aplicación web principal              |
| SAMM LOGICA   | >= 5.6.23.4    | Lógica de negocio                     |
| BASE DE DATOS | >= C2.1.7.2    | Scripts de configuración de historial |

:::important Importante
Esta funcionalidad requiere las versiones mínimas especificadas. Verifique sus versiones actuales antes de continuar con la configuración.
:::

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Acceso a la base de datos con permisos de lectura y escritura en la tabla `syn_puntoIntegracion`
- Definición clara con el proveedor externo sobre el formato esperado de la información JSON
- ID del punto de integración que requiere la configuración
- Conocimiento de los parámetros de autenticación y comunicación del servicio externo

## Descripción General

El sistema soporta dos formas de envío de JSON en el campo `mascaraJSON` de la tabla `syn_puntoIntegracion`:

1. **JSON Nativo**: Envía la información en formato JSON estructurado, donde el contenido se interpreta como un objeto JSON completo
2. **JSON_STRING**: Envía el JSON como una cadena de texto, donde el contenido JSON se serializa como string antes de ser enviado

La elección entre estos formatos depende de cómo el proveedor externo espera recibir la información en sus servicios de integración.

## Configuración

### Paso 1: Verificar el campo mascaraJSON

Primero, consulte el estado actual del campo `mascaraJSON` en el punto de integración que desea configurar.

```sql title="Consultar configuración actual"
SELECT mascaraJSON, * 
FROM syn_puntoIntegracion
WHERE id = -- Especificar el ID del punto de integración
```

:::tip Consejo
Si el campo `mascaraJSON` aparece vacío o NULL, significa que el punto de integración aún no tiene configurado el formato de envío JSON y debe proceder con el Paso 2.
:::

### Paso 2: Actualizar el campo mascaraJSON

Ejecute el script de actualización correspondiente según el formato requerido por el proveedor externo.

#### Opción A: Configuración para JSON_STRING

Use esta configuración cuando el proveedor requiera recibir el JSON como una cadena de texto serializada.

```sql title="Actualizar con formato JSON_STRING"
UPDATE syn_puntoIntegracion 
SET mascaraJSON = '{
    "StrUserName": "admin",
    "StrUserCode": "$2b$10$vtmwvJgi7L6EZnQz3pfQGuQWUMkMOqL7CO/dz7JmxAI/ZOYb/.tF2",
    "StrComID": "PRUEBAMQ",
    "StrJsonOcrd": "JSON_STRING"
}' 
WHERE id = -- Especificar el ID del punto de integración
```

:::important Parámetro Clave
El valor `"StrJsonOcrd": "JSON_STRING"` indica al sistema que debe serializar el contenido JSON como cadena de texto antes de enviarlo.
:::

#### Opción B: Configuración para JSON Nativo

Use esta configuración cuando el proveedor requiera recibir el JSON en su formato estructurado estándar.

```sql title="Actualizar con formato JSON nativo"
UPDATE syn_puntoIntegracion 
SET mascaraJSON = '{
    "StrUserName": "admin",
    "StrUserCode": "$2b$10$vtmwvJgi7L6EZnQz3pfQGuQWUMkMOqL7CO/dz7JmxAI/ZOYb/.tF2",
    "StrComID": "PRUEBAMQ",
    "StrJsonOcrd": "JSON"
}' 
WHERE id = -- Especificar el ID del punto de integración
```

:::note Nota
El valor `"StrJsonOcrd": "JSON"` indica al sistema que debe enviar el contenido como un objeto JSON estructurado sin serialización adicional.
:::

### Paso 3: Verificar la actualización

Después de ejecutar el script de actualización, verifique que los cambios se aplicaron correctamente.

```sql title="Verificar configuración actualizada"
SELECT id, mascaraJSON 
FROM syn_puntoIntegracion
WHERE id = -- Especificar el ID del punto de integración
```

## Parámetros de la Máscara JSON

La estructura `mascaraJSON` incluye los siguientes parámetros:

| Parámetro     | Tipo   | Descripción                                                                    |
| ------------- | ------ | ------------------------------------------------------------------------------ |
| StrUserName   | String | Usuario para autenticación en el servicio externo                              |
| StrUserCode   | String | Código o token de autenticación (puede ser hash o clave encriptada)            |
| StrComID      | String | Identificador de la compañía o contexto de comunicación                        |
| StrJsonOcrd   | String | Formato de envío del JSON: `"JSON"` para nativo o `"JSON_STRING"` para cadena |

:::tip Valores de Ejemplo
Los valores mostrados en los scripts (`admin`, hash de código, `PRUEBAMQ`) son ejemplos. Debe reemplazarlos con los valores reales proporcionados por su proveedor de integración.
:::

## Resultado Esperado

Una vez completada la configuración:

1. **Formato Configurado**: El punto de integración tendrá definido el formato de envío JSON según los requisitos del proveedor externo
2. **Transmisión de Datos**: El sistema enviará la información en el formato especificado (JSON nativo o JSON_STRING) automáticamente
3. **Compatibilidad**: La integración funcionará correctamente con el servicio externo según sus especificaciones de API

## Resolución de Problemas

### El campo mascaraJSON no se actualiza

Verifique que:

- Tiene los permisos necesarios de escritura en la tabla `syn_puntoIntegracion`
- El ID del punto de integración es correcto y existe en la base de datos
- La sintaxis del JSON en el UPDATE es válida (sin errores de formato)
- Ha ejecutado el comando COMMIT después del UPDATE (si su gestor de base de datos lo requiere)

### La integración no funciona después de la configuración

Confirme que:

- Los valores de autenticación (`StrUserName`, `StrUserCode`) son correctos y están actualizados
- El formato elegido (`JSON` o `JSON_STRING`) coincide con lo esperado por el proveedor
- El identificador `StrComID` corresponde al contexto correcto de la integración
- Las versiones de SAMMWEB y SAMM LOGICA cumplen con los requisitos mínimos

### Error de formato JSON

Revise que:

- La estructura JSON en el campo `mascaraJSON` está correctamente formateada
- No hay comillas adicionales o faltantes en los valores de los parámetros
- El valor de `StrJsonOcrd` es exactamente `"JSON"` o `"JSON_STRING"` (sensible a mayúsculas)
- Los valores no contienen caracteres especiales que requieran escape

---

**Versión del Documento:** 1.0  
**Última Actualización:** Enero 2025