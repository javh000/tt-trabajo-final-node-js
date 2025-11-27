# API - Node.js, Express, Firebase y JWT

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) 
![Firebase](https://img.shields.io/badge/Firebase-ffca28?logo=firebase&logoColor=black) 
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white) 
![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)

API para gestionar productos y autenticación de usuarios, construida con **Node.js**, **Express**, y **Firebase Firestore**, con rutas protegidas mediante **JWT**. deploy en **Vercel**.

---

## Repositorio y Deploy

- **Repositorio en GitHub:**  
  https://github.com/javh000/tt-trabajo-final-node-js

- **URL del proyecto desplegado en Vercel:**  
   https://tt-trabajo-final-node-js.vercel.app/

---

## Funcionalidades del Proyecto

- Gestión de productos (crear, listar, obtener por ID, actualizar, eliminar).
- Autenticación de usuarios mediante JWT.
- Conexión a Firestore para almacenamiento en la nube.
- Middleware de validación y manejo de errores.
- Configuración lista para despliegue en Vercel.
- Colección de pruebas en Postman para facilitar el consumo de la API.

---

## Instalación

```bash
git clone https://github.com/javh000/tt-trabajo-final-node-js
cd tt-trabajo-final-node-js
npm install
```

Crear archivo `.env` (ver .env.example para configuración):

---

## Ejecutar la aplicación

```bash
npm run start
```

---

## Rutas

### Productos

| Método | Ruta                       | Descripción                |
| ------ | -------------------------- | -------------------------- |
| GET    | `/api/products`            | Lista todos los productos  |
| GET    | `/api/products/:id`        | Devuelve producto por ID   |

### Productos (Protegidas)

| Método | Ruta                       | Descripción                |
| ------ | -------------------------- | -------------------------- |
| POST   | `/api/products/create`     | Crea un nuevo producto     |
| PUT    | `/api/products/update/:id` | Actualizar producto por ID |
| DELETE | `/api/products/:id`        | Elimina producto por ID    |

### Autenticación

| Método | Ruta          | Descripción                        |
| ------ | ------------- | ---------------------------------- |
| POST   | `/auth/login` | Recibe credenciales y devuelve JWT |

---

## Ejemplos de Peticiones localhost

**Login de usuario admin:**

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@gmail.com","password":"123456"}'
```

**Obtener todos los productos:**

```bash
curl -X GET http://localhost:3000/api/products \
```

**Obtener producto por ID:**

```bash
curl -X GET http://localhost:3000/api/products/ID_DEL_PRODUCTO_ACA \
```

**Crear un producto (requiere token):**

```bash
curl -X POST http://localhost:3000/api/products/create \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN_ACA>" \
-d '{"name":"Producto 1","price":100, "category": "category"}'
```

**Eliminar un producto (requiere token):**

```bash
curl -X DELETE http://localhost:3000/api/products/ID_DEL_PRODUCTO_ACA \
-H "Authorization: Bearer <TOKEN_ACA>"

```

---

## Colección Postman

Se incluye una colección de Postman para probar todas las rutas de la API desplegada en Vercel.

- Archivo: `postman/TT-NodeJS-API.postman_collection.json`
- Instrucciones:
  1. Abrir Postman.
  2. Seleccionar `Import > File` y elegir el archivo de la colección.

La colección incluye variables pre-configuradas:

- **{{base_url}}** → URL del servidor (deploy)
- **{{token}}** → Token JWT que se actualiza automáticamente al hacer login.

La petición **/auth/login** incluye un script que:

- Lee el JWT devuelto por el login.
- Actualiza la variable **token** dentro de la colección.
- Las peticiones protegidas tiene esa variable configurada que se actualiza con cada login.

Esto permite ejecutar las solicitudes pre-configuradas sin tener que escribirlas manualmente, manteniendo siempre el token actualizado.

## Estructura del Proyecto

```
├── index.js # Entrada del servidor
├── package.json # Configuración de npm
├── .env # Variables de entorno reales
├── .env.example # Ejemplo de variables de entorno
├── data/
│ └── data.js # Configuración de Firebase/Firestore
├── routes/
│ ├── auth.routes.js
│ └── products.routes.js
├── controllers/
│ ├── auth.controller.js
│ └── products.controller.js
├── services/
│ ├── auth.service.js
│ └── products.service.js
├── models/
│ └── products.model.js
├── middlewares/
│ ├── auth.middleware.js      # Verifica JWT y protege rutas
│ └── errorHandler.js         # Middleware centralizado de manejo de errores
├── errors/
│ ├── index.js                # Exporta clases de error (AppError, NotFoundError, etc.)
│ └── AppError.js             # Clase base para errores de la aplicación
├── postman/
│ └── TT-NodeJS-API.postman_collection.json # Colección Postman
└── vercel.json # Configuración de despliegue
```

---

## Tecnologías

- Node.js
- Express
- Firebase Firestore
- JWT para autenticación
- Vercel para despliegue
- Postman para pruebas de API

---
