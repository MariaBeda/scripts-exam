import React from 'react';
import {Switch, Route} from 'react-router-dom';
import '../containers/items/Items';
import Items from '../containers/items/Items';
import {Info} from '../containers/Info/Info'

export const Router = () => {
    return (
        <Switch>
            <Route path='/' exact>
                <Info />
            </Route>
            <Route path='/shops'>
                <Items />
            </Route>
        </Switch>
    )
};