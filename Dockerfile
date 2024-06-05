# Etapa 1: Construcción
FROM --platform=linux/amd64 node:20 AS builder

WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias solo para construir
RUN npm install

# Copiar el resto de la aplicación
COPY . .
COPY src/assets/apkmanager-12227-dfe1b13f205a.json /app/assets/apkmanager-12227-dfe1b13f205a.json

# Construir la aplicación
RUN npm run build

# Etapa 2: Imagen final
FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

# Copiar las dependencias de la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules

# Copiar el código compilado de la etapa de construcción
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/assets/ ./assets

# Copiar otros archivos necesarios
COPY --from=builder /app/package*.json ./

# Establecer la variable de entorno
ENV NODE_ENV=production

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]