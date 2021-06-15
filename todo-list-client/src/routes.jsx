import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import TodoList from './modules/todo-list'
import Admin from './modules/administration';

const Routes = () => (
    <div className="view-routes">
        <Redirect from="/" to="todo" />
        <Route path="/todo" component={TodoList} />
        <Route path="/admin" component={Admin} />
    </div>
);

export default Routes;
