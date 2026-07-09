---
sidebar_position: 1
title: Flujo de Aplicación
description: Flujo lógico completo del sistema de formularios dinámicos — desde el menú hasta la carga de opciones de lista.
tags: [sammai, formularios, flujo, arquitectura]
---

# Flujo de Aplicación — Formularios Dinámicos

Este documento describe el flujo lógico que recorre el sistema desde que el usuario accede al menú
hasta que puede completar y guardar un formulario dinámico.

---

## Visión General

```
Menú  →  Permisos  →  Funcionalidad  →  Formulario  →  Campos  →  Opciones de lista
```

Cada paso depende del anterior. La cadena completa garantiza que el usuario solo vea
lo que tiene permiso de ver, y que los formularios se construyan dinámicamente según
la configuración en base de datos.

---

## Paso 1 — Construcción del Menú

### Tablas involucradas
- `gui_dashboard` — panel(es) del home
- `gui_bloqueHome` — bloques dentro de un dashboard
- `gui_modulo` — módulos (agrupadores de funcionalidades)
- `gui_funcionalidad` — ítem de menú que expone una funcionalidad

### Flujo
1. El usuario inicia sesión. El frontend consulta los dashboards asignados al perfil.
2. Cada **bloque de home** agrupa uno o más **módulos**.
3. Cada **módulo** contiene una lista de **funcionalidades** ordenadas.
4. Cada funcionalidad tiene un `funcionalidad_codigo` (snake_case inglés) que el frontend
   usa para activar rutas especiales o pantallas personalizadas.

### Convención crítica
El campo `funcionalidad_codigo` siempre va en **inglés minúscula snake_case**:

| ✅ Correcto | ❌ Incorrecto |
|---|---|
| `form_setup` | `FORMULARIOS_CONFIG` |
| `schedules` | `Programaciones` |
| `projections` | `Proyecciones` |

---

## Paso 2 — Control de Permisos

### Tablas involucradas
- `seg_perfil` — perfiles de usuario
- `seg_usuario` — usuarios del sistema
- `seg_permisoFuncionalidad` — permisos por perfil sobre una funcionalidad

### Flujo
1. Al renderizar el menú, el frontend filtra las funcionalidades según los permisos
   del perfil activo del usuario (`seg_permisoFuncionalidad`).
2. Cada permiso define las acciones habilitadas: **Ver**, **Crear**, **Editar**, **Eliminar**.
3. Las rutas del frontend son seguras: `AuthGuard` verifica el permiso antes de renderizar.

### Ejemplo de ruta generada
```
/pages/{mainRoute}/{funcionalidad_codigo}
/pages/{mainRoute}/{funcionalidad_codigo}/new    ← acción crear
/pages/{mainRoute}/{funcionalidad_codigo}/{id}   ← acción editar
```

---

## Paso 3 — Carga del Formulario

### Tablas involucradas
- `gen_formulario` — formulario asociado a la funcionalidad
- `gen_seccionFormulario` — secciones del formulario (collapsibles en la UI)
- `gen_detalleFormulario` — campos del formulario (filas individuales)

### Flujo
1. Cuando el usuario navega a `/new` o `/{id}`, el frontend consulta la estructura
   del formulario para esa funcionalidad.
2. El endpoint devuelve un objeto `Form` con la jerarquía:
   ```
   Form
   └── Section[]
       └── FormField[]
   ```
3. El componente `DynamicFormRenderer` construye el formulario en tiempo de ejecución:
   - Renderiza secciones como acordeones colapsables (`Collapsible`).
   - Distribuye campos en una grilla responsiva (1 / 2 / 3 columnas según contexto).
   - Usa `react-hook-form` con keys internas `field_{id}` para cada campo.

### Columnas por contexto
| Contexto | Columnas |
|---|---|
| Página completa (`/new`) | 3 (responsive) |
| Drawer / Sheet lateral | 1 |

### Key interna de RHF
Los campos se registran en `react-hook-form` con la key `field_{idCampo}` (nunca con `code`),
porque el payload al backend usa el `id` numérico, no el código:

```typescript
// Siempre field_<id>, independientemente de field.code
getFieldKey(field) → `field_${field.id}`

// Campos de comentario siguen el mismo patrón
`field_${field.id}__comment`
```

---

## Paso 4 — Tipos de Campo

Cada `FormField` tiene un `type` que determina el componente a renderizar:

| Tipo (`FieldType`) | Componente | Descripción |
|---|---|---|
| `ShortText` | `<Input>` | Texto corto con validación de tamaño y regex |
| `LongText` | `<Textarea>` | Texto largo (ocupa ancho completo) |
| `Number` | `<Input type="number">` | Numérico |
| `DateOnly` | `<Input type="date">` | Fecha sin hora |
| `DateTime` | `<Input type="datetime-local">` | Fecha y hora |
| `Boolean` | `<Switch>` | Toggle on/off |
| `ReadOnly` | `<Input disabled>` | Solo lectura (valor precargado) |
| `List` | `<ListFieldInput>` | Lista simple + campo comentario |
| `ListNoComment` | `<ListFieldInput>` | Lista simple sin comentario |
| `ConditionalList` | `<ListFieldInput>` | Lista condicionada por campo padre |
| `ConditionalListNoComment` | `<ListFieldInput>` | Ídem sin comentario |
| `MultipleSelection` | `<MultiSelectFieldInput>` | Selección múltiple + comentario |
| `MultipleSelectionNoComment` | `<MultiSelectFieldInput>` | Selección múltiple sin comentario |
| `File` | *(pendiente)* | Adjunto de archivo |
| `Signature` | *(pendiente)* | Firma digital |

### Campo comentario
Los tipos `List`, `ConditionalList` y `MultipleSelection` incluyen un `<Textarea>` adicional
registrado con la key `field_{id}__comment` (doble guión bajo).

---

## Paso 5 — Carga de Opciones de Lista

Para los campos de tipo lista, el frontend usa una arquitectura de **doble endpoint**
que optimiza el rendimiento según el volumen de datos.

### Tablas involucradas
- `gen_recursoFormulario` — define la fuente de datos para un campo de lista
- Tabla destino del recurso (variable según configuración)

### Endpoint 1 — Carga inicial (sin keyword)
```
POST /form-resources/{idResource}
Body: { idField, idParentForm, idMainObject, idChildObject, filters: [] }
```
- Se ejecuta **una sola vez** cuando el usuario abre el dropdown por primera vez (`lazy`).
- Devuelve hasta N opciones y el flag `existsMoreData`.
- Si `existsMoreData = false`: todas las opciones caben en este resultado; la búsqueda
  se hace **localmente** (filtro en memoria).

### Endpoint 2 — Búsqueda CMM (con keyword)
```
POST /form-resources/{idResource}/cmm
Body: { idField, idParentForm, idMainObject, idChildObject, filters: [], keyword: "texto" }
```
- Solo se activa cuando `existsMoreData = true` **y** el usuario escribe en el input de búsqueda.
- Usa debounce de **300 ms** antes de disparar la petición.
- Devuelve resultados filtrados por el backend.

### Diagrama de decisión
```
Usuario abre dropdown
        │
        ▼
POST /form-resources/{id}  (carga inicial)
        │
   existsMoreData?
   ┌────┴────┐
  No        Sí
   │         │
   │    Usuario escribe keyword?
   │     ┌───┴───┐
   │    No       Sí
   │     │        │
   └─────┘    POST /form-resources/{id}/cmm
   Filtro     (debounce 300ms)
   local
```

### Cache de labels (CMM)
Cuando el usuario selecciona una opción desde resultados CMM, el label se guarda
en un `useRef` (`labelCacheRef`) antes de que el popover cierre.
Esto permite mostrar el label en el trigger aunque los resultados CMM ya no estén en memoria.

### Listas condicionales (pendiente Stage 2b)
Los campos `ConditionalList` tienen un array `parents: number[]` que referencia
los `id` de campos padre. Cuando el valor del padre cambia, se debe re-consultar
el endpoint con `filters: [{ idField: parentId, value: Number(parentValue) }]`.

---

## Paso 6 — Guardado del Formulario *(Stage 3 — pendiente)*

Al hacer submit, el payload se construye así:

```typescript
// FormValues internos: { field_42: '123', field_43: 'texto', field_42__comment: '...' }

const fieldEntries = Object.entries(values)
  .filter(([k]) => /^field_\d+$/.test(k))
  .map(([k, v]) => ({ idField: Number(k.replace('field_', '')), value: v }));

const commentEntries = Object.entries(values)
  .filter(([k]) => /^field_\d+__comment$/.test(k))
  .map(([k, v]) => ({ idField: Number(k.replace('field_', '').replace('__comment', '')), comment: v }));
```

---

## Archivos Clave del Frontend

| Archivo | Responsabilidad |
|---|---|
| `types/form.ts` | `FieldType` enum, `FormValues`, `getFieldKey()` |
| `types/models.ts` | `Form`, `SectionForm`, `FormField`, DTOs de recursos |
| `lib/endpoints.ts` | `GET_RESOURCE`, `GET_RESOURCE_CMM` |
| `hooks/queries/use-form-resource-query.ts` | `useFormResourceOptions`, `useFormResourceSearch` |
| `components/features/forms/fields/FieldRenderer.tsx` | Switch por tipo de campo |
| `components/features/forms/fields/ListFieldInput.tsx` | Combobox lazy con doble endpoint |
| `components/features/forms/fields/MultiSelectFieldInput.tsx` | Multi-select lazy con doble endpoint |
| `components/features/forms/page-components/DynamicFormRenderer.tsx` | Renderizador principal, grilla, secciones |
| `components/features/forms/page-components/CreateFormSheet.tsx` | Sheet lateral (columnas = 1) |
