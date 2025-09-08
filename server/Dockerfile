# Dockerfile.backend
FROM alpine:3.21

ENV NODE_VERSION=24.3.0

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

RUN apk add --no-cache nodejs npm 
# Installer les dépendances (dev incluses)
RUN npm install

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3001

# Commande de démarrage en mode développement
CMD ["npm", "run", "start:dev"]