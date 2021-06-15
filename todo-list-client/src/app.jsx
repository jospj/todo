import './app.css'

import React, { Component } from 'react'
import { Card } from 'reactstrap'
import { HashRouter as Router } from 'react-router-dom'
import { ModalContainer } from 'react-router-modal'

import Header from './shared/layout/header/header'
import Footer from './shared/layout/footer/footer'
import AppRoutes from './routes'

class App extends Component {

  render() {
      const paddingTop = '60px';
      return (
          <Router>
              <div className="app todo" style={{ paddingTop }}>
                  <Header/>
                  <div className="container-fluid view-container page" id="app-view-container">
                      <Card className="app--container">
                          <AppRoutes/>
                      </Card>
                      <Footer/>
                  </div>
                  <ModalContainer/>
              </div>
          </Router>
    );
  }
}

export default App;
