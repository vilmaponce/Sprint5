🚀 Mascotas Interestelares - Gestión Galáctica de Mascotas

"Donde cada mascota encuentra su constelación"


🛠 Tecnologías
Tecnología	
Uso
React 18	Biblioteca principal
Vite 4	Bundler y entorno de desarrollo
TailwindCSS 3	Estilización
React Router 6	Navegación
Axios	Peticiones HTTP
SweetAlert2	Alertas interactivas
Framer Motion	Animaciones



🌟 Características

✨ CRUD Completo de Mascotas Interestelares  
🪐 Diseño Responsive con Temática Espacial  
🚀 Animaciones y Efectos Visuales  
📡 Conexión con MockAPI  
🔍 Validación de Formularios  
🎨 Paleta de Colores Galáctica  
📂 Estructura del Proyecto


public/
├── images/          # Assets visuales
├── videos/          # Videos de fondo (galaxy.mp4)
└── favicon.ico      # Ícono de la aplicación

src/
├── components/
│   ├── Footer.jsx   # Pie de página estelar
│   ├── Header.jsx   # Navegación galáctica
│   ├── LoadingPlanet.jsx  # Animación de carga
│   ├── PetCard.jsx  # Tarjeta de mascota
│   └── PetForm.jsx  # Formulario reutilizable
│
├── context/
│   └── PetContext.jsx  # Estado global
│
├── pages/
│   ├── Home.jsx     # Página de inicio
│   ├── NotFound.jsx # Página 404
│   ├── PetCreate.jsx # Creación
│   ├── PetDetail.jsx # Detalle
│   ├── PetEdit.jsx  # Edición
│   └── PetList.jsx  # Listado
│
├── Router/
│   └── AppRouter.jsx # Configuración de rutas
│
├── services/
│   └── api.js       # Conexión API
│
├── utils/
│   ├── petSchema.js # Validaciones
│   ├── swalConfig.js # Alertas
│   └── toastConfig.js # Notificaciones
│
├── App.css          # Estilos base
├── App.jsx          # Componente principal
└── main.jsx         # Punto de entrada
