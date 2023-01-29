FROM node:16
# hamewo6217@breazeim.com
WORKDIR /app

COPY package.json /app

RUN npm install 

COPY . /app

EXPOSE 8080

CMD ["node","start"];