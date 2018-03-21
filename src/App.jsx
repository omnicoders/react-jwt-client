import React, { Component } from 'react';
import Auth from './modules/Auth';
import Routes from './Routes';
import moment from 'moment';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      redirectHome: false,
      isLoggedIn: false,
      currentUser: {}
    };
    this.loginCurrentUser = this.loginCurrentUser.bind(this);
    this.logoutCurrentUser = this.logoutCurrentUser.bind(this);    
  }

  loginCurrentUser() {
    let config = {
        'headers': {
          'authorization': `Bearer ${Auth.getToken()}`,
        }
    };
    console.log(config);
    // https://omnicodersapi.codehesion.tech/api/dashboard
    axios.get('https://omnicodersapi.codehesion.tech/api/dashboard', config)
    .then(res => {
      let createdDate = new Date(res.data.user.createdAt);
      res.data.user['createdFromNow'] = moment(createdDate).fromNow();
      this.setState({
        isLoggedIn: true,
        currentUser: res.data.user
      });
    });
  }

  logoutCurrentUser() {
    Auth.deauthenticateUser();
    this.setState({
      redirectHome: true,
      isLoggedIn: false,
      currentUser: {}
    });
  }

  componentDidMount() {
    //Auth.deauthenticateUser();
    if(Auth.isUserAuthenticated()){
      this.loginCurrentUser()
    } 
  }

  render() {
    return (
      <div className="viewport-container">
        <Routes
          {...this.state}
          loginCurrentUser={this.loginCurrentUser}
          logoutCurrentUser={this.logoutCurrentUser}
        />    
      </div>
    );
  }
}

export default App;