# Usa la imagen oficial de Node.js versión 20 como base
FROM node:20

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]