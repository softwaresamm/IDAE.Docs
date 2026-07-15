---
sidebar_position: 1
release_version: "0.3.1"
release_module: "Util - Reportes"
---

# Justificación de Texto en Reportes RDL

Este documento describe la implementación de una función de justificación de texto en los archivos RDL del módulo **Util - Reportes**, mediante Report Services, permitiendo una correcta visualización del texto justificado en cualquier dispositivo (incluyendo móviles), eliminando los caracteres extraños que se generaban previamente con el motor RDLC.

## Referencias

- [SO-656 / SOL-32827: Se requiere ajuste en los RDL para poder realizar justificación de textos en los documentos](https://softwaresamm.atlassian.net/browse/SO-656)

## Información de Versiones

### Versión de Lanzamiento

:::info **v0.3.1**
:::

### Versiones Requeridas

| Aplicación | Versión Mínima | Descripción |
| --- | --- | --- |
| Util - Reportes | >= 0.3.1 | Módulo de reportes utilitarios |

## Requisitos Previos

Antes de iniciar la configuración, asegúrese de tener:

- Acceso de edición al archivo `.rdl` del reporte donde se implementará la justificación.
- Conocimientos básicos de **Custom Code (VB.NET)** dentro de reportes SSRS/Report Services.
- El reporte debe estar publicado o ejecutándose sobre **Report Services**, no sobre el motor RDLC clásico, ya que la interpretación del código y del renderizado difiere entre ambos motores.

:::important Importante
Esta funcionalidad requiere **tres** funciones trabajando en conjunto dentro del bloque de **Custom Code** del RDL:

- `TextOnlyJustifyInCm`: orquesta el proceso completo, dividiendo el texto en párrafos y líneas.
- `TextLine`: aplica la justificación real a cada línea, distribuyendo el espacio sobrante entre palabras.
- `ReplaceSome`: función de soporte usada por `TextLine` para reemplazar espacios en posiciones específicas dentro de una línea.

Las tres deben existir en el mismo bloque de Custom Code para que la justificación funcione correctamente.
:::

## Información del Servicio

No aplica para esta funcionalidad.

## Configuración

### Paso 1: Agregar la función principal de justificación en el Custom Code del RDL

Se debe incorporar la función `TextOnlyJustifyInCm` dentro de la sección **Custom Code** del reporte (Report Properties → Code). Esta función recibe el texto a justificar, la fuente, un indicador de sangría y el ancho disponible en centímetros, y devuelve el texto reorganizado en líneas ajustadas a dicho ancho.

**¿Qué hace la función paso a paso?**

1. Convierte el ancho recibido en centímetros a píxeles, usando una densidad estándar de 96 DPI (`widthInCm * 96 / 2.54`).
2. Crea un `Bitmap` y un objeto `Graphics` en memoria únicamente para poder usar `MeasureString`, que calcula cuánto espacio (en píxeles) ocupará un texto con una fuente determinada.
3. Divide el texto de entrada en párrafos, separándolos por saltos de línea (`ControlChars.NewLine`).
4. Para cada párrafo, divide el contenido en palabras y va construyendo líneas palabra por palabra, midiendo el ancho acumulado con `MeasureString`.
5. Si al agregar una palabra la línea excede el ancho disponible (`widthInPixels`), retrocede una palabra, cierra la línea en ese punto y la envía a la función `TextLine` para aplicar la justificación real de esa línea.
6. Si se indica sangría (`bIndent = True`), la primera línea de cada párrafo se reduce en 1 pulgada (96 px) de ancho disponible, simulando una sangría de primera línea.
7. La última línea de cada párrafo **no se justifica** (se agrega tal cual con `sRtn.Append(line)`), ya que justificar la última línea de un párrafo produciría un espaciado antiestético.
8. Cada párrafo procesado se separa del siguiente mediante un salto de línea (`vbLf & vbCr`).
9. Devuelve el texto completo ya reorganizado en líneas justificadas, listo para mostrarse en el `textbox` del reporte.

```vb title="Función principal de justificación - Custom Code (RDL)"
Public Function TextOnlyJustifyInCm(text As String, font As System.Drawing.Font, bIndent As Boolean, widthInCm As Single) As String
    ' Convertir el ancho de centímetros a píxeles (utilizando una densidad estándar de 96 DPI).
    Dim widthInPixels As Single = widthInCm * 96 / 2.54
    Dim bmp As New System.Drawing.Bitmap(816, 1056)
    Dim gr = System.Drawing.Graphics.FromImage(bmp)
    Dim sRtn As New System.Text.StringBuilder()
    Dim paragraphs As String() = text.Split(ControlChars.NewLine)
    For Each paragraph As String In paragraphs
        Dim words As String() = paragraph.Split(" "c)
        Dim start_word As Integer = 0
        Dim indentInPixels As Single = IIf(bIndent, 1 * 96, 0) ' Indentar 1.5 cm si se requiere (ajustar según necesidades).
        While True
            Dim line As String = words(start_word)
            Dim end_word As Integer = start_word + 1
            While end_word < words.Length
                Dim test_line As String = (line & " ") + words(end_word)
                Dim line_size As System.Drawing.SizeF = gr.MeasureString(test_line, font)
                If line_size.Width + indentInPixels > widthInPixels Then
                    end_word -= 1
                    Exit While
                Else
                    line = test_line
                End If
                end_word += 1
            End While
            If (end_word = words.Length) Then
                sRtn.Append(line)
            Else
                sRtn.Append(TextLine(gr, line, font, widthInPixels - indentInPixels, True))
            End If
            start_word = end_word + 1
            If start_word >= words.Length Then
                Exit While
            End If
            indentInPixels = 0
        End While
        sRtn.Append(vbLf & vbCr)
    Next
    Return sRtn.ToString()
End Function
```

:::tip Consejo
El valor `96` corresponde a la densidad estándar de píxeles por pulgada (DPI) usada por `System.Drawing`. Si en algún reporte el resultado visual no coincide con el ancho real del `textbox`, verifique primero que el ancho en centímetros (`widthInCm`) corresponda exactamente al ancho configurado en el diseño del reporte.
:::

### Paso 2: Agregar las funciones auxiliares `TextLine` y `ReplaceSome`

Estas dos funciones trabajan en conjunto para tomar una única línea de texto (ya delimitada por `TextOnlyJustifyInCm`) y distribuir el espacio sobrante entre las palabras, logrando el efecto visual de justificación.

#### TextLine

**¿Qué hace la función paso a paso?**

1. Si el parámetro `justification` es `False`, retorna la línea tal cual, sin modificarla.
2. Si `justification` es `True`, separa la línea en palabras y mide el ancho individual de cada una con `MeasureString`, acumulando el ancho total del texto sin espacios adicionales.
3. Calcula el espacio extra disponible (`extra_space`) restando el ancho total del texto al ancho del `textbox` (`width`), y lo distribuye entre los espacios existentes entre palabras.
4. En lugar de usar espacios normales, la función reemplaza los espacios (`" "`) por un carácter especial: el **espacio fino Unicode** (`ChrW(&H200A)`, *hair space*). Esto le permite construir el espaciado de forma incremental, repitiendo este carácter una cantidad `i2` de veces entre palabras.
5. Prueba de forma iterativa (`For i2 As Integer = 1 To 100`) cuántas repeticiones del espacio fino caben antes de que el ancho medido (`MeasureString`) supere el ancho disponible (`width`).
6. Cuando encuentra el punto en el que agregar una repetición más excedería el ancho, retrocede una iteración (`i2 - 1`) y llama a `ReplaceSome` para ajustar de forma más fina el espaciado en posiciones específicas de la línea (agregando una repetición extra solo en algunos espacios, no en todos), de modo que la línea llene el ancho disponible de la manera más pareja posible.
7. Retorna la línea ya justificada, agregando un salto de línea (`ControlChars.CrLf`) al final.

```vb title="Función auxiliar de justificación por línea - Custom Code (RDL)"
Public Function TextLine(ByVal gr As System.Drawing.Graphics, ByVal line As String, ByVal font As System.Drawing.Font, ByVal width As Single, ByVal justification As Boolean) As String
    Dim sLine As New System.Text.StringBuilder()
    ' See if we should use full justification.
    If justification Then
        ' Justify the text.
        ' Break the text into words.
        Dim words As String() = line.Split(" "c)
        ' Add a space to each word and get their lengths.
        Dim word_width As Single() = New Single(words.Length - 1) {}
        Dim total_width As Single = 0
        For i As Integer = 0 To words.Length - 1
            ' See how wide this word is.
            Dim size As System.Drawing.SizeF = gr.MeasureString(words(i), font)
            word_width(i) = size.Width
            total_width += word_width(i)
        Next
        ' Get the additional spacing between words.
        Dim extra_space As Single = width - total_width
        Dim num_spaces As Integer = words.Length - 1
        If words.Length > 1 Then
            extra_space /= (num_spaces - 1)
        End If
        For i2 As Integer = 1 To 100
            Dim sTest As String = line.Replace(" ", New String(ChrW(&H200A), i2))
            If gr.MeasureString(sTest, font).Width > width Then
                For i3 As Integer = words.Length To 1 Step -1
                    sTest = line.Replace(" ", New String(ChrW(&H200A), i2 - 1))
                    Dim sTemp = ReplaceSome(sTest, New String(ChrW(&H200A), i2 - 1), New String(ChrW(&H200A), i2), i3)
                    If gr.MeasureString(sTemp, font).Width < width Then
                        Console.WriteLine("{0}, size: {1}", line, gr.MeasureString(sTemp, font).Width)
                        Return sTemp + ControlChars.CrLf
                    End If
                Next
                Console.WriteLine("{0}, size: {1}", line, gr.MeasureString(line.Replace(" ", New String(ChrW(&H200A), i2 - 1)), font).Width)
                Return line.Replace(" ", New String(ChrW(&H200A), i2 - 1)) + ControlChars.CrLf
            End If
        Next
    Else
        Return line
    End If
End Function
```

:::note Información
El uso del carácter *hair space* (`ChrW(&H200A)`) en lugar de espacios normales es lo que permite un control de espaciado más fino y preciso que el que se lograba con el motor RDLC anterior, evitando los caracteres extraños reportados en dispositivos móviles.
:::

#### ReplaceSome

**¿Qué hace la función paso a paso?**

1. Recibe la línea completa (`s`), el separador a buscar (`repl`), el separador de reemplazo (`wth`) y una cantidad (`num`) que indica hasta cuántas ocurrencias de `repl` deben tomarse en cuenta.
2. Divide la línea `s` usando `repl` como delimitador, limitando la división a `num` fragmentos (`s.Split(repl, num, StringSplitOptions.RemoveEmptyEntries)`) y descartando entradas vacías.
3. Recorre todos los fragmentos resultantes **excepto el último**, reconstruyendo la línea y uniéndolos con el nuevo separador `wth` en lugar de `repl`.
4. Al final, agrega el último fragmento sin separador adicional, ya que no debe llevar un espaciado extra después de él.
5. El efecto práctico es: dentro de una misma línea, solo los primeros `num - 1` espacios se reemplazan por el espaciado "ancho" (`wth`), mientras que el resto conserva el espaciado "angosto" (`repl`). Esto permite a `TextLine` repartir el espacio sobrante de forma progresiva entre un subconjunto de los espacios de la línea, en lugar de todos a la vez, logrando una distribución más pareja al justificar.

```vb title="Función auxiliar de reemplazo parcial de espacios - Custom Code (RDL)"
Private Function ReplaceSome(ByVal s As String, ByVal repl As String, ByVal wth As String, ByVal num As Integer) As String
    ReplaceSome = String.Empty
    Dim s2 As String() = s.Split(repl, num, StringSplitOptions.RemoveEmptyEntries)
    For t As Integer = 0 To s2.Length - 2
        ReplaceSome += s2(t) + wth
    Next
    ReplaceSome += s2(s2.Length - 1)
End Function
```

:::tip Consejo
`ReplaceSome` es de tipo `Private`, a diferencia de `TextOnlyJustifyInCm` y `TextLine` que son `Public`. Esto es válido dentro del mismo bloque de Custom Code, ya que solo es invocada internamente por `TextLine` y no necesita ser accesible desde las expresiones del `textbox`.
:::

### Paso 3: Invocar la función principal desde el cuadro de texto (textbox)

Una vez agregadas las tres funciones al Custom Code, se debe llamar a `TextOnlyJustifyInCm` desde la expresión (`Expression`) del `textbox` donde se desea mostrar el texto justificado, indicando el campo de origen, la fuente a utilizar, si aplica sangría, y el ancho del cuadro de texto en centímetros.

```vbnet title="Expresión de llamado en el textbox del RDL"
=(Code.TextOnlyJustifyInCm(First(Fields!notas.Value, "origen1").ToString(), new System.Drawing.Font("Arial", 8), false, 12))
```

:::note Información
- `First(Fields!notas.Value, "origen1")`: campo de origen que contiene el texto a justificar.
- `new System.Drawing.Font("Arial", 8)`: debe coincidir con la fuente y tamaño realmente configurados en el `textbox`, ya que `MeasureString` depende de estos valores para calcular el ancho correcto de cada línea.
- `false`: indica que no se aplicará sangría en la primera línea del párrafo.
- `12`: ancho disponible del `textbox`, expresado en centímetros.
:::

## Casos Especiales

No aplica para esta funcionalidad.

## Resultado Esperado

Una vez completada la configuración:

1. **Texto justificado correctamente**: el contenido del `textbox` se muestra con ambos márgenes (izquierdo y derecho) alineados, sin caracteres extraños.
2. **Consistencia entre dispositivos**: la visualización es correcta tanto en navegadores de escritorio como en dispositivos móviles, gracias al renderizado mediante Report Services.
3. **Última línea de cada párrafo sin forzar**: la última línea de cada párrafo se muestra de forma natural, sin espaciado forzado entre palabras.
4. **Sangría opcional respetada**: si se configura `bIndent = true`, la primera línea de cada párrafo inicia con la sangría definida.

## Resolución de Problemas

### El texto no se justifica y se muestra sin cambios

Verifique que:

- Las funciones `TextOnlyJustifyInCm`, `TextLine` y `ReplaceSome` estén correctamente agregadas en la sección **Custom Code** del RDL.
- La expresión del `textbox` esté llamando correctamente a `Code.TextOnlyJustifyInCm(...)`.

### Error en tiempo de ejecución al renderizar el reporte

Confirme que:

- `ReplaceSome` esté definida como función `Private` dentro del mismo bloque de Custom Code que `TextLine`.
- Los tipos de parámetros pasados en la expresión (`Font`, `Boolean`, `Single`) coincidan exactamente con los definidos en la función.

### Aparecen saltos de línea o cortes de palabra incorrectos

Confirme que:

- El parámetro `widthInCm` corresponde exactamente al ancho real configurado en el `textbox` del diseño.
- La fuente y tamaño (`System.Drawing.Font`) usados en la expresión coinciden con los aplicados visualmente en el `textbox`.

### El justificado se ve distinto entre dispositivos (móvil vs. escritorio)

Revise que:

- El reporte se esté ejecutando sobre **Report Services** y no sobre el motor RDLC clásico.
- No existan estilos o fuentes sobrescritas a nivel de dispositivo que alteren el ancho medido por `MeasureString`.

## Errores Conocidos

No aplica para esta funcionalidad.

## QA — Pruebas

### Escenario 1: Justificación de texto en párrafo largo

1. Configurar un `textbox` con un campo de texto largo (varios párrafos) y aplicar la expresión de justificación con `widthInCm = 12` y `bIndent = false`.
2. Renderizar el reporte desde Report Services.
3. **Resultado esperado**: cada línea del párrafo (excepto la última de cada párrafo) debe mostrar ambos márgenes alineados, sin caracteres extraños.

### Escenario 2: Justificación con sangría activada

1. Configurar la expresión con `bIndent = true` sobre un campo con múltiples párrafos.
2. Renderizar el reporte.
3. **Resultado esperado**: la primera línea de cada párrafo debe iniciar con una sangría visible, mientras que las líneas siguientes del mismo párrafo no la presentan.

### Escenario 3: Visualización cruzada entre dispositivos

1. Generar el mismo reporte y abrirlo desde un navegador de escritorio y desde un dispositivo móvil.
2. **Resultado esperado**: el texto justificado debe verse de forma consistente y legible en ambos casos, sin diferencias de renderizado ni caracteres extraños.

### Escenario 4: Línea con múltiples palabras cortas (alto número de espacios)

1. Configurar un `textbox` con un párrafo compuesto por muchas palabras cortas, de forma que existan varios espacios por línea a justificar.
2. Renderizar el reporte.
3. **Resultado esperado**: `TextLine` y `ReplaceSome` deben distribuir el espacio sobrante entre los espacios de la línea sin generar errores ni desbordar el ancho del `textbox`, incluso cuando se requieran múltiples iteraciones del ciclo `For i2 As Integer = 1 To 100`.