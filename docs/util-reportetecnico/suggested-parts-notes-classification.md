---
sidebar_position: 1
release_version: "4.5.1"
release_module: "URT"
---

# Agregar Campo de Observaciones y Filtrar Clasificación según Tipo de Documento en Repuestos Sugeridos

Este documento describe la mejora que agrega en la sección de repuestos sugeridos del Utilitario de Reporte Técnico (URT) un campo para registrar observaciones asociadas a cada repuesto sugerido, y que filtra las opciones del campo **Clasificación** según el tipo de documento seleccionado. Antes de esta mejora no existía un campo para registrar observaciones por repuesto sugerido, y las opciones del campo **Clasificación** se mostraban siempre completas, sin considerar el tipo de documento seleccionado previamente, lo que permitía elegir clasificaciones que no correspondían al tipo de documento.

## Referencias

- [SO-2222: Agregar campo de observaciones y filtrar clasificación según tipo de documento en repuestos sugeridos](https://softwaresamm.atlassian.net/browse/SO-2222)
- [SO-2223: Agregar campo de observaciones y filtrar clasificación según tipo de documento en repuestos sugeridos](https://softwaresamm.atlassian.net/browse/SO-2223)
- [SO-2224: Agregar campo de observaciones y filtrar clasificación según tipo de documento en repuestos sugeridos](https://softwaresamm.atlassian.net/browse/SO-2224)

## Información de Versiones

### Versión de Lanzamiento

:::info **URT v4.5.1**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción                   |
| ------------- | -------------- | ----------------------------- |
| URT           | >= 4.5.1       | Utilitario de reporte técnico |
| SAMMAPI       | >= 1.2.36.0    | API principal                 |
| SAMM LOGICA   | >= 5.6.28.0    | Lógica de negocio             |
| CAPADATOS     | >= 2.1.23.0    | Capa de acceso a datos        |
| SAMCORE       | >= 2.0.31.0    | Core del sistema              |
| BASE DE DATOS | >= C2.1.23.0   | Base de datos                 |

:::note Nota
El componente `recursos` no aplica versión mínima para esta funcionalidad.
:::

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Todas las aplicaciones actualizadas a las versiones mínimas indicadas en la tabla anterior
- Un usuario autorizado para ingresar a la plataforma
- Acceso a **Configuración aplicación** para gestionar tipos de pendiente y tipos de documento

:::important Importante
El proceso completo de configuración se explica en el video de la sección **Video**, después de la configuración.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Crear el tipo de pendiente

Ingrese a **Configuración aplicación → Tipos de pendientes**. Si el tipo de pendiente no existe, créelo.

### Paso 2: Asociar el tipo de pendiente al tipo de documento

1. Ingrese a **Configuración aplicación → Tipo de documento**.
2. Seleccione el o los tipos de documento que requiera configurar.
3. Vaya al tab **Clasificaciones** y escoja el tipo de pendiente creado en el paso anterior.
4. Haga clic en el botón al pie **Seleccionar grilla**. Esta acción agrega el tipo.

:::note Nota
Al hacer clic en **Seleccionar grilla** el tipo queda agregado; no requiere dar **Aceptar**.
:::

## Video

- [Video: Configuración de observaciones y clasificación por tipo de documento en repuestos sugeridos](https://www.youtube.com/watch?v=uJ1wrQd2mzs)

## Casos Especiales

:::note Comportamientos Predefinidos
El campo **Clasificación** depende del tipo de documento seleccionado en cada repuesto sugerido.
:::

| Caso                                 | Campo/Valor                         | Descripción                                                                                       |
| ------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| Clasificaciones por tipo de documento | Campo **Clasificación**            | Solo se muestran las clasificaciones asociadas al tipo de documento seleccionado                  |
| Cambio de tipo de documento          | Campos **Tipo de Documento** y **Clasificación** | La clasificación se limpia o se valida nuevamente según el nuevo tipo de documento     |

## Resultado Esperado

Una vez completada la configuración:

1. **Observaciones por repuesto**: Como usuario en la sección de repuestos sugeridos, debería poder registrar observaciones en un campo dedicado para cada repuesto, para complementar la información del sugerido con detalles adicionales.
2. **Clasificación filtrada**: Como usuario que selecciona un tipo de documento, debería visualizar en el campo "Clasificación" únicamente las opciones asociadas a ese tipo de documento, para evitar asignar clasificaciones que no correspondan.
3. **Cambio de tipo de documento**: Como usuario que cambia el tipo de documento después de haber seleccionado una clasificación, debería ver que la clasificación se limpie o se valide nuevamente según el nuevo tipo, para evitar inconsistencias entre ambos campos.
4. **Información guardada íntegra**: Como usuario que guarda o envía el reporte con repuestos sugeridos, debería ver que la observación y la clasificación registradas se almacenen y se muestren correctamente al consultar el sugerido, para confirmar que la información quedó guardada de forma íntegra.

## Resolución de Problemas

### El campo Clasificación no muestra opciones para un tipo de documento

Verifique que:

- El tipo de pendiente exista en **Configuración aplicación → Tipos de pendientes**
- El tipo de pendiente esté agregado en el tab **Clasificaciones** del tipo de documento
- Se haya hecho clic en el botón **Seleccionar grilla** al agregarlo

### El campo de observaciones no aparece en repuestos sugeridos

Confirme que:

- Todas las aplicaciones estén en las versiones mínimas indicadas
- La sección Repuestos Sugeridos esté habilitada en Parámetros Generales

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Acceso y redirección al Utilitario de Reporte Técnico

**Precondiciones:** Usuario autorizado y programaciones disponibles.

| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Ingresar a la plataforma con un usuario autorizado | El usuario ingresa correctamente, sin errores de autenticación |
| 2 | Ingresar al formulario de programación desde la plataforma | El formulario carga correctamente y muestra las opciones disponibles |
| 3 | Seleccionar una programación existente | La programación se selecciona correctamente y se muestra la información correspondiente |
| 4 | Seleccionar el botón Reportar de una programación | El sistema redirige correctamente al utilitario de reporte técnico |

### Escenario 2: Sección General y campos obligatorios

**Precondiciones:** Utilitario de Reporte Técnico abierto desde una programación.

| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Consultar los campos configurados como activos en Parámetros Generales | Se muestran los campos activos configurados para el reporte técnico |
| 2 | Consultar las secciones Trabajos, Recomendaciones y Compromisos | Las secciones se muestran correctamente con sus respectivos campos |
| 3 | Verificar la identificación visual de los campos requeridos | Los campos obligatorios se distinguen visualmente de los opcionales |
| 4 | Intentar guardar el reporte dejando campos obligatorios sin diligenciar | El sistema impide el guardado e identifica los campos pendientes |
| 5 | Diligenciar un campo obligatorio que inicialmente estaba vacío | El campo cambia su estado visual para indicar que cumple la validación, siempre que el valor sea válido |

### Escenario 3: Lista de chequeo

**Precondiciones:** Parámetro de lista de chequeo habilitado y órdenes con y sin listas de chequeo asignadas.

| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Consultar el reporte con el parámetro de lista de chequeo habilitado | La sección Lista de Chequeo se muestra correctamente |
| 2 | Consultar una orden de trabajo que no tenga una lista de chequeo asignada | Se muestra el mensaje: “No hay lista de chequeo para esta orden de trabajo” |
| 3 | Consultar una orden que tenga varias listas de chequeo asociadas | Se muestran los nombres de las listas y sus respectivas secciones sin mezclarlas |
| 4 | Consultar una sección que contenga atributos obligatorios pendientes | La sección indica su estado de obligatoriedad y la cantidad de atributos pendientes |
| 5 | Intentar completar un atributo obligatorio con espacios o sin contenido | El sistema considera inválido el valor vacío o compuesto únicamente por espacios |
| 6 | Completar todos los atributos obligatorios de una sección | La sección refleja visualmente que se han completado los requisitos |
| 7 | Realizar un trazo en un atributo configurado como firma | El sistema permite capturar y visualizar la firma |
| 8 | Intentar guardar una firma sin realizar un trazo y después de dibujarlo | El botón Guardar permanece deshabilitado sin una firma y se habilita después de realizar un trazo válido |
| 9 | Abrir un atributo configurado como lista desplegable | Se cargan las opciones configuradas y es posible seleccionar un valor |
| 10 | Ingresar valores válidos y texto en un atributo numérico | Se aceptan los valores permitidos por la configuración y se rechazan los valores no válidos |
| 11 | Seleccionar y guardar una fecha en un atributo de fecha | La fecha se registra y se muestra correctamente al consultar el reporte |
| 12 | Activar o desactivar el valor que controla un atributo dependiente | El atributo dependiente se muestra u oculta de acuerdo con la configuración |
| 13 | Diligenciar un atributo dependiente y cambiar posteriormente el atributo padre | Los valores dependientes se reinician cuando la configuración así lo establece |
| 14 | Guardar el reporte y consultar nuevamente la lista de chequeo | Se muestran los valores registrados, incluidos textos, listas, imágenes y firmas |
| 15 | Consultar una lista de chequeo después de guardar el reporte | La información se muestra y no permite modificaciones cuando el flujo definido requiere bloquearla |
| 16 | Abrir desde la plataforma web una lista de chequeo previamente diligenciada | Los atributos registrados se visualizan correctamente |
| 17 | Intentar guardar el reporte con atributos obligatorios de la lista sin diligenciar | El sistema impide guardar mientras existan atributos obligatorios pendientes |

### Escenario 4: Imágenes adjuntas

**Precondiciones:** Sección Fotografías o Imágenes Adjuntas habilitada.

| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Consultar el reporte con la sección Fotografías o Imágenes Adjuntas habilitada | La sección se muestra y permite gestionar los archivos adjuntos |
| 2 | Consultar los tipos de archivo permitidos y el límite de imágenes configurado | Se muestran las opciones y límites definidos para los adjuntos |
| 3 | Cargar una imagen mediante el selector de archivos | La imagen se carga y queda asociada al reporte |
| 4 | Arrastrar un archivo compatible a la zona de carga | El archivo se carga correctamente y se muestra en la sección correspondiente |
| 5 | Abrir las opciones de edición de una imagen cargada | Se habilitan las herramientas disponibles, como recorte, trazos y selección de colores |
| 6 | Eliminar una imagen específica del reporte | Se elimina la imagen seleccionada sin afectar las demás |
| 7 | Seleccionar la opción Seleccionar todos | Todas las imágenes disponibles quedan seleccionadas |
| 8 | Seleccionar varias imágenes y ejecutar Borrar todos | Se eliminan las imágenes seleccionadas de acuerdo con la funcionalidad definida |
| 9 | Agregar un comentario asociado a una imagen | El comentario queda asociado a la imagen y se muestra correctamente |
| 10 | Intentar cargar un archivo que supere el límite permitido por la configuración, incluido maxRequestLength cuando aplique | La carga se rechaza y se informa que el archivo supera el tamaño permitido |
| 11 | Intentar cargar un archivo cuya extensión no esté permitida | El sistema bloquea la carga e informa los formatos admitidos |
| 12 | Intentar agregar imágenes hasta superar el límite configurado | El sistema impide superar el límite e informa la restricción |
| 13 | Guardar el reporte y volver a consultarlo | Las imágenes continúan asociadas al reporte y se visualizan correctamente |
| 14 | Editar una imagen, agregar comentarios, guardar y consultar nuevamente | Se conservan los comentarios y las ediciones que la aplicación tenga configurado almacenar |
| 15 | Descargar una imagen previamente guardada | La imagen se descarga correctamente y el archivo conserva su integridad |
| 16 | Consultar un reporte con varias imágenes adjuntas | Se muestran las miniaturas correspondientes sin errores de visualización |
| 17 | Abrir una imagen en tamaño completo | La imagen se amplía correctamente, sin distorsiones atribuibles al sistema |
| 18 | Guardar las imágenes, recargar la página y consultar nuevamente | Las imágenes guardadas continúan disponibles y asociadas al reporte |

### Escenario 5: Repuestos sugeridos, tipo de documento, clasificación y notas

**Precondiciones:** Sección Repuestos Sugeridos habilitada en Parámetros Generales y configuración de tipos de pendiente y tipos de documento realizada.

| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Consultar el reporte con la sección habilitada en Parámetros Generales | La sección Repuestos Sugeridos se muestra correctamente |
| 2 | Buscar un repuesto disponible mediante el mecanismo de búsqueda | El sistema presenta los repuestos que coinciden con el criterio ingresado |
| 3 | Seleccionar un repuesto de los resultados | El repuesto se agrega al listado de repuestos sugeridos |
| 4 | Consultar los campos asociados a un repuesto agregado | Se muestran correctamente Tipo de Documento, Clasificación, Cantidad y la opción Eliminar |
| 5 | Consultar la sección con un usuario con permiso y otro sin permiso de edición | El botón para editar el nombre se muestra únicamente cuando el usuario cuenta con el permiso correspondiente |
| 6 | Modificar la información editable de un repuesto agregado | El sistema permite modificar los campos autorizados y refleja los cambios realizados |
| 7 | Ingresar y guardar una cantidad decimal permitida | El sistema acepta y conserva el valor decimal conforme a las reglas del campo |
| 8 | Abrir el campo Tipo de Documento de un repuesto | Se muestran las opciones configuradas y disponibles para el usuario |
| 9 | Abrir el campo Clasificación de un repuesto | Se muestran las clasificaciones configuradas |
| 10 | Consultar la sección de repuestos sugeridos | El campo Notas se muestra correctamente cuando está disponible en la configuración |
| 11 | Ingresar información en el campo Notas y guardar los cambios | El sistema permite registrar las notas y las asocia al repuesto correspondiente |
| 12 | Modificar las notas de un repuesto previamente registrado | El sistema permite editar las notas y refleja la información actualizada |
| 13 | Guardar las notas, salir del reporte y consultarlo nuevamente | Las notas se conservan y se muestran asociadas al repuesto correcto |
| 14 | Eliminar un repuesto agregado al reporte | El repuesto seleccionado se elimina del listado sin afectar los demás registros |
| 15 | Guardar el reporte y consultar la sección Repuestos Sugeridos | Se muestran los repuestos registrados con sus campos y notas asociados |
| 16 | Ingresar cantidades vacías, no numéricas, negativas o decimales, según las reglas del campo | El sistema acepta únicamente los valores permitidos por la configuración y comunica los valores inválidos |

### Escenario 6: Guardado, persistencia e integridad del reporte

**Precondiciones:** Reporte técnico diligenciado.

| Paso | Acción | Resultado esperado |
| ---- | ------ | ------------------ |
| 1 | Diligenciar la información requerida y seleccionar Guardar | El reporte se guarda correctamente |
| 2 | Guardar un reporte diligenciado correctamente | Se muestra el mensaje de confirmación definido por la aplicación, indicando que el reporte fue diligenciado correctamente |
| 3 | Guardar Trabajos, Recomendaciones, Compromisos y los demás campos diligenciados | La información se conserva al consultar nuevamente el reporte |
| 4 | Guardar el reporte con datos relacionados, como checklist, imágenes, firmas y repuestos sugeridos | Los datos relacionados permanecen asociados al reporte correcto |
| 5 | Modificar información y recargar la página antes de guardar | Los cambios no guardados se comportan de acuerdo con la lógica definida; no se presentan datos parciales como si estuvieran guardados |
| 6 | Guardar el reporte y recargar la página | La información guardada se carga correctamente y no presenta pérdida de datos |
| 7 | Guardar una lista de chequeo y recargar el reporte | Los atributos diligenciados continúan registrados y se visualizan correctamente |
| 8 | Guardar una firma y recargar el reporte | La firma permanece almacenada y se visualiza correctamente |
| 9 | Guardar repuestos sugeridos y recargar el reporte | Los repuestos permanecen asociados con sus cantidades, tipos de documento, clasificaciones y notas |
| 10 | Guardar y volver a consultar todas las secciones del reporte | Los datos de las secciones General, Lista de Chequeo, Imágenes Adjuntas y Repuestos Sugeridos coinciden con la información guardada |
| 11 | Diligenciar un reporte nuevo con información válida y guardarlo | Se crea el reporte correctamente y queda disponible para su consulta |
| 12 | Abrir el reporte técnico guardado y acceder al tab de repuestos sugeridos | Se visualizan los repuestos y el campo Notas con la información registrada |
| 13 | Modificar la información en el formulario, guardar y revisar el reporte desde la vista de consulta | La vista de consulta refleja los últimos datos guardados, sin inconsistencias entre formularios |
| 14 | Realizar cambios, guardar, recargar y repetir la consulta | Se conserva la última versión guardada de la información, sin duplicar registros ni recuperar valores obsoletos |
