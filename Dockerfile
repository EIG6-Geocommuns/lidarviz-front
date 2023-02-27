FROM node:19.2-alpine
WORKDIR /app
COPY . .
RUN npm install -g npm@9.5.1
RUN npm install
EXPOSE 3000
CMD ["yarn", "start"]