import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SwaggerUi, {presets} from 'swagger-ui';

class SwaggerUI extends Component {

    componentDidMount() {
        SwaggerUi({
            dom_id: '#swaggerContainer',
            url: this.props.url,
            spec: this.props.spec,
            presets: [presets.apis]
        });
    }

    render() {
        return (
            <div id="swaggerContainer" className="admin-panel--swagger"/>
        );
    }
}

SwaggerUI.propTypes = {
    url: PropTypes.string,
    spec: PropTypes.object
};

SwaggerUI.defaultProps = {
    url: `http://192.168.102.206:8000/v2/api-docs`
};

export default SwaggerUI;