# WebSocket

Este proyecto es una aplicación de chat en tiempo real construida con:

- **Frontend:** Angular (servido con Apache)
- **Backend:** Node.js con Socket.IO
- **Contenedores:** Docker y Docker Compose

---

## docker-compose.yml

version: "3.9"

services:
  frontend:
    build:
      context: ./Chat_front
    ports:
      - "4200:4200"  # Angular se servirá en el puerto 4200
    command: npm start  # Solo si usas Angular CLI en modo desarrollo

  backend:
    build:
      context: ./Chat_Backend
    ports:
      - "3000:3000"  # Node.js backend
    volumes:
      - ./Chat_Backend:/app
    command: npm start

### Comando para levantar los contenedores

docker-compose up --build

## Dockerfile del Back 

# Imagen base
FROM node:16

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para las dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del backend
COPY server.js ./

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]

## Dockerfile del Angular

# Etapa 1: Build de Angular
FROM node:16 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration production

# Etapa 2: Servir con Apache
FROM httpd:2.4
COPY apache/default.conf /usr/local/apache2/conf/httpd.conf
COPY --from=build /app/dist/chat-front /usr/local/apache2/htdocs/
EXPOSE 80

