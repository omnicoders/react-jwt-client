import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class SignupPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      user: {
        username: "",
        password: "",
        passwordConfirm: ""
      },
      errors: {},
    };
    this.changeUser = this.changeUser.bind(this);
    this.processForm = this.processForm.bind(this);
  }

  changeUser(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({
      user
    });    
  }

  processForm(e) {
    e.preventDefault();
    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `username=${username}&password=${password}`;
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'https://omnicodersapi.codehesion.tech/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      console.log(xhr.status)
      if(xhr.status === 200){
        localStorage.setItem('successMessage', xhr.response.message);
        this.setState({
          errors: {},
          redirect: true
        });
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  render() {
    if(this.state.redirect){ return( <Redirect to="/login" /> ) }
    return (
      <div className="container-fluid">
        
        <div className="row mt-3">
          <div className="col col-md-9 col-lg-7 ml-md-auto mr-md-auto text-center">
            <div className="card">
              <div className="card-header bg-dark text-light">
                <h4 className="card-title mb-0">Sign Up</h4>
              </div>
              <div className="card-body">
                <p className="card-text">
                  Please fill out the fields below to register for a new account.
                </p>
                <form onSubmit={ this.processForm }>
                  {this.state.errors.summary && <div className="alert alert-danger">{ this.state.errors.summary }</div>}
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="username"
                      value={this.state.user.username}
                      onChange={this.changeUser}
                    />
                    {this.state.errors.username && <small className="text-danger">{this.state.errors.username}</small>}
                  </div>
                  <div className="form-group">  
                    <label htmlFor="password">Password</label>
                    <input 
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="password"
                      value={this.state.user.password}
                      onChange={this.changeUser}                      
                    />
                    {this.state.errors.password && <small className="text-danger">{this.state.errors.password}</small>}
                  </div>
                  <div className="form-group">  
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input 
                      type="password"
                      className="form-control"
                      name="passwordConfirm"
                      placeholder="confirm password"
                      value={this.state.user.passwordConfirm}
                      onChange={this.changeUser}                      
                    />
                    { ( this.state.user.password.length > 0 && this.state.user.passwordConfirm.length > 0) ? (
                        <div>
                          { (this.state.user.password === this.state.user.passwordConfirm) ? (
                            <small className="text-success">Password Match</small>
                          ) : (
                            <small className="text-danger">Password Does Not Match</small>
                          )}                          
                        </div>  
                      ) : null }
                  </div>
                  {(
                    this.state.user.username.length > 0 && 
                    this.state.user.password.length > 0 &&
                    this.state.user.passwordConfirm.length > 0 &&
                    this.state.user.password === this.state.user.passwordConfirm
                  ) ? (
                    <div className="form-group text-center">
                      <button type="submit" className="btn btn-success mt-3">Submit</button>
                    </div>
                  ) : null} 

                </form>
              </div>
              <ul className="list-group list-group-flush">
                <Link 
                  className="list-group-item list-group-item-action bg-primary text-light"
                  to="/login"
                >Have An Account? Login</Link>
              </ul>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default SignupPage;