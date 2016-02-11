Login = React.createClass({
  propTypes: {
    forgotPasswordRoute: React.PropTypes.string,
    registerRoute: React.PropTypes.string,
    facebookLogin: React.PropTypes.string,
    isRegister: React.PropTypes.string
  },
  defaultProps(){
    return{
      isRegister: "true",
      facebookLogin: "true",
      forgotPasswordRoute: "/forgot-password",
      registerRoute: "/register"
    }
  },
  handleSubmit(event) {
    event.preventDefault();
    Meteor.loginWithPassword(
      this.refs.emailAddress.value,
      this.refs.password.value,
      function(err, result){
        if(err){
          console.log(err);
        }else{
          FlowRouter.go("/");
        }
      }
    );
  },
  handleFacebookLogin(event) {
    Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function (err) {
      if (err)
        console.log(err.reason);
    });
  },
  facebookLogin(){
    if(this.props.facebookLogin == "false")
      return;

    return (
      <div className="at-oauth">
        <button className="btn at-social-btn" id="at-facebook" name="facebook" onClick={this.handleFacebookLogin}>
          <i className="fa fa-facebook"></i> Sign In with Facebook
        </button>
      </div>
    );
  },
  isRegister(){
    if(this.props.isRegister == "true")
        return <p>Dont have an account? <a href={this.props.registerRoute}>Sign Up</a>.</p>;
    return;
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h2 className="page-header text-center">Login</h2>

          {this.facebookLogin()}

          <form id="login" className="login" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input type="email" name="emailAddress" ref="emailAddress" className="form-control" placeholder="Email Address" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" ref="password" className="form-control" placeholder="Password" onClick={this.handleSubmit} />
            </div>

            <div className="form-group">
              <a href={this.props.forgotPasswordRoute}>Forgot Password?</a>
             </div>

            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>

          </form>
        </div>
      </div>
    );
  }
});
