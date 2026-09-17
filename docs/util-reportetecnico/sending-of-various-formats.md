---
sidebar_position: 1
release_version: "7.1.17.0"
release_module: "Utilitario de Reporte Técnico"
---

# Envío de Múltiples Formatos de Reporte

Este documento describe la validación de los procedimientos necesarios para el envío de varios formatos de reporte (RM y RA) al reportar un documento, permitiendo obtener el código de formato correspondiente al objeto reportado y consultar el listado de reportes disponibles asociados a dicho código, de forma personalizable según los formatos configurados.

## Referencias

- [SO-212: OTT3453 ROCA | Texto enriquecido y Envío de varios formatos RM y RA](https://softwaresamm.atlassian.net/browse/SO-212)

## Información de Versiones

### Versión de Lanzamiento

:::info **V.4.3.0.0**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción              |
| ------------- | -------------- | ------------------------ |
| SAMMNEW       | >= 7.1.17.0    | Aplicación web           |
| SAMM LOGICA   | >= 5.6.26.7    | Lógica de negocio        |
| SAMM CORE     | >= 2.0.27.0    | Core del sistema         |
| SAMMAPI       | >= 1.2.33.1    | API principal            |
| CAPA DE DATOS | >= 2.1.18.0    | Capa de datos            |
| BASE DE DATOS | >= C2.1.18.0   | Base de datos            |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Acceso a la base de datos SAMM con permisos para crear, alterar o validar procedimientos almacenados.
- Conocimiento de la estructura de `doc_documento`, `doc_subtipoDocumento`, `rep_reporte` y `rep_reporte_categoria`.
- La regla de envío de correo `9-appSamm` configurada con estrategia `1`, junto con los correos adicionales definidos.
- Identificar qué herramienta de generación de reportes está en uso: **Reporting Services (SR)** o **Reporte Clásico (SR sobre SN)**, ya que esto determina la base de datos donde deben ejecutarse los procedimientos de este documento.

- Parametro Reporte Correo activo , desde el menu de Configuracion-aplicacion-Parametros generales - tab OTS

![Parametro de la seccion reporte correo ](./img/parametro_reportecorreo.png)

a continuacion se muestra imagen de como se ve la seccion una vez habilitada 

![seccion en reporte](./img/seccion-reportecorreo.png)

:::important Importante
El envío simultáneo de varios formatos (registro del reporte + selección de varios formatos) **solo es compatible** con la regla de envío de correo `9-appSamm` en estrategia `1`. Cualquier otra regla no soporta este proceso simultáneo.
:::

:::warning Precaución — Base de datos de ejecución según el motor de reportes
Los procedimientos `_obtenerFormatosCodigo` y `_obtenerReportesPorCodigoObjeto` deben crearse/validarse en la base de datos correcta según la herramienta de reportes utilizada como complemento:

- **Reporting Services (SR) como complemento**: Reporting Services maneja su **propia base de datos** para agrupar los reportes. En este caso, ambos procedimientos deben ejecutarse en dicha base de datos de Reporting Services, no en la base de datos SN.
- **Reporte Clásico**: Si se utiliza el reporte clásico, los procedimientos se ejecutan en la **misma base de datos SN**.

Antes de aplicar este paso, confirme cuál es el motor de reportes configurado para el entorno, ya que ejecutar los procedimientos en la base de datos incorrecta impedirá que el listado de formatos se obtenga correctamente.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Validar el procedimiento `_obtenerFormatosCodigo`

Este procedimiento devuelve el código correspondiente al `id` del documento sobre el cual se está realizando el reporte técnico. Aplica únicamente cuando `@p_codigo` sigue el patrón `doc_documento_%` con exactamente dos guiones bajos.

:::note Ubicación del procedimiento
Cree o valide este procedimiento en la base de datos de **Reporting Services** si esa es la herramienta de reportes en uso; si se maneja **reporte clásico**, créelo o valídelo en la base de datos **SN**.
:::

```sql title="Procedimiento _obtenerFormatosCodigo"
CREATE PROCEDURE [dbo].[_obtenerFormatosCodigo]
	@p_codigo AS VARCHAR(50),
	@p_id_objeto AS INT,
	@p_id_usuario AS INT,
	@p_eid AS VARCHAR(50)
AS
BEGIN
	IF @p_codigo LIKE 'doc_documento_%' AND LEN(@p_codigo) - LEN(REPLACE(@p_codigo, '_', '')) = 2
	BEGIN
		SELECT 
			doc_subtipoDocumento.subtipoDocumento_codigo AS codigo
		FROM doc_documento
			INNER JOIN doc_subtipoDocumento
		ON doc_documento.id_subtipoDocumento = doc_subtipoDocumento.id
		WHERE 
			doc_documento.id = @p_id_objeto AND
			doc_documento.active = 1 AND
			doc_subtipoDocumento.active = 1 AND
			doc_documento.eid = @p_eid AND
			doc_subtipoDocumento.eid = @p_eid
	END
	ELSE
	BEGIN
		SELECT 
			'' AS codigo
		WHERE 
			1 = 0
	END
END
```

```sql title="Ejemplo de ejecución"
_obtenerFormatosCodigo
	@p_codigo = 'doc_documento_ot',
	@p_id_objeto = 47, -- id de la OT
	@p_id_usuario = 1,
	@p_eid = '01'
```

### Paso 2: Validar la existencia del procedimiento `_obtenerReportesPorCodigoObjeto`

Este procedimiento retorna el listado de reportes disponibles según el código de objeto, y es personalizable según los formatos que se desee mostrar. Si se envía la tabla `@p_codigos` con valores, filtra por categorías de reporte; en caso contrario, filtra directamente por `@p_codigo`.

:::note Ubicación del procedimiento
Al igual que en el Paso 1, este procedimiento debe ejecutarse en la base de datos de **Reporting Services** cuando esa sea la herramienta de reportes configurada, o en la base de datos **SN** cuando se utilice el reporte clásico.
:::

```sql title="Procedimiento _obtenerReportesPorCodigoObjeto"
CREATE PROCEDURE [dbo].[_obtenerReportesPorCodigoObjeto]
    @p_codigo VARCHAR(50),
    @p_codigos dbo.typ_text READONLY,
    @p_eid VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM @p_codigos)
    BEGIN
        SELECT rep_reporte.*
        FROM rep_reporte_categoria
        INNER JOIN @p_codigos AS codigos
            ON rep_reporte_categoria.reporte_categoria = codigos.[text]
        INNER JOIN rep_reporte
            ON rep_reporte_categoria.id_reporte = rep_reporte.id
        WHERE rep_reporte.esFormato = 1
            AND rep_reporte_categoria.active = 1
            AND rep_reporte.active = 1
            AND rep_reporte_categoria.eid = @p_eid
            AND rep_reporte.eid = @p_eid;
    END
    ELSE
    BEGIN
        SELECT rep_reporte.*
        FROM rep_reporte_categoria
        INNER JOIN rep_reporte
            ON rep_reporte_categoria.id_reporte = rep_reporte.id
        WHERE rep_reporte_categoria.reporte_categoria = @p_codigo
            AND rep_reporte.esFormato = 1
            AND rep_reporte_categoria.active = 1
            AND rep_reporte.active = 1
            AND rep_reporte_categoria.eid = @p_eid
            AND rep_reporte.eid = @p_eid;
    END
END
```

```sql title="Ejemplo de ejecución"
declare @p_codigos as dbo.typ_text

insert into @p_codigos values ('OTT')

execute _obtenerReportesPorCodigoObjeto
    @p_codigo = 'doc_documento.ot',
    @p_codigos = @p_codigos,
    @p_eid = '01'
```

:::warning Precaución
Debe garantizarse que los formatos a mostrar cumplan con lo siguiente:

1. Que el o los reportes se puedan generar sin novedad, ya sea que estén configurados en la regla de envío de correo o como formato adicional.
2. Que no exista conflicto con el nombre del PDF. Para más detalle, consulte la [documentación de nomenclatura de PDF](https://softwaresamm.github.io/IDAE.Docs/docs/util-reportes/PDF-name?_highlight=nombre).
:::

:::tip Consejo
La tabla `@p_codigos` permite personalizar qué categorías de reportes se muestran (por ejemplo, `'OTT'`), facilitando la configuración de formatos específicos por tipo de documento.
:::

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la validación de los procedimientos:

1. **Identificación de código de objeto**: El sistema obtiene correctamente el código de formato (`codigo`) correspondiente al documento que se está reportando, usando `_obtenerFormatosCodigo`.
2. **Listado de formatos disponibles**: El sistema retorna, mediante `_obtenerReportesPorCodigoObjeto`, el listado de reportes disponibles (`esFormato = 1`) según el código de objeto o las categorías indicadas en `@p_codigos`.
3. **Envío simultáneo de varios formatos**: Al registrar el reporte, es posible seleccionar y enviar varios formatos (RM y RA) siempre que se use la regla de envío de correo `9-appSamm` con estrategia `1`.

## Resolución de Problemas

### No se obtiene el código de formato esperado

Verifique que:

- El parámetro `@p_codigo` siga el patrón `doc_documento_%` con exactamente dos guiones bajos.
- El documento (`doc_documento`) y su subtipo (`doc_subtipoDocumento`) estén activos (`active = 1`).
- El `@p_eid` enviado coincida con el `eid` del documento y del subtipo de documento.
- El procedimiento se haya creado en la base de datos correcta según el motor de reportes en uso (Reporting Services vs. reporte clásico).

### El listado de reportes disponibles aparece vacío

Confirme que:

- Existan registros en `rep_reporte_categoria` y `rep_reporte` con `active = 1` y `esFormato = 1`.
- El `@p_codigo` o los valores de `@p_codigos` coincidan exactamente con `reporte_categoria`.
- El `@p_eid` corresponda correctamente a los registros consultados.
- El procedimiento esté ejecutándose contra la base de datos correcta: la de Reporting Services si esa es la herramienta configurada, o la base de datos SN si se usa reporte clásico.

### No es posible enviar varios formatos simultáneamente

Revise que:

- La regla de envío de correo configurada sea `9-appSamm` con estrategia `1`.
- Los correos adicionales requeridos estén correctamente definidos en la regla de envío.
- No exista conflicto en el nombre generado para el PDF, según la documentación de nomenclatura referenciada.

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

**Escenario 1: Obtención del código de formato de una OT**

1. Ejecutar `_obtenerFormatosCodigo` con `@p_codigo = 'doc_documento_ot'` y el `@p_id_objeto` de una OT activa, en la base de datos correspondiente según el motor de reportes en uso.
2. **Resultado esperado**: El procedimiento retorna el `subtipoDocumento_codigo` correspondiente a la OT consultada.

**Escenario 2: Envío de varios formatos con la regla de correo correcta**

1. Configurar la regla de envío de correo `9-appSamm` con estrategia `1` y correos adicionales definidos.
2. Registrar un reporte técnico seleccionando más de un formato disponible (obtenido mediante `_obtenerReportesPorCodigoObjeto`).
3. **Resultado esperado**: Todos los formatos seleccionados se generan y envían correctamente, sin conflictos en el nombre del PDF.

**Escenario 3: Ejecución de procedimientos según el motor de reportes**

1. Identificar el motor de reportes configurado en el entorno (Reporting Services o reporte clásico).
2. Validar que `_obtenerFormatosCodigo` y `_obtenerReportesPorCodigoObjeto` existan en la base de datos correspondiente (base de datos de Reporting Services o base de datos SN).
3. **Resultado esperado**: Los procedimientos se ejecutan sin errores y retornan los datos esperados desde la base de datos correcta según el motor configurado.