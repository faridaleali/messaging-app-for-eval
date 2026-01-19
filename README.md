# Evaluación Técnica – Mobile Engineer (React Native / Expo)

## Objetivo

El objetivo de esta evaluación es comprender el enfoque de la persona candidata al momento de diseñar, estructurar y desarrollar una aplicación mobile real, así como su capacidad para resolver problemas habituales de producto, arquitectura y performance.

No se espera una solución perfecta ni completamente finalizada, sino una implementación **funcional, clara y bien fundamentada**, con foco en buenas prácticas de desarrollo.

---

## Contexto

Se provee una aplicación base desarrollada con **Expo + React Native**, que incluye:

- Store global de **Redux** ya configurado
- Arquitectura básica de acceso a API
- Pantalla de **Login parcialmente implementada**
- Pantalla de **Chat base implementada**
- Ejemplo funcional de **socket listener para mensajes de texto**
- Un **problema de performance introducido de manera intencional** (performance leak)

A partir de esto, se deberá completar y extender la aplicación.

---

## Uso de la API

Hemos desarrollado una API de mensajería básica para que puedas probar la aplicación. Podés acceder a ella a través del siguiente link:

👉 https://github.com/toremsoftware/messaging-api-for-eval

Dentro del archivo README.md vas a encontrar las instrucciones para levantarla de forma local. Ten en cuenta que esta API tiene como único objetivo facilitar el desarrollo de la aplicación; no es necesario ni esperado que realices cambios sobre ella, ya que no forma parte de la evaluación.

---

## Alcance del desafío

### 1. Autenticación y Splash Screen

- Completar la implementación del **Login**, utilizando **React Query** para la comunicación con la API
- Al autenticarse correctamente:
  - Persistir el token en el dispositivo (mecanismo de almacenamiento a elección)
- Al iniciar la aplicación:
  - Si existe un token válido almacenado, se deberá ingresar directamente a la aplicación
  - En caso contrario, se deberá mostrar la pantalla de Login
- **Splash Screen** (parcialmente implementada): Lo mencionado anteriormente se deberá ejecutar mientras se muestra la splash screen.

---

### 2. Navegación

- Agregar en el Header del chat un botón de Logout e implementar el **ruteo de pantallas** entre:
  - Login
  - Chats
- Se puede utilizar:
  - Una librería de navegación
  - O una solución nativa/custom

La elección queda a criterio de la persona candidata.

---

### 3. Mensajería

#### Envío de mensajes

- Implementar envío de **mensajes de imagen** (layout en Message/Layout/Image.tsx):
  - Utilizando **expo-camera**
  - Agregar un botón de adjuntar a la izquierda del input y al presionarlo se deberá abrir un **Action Sheet** con las siguientes opciones:
    - Cámara (habilitada)
    - Fototeca (deshabilitada)
    - Archivo (deshabilitada)
    - Audio (deshabilitada)

> Las opciones deshabilitadas deben ser visibles, pero no funcionales.

#### Recepción de mensajes

- Implementar la **recepción de mensajes vía socket**: Si todo lo anterior se realizó correctamente, esto debería funcionar automáticamente con el socket listener de nuevo mensaje ya implementado.

---

### 4. Listado de mensajes

- Implementar **paginación de mensajes**
- Utilizar **virtualización** para el renderizado del listado
- Tener en cuenta consideraciones de performance y escalabilidad del chat

---

### 5. Performance

- La aplicación contiene **un problema de performance introducido de manera intencional**
- Se espera que:
  - El problema sea identificado
  - Se explique brevemente su causa
  - Se proponga y/o implemente una solución (total o parcial)

---

## Adicionales (no excluyentes)

Los siguientes puntos no son obligatorios, pero serán considerados un plus:

- Propuestas de mejora de **arquitectura** y/o **performance** general de la aplicación
- Integración de **NativeWind**:
  - Instalación
  - Uso en al menos algunas pantallas o componentes
- Implementación de un sistema de **notificaciones o feedback visual** para errores en la comunicación con la API

---

## Criterios de evaluación

- Claridad y calidad del código
- Organización del proyecto
- Manejo de estado y side effects
- Uso adecuado de hooks
- Manejo de errores
- Decisiones técnicas y fundamentos
- Identificación y resolución de problemas de performance

---

## Entrega

- Repositorio con el código final
- README actualizado (puede ser este mismo) que incluya:
  - Decisiones técnicas relevantes
  - Posibles mejoras con más tiempo disponible
  - Problemas detectados (por ejemplo, el performance leak)

Para entregar la evaluación, deberás comprimir la solución en un archivo `.zip` (no `.rar`) y subirla en el siguiente formulario: https://forms.gle/g3j5m5C8ZEV42yxU8.

---

## Notas finales

No existe una única forma correcta de resolver el desafío. Se valoran especialmente las soluciones simples, claras y bien razonadas, por sobre implementaciones innecesariamente complejas.

Desde el equipo de Torem te deseamos mucha suerte! 🍀

---

# Solución Implementada

## Autor

**Farid Ale Ali**

## Decisiones Técnicas Relevantes

### 1. Arquitectura y Estado

- **Redux Toolkit**: Mantuve la estructura existente de Redux, agregando slices para `chat` y `global` con selectores memoizados para optimizar re-renders.
- **React Query (TanStack Query)**: Implementé `useMutation` para el login y operaciones de API, aprovechando el manejo automático de estados (loading, error, success) y la integración con el `ErrorProvider`.

### 2. Autenticación y Persistencia

- **TokenStorage**: Utilicé `AsyncStorage` encapsulado en una clase `TokenStorage` con métodos estáticos para persistir tokens y datos del usuario.
- **Flujo de Splash**: La pantalla Splash verifica el token almacenado al iniciar. Si existe y es válido, navega directamente al Chat; caso contrario, al Login.

### 3. Navegación

- **Expo Router**: Elegí Expo Router por su integración nativa con Expo y el sistema de archivos. La navegación entre Login y Chat es declarativa basada en el estado de autenticación global.

### 4. Mensajería

- **Socket.io**: Mantuve el listener existente para recepción de mensajes en tiempo real.
- **expo-camera**: Implementé `CameraModal` con `CameraView` para captura de fotos. En web, hay fallback a `expo-image-picker` ya que expo-camera no funciona en navegador.
- **Action Sheet**: Componente custom con opciones de Cámara (habilitada) y Fototeca/Archivo/Audio (deshabilitadas visualmente con `opacity`).

### 5. Paginación y Performance

- **Paginación**: Implementé paginación infinita con `onEndReached` en FlatList. Uso `nextPage` del servidor para calcular el offset correcto.
- **Virtualización**: FlatList con `removeClippedSubviews`, `maxToRenderPerBatch=10`, `windowSize=10` para optimizar el renderizado de listas largas.
- **Memoización**: Uso extensivo de `React.memo()`, `useCallback` y `useMemo` para evitar re-renders innecesarios.

### 6. Estilos

- **NativeWind v4**: Integré Tailwind CSS con NativeWind para estilos utility-first. Configuré:
  - `tailwind.config.js` con colores personalizados del diseño
  - `babel.config.js` con presets de NativeWind
  - `metro.config.js` con `withNativeWind`
  - `global.css` con directivas de Tailwind

### 7. Manejo de Errores

- **ErrorProvider**: Implementé un Context con modal de error reutilizable. Se integra con React Query para capturar errores de mutaciones automáticamente.
- **Logout automático**: En caso de error 401 (Unauthorized), se limpia el storage y se redirige al Login.

---

## Problema de Performance Detectado

### Descripción

El problema de performance estaba en el **componente Message** y su **Provider**. Cada mensaje creaba un nuevo Context y re-renderizaba innecesariamente cuando el estado del chat cambiaba.

### Causa

- Falta de memoización en componentes de la lista de mensajes
- Re-renders en cascada por cambios en el estado global
- Renderizado de todos los mensajes en cada actualización

### Solución Implementada

1. **Memoización de componentes**: Envolví `Message`, `Body`, `MessageProvider` y componentes de layout con `React.memo()`
2. **Callbacks estables**: Uso de `useCallback` para funciones pasadas como props
3. **Selectores memoizados**: Selectores de Redux que evitan recálculos innecesarios
4. **Virtualización optimizada**: Configuración de FlatList con `removeClippedSubviews`, límites de renderizado por batch y window size reducido

---

## Posibles Mejoras con Más Tiempo

1. **Optimistic Updates**: Mostrar mensajes enviados inmediatamente en la UI antes de confirmación del servidor
2. **Caché de imágenes**: Implementar caché local para imágenes de mensajes con `expo-image`
3. **Compresión de imágenes**: Reducir tamaño de imágenes antes de enviar al servidor
4. **Infinite Query**: Usar `useInfiniteQuery` de React Query para paginación más elegante
5. **Tests unitarios**: Agregar tests para hooks y componentes críticos
6. **Skeleton loaders**: Mejorar UX con placeholders mientras cargan los mensajes
7. **Pull to refresh**: Agregar gesto para refrescar mensajes manualmente
8. **Indicador de typing**: Mostrar cuando el otro usuario está escribiendo
9. **Offline support**: Cola de mensajes pendientes cuando no hay conexión
10. **Animaciones**: Transiciones suaves con Reanimated para mensajes nuevos

---

## Estructura del Proyecto

```
src/
├── api/                    # Configuración de API y repositorios
│   ├── domain/            # Servicios por dominio (auth, chat)
│   ├── baseRepositories/  # HTTP client (Axios) y manejo de errores
│   └── sockets/           # Configuración de Socket.io
├── app/                    # Rutas de Expo Router
├── components/             # Componentes reutilizables
│   ├── ActionSheet/       # Action Sheet para adjuntos
│   ├── CameraModal/       # Modal de cámara
│   ├── ErrorProvider/     # Context de errores
│   ├── ImageViewer/       # Visor de imágenes fullscreen
│   └── MessageView/       # Componentes base de mensajes
├── features/               # Pantallas principales
│   ├── Chat/              # Pantalla de chat
│   ├── Login/             # Pantalla de login
│   └── Splash/            # Pantalla de splash
├── hooks/                  # Custom hooks
├── redux/                  # Store, slices y selectores
├── services/               # Servicios (TokenStorage)
└── utils/                  # Utilidades
```

---

## Tecnologías Utilizadas

- **React Native** 0.81.5
- **Expo SDK** 54
- **TypeScript** 5.9
- **Redux Toolkit** 2.11
- **React Query** 5.90
- **NativeWind** 4.2 + Tailwind CSS 3.4
- **expo-camera** 17.0
- **expo-image-picker** 17.0
- **Socket.io Client** 4.8

---

## Configuración del Backend (Importante)

Para que las **imágenes se visualicen correctamente** en el frontend, es necesario modificar la configuración de `helmet` en el backend.

### Cambio requerido

En el archivo `src/server.ts` del backend (línea 23), cambiar:

```typescript
// Antes
app.use(helmet());
```

Por:

```typescript
// Después
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
```

### Motivo

Por defecto, `helmet` bloquea las solicitudes de recursos cross-origin (CORP). Esto impide que el frontend cargue imágenes servidas desde el backend. Al configurar `crossOriginResourcePolicy: { policy: "cross-origin" }`, permitimos que el frontend acceda a las imágenes del servidor.
