
FROM node:14

WORKDIR /myapp

COPY package*.json .

RUN npm install 
RUN npm install express

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
