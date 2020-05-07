# Todo Application
### Description
This is an application using React in the front-end, and Node.js with Apollo GraphQL in the backend.

### Demo
This is a live [Demo](http://34.80.91.105), it is current hosted on a single docker-compose host in Google Cloud Platform, with the MongoDB Atlas as the database replica.

### Docker images
[todo-client](https://hub.docker.com/repository/docker/daomaster/todo-client)

[todo-server](https://hub.docker.com/repository/docker/daomaster/todo-server)

### Run locally with docker-compose
The whole service be can run locally, but it needs to provide a few environment variables (.env works also).
Detail please check the docker-compose.yaml file.
```bash
MONGO_USER="Mongo username",
MONGO_PASSWORD="Mongo password",
MONGO_DB="Mongo database",
MONGO_SERVER="Mongo server hostname",
JWT_SECRET="Your secret :)"
```

Once the environment variables are inplace, copy the `docker-compose.yaml` to desired directory,
then run
```bash
docker-compose up -d
```

The application will be expose on port `80`, [http://localhost](http://localhost)