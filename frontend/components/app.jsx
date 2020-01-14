import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  NavLink,
  HashRouter
} from 'react-router-dom';



import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SignupFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import Splash from './static/splash';
import Dashboard from './dashboard/dashboard';
import Modal from './modal/modal';
import GreetingContainer from './greeting/greeting_container';


class App extends React.Component{
    render(){

        return( 
            <div className="wrapper">
                <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet" />
                    <Modal />
                    {/* <GreetingContainer /> */}
                    <Switch>
               
                        {/* <ProtectedRoute exact path="/benches/new" component={BenchFormContainer} /> */}
                        {/* <Route path="/benches/:benchId" component={BenchShowContainer} /> */}
                        <ProtectedRoute path='/dashboard' component={Dashboard} />
                        <AuthRoute path="/login" component={LogInFormContainer} /> 
                        <AuthRoute path="/signup" component={SignupFormContainer} /> 
                        <AuthRoute path="/" component={Splash} />
                    </Switch>
            </div>
        );         
    }
}

export default App;
