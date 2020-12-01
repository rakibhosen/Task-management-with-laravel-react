// import React from 'react';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Container from 'react-bootstrap/Container'
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Project from './pages/projects/Project';
import ProjectCreate from './pages/projects/ProjectCreate';
import { PUBLIC_URL } from '../constant';
import ProjectView from './pages/projects/ProjectView';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

class App extends Component{

  render(){
  return(
    <div>
    <Router>
      
     <Header></Header>

 
      <div>

        <Container className="pt-5">
          
        <Switch>
          <Route path={`${PUBLIC_URL}about`}
           exact={true} 
           component={About}
          />

          <Route path={`${PUBLIC_URL}contact`} 
           exact={true} 
           component={Contact} 
           />
          <Route path={`${PUBLIC_URL}projects/view/:id`} 
          exact={true} 
          component={ProjectView} 
          />

          <Route path={`${PUBLIC_URL}projects/create`} 
          exact={true} 
          component={ProjectCreate} 
          />

          <Route path={`${PUBLIC_URL}projects`} 
          exact={true} 
          component={Project} 
          />
          
          <Route path={`${PUBLIC_URL}`} 
          exact={true} 
          component={Home} 
          /> 

          <Route path={`${PUBLIC_URL}register`} 
          exact={true} 
          component={Register} 
          /> 

         <Route path={`${PUBLIC_URL}login`} 
          exact={true} 
          component={Login} 
          /> 
        </Switch>
          
        <Footer></Footer>
        </Container>

      </div>
   
    
    </Router>

    </div>
  );
}
}



export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
