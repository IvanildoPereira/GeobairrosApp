FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

# This is our secret sauce
RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 8000

CMD ["npm", "start"]
