import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";

class HTMLState extends BasicState
{
	
	getRoute = route =>
	{
		return this.props.route;
	}
}
export default HTMLState;