---
sidebar_position: 13
release_version: "2.3.9.0"
release_module: "App Técnicos"
---

# Requisitos de Certificados SSL para Servidores SAMM

Este documento describe los requisitos que debe cumplir el certificado SSL de los servidores que atienden a la app **SAMM Técnico** en Android, cómo validar que la cadena de certificados es compatible y qué hacer cuando la app no logra conectarse por un problema de confianza del certificado.

Sirve como guía de apoyo ante un síntoma recurrente: la app muestra `Network request failed` en celulares Android, mientras que en iPhone y en el computador el mismo servidor funciona sin problemas.

## Referencias

- [SO-400: Falla de conexión TLS en Android 11 (Sectigo R46)](https://softwaresamm.atlassian.net/browse/SO-400)

## Información de Versiones

### Versión de Lanzamiento

:::info **v2.3.9.0**
:::

### Versiones Requeridas

| Aplicación            | Versión Mínima | Descripción                                                    |
| --------------------- | -------------- | -------------------------------------------------------------- |
| SAMM Técnico (App)    | >= 2.3.4.6     | Android 11 (API 30) o superior                                 |
| Servidor (SAMMAPI)    | N/A            | Certificado con cadena completa; no depende de una versión SAMM |

## Glosario: ¿Qué es una CA?

**CA** significa **Certificate Authority** (Autoridad Certificadora): una organización de confianza que emite y firma certificados digitales para verificar la identidad de un sitio web. Un certificado es como la "cédula" del servidor, y la CA es el "notario" que la firma. El celular solo acepta certificados firmados por notarios que estén en su lista de confianza (_trust store_).

### Cómo se valida una conexión

1. La app le dice al servidor: "Quiero conectarme de forma segura".
2. El servidor responde enviando su certificado y los certificados intermedios.
3. La app verifica quién firmó cada certificado hasta llegar a una **CA raíz**.
4. Si esa CA raíz está en la lista de confianza del celular, la conexión se establece.
5. Si no está, la conexión se rechaza y la app muestra `Network request failed`.

### Tipos de certificados en la cadena

| Tipo                          | Qué es                                                                                          | Ejemplo                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Certificado del servidor**  | Certificado específico del sitio (_leaf_). Es la "cédula" del servidor.                          | `www.miempresa.com.co`                      |
| **Certificado intermedio**    | Firmado por la CA raíz; a su vez firma el certificado del servidor. Es una "delegación".         | `SSL.com TLS Issuing RSA CA R1`                 |
| **Certificado raíz (Root CA)** | CA de máximo nivel, preinstalada en el dispositivo.                                             | `SSL.com Root Certification Authority RSA`      |
| **Certificado cruzado**       | Puente que permite validar una raíz nueva a través de una raíz antigua que el dispositivo ya conoce. | `SSL.com TLS RSA Root CA 2022` → `SSL.com Root Certification Authority RSA` |

### Dónde están las CA de confianza

- **Android**: viene con el sistema operativo y **solo se actualiza al cambiar de versión de Android**.
- **iOS y navegadores de escritorio**: se actualizan con frecuencia.

:::important El problema clave
Una CA raíz creada después del lanzamiento de una versión de Android **no existe en ese Android**. Si el servidor presenta un certificado cuya cadena termina en esa raíz y no incluye un certificado cruzado hacia una raíz antigua, el celular rechaza la conexión.
:::

## Requisitos Previos

Antes de validar o corregir un certificado, asegúrese de tener:

- Acceso al servidor (por ejemplo IIS) o a quien administra el certificado.
- Acceso a la cuenta del proveedor del certificado (SSL.com, Sectigo, DigiCert, etc.).
- `openssl` y `git` instalados en el equipo desde el que se valida (Git Bash en Windows incluye ambos).
- Un celular Android con la versión afectada para la prueba final.

## Requisitos Obligatorios del Certificado

### Protocolo TLS

| Requisito           | Valor         |
| ------------------- | ------------- |
| Versión mínima      | TLS 1.2       |
| Versión recomendada | TLS 1.3       |
| SSL 2.0 / 3.0       | **Prohibido** |

### Certificado del servidor

| Requisito                      | Valor                                                  |
| ------------------------------ | ------------------------------------------------------ |
| Tipo de clave                  | RSA 2048 bits mínimo, o ECDSA P-256                    |
| Algoritmo de firma             | SHA-256 o superior                                     |
| Vigencia                       | Vigente (máximo 398 días por certificado)              |
| Subject Alternative Name (SAN) | Debe incluir el dominio exacto del servidor            |
| Wildcard                       | Aceptable (`*.dominio.com`), pero menos preferido      |

### CA raíz y cadena

- La CA raíz **debe estar presente en Android 11 y en las versiones superiores que usen los técnicos**.
- Se debe enviar la **cadena completa**: certificado del servidor, intermedios y, si la raíz es nueva, el certificado cruzado hacia una raíz antigua.
- Nunca enviar solo el certificado del servidor sin los intermedios.

### Cadena correcta e incorrecta

```text title="Cadena correcta (SSL.com)"
Servidor
  └── SSL.com TLS Issuing RSA CA R1 (intermedio)
       └── SSL.com TLS RSA Root CA 2022 (raíz nueva, 2022)
            └── SSL.com Root Certification Authority RSA (cruzado, 2016) ← Android 11-14 la conocen
```

```text title="Cadena incorrecta (falla en Android 13 y anteriores)"
Servidor
  └── SSL.com TLS Issuing RSA CA R1 (intermedio)
       └── SSL.com TLS RSA Root CA 2022 (raíz nueva, 2022) ← Android no la conoce
```

## Compatibilidad de CA raíz por versión de Android

La lista oficial de CA de cada versión de Android está en el repositorio [`platform/system/ca-certificates`](https://android.googlesource.com/platform/system/ca-certificates/) de AOSP, carpeta `files/`. Hay una etiqueta por versión:

- [Android 13](https://android.googlesource.com/platform/system/ca-certificates/+/refs/tags/android-13.0.0_r1/files/)
- [Android 14](https://android.googlesource.com/platform/system/ca-certificates/+/refs/tags/android-14.0.0_r1/files/)
- [Android 15](https://android.googlesource.com/platform/system/ca-certificates/+/refs/tags/android-15.0.0_r1/files/)

Cada archivo `XXXXXXXX.0` es una CA raíz; el nombre es el hash del _subject_ de la CA (se calcula con `openssl x509 -noout -subject_hash_old`).

### Raíces conocidas

| CA raíz                                              | Año  | Android 11 | Android 13 | Android 14 | Android 15 |
| ---------------------------------------------------- | ---- | ---------- | ---------- | ---------- | ---------- |
| `SSL.com Root Certification Authority RSA` (`33ee480d`) | 2016 | Sí         | Sí         | Sí         | Sí         |
| `SSL.com TLS RSA Root CA 2022` (`2c63f966`)          | 2022 | No         | **No**     | **No**     | Sí         |
| `Sectigo Public Server Authentication Root R46`      | 2021 | No         | Verificar  | Verificar  | Verificar  |
| `USERTrust RSA Certification Authority`              | 2010 | Sí         | Sí         | Sí         | Sí         |
| `DigiCert Global Root G2`                            | 2013 | Sí         | Sí         | Sí         | Sí         |
| `ISRG Root X1` (Let's Encrypt)                       | 2015 | Sí         | Sí         | Sí         | Sí         |
| `GlobalSign Root CA - R3`                            | 2009 | Sí         | Sí         | Sí         | Sí         |

:::note Cómo leer la tabla
Las columnas de las raíces de SSL.com se verificaron contra las etiquetas `android-11.0.0_r1`, `android-13.0.0_r1`, `android-14.0.0_r1` y `android-15.0.0_r1` de AOSP. Las demás se basan en la fecha de emisión de la raíz; ante la duda, compruebe con el procedimiento de la siguiente sección. Google puede añadir raíces mediante actualizaciones del sistema y algunos fabricantes modifican la lista, por lo que la prueba en un dispositivo real siempre prevalece.
:::

### Cómo saber si una CA raíz está en una versión de Android (hash y cruce con AOSP)

Los archivos de la carpeta `files/` de AOSP se llaman por el **hash del _subject_** de la CA (por ejemplo `2c63f966.0`), no por su nombre. Para saber si una CA está en una versión de Android hay que calcular ese hash y buscarlo en la página de esa versión.

#### Paso 1: Identificar la CA raíz del servidor

El último certificado que envía el servidor indica en su `i:` (_issuer_) quién lo firmó; esa es la CA raíz que Android debe conocer.

```bash title="Ver el emisor del último certificado de la cadena"
echo | openssl s_client -connect dominio.com:443 -servername dominio.com -showcerts 2>&1 \
  | grep -E "^ [0-9] s:|^   i:"
```

Ejemplo: `i:C=US, O=SSL Corporation, CN=SSL.com TLS Issuing RSA CA R1` firmó el certificado del servidor, y ese intermedio fue firmado por `SSL.com TLS RSA Root CA 2022` (aparece como `depth=2` en la salida de `openssl s_client`).

#### Paso 2: Obtener el certificado de la CA raíz y calcular su hash

El certificado raíz (PEM) se descarga del repositorio de la CA (por ejemplo [ssl.com/repository](https://ssl.com/repository)) o del paquete de raíces de Mozilla ([curl.se/ca/cacert.pem](https://curl.se/ca/cacert.pem)).

```bash title="Calcular el hash que usa Android para nombrar el archivo"
openssl x509 -in raiz.pem -noout -subject -subject_hash_old
```

```text title="Ejemplo de salida"
subject=C=US, O=SSL Corporation, CN=SSL.com TLS RSA Root CA 2022
2c63f966
```

:::important Use `subject_hash_old`
Android nombra los archivos con el hash antiguo (`-subject_hash_old`). El comando `-subject_hash` (sin `_old`) genera otro valor y no coincidirá con la carpeta de AOSP.
:::

#### Paso 3: Buscar el hash en la versión de Android

Abra la página de la versión y busque `<hash>.0`, o hágalo desde la terminal:

```bash title="Buscar el hash en la página de AOSP de cada versión"
HASH=2c63f966
for v in android-11.0.0_r1 android-13.0.0_r1 android-14.0.0_r1 android-15.0.0_r1; do
  n=$(curl -sS "https://android.googlesource.com/platform/system/ca-certificates/+/refs/tags/$v/files/" | grep -c "$HASH.0")
  echo "$v: $([ "$n" -gt 0 ] && echo 'SI esta' || echo 'NO esta')"
done
```

| Resultado                  | Interpretación                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------- |
| `SI esta` en la versión    | Esa versión de Android conoce la raíz                                              |
| `NO esta` en la versión    | Esa versión **no** conoce la raíz; el servidor debe enviar el certificado cruzado |

Si la raíz **no** está, repita los pasos 2 y 3 con la raíz **antigua** que firma el certificado cruzado (por ejemplo `SSL.com Root Certification Authority RSA`, hash `33ee480d`). Si esa sí está en la versión, la Opción A de solución es viable.

```text title="Resultado verificado para las raíces de SSL.com"
2c63f966 (SSL.com TLS RSA Root CA 2022):          Android 11 NO, 13 NO, 14 NO, 15 SI
33ee480d (SSL.com Root Certification Authority RSA): Android 11 SI, 13 SI, 14 SI, 15 SI
```

#### Cómo pedir esta verificación a un asistente o a un compañero

Si prefiere delegarla, solicite lo siguiente (reemplace el dominio y la versión de Android):

```text title="Texto sugerido para solicitar la verificación"
El servidor https://dominio.com no conecta en Android 13.
1. Muestra la cadena de certificados que envía el servidor.
2. Identifica la CA raíz y calcula su hash con openssl x509 -subject_hash_old.
3. Busca ese hash en la carpeta files/ de platform/system/ca-certificates de AOSP
   (etiquetas android-11, 13, 14 y 15) y dime en cuáles versiones está.
4. Si falta, indica qué raíz antigua puede respaldarla (certificado cruzado).
5. Valida el servidor contra la lista de CA de Android 13 con openssl s_client -CAfile.
```

## Validación

Haga estas verificaciones **antes de desplegar un certificado nuevo** y **cada vez que un usuario Android reporte `Network request failed`**. Reemplace `dominio.com` por el servidor a validar (ej. `www.miempresa.com.co`).

### Paso 1: Ver la cadena que envía el servidor

```bash title="Listar los certificados que presenta el servidor"
echo | openssl s_client -connect dominio.com:443 -servername dominio.com -showcerts 2>&1 \
  | grep -E "^( [0-9] s:|   i:|   v:|   a:)|depth="
```

Cada certificado aparece con su `s:` (a quién identifica), `i:` (quién lo firmó), `v:` (vigencia) y `a:` (clave y algoritmo).

| Resultado                                                                      | Interpretación                                |
| ------------------------------------------------------------------------------ | --------------------------------------------- |
| 2 o más certificados; el `i:` del último es una CA raíz **anterior a 2020**    | **OK**                                        |
| Solo 1 certificado (el del servidor)                                           | **Falla**: faltan los intermedios             |
| El `i:` del último certificado es una raíz **posterior a 2020** (R46, E46, Root CA 2022…) y no hay certificado cruzado | **Falla en Android antiguo**                  |
| `v:` con `NotAfter` en el pasado                                               | **Falla**: certificado vencido                |

### Paso 2: Verificar contra la lista de CA de Android (prueba definitiva)

Esta prueba valida el servidor usando **únicamente** las CA raíz que trae Android, en lugar de las del equipo desde el que se prueba. Es la forma de reproducir lo que ve el celular sin tener el celular.

```bash title="Descargar la lista de CA de Android 13"
git clone --depth 1 --branch android-13.0.0_r1 \
  https://android.googlesource.com/platform/system/ca-certificates
cat ca-certificates/files/*.0 > android13.pem
```

```bash title="Validar el servidor contra las CA de Android 13"
echo | openssl s_client -connect dominio.com:443 -servername dominio.com \
  -CAfile android13.pem -no-CApath -no-CAstore 2>&1 \
  | grep -E "Verify return|verify error"
```

Para otra versión, cambie `android-13.0.0_r1` por la etiqueta correspondiente (`android-14.0.0_r1`, `android-11.0.0_r1`, etc.).

| Resultado                                                         | Interpretación                                                       |
| ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| `Verify return code: 0 (ok)`                                      | **OK**: Android de esa versión confía en la cadena                   |
| `verify error:num=20:unable to get local issuer certificate` y `Verify return code: 20` | **Falla**: la raíz de la cadena no está en Android o falta el certificado cruzado |
| `Verify return code: 10 (certificate has expired)`                | **Falla**: certificado vencido                                       |
| `Verify return code: 62 (hostname mismatch)`                      | **Falla**: el dominio no está en el SAN del certificado              |

:::important Un resultado `0 (ok)` sin `-CAfile` no sirve
Sin `-CAfile android13.pem`, `openssl` usa la lista de CA de su propio equipo (más reciente que la de Android) y puede mostrar `0 (ok)` aunque el celular rechace el certificado. Use siempre la prueba del Paso 2.
:::

```text title="Ejemplo de resultado con falla (www.miempresa.com.co contra Android 13)"
verify error:num=20:unable to get local issuer certificate
    Verify return code: 20 (unable to get local issuer certificate)
```

### Paso 3: Verificar el protocolo TLS

```bash title="Confirmar que el servidor acepta TLS 1.2"
echo | openssl s_client -connect dominio.com:443 -servername dominio.com -tls1_2 2>&1 | grep "Protocol"
```

| Resultado          | Interpretación                          |
| ------------------ | --------------------------------------- |
| `Protocol : TLSv1.2` | **OK**                                |
| Error `handshake failure` | **Falla**: TLS 1.2 deshabilitado |

### Paso 4: Verificar el dominio y la vigencia

```bash title="Mostrar SAN y fechas de vigencia"
echo | openssl s_client -connect dominio.com:443 -servername dominio.com 2>/dev/null \
  | openssl x509 -noout -ext subjectAltName -dates
```

El dominio exacto debe aparecer como `DNS:` en el SAN y la fecha actual debe estar entre `notBefore` y `notAfter`.

### Paso 5: Prueba en un dispositivo real

1. Abra la URL del servidor en **Chrome** del celular Android afectado.
2. Si Chrome muestra una advertencia de certificado, el problema de confianza queda confirmado. Si abre sin advertencia, **no descarta el problema**: Chrome puede completar la cadena por su cuenta y la app no.
3. Inicie sesión en la app SAMM Técnico.

| Resultado                                          | Interpretación                                              |
| -------------------------------------------------- | ----------------------------------------------------------- |
| La app inicia sesión                               | **OK**                                                      |
| La app muestra `Network request failed`            | Falla de red o de certificado; continúe con el log          |

Para confirmar que la causa es el certificado, conecte el celular y revise el log:

```bash title="Buscar el error de confianza en el log del dispositivo"
adb logcat | grep -iE "Trust anchor|CertPathValidator|SSLHandshake"
```

La línea `Trust anchor for certification path not found` confirma que Android no confía en la cadena del servidor.

### Test con SSL Labs (opcional)

Visite `https://www.ssllabs.com/ssltest/analyze.html?d=dominio.com` y verifique:

- Calificación A o A+.
- `Chain issues: None`.
- En **Handshake Simulation**, las filas de Android muestran "RSA 2048 (SHA256) TLS 1.2" y no "Client does not support..." o "Trust anchor not found".

## Resolución de Problemas

### La app muestra `Network request failed` solo en Android

Verifique que:

- El mismo servidor funciona en iPhone o en el computador (descarta caída del servidor).
- La prueba del Paso 2 devuelve `Verify return code: 20` contra la lista de Android.
- La versión de Android del celular es anterior a la que incluye la raíz del certificado (ver la tabla de compatibilidad).

Si se confirma, aplique una de las opciones de solución.

### El certificado está vigente pero Android lo rechaza

Confirme que:

- El servidor envía la cadena completa (Paso 1 muestra al menos 2 certificados).
- No hay un certificado cruzado faltante hacia una raíz antigua.

### El error ocurre en WiFi y en datos móviles

Revise que:

- La falla es idéntica en ambas redes; esto apunta al certificado y no a un bloqueo de red o firewall.

## Opciones de Solución

### Opción A (recomendada): completar la cadena en el servidor

No requiere un certificado nuevo ni cambios en la app.

1. Ingresar a la cuenta del proveedor (o a su repositorio, por ejemplo [ssl.com/repository](https://ssl.com/repository)).
2. Descargar el _bundle_ de la cadena que incluye el **certificado cruzado** de la raíz nueva hacia una raíz antigua que Android conozca:
   - SSL.com: `SSL.com TLS RSA Root CA 2022` → `SSL.com Root Certification Authority RSA`.
   - Sectigo R46 → `USERTrust RSA Certification Authority`.
   - Sectigo E46 → `USERTrust ECC Certification Authority`.
3. Instalar la cadena completa en el servidor.
4. Repetir la validación (Pasos 1 y 2) hasta obtener `Verify return code: 0 (ok)`.

:::note Confirmar disponibilidad con el proveedor
Confirme con el proveedor que publica el certificado cruzado para su certificado. Si no lo entrega, use la Opción B.
:::

#### Instalación en IIS (Windows Server)

1. Instalar el certificado con la **cadena completa** (servidor + intermedios + cruzado).
2. Instalar los intermedios y el cruzado en el almacén **Entidades de certificación intermedias** del servidor.
3. En **IIS Manager > Bindings**, verificar que el certificado correcto está asignado al puerto 443.
4. Reiniciar el sitio y repetir la validación.

### Opción B: cambiar a un certificado de una CA con raíz antigua

Solicite un certificado nuevo a una CA cuya raíz esté en Android 11 o superior: DigiCert, GlobalSign, Sectigo (cadena USERTrust) o Let's Encrypt (`ISRG Root X1`). Let's Encrypt es gratuito pero se renueva cada 90 días y requiere automatizar la renovación.

Instálelo con la cadena completa y valide con los Pasos 1 y 2.

### Opción C: incluir la CA raíz dentro de la app (solo si el servidor no se puede modificar)

Requiere publicar una nueva versión de la app y repetir el proceso si el certificado cambia.

1. Obtener el certificado raíz en formato PEM (por ejemplo desde el repositorio de la CA o desde el trust store de macOS):

   ```bash title="Exportar la raíz desde macOS"
   security find-certificate -c "Nombre del CA" -p /System/Library/Keychains/SystemRootCertificates.keychain > cert.pem
   ```

2. Colocarlo en `android/app/src/main/res/raw/nombre_cert.pem`.

3. Referenciarlo en `android/app/src/main/res/xml/network_security_config.xml`:

   ```xml title="network_security_config.xml"
   <network-security-config>
       <base-config>
           <trust-anchors>
               <certificates src="system" />
               <certificates src="@raw/nombre_cert" />
           </trust-anchors>
       </base-config>
   </network-security-config>
   ```

4. Asegurar que `AndroidManifest.xml` tiene el atributo:

   ```xml title="AndroidManifest.xml"
   android:networkSecurityConfig="@xml/network_security_config"
   ```

## Resultado Esperado

Una vez corregida la cadena:

1. **La validación del Paso 2 devuelve `Verify return code: 0 (ok)`** contra la lista de CA de Android 11 y 13.
2. **La cadena del Paso 1 termina en una raíz anterior a 2020** (o en una raíz presente en todas las versiones soportadas).
3. **La app inicia sesión** en un celular Android afectado, sin mostrar `Network request failed`.

## Historial de Incidentes

### SO-400: Sectigo R46 en Android 11 (abril 2026)

- **Servidor:** `www.idae.vit.com.co`
- **Dispositivo:** Android 11 (Xiaomi M2006C3LG)
- **Síntoma:** `TypeError: Network request failed` al iniciar sesión, en WiFi y en datos móviles; iOS funcionaba en la misma red.
- **Causa:** el certificado estaba firmado por `Sectigo Public Server Authentication Root R46` (2021), ausente en Android 11, y el servidor no enviaba el certificado cruzado hacia `USERTrust RSA`.
- **Solución aplicada (Opción C):** se incluyó el certificado raíz en `android/app/src/main/res/raw/sectigo_root_r46.pem`, se reescribió `network_security_config.xml` y se agregó `android:networkSecurityConfig` al `AndroidManifest.xml`.
- **Solución recomendada:** que el administrador del servidor instale el certificado cruzado `Sectigo R46 → USERTrust RSA` en la cadena (Opción A).

### Android 13: SSL.com Root CA 2022 (noviembre 2026)

- **Servidor:** `www.miempresa.com.co`
- **Dispositivo:** Android 13
- **Síntoma:** la app no permite ingresar; mismo síntoma que SO-400.
- **Causa:** certificado emitido por `SSL.com TLS Issuing RSA CA R1`, cuya raíz es `SSL.com TLS RSA Root CA 2022`. Esa raíz no está en Android 13 ni en Android 14 (sí en Android 15) y el servidor envía solo 2 certificados, sin cruzado hacia `SSL.com Root Certification Authority RSA` (2016). El certificado está vigente (hasta el 25/feb/2027) y el SAN es correcto.
- **Confirmación:** la prueba del Paso 2 contra `android-13.0.0_r1` devuelve `Verify return code: 20 (unable to get local issuer certificate)`.
- **Solución recomendada:** Opción A (instalar el certificado cruzado en el servidor).

:::tip Es un problema recurrente
Cada vez que un proveedor migra a una raíz nueva, los Android que no se actualizan dejan de confiar en los certificados nuevos. Antes de renovar un certificado, valide la cadena con el Paso 2.
:::

## Explicación para usuarios no técnicos

Puede copiar este texto para comunicarlo a un administrador o cliente.

> **La app móvil no abre en celulares Android 13 o anteriores.**
>
> Cuando la app se conecta a un sitio seguro (el candado de `https`), el servidor muestra un "documento de identidad" llamado _certificado_. El celular lo acepta solo si fue firmado por una entidad de confianza que esté en su lista, igual que un notario registrado. En Android, esa lista solo se actualiza cuando se cambia de versión del sistema.
>
> El certificado del servidor fue firmado por una entidad cuya acreditación es reciente (2022). Los celulares Android 13 y anteriores no la tienen en su lista y, como el servidor no entrega el documento adicional que demuestra que esa entidad está respaldada por una más antigua, el celular rechaza la conexión. En iPhone y en el computador sí funciona porque sus listas se actualizan con más frecuencia.
>
> El certificado no está vencido ni dañado; solo falta completar su "cadena de confianza".
>
> **Qué hay que hacer:**
>
> 1. **Recomendado:** pedir al proveedor del certificado el paquete de cadena completa (con el certificado cruzado) e instalarlo en el servidor. No requiere comprar un certificado ni actualizar la app.
> 2. **Alternativa:** solicitar un certificado a otra entidad con acreditación antigua (DigiCert, GlobalSign, Sectigo o Let's Encrypt).
> 3. **Último recurso:** que el equipo de desarrollo incluya la entidad en la app y publique una versión nueva; cada usuario deberá actualizarla.
>
> **Cómo saber que quedó resuelto:** abrir la URL del servidor en un Android 13 sin advertencias e iniciar sesión en la app.

## Checklist para Administradores de Servidor

- [ ] Certificado vigente y con el dominio exacto en el SAN
- [ ] Cadena completa instalada (servidor + intermedios + cruzado si aplica)
- [ ] TLS 1.2 habilitado como mínimo
- [ ] Puerto 443 accesible
- [ ] Prueba del Paso 2 devuelve `Verify return code: 0 (ok)` contra Android 11 y 13
- [ ] Prueba de inicio de sesión en un celular Android real
