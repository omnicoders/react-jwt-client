import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ProfilePage extends Component {

  render() {
    if(this.props.redirectHome){ return( <Redirect to="/" /> ) }
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col col-md-9 col-lg-7 ml-md-auto mr-md-auto text-center">
            <div className="card">
              <div className="card-header bg-dark text-light">
                {(Object.keys(this.props.currentUser).length > 0) ? (
                  <h4 className="card-title mb-0">{this.props.currentUser.username}</h4>
                ) : (
                  <h4 className="card-title mb-0">Loading User...</h4>
                )}  
              </div>
              {(Object.keys(this.props.currentUser).length > 0) ? (
                <div>
                  <div className="card-body">
                    
                    <p className="card-text">
                      joined { this.props.currentUser.createdFromNow }
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    { this.props.isLoggedIn ? (
                      <button
                        className="list-group-item list-group-item-action bg-secondary text-light"
                        onClick={ this.props.logoutCurrentUser }
                      >Logout</button>
                    ) : null }
                  </ul>
                </div>
              ) : null }  
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default ProfilePage;
