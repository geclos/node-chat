FROM node:10.3.0

# Working directory for the app inside the image
WORKDIR /usr/src/app

# Install depencies
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD [ "npm", "start" ]

