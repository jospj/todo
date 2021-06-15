import './todo-list.css'

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import TodoList from './todo-list';
import TodoListCompleted from './todo-list_completed';
import FieldDialog from './todo-list-dialog';
import FieldDeleteDialog from './todo-list-delete-dialog';

const Routes = ({ match }) => (
    <div className="todo-list">
        <Switch>
            <Route exact path={match.url} component={TodoList} />
            <Route path={`${match.url}/completed`}  component={TodoListCompleted} />
            <ModalRoute exact parentPath={match.url} path={`${match.url}/new`} component={FieldDialog} />
            <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={FieldDeleteDialog} />
            <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/edit`} component={FieldDialog} />
        </Switch>
    </div>
);

export default Routes;
