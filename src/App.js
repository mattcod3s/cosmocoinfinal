import React from 'react';
import HomePage from './Components/Pages/HomePage/HomePage';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import LoginPage from './Components/Pages/LoginPage/LoginPage';
import {Route,  Switch, /*useLocation, Link,*/ BrowserRouter as Router} from 'react-router-dom';

import './AppStyles.scss';
import './reset.css';
const App = () => {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/dashboard" exact component={Dashboard}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
