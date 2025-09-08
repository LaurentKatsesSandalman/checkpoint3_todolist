# Dockerfile
FROM alpine:3.21

ENV NODE_VERSION=24.3.0

WORKDIR /app

# Copier les fichiers package.json
COPY package*.json ./

RUN apk add --no-cache nodejs npm
# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000

# Commande de démarrage en mode développement
CMD ["npm", "run", "dev"]