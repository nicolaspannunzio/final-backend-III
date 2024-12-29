# Adoptme Project

**Backend III : CoderHouse - Diciembre 2024**

## Descripción

Adoptme Project (Adoptame) es un proyecto backend desarrollado como parte del curso Backend III de CoderHouse. Este sistema está diseñado para gestionar procesos de adopción de mascotas mediante un API REST, integrando pruebas automatizadas y contenedores Docker.

----------

## Características principales

-   **Framework principal:** Express.js.
    
-   **Persistencia de datos:** MongoDB mediante Mongoose.
    
-   **Pruebas automatizadas:** Mocha, Chai y Supertest.
    
-   **Contenedores:** Configuración Docker disponible.
    
-   **Variables de entorno:** Manejo mediante dotenv.
    
-   **Documentación de API:** Swagger.
    

----------

## Requisitos previos

1.  Tener Node.js (v16 o superior) instalado.
    
2.  Tener Docker y Docker Compose instalados (opcional para uso con contenedores).
    
3.  Tener acceso a una instancia de MongoDB (local o remota).
    

----------

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1.  Clonar el repositorio:
    
    ```
    git clone <URL del repositorio>
    cd proyectofinalbkn3
    ```
    
2.  Instalar dependencias:
    
    ```
    npm install
    ```
    
3.  Configurar variables de entorno:
    
    -   Crear un archivo `.env` en la raíz del proyecto.
        
    -   Agregar las siguientes variables:
        
        ```
        DB_URI = mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<nombre_base_datos>
        PORT = 3000
        JWT_SECRET = <clave_secreta>
        ```
        
4.  Ejecutar el servidor:
    
    -   En modo desarrollo:
        
        ```
        npm run dev
        ```
        
    -   En modo producción:
        
        ```
        npm start
        ```
        

----------

## Uso

### Endpoints principales
    
-   **Usuarios**: Registro y autenticación de usuarios.
-    **Mascotas**: Gestiona mascotas disponibles para adopción.
-   **Adopciones**: Permite gestionar solicitudes de adopción entre usuarios y mascotas.
    

### Puertos

El servidor se ejecuta en el puerto **8080** por defecto. 

----------

## Pruebas

Este proyecto incluye pruebas automatizadas para validar el funcionamiento de los endpoints y la lógica interna. Para ejecutarlas:

1.  Pruebas generales:
    
    ```
    npx mocha
    ```
    
2.  Pruebas específicas de adopciones:
    
    ```
    npx mocha test/adoptions.test.js
    ```
    

----------

## Uso con Docker

1.  Construir la imagen:
    
    ```
    docker build -t adoptame-backend .
    ```
    
2.  Ejecutar el contenedor:
    
    ```
    docker run -p 8080:8080 --env-file .env adoptame-backend
    ```
    

### Visualizar DockerHub

Las imágenes del proyecto también están disponibles en DockerHub: [nickelok](https://hub.docker.com/u/nickelok)

----------

## Tecnologías utilizadas para el desarrollo del proyecto

-   Node.js
    
-   Express.js
    
-   MongoDB y Mongoose
    
-   Mocha, Chai y Supertest
    
-   Docker
    
-   Swagger para documentación
    
-   dotenv para configuraciones
 
----------

***Desarrollador***

Nicolás A. Pannunzio - Desarrollador, creador y responsable de este proyecto.

*contacto: nicolas.a.pannunzio@gmail.com*