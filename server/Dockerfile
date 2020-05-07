FROM node:10.16-alpine
COPY . /app
WORKDIR /app
# install only dependencies
RUN npm install --production
# start the application
CMD npm run start:prod
EXPOSE 8000
