---
sidebar_position: 1
release_version: "6.0.0.15"
release_module: "SR"
---

# Validación de Encuesta de Satisfacción antes de Firmar el Reporte

Este documento describe cómo configurar la validación de la encuesta de satisfacción para impedir que se guarde la firma del reporte técnico si la encuesta no ha sido diligenciada en su totalidad y aceptada para confirmar. Antes de esta versión era posible firmar el reporte sin completar la encuesta.

## Referencias

- [SO-2216 | HU-57: Validar llenado de encuesta de satisfacción antes de firmar el reporte técnico](https://softwaresamm.atlassian.net/browse/SO-2216)

## Información de Versiones

### Versión de Lanzamiento

:::info **SR V6.0.0.15**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción       |
| ------------- | -------------- | ----------------- |
| SAMM LOGICA   | >= 5.6.28.0    | Lógica de negocio |
| CAPADATOS     | >= 2.1.21.2    | Capa de datos     |
| SAMM CORE     | >= 2.0.30.0    | Core del sistema  |
| SAMMAPI       | >= 1.2.35.0    | API principal     |
| BASE DE DATOS | >= C2.1.21.2   | Base de datos     |

## Requisitos Previos

No aplica para esta funcionalidad.

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Verificar que exista la funcionalidad de evaluaciones

Confirme que la funcionalidad de **Evaluaciones** esté disponible en el sistema, ya que la validación de la encuesta depende de ella.

:::note Información
Si la funcionalidad de evaluaciones no existe, no será posible activar la validación en el siguiente paso.
:::

### Paso 2: Activar la validación en los parámetros generales

1. Ingrese al menú **Configuración**.
2. Vaya a **Parámetros generales** y seleccione **OTs**.
3. En el parámetro `Validar al Cerrar OT`, marque la opción `Evaluación`.
4. Guarde los cambios.

:::tip Consejo
Una vez guardados los cambios, realice una prueba con una OT de prueba para confirmar que la validación se aplica correctamente.
:::

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Encuesta sin diligenciar o incompleta**: el sistema no permite guardar la firma del reporte técnico.
2. **Encuesta completa sin aceptar**: el sistema no permite guardar la firma hasta que se acepte la confirmación.
3. **Encuesta completa y aceptada**: el sistema permite guardar la firma del reporte técnico.

## Resolución de Problemas

### Se puede firmar el reporte sin diligenciar la encuesta

Verifique que:

- La opción `Evaluación` esté marcada en el parámetro `Validar al Cerrar OT`
- Los cambios en **Configuración > Parámetros generales > OTs** se hayan guardado
- La funcionalidad de **Evaluaciones** exista en el sistema

### La validación no se aplica a pesar de estar configurada

Confirme que:

- `samm_logica` sea `>= 5.6.28.0`
- `capadatos` sea `>= 2.1.21.2`
- `samcore` sea `>= 2.0.30.0`
- `sammapi` sea `>= 1.2.35.0`
- La base de datos sea `>= C2.1.21.2`

### El sistema no deja firmar aunque la encuesta parece completa

Revise que:

- Todas las preguntas de la encuesta estén respondidas
- Se haya aceptado la confirmación de la encuesta

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Firma bloqueada con encuesta sin diligenciar

**Precondición:** `Evaluación` marcada en `Validar al Cerrar OT` y versiones mínimas instaladas.

1. Abra una OT con reporte técnico pendiente de firma.
2. Ingrese a la encuesta de satisfacción y no responda ninguna pregunta.
3. Intente guardar la firma del reporte.

**Resultado esperado:** el sistema no permite guardar la firma.

### Escenario 2: Firma bloqueada con encuesta parcialmente diligenciada

**Precondición:** la misma del Escenario 1.

1. Abra una OT con reporte técnico pendiente de firma.
2. Responda solo una parte de las preguntas de la encuesta.
3. Intente guardar la firma del reporte.

**Resultado esperado:** el sistema no permite guardar la firma hasta que se completen todas las preguntas.

### Escenario 3: Firma bloqueada con encuesta completa sin aceptar

**Precondición:** la misma del Escenario 1.

1. Abra una OT con reporte técnico pendiente de firma.
2. Responda todas las preguntas de la encuesta, sin aceptar la confirmación.
3. Intente guardar la firma del reporte.

**Resultado esperado:** el sistema no permite guardar la firma hasta que se acepte la confirmación.

### Escenario 4: Firma permitida con encuesta completa y aceptada

**Precondición:** la misma del Escenario 1.

1. Abra una OT con reporte técnico pendiente de firma.
2. Responda todas las preguntas de la encuesta.
3. Acepte la confirmación de la encuesta.
4. Guarde la firma del reporte.

video con el detalle de procedimiento: https://www.youtube.com/watch?v=6LTItxML1bo

**Resultado esperado:** la firma se guarda correctamente.

### Escenario 5: Sin validación cuando la opción está desmarcada

**Precondición:** `Evaluación` desmarcada en `Validar al Cerrar OT`.

1. Abra una OT con reporte técnico pendiente de firma.
2. Sin diligenciar la encuesta, intente guardar la firma.

**Resultado esperado:** la validación de la encuesta no se ejecuta y se mantiene el comportamiento previo a esta funcionalidad.