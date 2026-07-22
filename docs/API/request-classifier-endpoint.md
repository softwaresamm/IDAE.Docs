---
sidebar_position: 1
---

# Endpoint de Clasificación Automática de Solicitudes con IA (Claude)

Este documento describe el nuevo endpoint de **Samm API** que permite clasificar solicitudes de forma automática utilizando **Claude (Anthropic)** como proveedor de inteligencia artificial. El servicio analiza la solicitud recibida y devuelve una recomendación de prioridad, el analista o consultor sugerido para su asignación, y una orientación de resolución, tarea que anteriormente se realizaba de forma **manual**.

## Referencias

| Ticket | Descripción |
| --- | --- |
| [SO-748](https://softwaresamm.atlassian.net/browse/SO-748) | Crear endpoint para poder clasificar las solicitudes usando Claude como proveedor AI |

## Información de Versiones

:::info
Esta funcionalidad está disponible a partir de las siguientes versiones.
:::

| Componente | Versión |
| --- | --- |
| **Samm API** | `1.2.30.1` |
| Samm Lógica | `5.6.26.1` |
| Capa de Datos | `2.1.15.1` |
| Recursos | `-` |
| Base de Datos | `C2.1.15.1` |
| Sam Core | `2.0.24.1` |
| Samm New | `7.1.14.0` |

## Requisitos Previos

No aplica para esta funcionalidad. No se requieren permisos especiales, accesos adicionales ni conocimientos previos fuera de lo estándar para la configuración de Samm API.

## Información del Servicio

**Endpoint:** `POST /api/ai/solicitudes/clasificarCaso`

Clasifica una solicitud utilizando Claude como proveedor de IA y devuelve el análisis con la prioridad sugerida, el analista/consultor recomendado para la asignación y una orientación de resolución.

### Respuestas

| Código HTTP | Motivo |
| --- | --- |
| `200` | Devuelve el objeto en formato JSON con la información correspondiente. |
| `400` | La solicitud no es válida. |
| `401` | Se ha denegado la autorización para la solicitud. |
| `500` | Ha ocurrido un error interno. |

### Ejemplo de Response (200)

```json title="Response — clasificación exitosa"
{
  "application/json": {
    "Respuesta": "Clasificacion de caso ejecutada correctamente.",
    "Analisis": {
      "Prioridad": "Alta",
      "Razonamiento": "La solicitud afecta una funcionalidad critica del negocio y requiere atencion prioritaria para evitar interrupciones operativas.",
      "IdAsignado": 123,
      "UsuarioAsignado": "John.Doe",
      "Orientacion": "Revisar el modulo relacionado, validar el impacto en usuarios activos y priorizar la correccion del flujo afectado."
    }
  }
}
```

:::note
Los campos `IdAsignado` y `UsuarioAsignado` corresponden al analista o consultor sugerido por el modelo para la asignación del caso, obtenido a partir del listado de analistas/consultores disponibles.
:::

## Configuración

### Paso 1 — Configurar las claves de conexión con Claude en el `web.config`

Se deben agregar las siguientes keys en el `web.config` de Samm API, con los datos de conexión al proveedor de IA (Anthropic/Claude).

```xml title="web.config — claves del clasificador de casos"
<add key="AI.ClasificadorCaso.Provider" value="Anthropic" />
<add key="AI.ClasificadorCaso.ApiKey" value="" />
<add key="AI.ClasificadorCaso.BaseUrl" value="https://api.anthropic.com" />
<add key="AI.ClasificadorCaso.Model" value="claude-sonnet-4-6" />
<add key="AI.ClasificadorCaso.MaxTokens" value="1000" />
<add key="AI.ClasificadorCaso.AnthropicVersion" value="2023-06-01" />
<add key="AI.ClasificadorCaso.AnthropicBeta" value="files-api-2025-04-14" />
```

:::important
La key `AI.ClasificadorCaso.ApiKey` debe completarse con la API Key correspondiente al ambiente. Sin este valor, el endpoint no podrá autenticar las solicitudes contra el proveedor de IA y el servicio fallará.
:::

### Paso 2 — Verificar la existencia del procedimiento almacenado `_obtenerAnalistasConsultores`

Este procedimiento obtiene el listado de analistas y consultores disponibles, junto con su carga de trabajo actual y experiencia, para que el modelo de IA pueda sugerir el usuario a asignar en la clasificación.

```sql title="_obtenerAnalistasConsultores.sql"
CREATE OR ALTER PROCEDURE [dbo].[_obtenerAnalistasConsultores]
    @p_idUsuario INT,
    @p_eid VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        doc_documento_solicitud_id_usuario_asignado AS id,
        usu.usuario AS nombre,
        CAST(DATEDIFF(MONTH, usu.fechaCreacion, GETDATE()) AS VARCHAR(10)) + ' meses' AS experiencia,
        CAST(COUNT(sol.id) AS VARCHAR(10)) + ' casos' AS carga_trabajo,
        grupo.grupo AS equipo,
        cargo.cargo
    FROM view_doc_documento_solicitud sol
    RIGHT OUTER JOIN seg_usuario usu
        ON usu.id = doc_documento_solicitud_id_usuario_asignado
        AND doc_documento_solicitud_doc_estadoTipoDocumento_estadoTipoDocumento_codigo NOT IN ('CER', 'CAN')
    INNER JOIN seg_grupo grupo
        ON grupo.id = usu.id_grupo
    INNER JOIN seg_cargo cargo
        ON cargo.id = usu.id_cargo
    WHERE usu.id > 0