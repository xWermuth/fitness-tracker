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
EXPOSE 3000

CMD ["npm", "run", "start:dev"]