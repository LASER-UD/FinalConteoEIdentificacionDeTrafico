FROM node:15.2

#Creación de carpeta en contenedor
RUN mkdir -p /usr/src/app
#Llamdo de la carpeta
WORKDIR /usr/src/app

#Copiamos los package.json
COPY package*.json ./
#Instalamos los módulos
RUN npm install
#Copiamos el código
COPY . .
#Especificamos el puerto
EXPOSE 3000
#Corremos
CMD [ "npm", "run" , "dev" ]