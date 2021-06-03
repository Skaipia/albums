import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from "./App";

import Users from "./components/Users";
import Albums from "./components/Albums";
import Album from "./components/Album";

ReactDOM.render((
<BrowserRouter>
    <App>
        <Switch>
            <Route exact path='/' component={Users} />
            <Route path='/:id/' component={Albums} />
            <Route path='/:id/:album/' component={Album} />
        </Switch>
    </App>
</BrowserRouter>
), document.getElementById('root'));