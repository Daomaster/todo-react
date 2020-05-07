## Todo React Application

This is a project built with Node.js Express.js and Mongoose.

### Run the application
### `npm run start`

#### Before you start
create a file `nodemon.json` and add the following configuration
```json
{
  "env": {
    "MONGO_USER": "Mongo username",
    "MONGO_PASSWORD": "Mongo password",
    "MONGO_DB": "Mongo database",
    "MONGO_SERVER": "Mongo server hostname",
    "JWT_SECRET": "Your secret :)"
  }
}
```

Run the development mode of the application, under the hood it uses `nodemon`
, so it will watch your file change and reload the application automatically.

By default, in development mode server is running on port `8000`, there is a postman collection
which located in `/utils/todo-react.postman_collection.json`

### Run the test
### `npm run test`

Launches all tests in the `tests` folder, currently there are some basic integration
test for the two entities, basically simulate user behaviors. 

### Lint the application
### `npm run lint:fix`

this will go through the application code and check with the linter.
