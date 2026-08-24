---
sidebar_position: 1
release_version: "0.3.1"
release_module: "Utilitario de Reportes"
---

# Manejo de Texto Enriquecido en Reportes Técnicos

Este documento describe cómo configurar el manejo de **texto enriquecido** (rich text) en los reportes técnicos del Utilitario de Reportes, permitiendo aplicar colores de fuente, tamaños, sangría, listas y enumeraciones a los campos `trabajos`, `recomendaciones`, `compromisos` y `diagnostico`. Anteriormente estos campos solo soportaban texto plano; ahora es posible aplicar estilos gracias a las nuevas columnas `trabajos_enriquecido`, `recomendaciones_enriquecido`, `compromisos_enriquecido` y `diagnostico_enriquecido` en la tabla `ort_reportetecnico`.

## Referencias

- [SO-626 / OTT-3453: Al estar escribiendo en el campo trabajos por cada letra se oculta el teclado por causa del texto enriquecido](https://softwaresamm.atlassian.net/browse/SO-626)

## Información de Versiones

### Versión de Lanzamiento

:::info **Util-Reportes >= 0.3.1**
:::

### Versiones Requeridas

| Aplicación    | Versión Mínima  | Descripción        |
| ------------- | --------------- | ------------------- |
| SAMM LOGICA   | >= 5.6.26.5     | Lógica de negocio   |
| CAPA DATOS    | >= 2.1.17.0     | Capa de acceso a datos |
| RECURSOS      | -               | No aplica versión mínima |
| SAMM CORE     | >= 2.0.26.0     | Core del sistema    |
| SAMMAPI       | >= 1.2.32.0     | API principal        |
| BASE DE DATOS | >= C2.1.17.0    | Base de datos        |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Acceso de edición al procedimiento almacenado que alimenta el reporte técnico
- Acceso a Visual Studio (o la herramienta de diseño de RDL utilizada) con el reporte correspondiente abierto
- Conocimiento básico de expresiones regulares y del lenguaje VB.NET utilizado en el código de los RDL

:::important Importante
Los campos `trabajos_enriquecido`, `recomendaciones_enriquecido`, `compromisos_enriquecido` y `diagnostico_enriquecido` almacenan el contenido en formato **HTML**. Es indispensable interpretar este HTML antes de mostrarlo en el RDL, de lo contrario el reporte mostrará las etiquetas HTML como texto plano.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Ajuste al Procedimiento Almacenado

Es necesario apuntar el procedimiento almacenado que alimenta el reporte a las 4 nuevas columnas que almacenan el texto en formato HTML con la estructura y estilos aplicados: `trabajos_enriquecido`, `recomendaciones_enriquecido`, `compromisos_enriquecido` y `diagnostico_enriquecido`, ubicadas en la tabla `ort_reportetecnico`.

Estas columnas representan la versión dinámica del contenido, permitiendo manejar puntos, enumeraciones, tamaños de fuente y colores.

```sql title="Ajuste de SELECT en el procedimiento almacenado del reporte"
SELECT
    rt.trabajos_enriquecido,
    rt.recomendaciones_enriquecido,
    rt.compromisos_enriquecido,
    rt.diagnostico_enriquecido
FROM ort_reportetecnico rt
WHERE rt.id = @idReporte
```

:::tip Consejo
Verifique que el procedimiento siga retornando también las columnas de texto plano originales, en caso de que existan reportes o vistas que aún dependan de ellas.
:::

### Paso 2: Ajuste al RDL



#### 2.1 Crear Función de Interpretación de HTML

Agregue el siguiente código en la sección de código del RDL (`Report Properties > Code`). Esta función traduce las etiquetas HTML generadas por el editor de texto enriquecido a las etiquetas compatibles con el motor de renderizado de reportes (`<b>`, `<i>`, `<u>`, `<font>`, `<br/>`).

```vbnet title="Función InterpretarHTML en el código del RDL"
Public Function InterpretarHTML(ByVal html As String) As String
    If String.IsNullOrEmpty(html) Then Return ""
    Dim r As String = html

    ' 1. Headings
    r = System.Text.RegularExpressions.Regex.Replace(r, "<h[1-3][^>]*>", "<b><u>")
    r = System.Text.RegularExpressions.Regex.Replace(r, "</h[1-3]>", "</u></b><br/>")
    r = System.Text.RegularExpressions.Regex.Replace(r, "<h[4-6][^>]*>", "<b>")
    r = System.Text.RegularExpressions.Regex.Replace(r, "</h[4-6]>", "</b><br/>")

    ' 2. Listas ordenadas y no ordenadas
    Dim olRegex As New System.Text.RegularExpressions.Regex( _
        "<ol[^>]*>(.*?)</ol>", _
        System.Text.RegularExpressions.RegexOptions.Singleline Or _
        System.Text.RegularExpressions.RegexOptions.IgnoreCase)

    r = olRegex.Replace(r, Function(mOl)
        Dim inner As String = mOl.Groups(1).Value
        Dim contador As Integer = 0
        Dim liR As New System.Text.RegularExpressions.Regex( _
            "<li[^>]*>(.*?)</li>", _
            System.Text.RegularExpressions.RegexOptions.Singleline Or _
            System.Text.RegularExpressions.RegexOptions.IgnoreCase)
        Return liR.Replace(inner, Function(li)
            contador += 1
            Dim contenido As String = li.Groups(1).Value
            contenido = System.Text.RegularExpressions.Regex.Replace(contenido, "<p[^>]*>", "")
            contenido = contenido.Replace("</p>", "")
            contenido = contenido.Replace("<br/>", " ")
            contenido = contenido.Replace("<br />", " ")
            contenido = contenido.Trim()
            Return "<br/>" & contador.ToString() & ". " & contenido & "<br/>"
        End Function)
    End Function)

    Dim ulRegex As New System.Text.RegularExpressions.Regex( _
        "<ul[^>]*>(.*?)</ul>", _
        System.Text.RegularExpressions.RegexOptions.Singleline Or _
        System.Text.RegularExpressions.RegexOptions.IgnoreCase)

    r = ulRegex.Replace(r, Function(mUl)
        Dim inner As String = mUl.Groups(1).Value
        Dim liR As New System.Text.RegularExpressions.Regex( _
            "<li[^>]*>(.*?)</li>", _
            System.Text.RegularExpressions.RegexOptions.Singleline Or _
            System.Text.RegularExpressions.RegexOptions.IgnoreCase)
        Return liR.Replace(inner, Function(li)
            Dim contenido As String = li.Groups(1).Value
            contenido = System.Text.RegularExpressions.Regex.Replace(contenido, "<p[^>]*>", "")
            contenido = contenido.Replace("</p>", "")
            contenido = contenido.Replace("<br/>", " ")
            contenido = contenido.Replace("<br />", " ")
            contenido = contenido.Trim()
            Return "<br/>• " & contenido & "<br/>"
        End Function)
    End Function)

    r = System.Text.RegularExpressions.Regex.Replace(r, "<li[^>]*>", "<br/>• ")
    r = r.Replace("</li>", "<br/>")

    ' 3. Spans: color, tamaño y estilos
    Dim spanRegex As New System.Text.RegularExpressions.Regex( _
        "<span([^>]*)>", _
        System.Text.RegularExpressions.RegexOptions.IgnoreCase)

    r = spanRegex.Replace(r, Function(m)
        Dim attrs As String = m.Groups(1).Value
        Dim resultado As String = ""

        Dim colorMatch As System.Text.RegularExpressions.Match = _
            System.Text.RegularExpressions.Regex.Match(attrs, _
            "color\s*:\s*(#[0-9a-fA-F]{3,6}|rgba?\([^)]+\)|[a-zA-Z]+)", _
            System.Text.RegularExpressions.RegexOptions.IgnoreCase)
        Dim colorVal As String = ""
        If colorMatch.Success Then
            Dim raw As String = colorMatch.Groups(1).Value.Trim()
            Dim rgbaM As System.Text.RegularExpressions.Match = _
                System.Text.RegularExpressions.Regex.Match(raw, _
                "rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)")
            If rgbaM.Success Then
                colorVal = String.Format("#{0:X2}{1:X2}{2:X2}", _
                    Integer.Parse(rgbaM.Groups(1).Value), _
                    Integer.Parse(rgbaM.Groups(2).Value), _
                    Integer.Parse(rgbaM.Groups(3).Value))
            Else
                colorVal = raw
            End If
        End If

        Dim sizeMatch As System.Text.RegularExpressions.Match = _
            System.Text.RegularExpressions.Regex.Match(attrs, _
            "font-size\s*:\s*([\d.]+)(pt|px|em)?", _
            System.Text.RegularExpressions.RegexOptions.IgnoreCase)
        Dim sizeVal As String = ""
        If sizeMatch.Success Then
            Dim ptVal As Double = Double.Parse(sizeMatch.Groups(1).Value, _
                System.Globalization.CultureInfo.InvariantCulture)
            If sizeMatch.Groups(2).Value.ToLower() = "px" Then ptVal = ptVal * 0.75
            Dim htmlSize As Integer = 2
            If ptVal <= 8                 Then htmlSize = 1
            If ptVal > 8  And ptVal <= 10 Then htmlSize = 2
            If ptVal > 10 And ptVal <= 12 Then htmlSize = 3
            If ptVal > 12 And ptVal <= 14 Then htmlSize = 4
            If ptVal > 14 And ptVal <= 18 Then htmlSize = 5
            If ptVal > 18 And ptVal <= 24 Then htmlSize = 6
            If ptVal > 24                 Then htmlSize = 7
            sizeVal = htmlSize.ToString()
        End If

        If colorVal <> "" Or sizeVal <> "" Then
            Dim fontTag As String = "<font"
            If colorVal <> "" Then fontTag &= " color=" & Chr(34) & colorVal & Chr(34)
            If sizeVal  <> "" Then fontTag &= " size="  & Chr(34) & sizeVal  & Chr(34)
            resultado &= fontTag & ">"
        End If

        If System.Text.RegularExpressions.Regex.IsMatch(attrs, _
            "font-weight\s*:\s*bold", _
            System.Text.RegularExpressions.RegexOptions.IgnoreCase) Then resultado &= "<b>"

        If System.Text.RegularExpressions.Regex.IsMatch(attrs, _
            "font-style\s*:\s*italic", _
            System.Text.RegularExpressions.RegexOptions.IgnoreCase) Then resultado &= "<i>"

        If System.Text.RegularExpressions.Regex.IsMatch(attrs, _
            "text-decoration\s*:\s*underline", _
            System.Text.RegularExpressions.RegexOptions.IgnoreCase) Then resultado &= "<u>"

        Return resultado
    End Function)

    r = r.Replace("</span>", "</u></i></b></font>")

    ' 4. Strong / Em / S
    r = System.Text.RegularExpressions.Regex.Replace(r, "<strong[^>]*>", "<b>")
    r = r.Replace("</strong>", "</b>")
    r = System.Text.RegularExpressions.Regex.Replace(r, "<em[^>]*>", "<i>")
    r = r.Replace("</em>", "</i>")
    r = System.Text.RegularExpressions.Regex.Replace(r, "<s[^>]*>", "<s>")
    r = r.Replace("</s>", "</s>")

    ' 5. Sangría en párrafos
    Dim pIndentRegex As New System.Text.RegularExpressions.Regex( _
        "<p[^>]*(?:padding-left|margin-left|text-indent)\s*:\s*([\d.]+)(px|pt|cm|em)[^>]*>", _
        System.Text.RegularExpressions.RegexOptions.IgnoreCase)

    r = pIndentRegex.Replace(r, Function(m)
        Dim valor As Double = Double.Parse(m.Groups(1).Value, _
            System.Globalization.CultureInfo.InvariantCulture)
        Dim unidad As String = m.Groups(2).Value.ToLower()
        Dim espacios As Integer = 4
        If unidad = "px" Then espacios = CInt(valor / 16)
        If unidad = "pt" Then espacios = CInt(valor / 12)
        If unidad = "cm" Then espacios = CInt(valor / 0.5)
        If unidad = "em" Then espacios = CInt(valor * 4)
        If espacios < 1  Then espacios = 1
        If espacios > 12 Then espacios = 12
        Return New String(" "c, espacios * 4)
    End Function)

    ' 6. Párrafos vacíos
    r = System.Text.RegularExpressions.Regex.Replace(r, "<p[^>]*>\s*</p>", "<br/>")

    ' 7. Párrafos con contenido
    r = System.Text.RegularExpressions.Regex.Replace(r, "<p[^>]*>", "")
    r = r.Replace("</p>", "<br/>")

    ' 8. Entidades HTML
    r = r.Replace("&nbsp;", " ")
    r = r.Replace("&amp;",  "&")
    r = r.Replace("&lt;",   "<")
    r = r.Replace("&gt;",   ">")
    r = r.Replace("&quot;", Chr(34))
    r = r.Replace("&#39;",  Chr(39))

    ' 9. Limpiar tags residuales
    r = System.Text.RegularExpressions.Regex.Replace(r, _
        "<(?!/?b>|/?i>|/?u>|/?s>|br/>|br />|/?font[^>]*>|/?a[ >])[^>]+>", "")

    ' 10. Saltos múltiples -> máximo 2
    r = System.Text.RegularExpressions.Regex.Replace(r, "(<br/>[\s]*){3,}", "<br/><br/>")

    Return r.Trim()
End Function
```
#### 2.2 Crear Marcador de Posición y la expresion

Desde el diseñador de Visual Studio, dé doble clic sobre el textbox que mostrará el contenido enriquecido. Posteriormente, haga clic derecho sobre el mismo y seleccione la opción **Crear Marcador de Posición** desde aca mismo debemos hacer el llamado a la informacion o campo de trabajos tener en cuenta como se debe llamar la funcion como lo muestra el siguiente ejemplo dentro del mismo marcador.


```vbnet title="Expresión del textbox en el RDL"
=Code.InterpretarHTML(First(Fields!trabajos.Value, "origen9"))
```

:::note Información
Repita este mismo patrón para los campos `recomendaciones_enriquecido`, `compromisos_enriquecido` y `diagnostico_enriquecido`, reemplazando el nombre del campo en la expresión o consulta el siguiente video https://youtu.be/uEv_g-nuTfc.
:::




## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Renderizado de estilos**: Los campos `trabajos`, `recomendaciones`, `compromisos` y `diagnostico` mostrarán en el reporte los estilos aplicados en el editor de texto enriquecido (negrita, cursiva, subrayado, color y tamaño de fuente).
2. **Listas y enumeraciones**: Las listas ordenadas y no ordenadas creadas en el editor se mostrarán correctamente numeradas o con viñetas dentro del reporte.
3. **Sangría**: Los párrafos con sangría configurada respetarán la indentación en el reporte generado.
4. **Sin bloqueo de teclado**: Al escribir en el campo `trabajos`, el teclado ya no se oculta por cada letra digitada, resolviendo el comportamiento reportado en SO-626.

## Resolución de Problemas

### El reporte muestra etiquetas HTML como texto plano

Verifique que:

- El procedimiento almacenado esté retornando las columnas `_enriquecido` y no las columnas de texto plano
- El textbox del RDL esté efectivamente invocando la función `Code.InterpretarHTML`
- La función `InterpretarHTML` se encuentre correctamente agregada en `Report Properties > Code`

### El reporte no aplica colores o tamaños de fuente

Confirme que:

- El HTML almacenado contenga atributos `style` con `color` o `font-size` en formato válido (hex, rgb/rgba o nombre de color)
- No existan etiquetas `<span>` sin cerrar que interrumpan el reemplazo de `</span>` por `</u></i></b></font>`

### Las listas no se numeran o no muestran viñetas correctamente

Revise que:

- Las etiquetas `<ol>`/`<ul>` y `<li>` en el HTML almacenado estén correctamente anidadas
- No existan párrafos (`<p>`) anidados dentro de los `<li>` con estilos que interfieran con el reemplazo

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Aplicación de estilos en el campo Trabajos

1. Ingresar al campo `trabajos` en el editor de texto enriquecido
2. Aplicar negrita, un color de fuente y una lista numerada
3. Guardar el reporte técnico
4. Generar el reporte y verificar que el textbox correspondiente muestre el texto en negrita, con el color aplicado y la lista numerada correctamente

**Resultado esperado**: El reporte refleja fielmente el formato aplicado en el editor, sin mostrar etiquetas HTML sin procesar.

### Escenario 2: Escritura continua sin bloqueo de teclado

1. Abrir el campo `trabajos` en un dispositivo móvil o tablet
2. Escribir un párrafo largo de forma continua
3. Verificar que el teclado permanezca visible durante toda la escritura

**Resultado esperado**: El teclado no se oculta en ningún momento durante la escritura, confirmando la resolución de SO-626.

### Escenario 3: Reporte con múltiples campos enriquecidos

1. Aplicar distintos estilos (color, tamaño, sangría) en los campos `trabajos`, `recomendaciones`, `compromisos` y `diagnostico`
2. Generar el reporte técnico completo
3. Verificar que los cuatro campos muestren correctamente sus estilos respectivos sin errores de renderizado ni saltos de línea excesivos

**Resultado esperado**: Todos los campos enriquecidos se renderizan de forma consistente, sin residuos de etiquetas HTML ni saltos de línea múltiples.