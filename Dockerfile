
FROM node:latest AS build

WORKDIR /home/node/app

COPY . .

RUN npm install
RUN npm run build
#RUN npm start

FROM nginx:latest AS Prod
WORKDIR /usr/share/nginx/html/
COPY --from=build /home/node/app/public/ .
