import React from 'react';
import './App.module.less';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Layout, PageHeader} from "antd";
import LoginPage from "./pages/LoginPage/LoginPage";
import TodoPage from "./pages/TodoPage/TodoPage";

function App() {
  return (
    <div className="App">
        <Layout>
            <PageHeader title="Managing Your To-dos"/>
            <BrowserRouter>
                <Switch>
                    <Redirect from="/" to="/login" exact/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/todo" component={TodoPage}/>
                </Switch>
            </BrowserRouter>
        </Layout>
    </div>
  );
}

export default App;
