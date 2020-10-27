import React, { Component } from 'react';
import DeviceManager from './DeviceManager/DeviceManager';
import NewDevice from './components/NewDevice/NewDevice';
import AdminPanel from './components/Authenticate/AdminPanel/AdminPanel';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Menu from './components/Menu/Menu';
import NotFound from './components/NotFound/NotFound';
import Statistical from './components/Statistical/Statistical';
import Login from './components/Authenticate/Login/Login';
import Logout from './components/Authenticate/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Aux from './hoc/Aux/Aux';
import MenuBar from './components/MenuBar/MenuBar';
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" component={DeviceManager} />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          {this.props.role === "admin" ? <Aux>
            <Route path="/new-device" component={NewDevice} />
            <Route path="/statistical/chart" component={Statistical} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/" exact component={DeviceManager} />
            <Redirect to="/" />
          </Aux> : this.props.role === "manager" ? <Aux>
            <Route path="/statistical/chart" component={Statistical} />
            <Route path="/new-device" component={NewDevice} />
            <Route path="/" exact component={DeviceManager} />
            <Redirect to="/" />
          </Aux> : <Aux>
                <Route path="/statistical/chart" component={Statistical} />
                <Route path="/" exact component={DeviceManager} />
                <Redirect to="/" />
              </Aux>}
        </Switch>
      )
    }
    return (
      <div>
        <Router>
          <Menu />
          <MenuBar />
          {routes}
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    role: state.auth.role
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
