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
            <Route exact path='/' component={Users}/>
            <Route exact path='/:idUser/' component={Albums}/>
            <Route path='/:idUser/:idAlbum/' component={Album}/>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));