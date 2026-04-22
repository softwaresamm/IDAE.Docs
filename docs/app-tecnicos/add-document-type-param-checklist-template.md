---
sidebar_position: 1
release_version: "2.3.0.1"
release_module: "Gestión de Documentos"
---

# Filtro de Tipo de Documento

Este documento describe cómo funciona y se configura el procedimiento `fil_subtipodocumento`,
el cual permite obtener la lista de subtipos de documento disponibles para un usuario,
filtrando los resultados según el parámetro `@td`. Para el valor `1` se esperan los subtipos de solicitud
y para el `2` se esperan los subtipos de orden de trabajo.

Adicionalmente, se informa cómo manejar el procedimiento `fil_prioridad` para la asignación
de las prioridades según el documento al que se quiere afectar (`doc_documento.solicitud`, `doc_documento.ot`).

---

## Referencias

- [SO-570: Implementar parámetro tipoDocumento para ajustar visualización del campo documento según funcionalidad en la APP](https://softwaresamm.atlassian.net/browse/SO-570)
- [SO-507: Al crear una solicitud, NO está teniendo en cuenta el estado](https://softwaresamm.atlassian.net/browse/SO-507)

---

## Información de Versiones

### Versión de Lanzamiento

:::info **APP v2.3.0.1**
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
- Verificar la creación del SP `fil_subtipodocumento`
- Contar con la versión actualizada de la APP

:::important Importante
El procedimiento debe iniciar con las tres letras `fil`.
:::

---

## Información del Servicio

:::note Información
El procedimiento `fil_subtipodocumento` actúa como fuente de datos para la selección
del subtipo de documento en la aplicación. Acepta el ID de usuario, un identificador
de entidad (`@p_eid`) y un tipo de documento (`@td`) para contextualizarlo, y retorna
los subtipos de documento esperados.
:::

### Parámetros del procedimiento

| Parámetro       | Tipo          | Descripción                             |
| --------------- | ------------- | --------------------------------------- |
| `@p_id_usuario` | `INT`         | ID del usuario activo en la APP         |
| `@p_eid`        | `VARCHAR(50)` | Identificador de entidad asociada a SAMM |
| `@td`           | `VARCHAR(50)` | Tipo de documento (nuevo parámetro)     |

### Ejecución

```sql title="Ejemplo de ejecución directa en SQL Server"
EXEC [dbo].[fil_subtipodocumento]
    @p_id_usuario =  5,
    @p_eid        = '01',
    @td           = '2'
```

### Respuesta

| ID  | codigo | subtipoDocumento   |
| --- | ------ | ------------------ |
| `2` | `OTT`  | `Orden de Trabajo` |

---

## Configuración - fil_subtipodocumento

### Paso 1: Creación o actualización del procedimiento

El procedimiento debe existir en la base de datos.
Ejecute el siguiente script para crearlo o actualizarlo:

```sql title="Creación del procedimiento fil_subtipodocumento"
CREATE OR ALTER PROCEDURE [dbo].[fil_subtipodocumento]
    @p_id_usuario INT,
    @p_eid        VARCHAR(50),
    @td           VARCHAR(50) -- Parámetro nuevo
AS
BEGIN
    SET NOCOUNT ON;

    -- 1: Retorna todos los subtipos activos de solicitud
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

    -- 2: Retorna todos los subtipos activos de Orden de Trabajo
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

### Paso 2: Activación en `_columnas`

Se debe relacionar el procedimiento anteriormente creado o modificado en la tabla condición de `doc_documento`.

```sql title="Verificar la columna condición en la base de datos"
SELECT condicion
FROM _columnas
WHERE tabla = 'doc_documento'
AND columna = 'id_subtipoDocumento'
```

```sql title="Actualización del valor del campo condición en la base de datos"
UPDATE _columnas
SET condicion = 'fil_subtipodocumento'
WHERE tabla = 'doc_documento'
AND columna = 'id_subtipoDocumento'
```

### Paso 3: Prueba de ejecución

:::tip Consejo
Ejecute el procedimiento con distintos valores para validar su comportamiento.
:::

```sql title="Prueba con usuario superadministrador (@p_id_usuario = 1)"
EXEC [dbo].[fil_subtipodocumento]
    @p_id_usuario = 1,
    @p_eid        = '01',
    @td           = '1' -- ó @td = '2'
```

```sql title="Prueba con usuario no superadministrador"
EXEC [dbo].[fil_subtipodocumento]
    @p_id_usuario = 5,
    @p_eid        = '01',
    @td           = '1' -- ó @td = '2'
```

### Paso 4: Configuración de campos del formulario en `mostrarEnApp`

```sql title="Campos necesarios para la funcionalidad"
UPDATE _columnas
SET mostrarEnApp = 1
WHERE tabla = 'doc_documento'
AND columna IN ('id_subtipoDocumento', 'motivoServicio');

UPDATE _columnas
SET mostrarEnApp = 1
WHERE tabla = 'doc_documento.ot'
AND columna IN ('motivoServicio', 'id_tipoServicio', 'email');

UPDATE _columnas
SET mostrarEnApp = 1
WHERE tabla = 'doc_documento.solicitud'
AND columna IN ('id_subtipoDocumento', 'motivoServicio', 'solicitante', 'telefono', 'email');
```

### Paso 5: Desactivar campos requeridos

```sql title="Campos requeridos para los documentos"
UPDATE _columnas
SET requerido = 0
WHERE tabla = 'doc_documento'
AND columna NOT IN ('id_subtipoDocumento');

UPDATE _columnas
SET requerido = 0
WHERE tabla = 'doc_documento.ot'
AND columna NOT IN ('motivoServicio', 'id_tipoServicio');

UPDATE _columnas
SET requerido = 0
WHERE tabla = 'doc_documento.solicitud'
AND columna NOT IN ('id_subtipoDocumento', 'motivoServicio', 'solicitante', 'telefono', 'email');
```

---

## Configuración - fil_prioridad

### Paso 1: Creación o actualización del procedimiento

El procedimiento debe existir en la base de datos.
Ejecute el siguiente script para crearlo o actualizarlo:

```sql title="Creación del procedimiento fil_prioridad"
CREATE OR ALTER PROCEDURE [dbo].[fil_prioridad]
    @p_id_usuario INT,
    @p_eid        VARCHAR(50),
    @td           VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- 1: Retorna todas las prioridades activas de solicitud
    IF @td = '1'
    BEGIN
        SELECT id, prioridadDocumento_codigo AS codigo, prioridadDocumento
        FROM doc_prioridadDocumento
        WHERE doc_prioridadDocumento.id_tipoDocumento = 1
          AND id IN (1); -- Colocar las prioridades a mostrar o pausar la condición para mostrarlos todos
    END

    -- 2: Retorna todas las prioridades activas de Orden de Trabajo
    ELSE IF @td = '2'
    BEGIN
        SELECT id, prioridadDocumento_codigo AS codigo, prioridadDocumento
        FROM doc_prioridadDocumento
        WHERE id_tipoDocumento = 2
          AND id IN (5, 6); -- Colocar las prioridades a mostrar o pausar la condición para mostrarlos todos
    END

END
```

### Paso 2: Activación en `_columnas`

Se debe relacionar el procedimiento anteriormente creado o modificado en la columna condición de `doc_documento`.

```sql title="Verificar la columna condición en la base de datos"
SELECT condicion
FROM _columnas
WHERE tabla = 'doc_documento'
AND columna = 'id_prioridadDocumento'
```

```sql title="Actualización del valor del campo condición en la base de datos"
UPDATE _columnas
SET condicion = 'fil_prioridad'
WHERE tabla = 'doc_documento'
AND columna = 'id_prioridadDocumento'
```

### Paso 3: Prueba de ejecución

:::tip Consejo
Ejecute el procedimiento con distintos valores para validar su comportamiento.
:::

```sql title="Prueba con usuario superadministrador (@p_id_usuario = 1)"
EXEC [dbo].[fil_prioridad]
    @p_id_usuario = 1,
    @p_eid        = '01',
    @td           = '1' -- ó @td = '2'
```

```sql title="Prueba con usuario no superadministrador"
EXEC [dbo].[fil_prioridad]
    @p_id_usuario = 5,
    @p_eid        = '01',
    @td           = '1' -- ó @td = '2'
```

---

## Resultado Esperado

Una vez completada la configuración:

1. **Gestión de Equipos - Crear Servicio**: Al ingresar al menú de gestión de equipos y acceder a crear servicio, solo se deben visualizar subtipos de órdenes de trabajo.
2. **Gestión de Equipos - Crear Novedad**: Al ingresar al menú de gestión de equipos y acceder a crear novedad, solo se deben visualizar subtipos de solicitud.
3. **Campos configurados visibles**: Se deben visualizar en cada documento únicamente los campos anteriormente configurados.
4. **Generación de documentos**: Cada uno de los documentos debe generarse de manera correcta.

---

## Resolución de Problemas

### El procedimiento no retorna resultados

Verifique que:

- El valor del parámetro `@td` corresponda a `'1'` para solicitudes o `'2'` para órdenes de trabajo
- Los registros en `doc_subtipodocumento` tengan el `id_tipodocumento` correcto
- El usuario indicado en `@p_id_usuario` esté activo en la APP

### Los subtipos no aparecen en la APP

Confirme que:

- El campo `condicion` en `_columnas` esté actualizado con el valor `fil_subtipodocumento`
- El campo `mostrarEnApp` esté en `1` para las columnas requeridas
- La versión de la APP sea `>= 2.3.0.1`

### Las prioridades no se filtran correctamente

Revise que:

- El campo `condicion` en `_columnas` esté actualizado con el valor `fil_prioridad`
- Los IDs de prioridad en el procedimiento `fil_prioridad` correspondan a los registros existentes en `doc_prioridadDocumento`
- El parámetro `@td` se esté enviando correctamente desde la APP

---

## Errores Conocidos

- Sin errores conocidos al momento de redactar este documento.
