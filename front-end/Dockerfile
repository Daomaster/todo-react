FROM node:10.16-alpine AS frontend-builder
COPY . /app/
WORKDIR /app
RUN npm install && npm run build

FROM nginx:alpine
# delete the default html from nginx image
RUN rm -rf /usr/share/nginx/html/*
COPY nginx /etc/nginx/conf.d
COPY --from=frontend-builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
