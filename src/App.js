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
            <Route path="doantn-frontend/new-device" component={NewDevice} />
            <Route path="doantn-frontend/thongke/room" exact component={DeviceRoomTable} />
            <Route path="doantn-frontend/thongke/liquid" exact component={LiquidationTable} />
            <Route path="doantn-frontend/thongke/baotri" exact component={MaintenanceTable} />
            <Route path="doantn-frontend/update-password" exact component={UpdatePassword} />
            <Route path="doantn-frontend/update-user-detail" exact component={UserDetail} />
            <Route path="doantn-frontend/users" exact component={AdminPanel} />
            <Route path="doantn-frontend/products" exact component={DeviceManager} />
            <Route path="doantn-frontend/" exact component={DashBoard} />
          </Aux> : this.props.role === "manager" ? <Aux>
            <Route path="/new-device" component={NewDevice} />
            <Route path="/products" exact component={DeviceManager} />
            <Redirect to="/" />
          </Aux> : <Aux>
                <Route path="/products" exact component={DeviceManager} />
                <Redirect to="/" />
              </Aux>}
        </Switch>
      )
    } else {
      routes =(
        <Switch>
          <Route path="/doantn-frontend/login" exact component={Login} />
          <Route path="/doantn-frontend/" component={DeviceManager} />
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
