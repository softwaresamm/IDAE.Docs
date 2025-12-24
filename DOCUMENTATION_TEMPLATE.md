# Template de Documentación - IDAE.Docs

Este template define la estructura y reglas estándar para crear documentos de funcionalidades en el proyecto IDAE.Docs.

---

## Estructura del Documento

Todos los documentos técnicos deben seguir esta estructura:

### 1. Frontmatter (Metadata)

```yaml
---
sidebar_position: [número]
release_version: "[versión]"
release_module: "[nombre del módulo]"
---
```

**Reglas:**

- `sidebar_position`: Número entero que define el orden en el sidebar
- `release_version`: Versión en la que se liberó la funcionalidad (formato: "X.Y.Z")
- `release_module`: Nombre del módulo al que pertenece (usar nombres consistentes)

### 2. Título Principal

```markdown
# [Nombre de la Funcionalidad]
```

**Reglas:**

- Usar un título claro y descriptivo
- Debe ser un H1 (`#`)
- Evitar abreviaciones innecesarias

### 3. Descripción Introductoria

Párrafo conciso que explica:

- **Qué hace** la funcionalidad
- **Para qué sirve**
- **Qué problema resuelve**

**Ejemplo:**

```markdown
Este documento describe cómo configurar [funcionalidad] para [objetivo],
permitiendo [beneficio específico].
```

### 4. Referencias

```markdown
## Referencias

- [CÓDIGO-###: Descripción del ticket](URL-de-Jira)
- [CÓDIGO-###: Descripción del ticket](URL-de-Jira)
```

**Reglas:**

- Incluir todos los tickets de Jira relacionados
- Usar el formato: `[CÓDIGO-NÚMERO: Descripción breve](URL)`
- Listar en orden de relevancia o cronológico

### 5. Información de Versiones

```markdown
## Información de Versiones

### Versión de Lanzamiento

:::info **vX.Y.Z**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima | Descripción       |
| ------------- | -------------- | ----------------- |
| SAMMAPI       | >= X.Y.Z       | API principal     |
| SAMMNEW       | >= X.Y.Z       | Aplicación web    |
| SAMM LOGICA   | >= X.Y.Z       | Lógica de negocio |
| SAMM CORE     | >= X.Y.Z       | Core del sistema  |
| BASE DE DATOS | >= CX.Y.Z      | Base de datos     |
```

**Reglas:**

- Siempre incluir la versión de lanzamiento en un callout `:::info`
- Tabla de versiones requeridas debe incluir solo las aplicaciones relevantes
- Usar formato de versionamiento semántico: `>= X.Y.Z`
- Incluir descripción breve de cada aplicación
- Para Base de Datos usar prefijo `C` (ej: `>= C2.1.7.2`)

### 6. Requisitos Previos

```markdown
## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- [Requisito 1]
- [Requisito 2]
- [Requisito 3]

:::important Importante
[Mensaje de advertencia o nota crítica sobre requisitos]
:::
```

**Reglas:**

- Listar todos los requisitos necesarios antes de empezar
- Incluir permisos, accesos, conocimientos técnicos necesarios
- Usar callout `:::important` para notas críticas
- Mantener lista concisa pero completa

### 7. Información del Servicio (si aplica)

````markdown
## Información del Servicio

:::note Información
[Descripción breve del servicio y su propósito]
:::

### Parámetros del Servicio

| Parámetro | Valor | Descripción                 |
| --------- | ----- | --------------------------- |
| [param1]  | X     | [Descripción del parámetro] |
| [param2]  | Y     | [Descripción del parámetro] |

### Request

```bash title="Ejemplo de petición"
curl --location '[URL]' \
--header 'Authorization: Bearer [TOKEN]'
```
````

### Response

```json title="Ejemplo de respuesta"
{
  "campo": "valor"
}
```

````

**Reglas:**
- Incluir solo si la funcionalidad utiliza un servicio API
- Usar callout `:::note` para descripción del servicio
- Incluir tabla de parámetros si el servicio los acepta
- Ejemplos de request deben usar formato bash con curl
- Ejemplos de response deben usar formato JSON
- Usar títulos descriptivos en los bloques de código
- Tokens y URLs pueden ser de ejemplo/mock

**Tips adicionales:**
- Usar callout `:::tip` para resaltar campos importantes en el response
- Incluir explicación de campos relevantes después del ejemplo

### 8. Configuración

```markdown
## Configuración

### Paso 1: [Nombre del Paso]

[Descripción de qué se hace en este paso]

#### [Subtítulo si es necesario]

[Contenido del paso]

```sql title="Descripción del código"
-- Código SQL o script
````

:::tip Consejo
[Consejo útil relacionado con este paso]
:::

### Paso 2: [Nombre del Paso]

[Continuar con siguientes pasos...]

````

**Reglas:**
- Numerar los pasos secuencialmente
- Cada paso debe tener un título descriptivo
- Incluir explicaciones antes de mostrar código
- Código debe tener título descriptivo
- Usar callouts para notas, consejos o advertencias:
  - `:::tip` - Consejos útiles
  - `:::note` - Información adicional
  - `:::important` - Advertencias importantes
  - `:::warning` - Precauciones críticas
- Incluir subtítulos (H4) cuando un paso tenga múltiples secciones

### 9. Casos Especiales (si aplica)

```markdown
## Casos Especiales

:::note Comportamientos Predefinidos
[Explicación de los casos especiales]
:::

| Caso          | Campo/Valor    | Descripción                      |
| ------------- | -------------- | -------------------------------- |
| [Caso 1]      | [valor]        | [Descripción del comportamiento] |
| [Caso 2]      | [valor]        | [Descripción del comportamiento] |
````

**Reglas:**

- Incluir solo si hay comportamientos excepcionales o predefinidos
- Usar callout para introducir la sección
- Tabla debe mostrar claramente el caso, valor y descripción

### 10. Resultado Esperado

```markdown
## Resultado Esperado

Una vez completada la configuración:

1. **[Resultado 1]**: [Descripción del comportamiento esperado]
2. **[Resultado 2]**: [Descripción del comportamiento esperado]
3. **[Resultado 3]**: [Descripción del comportamiento esperado]

### [Subtítulo de Resultado Visual]

![alt text](./img/[nombre-imagen].png)
```

**Reglas:**

- Listar todos los resultados esperados numerados
- Usar negritas para el nombre del resultado
- Incluir capturas de pantalla cuando sea relevante
- Imágenes deben estar en carpeta `img/` relativa al documento
- Usar alt text descriptivo en las imágenes
- Agrupar resultados visuales con subtítulos si hay múltiples imágenes

### 11. Resolución de Problemas

```markdown
## Resolución de Problemas

### [Problema 1]

Verifique que:

- [Verificación 1]
- [Verificación 2]
- [Verificación 3]

### [Problema 2]

Confirme que:

- [Confirmación 1]
- [Confirmación 2]

### [Problema 3]

Revise que:

- [Revisión 1]
- [Revisión 2]
```

**Reglas:**

- Listar problemas comunes como H3
- Usar verbos de acción: "Verifique", "Confirme", "Revise"
- Cada problema debe tener lista de verificaciones específicas
- Ordenar de más común a menos común
- Ser específico en las soluciones

### 12. Errores Conocidos (si aplica)

```markdown
## Errores Conocidos

- [CÓDIGO-###: Descripción del error](URL-de-Jira): [Explicación breve del problema y su estado]
```

**Reglas:**

- Incluir solo si existen errores conocidos sin resolver
- Enlazar al ticket de Jira correspondiente
- Explicar brevemente el impacto del error
- Mantener actualizado cuando se resuelvan

---

## Reglas Generales de Formato

### Callouts (Admoniciones)

Docusaurus soporta los siguientes tipos de callouts:

```markdown
:::note
Información adicional o aclaraciones
:::

:::tip
Consejos útiles, mejores prácticas
:::

:::info
Información importante que destacar
:::

:::warning
Advertencias sobre precauciones a tomar
:::

:::danger
Peligros críticos o acciones que pueden causar problemas
:::

:::important
Información crítica que no debe pasarse por alto
:::
```

**Cuándo usar cada tipo:**

- `note` - Información complementaria
- `tip` - Mejores prácticas, consejos de optimización
- `info` - Información destacada (versiones, datos importantes)
- `warning` - Precauciones, cosas a evitar
- `danger` - Acciones peligrosas, riesgo de pérdida de datos
- `important` - Requisitos críticos, pasos obligatorios

### Bloques de Código

````markdown
```[lenguaje] title="Título descriptivo"
[código]
```
````

```

**Reglas:**
- Siempre especificar el lenguaje: `sql`, `bash`, `json`, `javascript`, etc.
- Siempre incluir un título descriptivo
- Mantener el código formateado y legible
- Incluir comentarios cuando sea necesario

### Tablas

**Reglas:**
- Usar alineación consistente
- Incluir headers descriptivos
- Mantener columnas balanceadas en contenido
- Primera columna generalmente más estrecha

### Enlaces

**Reglas:**
- Enlaces internos: usar rutas relativas
- Enlaces externos: usar URLs completas
- Texto del enlace debe ser descriptivo
- Formato: `[Texto descriptivo](URL)`

### Imágenes

**Reglas:**
- Guardar en carpeta `img/` relativa al documento
- Usar nombres descriptivos con guiones: `nombre-descriptivo.png`
- Siempre incluir alt text
- Formato: `![Texto alternativo](./img/nombre-imagen.png)`
- Preferir PNG para capturas de pantalla

### Listas

**Reglas:**
- Usar `-` para listas no ordenadas
- Usar números `1.`, `2.` para listas ordenadas
- Mantener consistencia en indentación (2 espacios)
- Usar listas ordenadas cuando el orden importa

### Formato de Texto

**Reglas:**
- `**negrita**` para términos importantes, resultados esperados
- `` `código` `` para nombres de campos, tablas, procedimientos, valores
- *cursiva* usar con moderación, solo para énfasis leve

---

## Checklist de Revisión

Antes de publicar un documento, verificar:

- [ ] Frontmatter completo y correcto
- [ ] Título claro y descriptivo
- [ ] Descripción introductoria presente
- [ ] Referencias a Jira incluidas
- [ ] Versiones especificadas correctamente
- [ ] Requisitos previos listados
- [ ] Pasos de configuración numerados y claros
- [ ] Ejemplos de código con títulos
- [ ] Callouts usados apropiadamente
- [ ] Imágenes con alt text
- [ ] Sección de resolución de problemas completa
- [ ] Ortografía y gramática revisadas
- [ ] Enlaces funcionando correctamente
- [ ] Código probado y funcional

---

## Ejemplo de Aplicación

Ver archivos de referencia:
- [search-settings.md](./docs/util-solicitudes/search-settings.md) - Ejemplo completo y bien estructurado
- [permissions.md](./docs/app-tecnicos/permissions.md) - Ejemplo actualizado siguiendo este template

---

## Notas Finales

- **Consistencia**: Mantener el mismo estilo en todos los documentos
- **Claridad**: Escribir para que cualquier técnico pueda seguir los pasos
- **Completitud**: No asumir conocimiento previo, explicar cada paso
- **Actualización**: Mantener los documentos actualizados con cambios de versión
- **Validación**: Siempre probar los pasos antes de documentar

---

**Versión del Template:** 1.0
**Última Actualización:** Diciembre 2025
**Mantenedor:** Equipo de Documentación IDAE
```
