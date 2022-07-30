FROM node:16

WORKDIR /usr/local/apps/myapp

COPY package.json ./
RUN npm install && npm cache clean --force
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY src ./src
COPY prisma ./prisma/
COPY .env ./

RUN npm run build
RUN npm run schema

EXPOSE ${SERVER_PORT}

# Starts migrations and runs server in watch mode
CMD ["npm", "run", "docker:dev"]