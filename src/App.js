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
import Login from './components/Authenticate/Login/Login';
import Logout from './components/Authenticate/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Aux from './hoc/Auxi/Auxi';
import MenuBar from './components/MenuBar/MenuBar';
import DeviceRoomTable from './components/Statistical/DeviceRoom/DeviceRoomTable';
import LiquidationTable from './components/Statistical/LiquidationTable//LiquidationTable';
import MaintenanceTable from './components/Statistical/MaintenanceTable/MaintenanceTable';
import UpdatePassword from './components/Authenticate/UpdatePassword/UpdatePassword';
import DashBoard from './components/DashBoard/DashBoard';
import UserDetail from './components/Authenticate/UserDetail/UserDetail';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }
  render() {
    let routes = null;

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          {this.props.role === "admin" ? <Aux>
            <Route path="/new-device" component={NewDevice} />
            <Route path="/thongke/room" component={DeviceRoomTable} />
            <Route path="/thongke/liquid" component={LiquidationTable} />
            <Route path="/thongke/baotri" component={MaintenanceTable} />
            <Route path="/update-password" component={UpdatePassword} />
            <Route path="/update-user-detail" component={UserDetail} />
            <Route path="/users" component={AdminPanel} />
            <Route path="/products" exact component={DeviceManager} />
            <Route path="/" exact component={DashBoard} />
            <Redirect to="/" />
          </Aux> : this.props.role === "manager" ? <Aux>
            <Route path="/new-device" component={NewDevice} />
            <Route path="/products" component={DeviceManager} />
            <Route path="/update-password" component={UpdatePassword} />
            <Route path="/update-user-detail" component={UserDetail} />
            <Redirect to="/" />
          </Aux> : <Aux>
                <Route path="/products" exact component={DeviceManager} />
                <Route path="/update-password" exact component={UpdatePassword} />
                <Route path="/update-user-detail" exact component={UserDetail} />
                <Route path="/" exact component={DashBoard} />
                <Redirect to="/" />
              </Aux>}
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/login" exact component={Login} />
          <Redirect to="/login" />
        </Switch>
      )
    }
    return (
      <div>
        <Router>
          <Menu />
          {this.props.isAuthenticated ? <MenuBar /> : null}
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
