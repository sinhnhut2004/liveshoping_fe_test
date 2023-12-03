FROM node:latest

WORKDIR /app/fe
COPY . .

RUN npm i -g npm@8.11.0

RUN npm install

EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]