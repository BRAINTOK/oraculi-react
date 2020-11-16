import React, { Component, Fragment } from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from "react-router-dom";
import { __ } from "../layouts/utilities/i18n";

class RobokassaFailureState extends BasicState {
  myState = () => {
    return (
      <div className='row text-center'>
        <div className='col-12 my-4 text-danger'>
          При оплате произошла ошибка!!!
        </div>
        <div className='col-12 my-4'>
          <Link className='btn btn-danger btn-sm' to='/'>
            {__("Return to main page")}
          </Link>
        </div>
      </div>
    );
  };
  getRoute = route => {
    return this.props.route;
  };
}
export default RobokassaFailureState;
