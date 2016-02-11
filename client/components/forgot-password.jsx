ForgotPassword = React.createClass({
  handleSubmit( event ) {
    event.preventDefault();
    Accounts.forgotPassword(this.refs.emailAddress.value);
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h2 className="page-header text-center">Forgot Password</h2>

          <form id="recover-password" className="recover-password" onSubmit={this.handleSubmit}>
            <p className="alert alert-info">Enter your email address below to receive a link to reset your password.</p>

            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input type="email" name="emailAddress" ref="emailAddress" className="form-control" placeholder="Email Address" />
            </div>

            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Forgot Password" />
            </div>
          </form>

        </div>
      </div>
    );
  }
});
