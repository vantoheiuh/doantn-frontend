import React, { Component } from 'react';
import classes from './Menu.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Aux from '../../hoc/Aux/Aux';
class Menu extends Component {
    render() {
        return (
            <header className={classes.Menu}>
                <nav>
                    <ul>
                        <div>
                            {this.props.isAuthenticate ?
                                <Aux>
                                    {this.props.role === "admin" ? <Aux>
                                        <li>
                                            <NavLink to="/" exact activeClassName={classes.Active}>HOME</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/new-device" exact activeClassName={classes.Active}>NEW DEVICE</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/statistical/chart" exact activeClassName={classes.Active}>STATISTICAL</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/admin" exact activeClassName={classes.Active}>ADMIN PANEL</NavLink>
                                        </li>
                                    </Aux> : this.props.role === "manager" ? <Aux>
                                        <li>
                                            <NavLink to="/" exact activeClassName={classes.Active}>HOME</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/new-device" exact activeClassName={classes.Active}>NEW DEVICE</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/statistical/chart" exact activeClassName={classes.Active}>STATISTICAL</NavLink>
                                        </li>
                                    </Aux> : <Aux>
                                                <li>
                                                    <NavLink to="/" exact activeClassName={classes.Active}>HOME</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/statistical/chart" exact activeClassName={classes.Active}>STATISTICAL</NavLink>
                                                </li>
                                            </Aux>}
                                </Aux>
                                : <li>
                                    <NavLink to="/" exact activeClassName={classes.Active}>HOME</NavLink>
                                </li>
                            }
                        </div>
                        <div>
                            {!this.props.isAuthenticate
                                ? <li>
                                    <NavLink to="/login" exact activeClassName={classes.Active}>LOGIN</NavLink>
                                </li> : <li>
                                    <NavLink to="/logout" exact activeClassName={classes.Active}>LOGOUT</NavLink>
                                </li>}
                        </div>
                    </ul>
                </nav>
            </header>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticate: state.auth.token !== null,
        role: state.auth.role
    }
}

export default connect(mapStateToProps)(Menu);