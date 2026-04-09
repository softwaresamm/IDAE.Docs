---
sidebar_position: 1
---

# Filtro de Subtipo de Documento

Este documento describe cómo funciona y se configura el procedimiento `fil_subtipodocumento`,
el cual permite obtener la lista de subtipos de documento disponibles para un usuario,
filtrando los resultados según el parametro `@td`. para el valor `1` se espera los subtipos de solicitud y para el `2`
se espera los subtipos de orden de trabajo

---

## Referencias

- [SO-570: Implementar parámetro tipoDocumento para ajustar visualización del campo documento según funcionalidad en la APP](https://softwaresamm.atlassian.net/browse/SO-570)

---

## Información de Versiones

### Versión de Lanzamiento

:::info **APP v 2.3.0.1**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción              |
| ------------- | -------------- | ------------------------ |
| SAMMAPI       | >= 1.2.22.0    | API principal            |
| SAMM LOGICA   | >= 5.6.24.2    | Lógica de negocio        |
| SAMM CORE     | >= 2.0.19.3    | Core del sistema         |
| BASE DE DATOS | >= C2.1.10.0   | Base de datos SQL Server |

---

## Requisitos Previos

Antes de utilizar o configurar este procedimiento, asegúrese de tener:

- Acceso a la base de datos por medio del usuario superadministrador
- verificar la creacion del sp fil_subtipodocumento
- Contar con la Version actualizada del APP
  
:::important Importante
el procedimiento debe iniciar con la tres letras fil.
:::

---

## Información del Servicio

:::note Información
El procedimiento `fil_subtipodocumento` actúa como fuente de datos para la seleccion
del subtipo de documento en la aplicación. Acepta el ID de usuario, un identificador
de entidad (`@p_eid`) y un tipo de documento (`@td`) para contextualizarlo, y retorna
los subtipos de documento esperados
:::

### Parámetros del procedimiento

| Parámetro       | Tipo           | Descripción                                                      |
| --------------- | -------------- | ---------------------------------------------------------------- |
| `@p_id_usuario` | `INT`          | ID del usuario. activo en la APP                                 |
| `@p_eid`        | `VARCHAR(50)`  | Identificador de entidad asociada a SAMM                         |
| `@td`           | `VARCHAR(50)`  | Tipo de documento (nuevo parámetro)                              |


### Ejecución

```SQL title="Ejemplo de ejecución directa en SQL Server"
EXEC [dbo].[fil_subtipodocumento]
    @p_id_usuario =  5,
    @p_eid        = '01',
    @td           = '2'
```

### Respuesta


|  ID   | codigo |      subtipoDocumento      |
| ----- | -------|----------------------------|
| `2`  |  `OTT`  |     `Orden de Trabajo`     |


---

## Configuración

### Paso 1: Creación o actualización del procedimiento

El procedimiento debe existir en la base de datos.
Ejecute el siguiente script para crearlo o actualizarlo:

```sql title="Creación del procedimiento fil_subtipodocumento"
CREATE OR ALTER PROCEDURE [dbo].[fil_subtipodocumento]
    @p_id_usuario INT,
    @p_eid        VARCHAR(50),
    @td           VARCHAR(50)-- Parámetro nuevo;
AS
BEGIN
    SET NOCOUNT ON;

    -- 1: retorna todos los subtipos activos de solicitud
    IF @td = '1'
    BEGIN
        SELECT
            id,
            subtipoDocumento_codigo AS codigo,
            subtipoDocumento
        FROM doc_subtipodocumento
        WHERE id_tipodocumento = 1
              AND id = 1;
    END

    -- 2: retorna todos los subtipos activos de Orden de trabajo
    ELSE IF @td = '2'
    BEGIN
        SELECT
            id,
            subtipoDocumento_codigo AS codigo,
            subtipoDocumento
        FROM doc_subtipodocumento
        WHERE id_tipodocumento = 2 
          AND id = 2;
    END

END
```

### Paso 2: Activacion en `_columnas`

Se debe relacionar el procedimiento anteriormene creado o modificado en la tabla condición de `doc_documento`
```sql title="Verificar la columna condición en la base de datos"
SELECT condicion
FROM _columnas
WHERE tabla = 'doc_documento'
AND columna = 'id_subtipoDocumento'
```
```sql title="Actualizacón valor del campo condición en la base de datos"
UPDATE _columnas
SET condicion='fil_subtipodocumento'
WHERE tabla = 'doc_documento'
AND columna = 'id_subtipoDocumento'
```

### Paso 3: Prueba de ejecución

:::tip consejo
Ejecute el procedimiento con distintos valores para validar su comportamiento:
:::

```sql title="Prueba con usuario superadministrador (id = 1)"
EXEC [dbo].[fil_subtipodocumento]
    @p_id_usuario = 1,
    @p_eid        = '01',
    @td           = '1' ó @td = '2'
```

```sql title="Prueba con usuario no superadministrador"
EXEC [dbo].[fil_subtipodocumento]
    @p_id_usuario = 5,
    @p_eid        = '01',
    @td           = '1' ó @td = '2'
```

### Paso 4: Configuración Campos formulario mostrar en mostrarEnApp

```sql title="Campos necesario para la funcionalidad"
update _columnas
set mostrarEnApp = 1
where tabla = 'doc_documento'
and columna in ('id_subtipoDocumento','motivoServicio')

update _columnas
set mostrarEnApp = 1
where tabla = 'doc_documento.ot'
and columna in ('motivoServicio','id_tipoServicio','email')

update _columnas
set mostrarEnApp = 1
where tabla = 'doc_documento.solicitud'
and columna in ('id_subtipoDocumento','motivoServicio','solicitante','telefono','email')


```

### Paso 5: Desactivar campos requeridos

```sql title="Campos requeridos para los documentos"
update _columnas
set requerido = 0
where tabla = 'doc_documento'
and columna not in ('id_subtipoDocumento')

update _columnas
set requerido = 0
where tabla = 'doc_documento.ot'
and columna not in ('motivoServicio','id_tipoServicio')

update _columnas
set requerido = 0
where tabla = 'doc_documento.solicitud'
and columna not in ('id_subtipoDocumento','motivoServicio','solicitante','telefono','email')
```
---

## Resultado Esperado

Una vez ejecutado el procedimiento correctamente:

1. **Al momento de ingresar al menú gestion de equipos e ingresar al menú de crear servicio solo se debe visualizar subtipos de ordenes de trabajo.**
2. **Al momento de ingresar al menú gestion de equipos e ingresar al menú de crear snovedad solo se debe visualizar subtipos de solicitud.**
3. **Visualizar en cada uno de ellos los campos anteriormente configurados.**
4. **Generar cada uno de los documentos de manera correcta.**

---

## Errores Conocidos

- Sin errores conocidos al momento de redactar este documento.