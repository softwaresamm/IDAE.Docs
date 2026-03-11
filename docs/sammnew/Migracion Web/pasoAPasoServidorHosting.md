# Paso a Paso Migración SammWeb a SammNew

## Antes de iniciar la configuración, asegúrese de tener:

- [ ] Copiar sammnew en la versión acordada con el consultor
- [ ] Configurar web config de sammnew
- [ ] Definir la ruta que usarán los usuarios (/cliente)
- [ ] Confirmar que no hay rutas
- [ ] Activar sammreport con la versión 6.0.0.9

## Durante la ventana de mantenimiento

- [ ] Aviso a cliente de detención del sitio
- [ ] Detener appPool del cliente
- [ ] Extraer archivos de sammnew de la versión probada por el cliente
- [ ] Copiar carpeta /archivos de /sammweb a /sammnew
- [ ] Configurar sn_cliente en IIS
- [ ] Crear (verificar que exista) carpeta /archivos/temp en sammmreport
- [ ] Copiar logoempresa.png de test
- [ ] Copiar recursos de test
- [ ] Copiar carpeta de los rdls desde sammweb a sammreport
- [ ] Subir sitio Redirect
- [ ] Validar link de cronograma a light
- [ ] Validar versión liberada de api
- [ ] Correr actualización por servicio API

## Validaciones una vez arriba el sitio

- [ ] Ingreso con usuario superadministrador a solicitudes, ots, cronograma, programación
- [ ] Ingreso a reportes
- [ ] Impresión de OTT
- [ ] Validar ingreso al app (si aplica)
- [ ] Compartir la nueva URL con la que ingresarán los técnicos al app
