import React, {Fragment, useEffect} from 'react'; 
import './App.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import login from './components/auth/login';
import Alert from './components/layouts/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/p-forms/CreateProfile';
import Addexperience from './components/p-forms/Addexperience';
import Addeducation from './components/p-forms/Addeducation';
import Editprofile from './components/p-forms/Editprofile';
import Register from './components/auth/Register';
import Profiles from './components/profiles/Profiles';
import Profile from './components/Profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'
//Redux
import { Provider } from 'react-redux';
import store from './store';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

var App = () => { 
  
  useEffect( () =>{
    store.dispatch(loadUser());
  }, [])

  return (
  <Provider store={store}>
    <Router>
      <Fragment>
      <Navbar />
      <Route exact path ='/' component ={Landing} />
      <section className="container">
        <Alert />
      <Switch>
      <Route exact path ='/Register' component ={Register} />
      <Route exact path ='/login' component ={login} />
      <Route exact path ='/profiles' component ={Profiles} />
      <Route exact path ='/profile/:id' component ={Profile} />
      <PrivateRoute exact path ='/posts' component ={Posts} />
      <PrivateRoute exact path ='/post/:id' component ={Post} />
      <PrivateRoute exact path ='/dashboard' component ={Dashboard} />
      <PrivateRoute exact path ='/createProfile' component ={CreateProfile} />
      <PrivateRoute exact path ='/editprofile' component ={Editprofile} />
      <PrivateRoute exact path ='/addexperience' component ={Addexperience} />
      <PrivateRoute exact path ='/addeducation' component ={Addeducation} />

      </Switch>
      </section>
     </Fragment>
    </Router> 
    </Provider>
)};

export default App;
