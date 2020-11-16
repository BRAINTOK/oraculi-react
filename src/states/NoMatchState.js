import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";
import {Router, Route, Switch, Redirect, withRouter} from "react-router";

class NoMatchState extends BasicState
{
	myState = () =>
	{
		console.log(this.props);
		return <div className="row text-center">
			<div className="col-12 my-4">
				<div  className="_404" />
			</div>
			<div className="col-12 lead">
				{__("this page no searched")}
			</div>
			<div className="col-12 my-4">
				<Link 
					className="btn btn-danger btn-sm"
					to="/"
				>
					{__("Return to main page")}
				</Link>
			</div>
		</div>
	}
	getRoute = () =>
	{
		return "404";
	}
}



export default  withRouter(NoMatchState);