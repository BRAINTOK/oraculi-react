import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";
import axios from 'axios';

class HTMLSourceState extends BasicState
{
	
	getRoute = route =>
	{
		axios.get( this.props.html_source )
			.then( response => 
			{
				let text = response.data;
				var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
				while (SCRIPT_REGEX.test(text)) 
				{
					text = text.replace(SCRIPT_REGEX, "");
				}
				this.setState({html: <div dangerouslySetInnerHTML={{ __html: text }} />});
			});
		return this.props.route;
	}
}
export default HTMLSourceState;