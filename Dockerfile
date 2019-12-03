FROM node:12.13.0

WORKDIR /app
ADD . .

COPY package*.json ./

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]