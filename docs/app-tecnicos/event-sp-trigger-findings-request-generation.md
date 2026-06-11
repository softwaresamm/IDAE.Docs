---
sidebar_position: 1
release_version: "1.2.27.0"
release_module: "Gestión de Equipos"
---

# Procedimiento Almacenado 

Este documento describe cómo funciona y se configura el procedimiento almacenado de eventos encargado de ejecutar automáticamente la logica de negocio

---

## Referencias

- [SO-553: Creación de SP para eventos que ejecute el SP de generación de solicitudes de hallazgos](https://softwaresamm.atlassian.net/browse/SO-553)

---

## Información de Versiones

### Versión de Lanzamiento

:::info **APP v2.3.1.1**
        **API V1.2.27.0**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción              |
| ------------- | -------------- | ------------------------ |
| SAMMAPI       | >= 1.2.27.0    | API principal            |
| SAMM LOGICA   | >= 5.6.26.1    | Lógica de negocio        |
| SAMM CORE     | >= 2.0.22.0    | Core del sistema         |
| BASE DE DATOS | >= C2.1.13.0   | Base de datos SQL Server |

---

## Requisitos Previos

Antes de utilizar o configurar este procedimiento, asegúrese de tener:

- Acceso a la base de datos por medio del usuario superadministrador
- Verificar la creación del SP `ejf_evento`
- Contar con la versión actualizada de la APP
- Tener activa una lista de chequeo al modelo para uso del botón Operacion en gestion de equipos

:::important Importante

El procedimiento no puede ser modificado en su encabezado.

```sql
CREATE PROCEDURE [dbo].[ejf_evento]
    @p_id_evento AS INT = -1,
    @p_id_usuario AS INT,
    @p_eid AS VARCHAR(50)
```

:::

---

## Información del Servicio

:::note Información
El procedimiento `ejf_evento` actua al momento de crearse el evento su acción sera determinada por la
logica de negocio de cada cliente
:::

### Parámetros del procedimiento

| Parámetro       | Tipo          | Descripción                              |
| --------------- | ------------- | -----------------------------------------|
| `@p_id_usuario` | `INT`         | ID del usuario activo en la APP          |
| `@p_eid`        | `VARCHAR(50)` | Identificador de entidad asociada a SAMM |
| `@p_id_evento`  | `INT`         | id del evento                            |

### Ejecución

```sql title="Ejemplo de ejecución directa en SQL Server"
EXEC [dbo].[ejf_evento]
    @p_id_evento  = 1,
    @p_id_usuario =  1,
    @p_eid        = '01'
    
```

### Respuesta

`Columna Vacia`

---

## Configuración - ejf_evento

### Paso 1: Creación o actualización del procedimiento

El procedimiento debe existir en la base de datos.
Ejecute el siguiente script para crearlo o actualizarlo:

```sql title="Creación del procedimiento ejf_evento"
CREATE or ALTER PROCEDURE [dbo].[ejf_evento]
    @p_id_evento AS INT = -1,
    @p_id_usuario AS INT,
    @p_eid AS VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @respuesta VARCHAR(100) = ''

    IF @p_id_evento >0
        BEGIN

        UPDATE equ
        SET equ.id_estadoequipo = 2
        FROM equ_equipo equ
        INNER JOIN dis_evento dis on dis.id_equipo = equ.id
        WHERE dis.id = @p_id_evento

        SELECT @respuesta AS 'respuesta'

        END
    ELSE
    BEGIN

        SELECT @respuesta AS 'respuesta'
        
    END
END
```

### Paso 2: Prueba de ejecución

:::tip Consejo
Ejecute el procedimiento con distintos valores para validar su comportamiento.

:::

## Resultado Esperado

Una vez completada la configuración:

1. Seleccione un equipo en **Gestión de Equipos**.
1. Ingrese a **Gestión de Equipos → Operación**.
3. Verifique que se visualice la lista de chequeo relacionada previamente al modelo, según la configuración documentada en:
   https://softwaresamm.github.io/IDAE.Docs/docs/app-tecnicos/conditional-checklist-report-types
4. Al crear el evento desde la aplicación, se debe ejecutar automáticamente la lógica implementada en el procedimiento.
5. Como resultado, el sistema deberá generar la accion de manera correcta.

---

## Resolución de Problemas

### Error al crear el evento

Verifique lo siguiente:

- La parametrización de la tabla **_columnas** se encuentra configurada correctamente.
- Los campos relacionados entre las tablas **dis_evento** y **equ_equipo** no se encuentren marcados como requeridos cuando la funcionalidad así lo requiera.
- El procedimiento almacenado asociado se encuentre creado y sin errores de ejecución.

### La lista de chequeo no es visible

Confirme que:

- Se encuentran configurados correctamente los procedimientos descritos en la documentación:
  https://softwaresamm.github.io/IDAE.Docs/docs/app-tecnicos/conditional-checklist-report-types
- Los procedimientos configurados retornan información al ejecutarse manualmente.
- El modelo del equipo tiene asociada al menos una lista de chequeo activa.
