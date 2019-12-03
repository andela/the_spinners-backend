FROM node:12.13.0

RUN mkdir /app
ADD . /app
WORKDIR /app
#COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ./scripts/start.sh