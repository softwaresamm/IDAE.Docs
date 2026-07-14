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

1. Si el parámetro `justification` es `False`, retorna la línea tal cual, sin