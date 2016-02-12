Accounts.Register = React.createClass({
  getInitialState(){
    return{
      loginRoute: Accounts.config.loginRoute
    }
  },
  handleSubmit( event ) {
    Meteor.call("addUser", {
      email: this.refs.emailAddress.value,
      password: this.refs.password.value
    }, function(err){
      if(err){
        alert(err.message);
      }else{
        Meteor.loginWithPassword(
          this.refs.emailAddress.value,
          this.refs.password.value,
          function(err){
            if(err){
              console.log(err);
            }else{
              FlowRouter.go("/");
            }
          }
        );

      }
    });
  },
  handleFacebookRegister(event){
    Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function (err) {
      if (err)
        console.log(err.reason);
    });
  },
  registerWithFacebook(){
    if(ServiceConfiguration.configurations.find({service: "facebook"}).count() > 0){
      return (
        <div className="at-oauth">
          <button className="btn at-social-btn" id="at-facebook" name="facebook" onClick={this.handleFacebookRegister}>
            <i className="fa fa-facebook"></i> Register with Facebook
          </button>
        </div>
      );
    }else{
      return;
    }
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">

          <h2 className="page-header text-center">Register</h2>

          {this.registerWithFacebook()}

          <form id="register" className="signup" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input type="email" name="emailAddress" ref="emailAddress" className="form-control" placeholder="Email Address" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" ref="password" className="form-control" placeholder="Password" />
            </div>

            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Sign Up" />
            </div>

          </form>
          <p>Already have an account? <a href={this.state.loginRoute}>Log In</a>.</p>
        </div>
      </div>
    );
  }
});
