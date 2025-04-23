🚀 Mascotas Interestelares - Gestión Galáctica de Mascotas

"Donde cada mascota encuentra su constelación"


🧰 ***Tecnologías y Librerías Utilizadas***


##React 18	Biblioteca principal para construir la interfaz de usuario de forma declarativa y basada en componentes.
##Vite 4	Herramienta de bundling y entorno de desarrollo rápido para proyectos modernos de frontend.
##Tailwind CSS 3	Framework de utilidades para estilizar componentes de manera eficiente y responsiva.
##React Router 6	Manejo de rutas y navegación entre diferentes vistas de la aplicación.
##Axios	Cliente HTTP para realizar peticiones a APIs de manera sencilla.
##SweetAlert2	Librería para mostrar alertas y diálogos interactivos y personalizables.
##Framer Motion	Librería para agregar animaciones fluidas y atractivas a los componentes de React.




🌟 ***Características***

✨ CRUD Completo de Mascotas Interestelares  
🪐 Diseño Responsive con Temática Espacial  
🚀 Animaciones y Efectos Visuales  
📡 Conexión con MockAPI  
🔍 Validación de Formularios  
🎨 Paleta de Colores Galáctica  
📂 Estructura del Proyecto


🗂️ **Estructura del Proyecto**
La organización del proyecto sigue una estructura clara y modular:

```
Sprint5/
├── public/
│   ├── images/           # Recursos visuales como imágenes
│   ├── videos/           # Videos de fondo (por ejemplo, galaxy.mp4)
│   └── favicon.ico       # Ícono de la aplicación
└── src/
    ├── components/       # Componentes reutilizables de la UI
    │   ├── Footer.jsx        # Pie de página estelar
    │   ├── Header.jsx        # Barra de navegación galáctica
    │   ├── LoadingPlanet.jsx # Animación de carga
    │   ├── PetCard.jsx       # Tarjeta individual de mascota
    │   └── PetForm.jsx       # Formulario reutilizable para crear/editar mascotas
    ├── context/
    │   └── PetContext.jsx    # Contexto global para el estado de las mascotas
    ├── pages/            # Vistas o páginas principales de la aplicación
    │   ├── Home.jsx          # Página de inicio
    │   ├── NotFound.jsx      # Página 404 para rutas no existentes
    │   ├── PetCreate.jsx     # Página para crear una nueva mascota
    │   ├── PetDetail.jsx     # Página de detalle de una mascota
    │   ├── PetEdit.jsx       # Página para editar una mascota existente
    │   └── PetList.jsx       # Página que lista todas las mascotas
    ├── Router/
    │   └── AppRouter.jsx     # Configuración de las rutas de la aplicación
    ├── services/
    │   └── api.js            # Configuración y funciones para interactuar con la API
    ├── App.jsx           # Componente raíz de la aplicación
    └── main.jsx          # Punto de entrada de la aplicaciónrada
```

🔄 Comunicación entre Componentes y Flujo de Datos
**Contexto Global (PetContext.jsx):**

Utiliza la API de Context de React para manejar el estado global relacionado con las mascotas.

Proporciona funciones y datos a los componentes hijos sin necesidad de prop drilling.

Servicios API (api.js):

Configura Axios para realizar peticiones HTTP a una API externa (posiblemente MockAPI).

Define funciones para operaciones CRUD: obtener, crear, actualizar y eliminar mascotas.

Ruteo (AppRouter.jsx):

Define las rutas de la aplicación utilizando React Router.

Asocia cada ruta con su componente de página correspondiente.

Componentes de Página (pages/):

Home.jsx: Página principal con información general o bienvenida.

PetList.jsx: Muestra una lista de todas las mascotas disponibles.

PetDetail.jsx: Muestra información detallada de una mascota seleccionada.

PetCreate.jsx: Formulario para agregar una nueva mascota.

PetEdit.jsx: Formulario para editar la información de una mascota existente.

NotFound.jsx: Página que se muestra cuando la ruta no coincide con ninguna definida.

Componentes Reutilizables (components/):

Header.jsx y Footer.jsx: Encabezado y pie de página presentes en todas las páginas.

PetCard.jsx: Representa visualmente una mascota en la lista.

PetForm.jsx: Formulario utilizado tanto para crear como para editar mascotas.

LoadingPlanet.jsx: Animación que se muestra durante la carga de datos.``

🌐**Interacción con la API**
*Peticiones HTTP:*

Se realizan mediante Axios a una API RESTful.

Las operaciones incluyen:

**GET:** Obtener la lista de mascotas o detalles de una mascota específica.

**POST:** Crear una nueva mascota.

**PUT:** Actualizar la información de una mascota existente.

**DELETE:** Eliminar una mascota.

Manejo de Respuestas:

Las respuestas exitosas actualizan el estado global mediante el contexto.

Los errores se manejan mostrando alertas interactivas con SweetAlert2.``

🎨 **Estilización y Animaciones**
``Tailwind CSS (última versión):

Se utiliza para aplicar estilos de manera eficiente y mantener un diseño responsivo.

Facilita la creación de una interfaz coherente y atractiva con clases utilitarias.

*Framer Motion:*

Añade animaciones suaves y atractivas a los componentes.

Mejora la experiencia del usuario al interactuar con la aplicación.``

✅ **Validación y Alertas**
*Validación de Formularios:*

Se implementa para asegurar que los datos ingresados por el usuario sean correctos antes de enviarlos a la API.

*SweetAlert2:*

Se utiliza para mostrar alertas y confirmaciones de acciones, como la eliminación de una mascota o la confirmación de creación/edición exitosa.``

🧪 ##Pruebas y Despliegue 
``Netlify``
