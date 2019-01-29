import React from "react";

class RegisterConfirm extends React.Component {
  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h2 className="text-xs-center">Only one more step</h2>
              <p className="text-xs-center">
                We have sent you an email with a confirmation link.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterConfirm;
