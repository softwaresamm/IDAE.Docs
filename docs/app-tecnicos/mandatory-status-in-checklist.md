---
sidebar_position: 1
release_version: "7.1.22.1"
release_module: "SAMM New"
---

# Checklist Obligatorio para Reportar Servicio

Este documento describe cómo configurar el carácter obligatorio de la lista de chequeo (checklist) en SAMM New mediante el parámetro `requiredChecklist` del procedimiento almacenado `mob_bandejaServicios`, permitiendo validar que la lista de chequeo esté diligenciada antes de que el técnico pueda reportar el servicio.

Antes de esta funcionalidad, el reporte del servicio no verificaba el diligenciamiento de la lista de chequeo. Ahora, cada instalación decide si el llenado es obligatorio o no, cambiando un único valor (`true` o `false`).

## Referencias

- [SO-2108: Validar diligenciamiento de lista de chequeo antes de permitir reportar servicio](https://softwaresamm.atlassian.net/browse/SO-2108)
- [SO-2149: Validar diligenciamiento de lista de chequeo antes de permitir reportar servicio](https://softwaresamm.atlassian.net/browse/SO-2149)

## Información de Versiones

### Versión de Lanzamiento

:::info **v7.1.22.1**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción                        |
| ------------- | -------------- | ---------------------------------- |
| SAMMNEW       | >= 7.1.22.1    | Aplicación web                     |
| SAMMAPI       | >= 1.2.34.5    | API principal                      |
| SAMM LOGICA   | >= 5.6.28.0    | Lógica de negocio                  |
| CAPADATOS     | >= 2.1.21.1    | Capa de acceso a datos             |
| SAMM CORE     | >= 2.0.29.1    | Core del sistema                   |
| BASE DE DATOS | >= C2.1.21.1   | Base de datos                      |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Las aplicaciones actualizadas a las versiones mínimas indicadas en la sección anterior
- Acceso a la base de datos SAMM con permisos para crear o modificar procedimientos almacenados
- Una herramienta de administración de SQL Server (por ejemplo, SQL Server Management Studio)
- Conocimiento de la lista de chequeo asociada a los servicios que se desea validar

:::important Importante
El script utiliza `CREATE OR ALTER`, por lo que reemplaza la definición actual de `mob_bandejaServicios`. Si la instalación tiene personalizaciones en este procedimiento, guarde una copia de su versión actual y conserve esas modificaciones antes de ejecutar el script.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Definir si la lista de chequeo es obligatoria

El procedimiento almacenado `mob_bandejaServicios` devuelve la columna `requiredChecklist`, que determina si el llenado de la lista de chequeo es obligatorio para reportar el servicio:

- `'true'`: el servicio no se puede reportar hasta diligenciar la lista de chequeo.
- `'false'`: el reporte del servicio no exige la lista de chequeo.

El procedimiento contiene dos consultas unidas con `UNION ALL`, y la columna debe existir en ambas:

- **Servicios con OT** (primera consulta): configure el valor deseado de `requiredChecklist`.
- **Programaciones sin OT** (segunda consulta, tipo "no disponible"): el valor se mantiene en `'false'`, ya que sin OT no aplica la lista de chequeo.

Ejecute el siguiente script, ajustando el valor de `requiredChecklist` en la primera consulta (líneas resaltadas):

```sql title="Procedimiento mob_bandejaServicios con el parámetro requiredChecklist" {45,107}
CREATE OR ALTER PROCEDURE [dbo].[mob_bandejaServicios]
	@p_id_usuario int ,
	@p_eid varchar(10),
	@p_id_programacion int = null
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
		view_ort_programacion.id as id_programacion
		,[id_documento.ot] as id_ot
		,view_doc_documento_ot.[doc_documento_ot_prefijo] + '-' + convert(varchar(max),(view_doc_documento_ot.[doc_documento_ot_documento_numero])) as NumOT
		,'Tipo de Servicio: ' + convert(varchar(max),isnull([gen_tipoServicio_tipoServicio],'NA')) + char(10)
		+ 'Cliente: ' + isnull(view_doc_documento_ot.[doc_documento_ot_ter_tercero_cliente_tercero],'NA') + char(10)
		+ 'Sede: ' + isnull(view_doc_documento_ot.[ter_sucursal_sucursal],'NA') + char(10)
		+ 'Contacto: ' + convert(varchar(max),isnull(contacto,'NA')) + char(10)
		+ 'Cargo: ' + convert(varchar(max),isnull(cargo,'NA')) + char(10)
		+ 'Dirección: ' + convert(varchar(max),isnull(direccionUbicacion,'NA')) + char(10)
		+ 'Teléfono: ' + convert(varchar(max),isnull(telefono,'NA')) + char(10)
		+ 'Motivo servicio: ' + convert(varchar(max),isnull(motivoServicio,'NA')) + char(10)
		+ 'Equipo :' + convert(varchar(max),isnull(equipo,'NA')) + char(10)
		+ 'Prioridad : ' + convert(varchar(max),isnull(doc_documento_ot_doc_prioridadDocumento_prioridadDocumento,'NA')) + char(10)
		 as Ubicacion
		,isnull(view_equ_equipo.equipo,'') as Equipo
		,isnull(view_equ_equipo.id,0) as id_equipo
		,isnull(view_equ_equipo.equipo_serial,'')
		,isnull(view_equ_equipo.[cat_catalogo.equipo_manejahorometro],'false') as ConHorometro
		,convert(varchar(30),isnull(view_equ_equipo.[ultimalectura_fh],0),126) as FechaHorometro
		,isnull(view_equ_equipo.[HorometroActual],0) as ValorHorometro
		,convert(varchar(30),desde_fh,126) HoraInicio
		,convert(varchar(30),hasta_fh,126) HoraFin
		,comentario
		,'' as img
		,view_doc_documento_ot.[doc_documento_ot_id_subtipoDocumento] as id_subtipoDocumento
		,view_doc_documento_ot.[doc_documento_ot_id_estadoTipoDocumento] as id_estadoTipoDocumento
		,'true' as editarActividades
		,'false' as pedirCronometro
		,'false' as firmaObligatoria
		,'0.1' as imgPorcentaje --Calidad
		,'3000' as imageMaxWidth --Ancho
		,'4000' as imageMaxHeight --Altura
		,'true' as requiredAttachments --Requerir adjuntos
		,'doc_documento_ot' as additionalReportsCode --SO-2152: código que reciben los SPs de reportes para armar el listado
		,'false' as printPhotoDate --SO-2202: sello de fecha/hora sobre fotos tomadas desde la cámara (opt-in por servicio)
		,'false' as requiredChecklist --SO-2149: checklist obligatorio para reportar (opt-in por core/servicio, ver Reporte.cs f_bol_chequeoObligatorio)

	FROM
		view_ort_programacion
		inner join view_doc_documento_ot on view_ort_programacion.[id_documento.ot]=view_doc_documento_ot.id
		left join view_equ_equipo on view_equ_equipo.id=view_doc_documento_ot.id_equipo

	WHERE
		id_usuario=@p_id_usuario
		and desde_fh >= dateadd(day,-180,GETDATE()) --condición temporal
		and id_tipoprogramacion in (3)
		and view_doc_documento_ot.doc_documento_ot_id_estadoTipoDocumento not in (11,12)
		and (@p_id_programacion is null or @p_id_programacion = view_ort_programacion.id)
		and (@p_id_programacion is null or @p_id_programacion = view_ort_programacion.id)
		-- Logica de filtrado padre-hijo para actividades programadas
		AND (
			-- Es padre (sin importar si tiene hijas con actividad o no)
			ISNULL(view_ort_programacion.id_programacion, 0) = 0
			OR
			-- Es hija sin actividad, y ninguna hermana tiene actividad activa
			(
				ISNULL(view_ort_programacion.id_programacion, 0) > 0
				AND ISNULL(view_ort_programacion.[id_catalogo.actividad], 0) = 0
				AND NOT EXISTS (
					SELECT 1
					FROM ort_programacion hermana
					WHERE hermana.id_programacion = view_ort_programacion.id_programacion
					AND ISNULL(hermana.[id_catalogo.actividad], 0) > 0
					AND hermana.active = 1
				)
			)
		)

	-- SO-2180: programaciones tipo "no disponible" (sin OT asociada) — se reportan sin generar OT,
	-- por eso no hay join contra view_doc_documento_ot ni columnas dependientes de la OT.
	UNION ALL
	SELECT
		view_ort_programacion.id as id_programacion
		,0 as id_ot
		,'Sin OT' as NumOT
		,'' as Ubicacion
		,'' as Equipo
		,0 as id_equipo
		,''
		,'false' as ConHorometro
		,convert(varchar(30),getdate(),126) as FechaHorometro
		,0 as ValorHorometro
		,convert(varchar(30),desde_fh,126) HoraInicio
		,convert(varchar(30),hasta_fh,126) HoraFin
		,comentario
		,'' as img
		,0 as id_subtipoDocumento
		,0 as id_estadoTipoDocumento
		,'true' as editarActividades
		,'false' as pedirCronometro
		,'false' as firmaObligatoria
		,'0.1' as imgPorcentaje --Calidad
		,'3000' as imageMaxWidth --Ancho
		,'4000' as imageMaxHeight --Altura
		,'false' as requiredAttachments --Sin OT no hay sección de adjuntos que llenar
		,'' as additionalReportsCode --Sin OT no aplica generación de reporte PDF por OT
		,'false' as printPhotoDate --SO-2202: mismo flag; sin OT no aplica pero se mantiene la columna para compatibilidad del UNION
		,'false' as requiredChecklist --SO-2149: sin OT no aplica checklist

	FROM
		view_ort_programacion
	WHERE
		id_usuario=@p_id_usuario
		and desde_fh >= dateadd(day,-180,GETDATE()) --condición temporal
		and id_tipoprogramacion in (2)
		and (@p_id_programacion is null or @p_id_programacion = view_ort_programacion.id)
END
```

Para exigir la lista de chequeo, cambie en la primera consulta (línea 45) el valor a `'true'`:

```sql title="Habilitar la lista de chequeo obligatoria"
,'true' as requiredChecklist --SO-2149: checklist obligatorio para reportar
```

:::tip Consejo
El valor de `requiredChecklist` se define como texto (`'true'` o `'false'`), igual que los demás parámetros de la bandeja (`requiredAttachments`, `firmaObligatoria`, `printPhotoDate`). Escríbalo siempre en minúsculas y entre comillas simples.
:::

:::note Nota
La columna `requiredChecklist` debe mantenerse en ambas consultas del `UNION ALL`. Si se elimina de una de ellas, el procedimiento falla por diferencia en el número de columnas.
:::

### Paso 2: Verificar el valor devuelto por el procedimiento

Ejecute el procedimiento con un usuario técnico que tenga servicios programados y confirme que la columna `requiredChecklist` devuelve el valor configurado.

```sql title="Verificación de la columna requiredChecklist"
-- Use el id de un usuario técnico con servicios programados
EXEC [dbo].[mob_bandejaServicios]
	@p_id_usuario = 1,
	@p_eid = '1';
```

## Resultado Esperado

Una vez completada la configuración:

1. **Checklist obligatorio activo**: con `requiredChecklist` en `'true'`, el sistema no permite reportar el servicio hasta que la lista de chequeo esté diligenciada.
2. **Checklist opcional**: con `requiredChecklist` en `'false'`, el servicio se puede reportar sin diligenciar la lista de chequeo.
3. **Programaciones sin OT**: las programaciones tipo "no disponible" no se ven afectadas, ya que sin OT no aplica la lista de chequeo.

## Resolución de Problemas

### El sistema permite reportar el servicio sin diligenciar la lista de chequeo

Verifique que:

- El valor de `requiredChecklist` sea `'true'` en la primera consulta del procedimiento (servicios con OT)
- El script se haya ejecutado en la base de datos correcta
- Las aplicaciones cumplan las versiones mínimas de la sección **Versiones Requeridas**
- La ejecución de `mob_bandejaServicios` devuelva `requiredChecklist` con el valor `true` para el servicio

### El sistema exige la lista de chequeo cuando no debería

Confirme que:

- El valor de `requiredChecklist` sea `'false'` en la consulta de servicios con OT
- No exista otra versión personalizada del procedimiento `mob_bandejaServicios` con el valor en `'true'`
- El servicio consultado corresponda al esquema de datos donde se aplicó el cambio

### Error al ejecutar el procedimiento `mob_bandejaServicios`

Revise que:

- La columna `requiredChecklist` exista en ambas consultas del `UNION ALL`
- El valor esté escrito como texto entre comillas simples (`'true'` o `'false'`)
- El usuario de base de datos tenga permisos para crear o modificar procedimientos almacenados
- No se hayan eliminado o reordenado otras columnas del procedimiento al aplicar el script

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Checklist obligatorio sin diligenciar

**Precondición:** `requiredChecklist` configurado en `'true'` y un servicio con OT que tenga lista de chequeo asociada.

1. Ejecute `mob_bandejaServicios` y confirme que `requiredChecklist` devuelve `true`.
2. Abra el servicio con un usuario técnico sin diligenciar la lista de chequeo.
3. Intente reportar el servicio.

**Resultado esperado:** el sistema **no permite reportar** el servicio mientras la lista de chequeo no esté diligenciada.

### Escenario 2: Checklist obligatorio diligenciado

**Precondición:** `requiredChecklist` configurado en `'true'`.

1. Abra el servicio con un usuario técnico.
2. Diligencie la lista de chequeo.
3. Reporte el servicio.

**Resultado esperado:** el servicio **se reporta correctamente**.

### Escenario 3: Checklist no obligatorio

**Precondición:** `requiredChecklist` configurado en `'false'`.

1. Ejecute `mob_bandejaServicios` y confirme que `requiredChecklist` devuelve `false`.
2. Abra el servicio sin diligenciar la lista de chequeo.
3. Reporte el servicio.

**Resultado esperado:** el servicio **se reporta sin exigir** la lista de chequeo.

### Escenario 4: Programación sin OT

**Precondición:** usuario técnico con una programación tipo "no disponible" (sin OT).

1. Ejecute `mob_bandejaServicios` y ubique la programación con `NumOT` igual a `Sin OT`.
2. Reporte la programación.

**Resultado esperado:** `requiredChecklist` devuelve `false` y la programación **se reporta sin validar** la lista de chequeo.