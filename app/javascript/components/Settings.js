import ListErrors from "./ListErrors";
import React from "react";
import agent from "../agent";
import { connect } from "react-redux";
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from "../constants/actionTypes";

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      image: "",
      username: "",
      email: ""
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      user.id = this.props.currentUser.id;

      this.props.onSubmitForm(user);
    };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || "",
        username: this.props.currentUser.username || "",
        email: this.props.currentUser.email
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(
        Object.assign({}, this.state, {
          image: nextProps.currentUser.image || "",
          username: nextProps.currentUser.username,
          email: nextProps.currentUser.email
        })
      );
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control "
              type="text"
              placeholder="URL till profilbild"
              value={this.state.image}
              onChange={this.updateState("image")}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Användarnamn"
              value={this.state.username}
              onChange={this.updateState("username")}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.updateState("email")}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={this.state.inProgress}
          >
            Uppdatera inställningar
          </button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT, payload: agent.Auth.logout() }),
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.User.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-page mt-5">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h2 className="text-xs-center">Inställningar</h2>

              <ListErrors errors={this.props.errors} />

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm}
              />

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.props.onClickLogout}
              >
                Eller klicka här för att logga ut
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
