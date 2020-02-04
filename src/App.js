import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Login from "./pages/Login";
import MainLayout from "./pages/dashboard/MainLayout";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" name="Login Page" component={Login}/>
                <Route exact path="" name="dashboard" component={MainLayout}/>
                <Route path="/dashboard" name="dashboard" component={MainLayout}/>
            </Switch>
        </Router>
    );
}

export default App;
