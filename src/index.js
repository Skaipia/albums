import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import styles from "./assets/styles/main.css";

import Users from "./components/Users";
import Albums from "./components/Albums";
import Album from "./components/Album";

ReactDOM.render((
<BrowserRouter>
        <Switch>
            <Route exact path='/' component={Users} />
            <Route path='/:id/' component={Albums} />
            <Route path='/:id/:album/' component={Album} />
        </Switch>
</BrowserRouter>
), document.getElementById('root'));