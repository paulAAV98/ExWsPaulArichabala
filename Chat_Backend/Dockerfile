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
