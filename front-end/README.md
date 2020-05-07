## Todo React Application

This is a project built with React and Apollo React Client.
Also, this is the first React application I ever wrote, so please be gentle :)

### Run the application
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Run the tests
### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build the application
### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Lint the application
### `npm run lint:fix`

This will go through the application code and check with the linter
, also it will fix all the error that it can resolve, including prettier the files.

### Generate types based on GraphQL schema
### `npm run codegen`

This will look in the application to see `gql` expression, and generate
Typescript type based on your schema, configuration included in `apollo.config.js` 
