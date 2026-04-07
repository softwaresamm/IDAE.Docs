---
sidebar_position: 1
---

# Configuración de Checklist Condicional para Tipos de Reporte

Este documento describe cómo configurar la funcionalidad de checklist condicional asociado al botón de operación, permitiendo la generación de diferentes tipos de reporte (como preoperacional, movimiento, entre otros) según la configuración definida en el modelo. Esta funcionalidad permite estandarizar la captura de información y automatizar la creación de reportes operativos.

---

## Referencias

- [SO-567: Implementación de checklist condicional en botón de operación](https://softwaresamm.atlassian.net/browse/SO-567)

---

## Información de Versiones

### Versión de Lanzamiento

:::info **APP v 2.3.0.1**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción |
| ---------- | -------------- | ----------- |
| SAMMAPI    | >= 1.2.19.9    |API principal|

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Acceso al módulo de configuración de modelos
- Permisos para parametrización de checklist
- Creacion de lista de chequeo condicional
- en la tabla _columnas que sea la tabla equ_equipo se debe desactivar la columna id_equipo

:::important
La funcionalidad depende de una correcta configuración del modelo y del checklist asociado. Si no se configura adecuadamente, el comportamiento del botón de operación no ejecutará el flujo esperado.
:::

---

## Configuración

### Paso 1: Configuración del Modelo

En este paso se define el modelo sobre el cual se aplicará el checklist condicional.

#### Configuración requerida

- Asociar el modelo correspondiente
- Definir si el modelo tendrá checklist condicional
- Crear procedimiento Almacenado mob_plantillasListaChequeoXEquipo

```
sql title = crear procedimiento para visualizar información en el  botón operacion del APP

CREATE or ALTER PROCEDURE [dbo].[mob_plantillasListaChequeoXEquipo] 
	@p_idEquipo INT,
	@p_idUsuario INT,
	@p_eid VARCHAR(20)
AS
BEGIN
	
	SET NOCOUNT ON;

	SELECT (
		SELECT
			v_PCL.id,
			v_PCL.item,
			v_PCL.seccion,
			v_PCL.tipo,
			v_PCL.IDsOpciones,
			v_PCL.textosOpciones,
			v_PCL.esVariable,
			v_PCL.orden,
			v_PCL.rango,
			v_PCL.obligatorio,
			v_PCL.id_lista,
			dbo.esDependiente(v_PCL.id) as esDependiente
		FROM [dbo].[v_checklistTodas] v_PCL
			INNER JOIN [cat_catalogo.equipo_pruebaCheckList] CE_PCL
		ON CE_PCL.id_pruebaCheckList = v_PCL.id_lista
			INNER JOIN [equ_equipo] EQU
		ON EQU.[id_catalogo.equipo] = CE_PCL.[id_catalogo.equipo]
		WHERE 
			EQU.id = @p_idEquipo
		FOR JSON PATH
	)
END
```

:::tip Consejo
Se recomienda crear una lista de chequeo con opciones condicionales y sus atributos para diligenciar la información
:::

---

#### Comportamiento esperado

-Se debe ingresar al menú Gestion de equipos y buscar el equipo requerido posterior a eso se debe visualizar de manera correcta el botón operación:

  - Al hacer clic en el botón de operación:
  - Se valida si el modelo tiene checklist configurado
  - El flujo debe trabajar de manera corecta
  - Se genera el tipo de reporte asociado
  - En la plataforma se visualizara la información en el botón produccion del equipo

![Información diligenciadq en Produccion](./img/equipo_produccion.png)

  - Información ya diligenciada

![Datos dentro del checklist](./img/data.png)


---

## Resolución de Problemas

### El checklist no se ejecuta

Verifique que:

- El modelo tenga configurado un checklist
- La condición esté correctamente definida
- El procedimiento se encuentro creado

---