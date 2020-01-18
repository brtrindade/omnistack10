import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/Main';
import DevEdit from './pages/DevEdit';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/devs/:id" exact component={DevEdit} />
            </Switch>
        </BrowserRouter>
    );
}
