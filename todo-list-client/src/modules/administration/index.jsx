import './admin.css'

import * as React from 'react';
import { Route } from 'react-router-dom';

import Docs from './docs/docs';

const Routes = ({ match }) => (
    <div className="admin-panel">
        <Route exact path={`${match.url}/docs`} component={Docs} />
    </div>
);

export default Routes;
