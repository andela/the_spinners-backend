FROM node:12.13.0

WORKDIR /app

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 3000

CMD ["npm", "start"]