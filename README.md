# Aplicación de Compra Móvil para un Juego 2d, hecho en React Native con Expo
El proyecto es una aplicación móvil desarrollada en **React Native** utilizando **Expo**, acotado a la tienda del videojuego y al login. Permite a los usuarios registrarse, iniciar sesión, navegar por categorías y productos, agregar artículos al carrito, realizar compras y administrar su inventario personal. Además, los usuarios pueden tomar una foto con la cámara del dispositivo para establecer su foto de perfil.


## Alcances del Proyecto

El objetivo principal del proyecto es crear una experiencia de compra móvil completa que incluya:

- **Autenticación de usuarios**: Registro y acceso seguro a la aplicación.
- **Navegación intuitiva**: Fácil exploración de categorías y productos.
- **Carrito de compras funcional**: Agregar y eliminar productos, ver detalles y confirmar compras.
- **Gestión de inventario personal**: Los usuarios pueden ver los productos que han comprado en su inventario.
- **Interacción con la cámara**: Permitir a los usuarios personalizar su perfil con una foto tomada desde el dispositivo.

## Funcionalidades Incluidas
- **Registro y Autenticación**: Los usuarios pueden crear una cuenta y autenticarse para acceder a la aplicación.
- **Navegación por Categorías y Productos**: Exploración de categorías y visualización de productos asociados.
- **Detalle de Producto**: Visualización de información detallada de cada producto.
- **Carrito de Compras**: Agregar productos al carrito, modificar cantidades y eliminar artículos si es necesario.
- **Confirmación de Compra**: Realizar compras y generar un recibo que se almacena en la base de datos.
- **Inventario Personal**: Visualización de los productos comprados por el usuario.
- **Perfil de Usuario**: Visualización del email y establecimiento de una foto de perfil utilizando la cámara del dispositivo.

## Librerías Utilizadas y Razones de Uso

- **React Native**: Framework para el desarrollo de aplicaciones móviles nativas utilizando JavaScript y React.
- **Expo**: Plataforma y conjunto de herramientas que facilitan el desarrollo de aplicaciones React Native sin necesidad de configuración nativa compleja.
- **React Navigation**:

  - **@react-navigation/native**: Núcleo de React Navigation para navegación estándar.
  - **@react-navigation/native-stack**: Implementación de stack navigator nativo.
  - **@react-navigation/bottom-tabs**: Implementación de navegación mediante pestañas en la parte inferior.

  *Se utiliza React Navigation para manejar la navegación dentro de la aplicación, proporcionando stacks y tabs navegadores para una experiencia de usuario fluida.*

- **Redux Toolkit**:

  - **@reduxjs/toolkit**: Simplifica la creación de stores, reducers y acciones.
  - **react-redux**: Enlaza Redux con React para acceder al store desde los componentes.

  *Redux Toolkit se utiliza para la gestión del estado global de la aplicación, facilitando el manejo de datos entre componentes.*

- **RTK Query**:

  - *Incluido en Redux Toolkit*, RTK Query se utiliza para realizar solicitudes a APIs y manejar estados de carga y errores de manera eficiente.

- **Expo Image Picker**:

  - **expo-image-picker**: Proporciona acceso a la cámara y a las imágenes del dispositivo.

  *Permite a los usuarios tomar fotos o seleccionar imágenes existentes para establecer su foto de perfil.*

- **Yup**:

  - **yup**: Librería para la validación de esquemas de datos.

  *Se utiliza para validar formularios de registro y autenticación, asegurando que los datos ingresados sean correctos.*

- **React Native Vector Icons**:

  - **react-native-vector-icons**: Conjunto de íconos vectoriales para usar en la interfaz de usuario.

  *Se utiliza para mejorar la estética y usabilidad de la aplicación con íconos en botones y elementos interactivos.*

- **SQLite**:

  - **expo-sqlite**: Base de datos ligera para almacenar datos locales.

  *Se utiliza para almacenar sesiones y datos que requieren persistencia en el dispositivo.*

- **Axios**:

  - **axios**: Cliente HTTP para realizar solicitudes a la API del backend.

  *Se utiliza para manejar las llamadas a la API de forma sencilla y eficiente.*

## Pasos de Instalación y Puesta a Punto del Proyecto

### Requisitos Previos

- **Node.js** instalado en el sistema.
- **Expo CLI** instalado globalmente:

  ```bash
  npm install -g expo-cli

### Instrucciones de Instalación
- Clonar el repositorio:
  ```bash
  git clone https://github.com/franciscoborn/coder-aplicaciones-mini-mage.git

- Navegar al directorio del proyecto:
  ```bash
  cd coder-aplicaciones-mini-mage

- Instalar dependencias
  ```bash
  npm install
  expo install expo-image-picker
  expo install expo-sqlite
  npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
  expo install react-native-screens react-native-safe-area-context
  npm install react-native-vector-icons
  npm install axios
  npm install yup

- Iniciar Aplicación con un emulador encendido:
  ```bash
  npx expo start
