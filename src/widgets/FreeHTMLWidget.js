import React, {Fragment, Component} from "react";
import {__} from "../layouts/utilities/i18n";
import Loading from "../layouts/utilities/Loading";
import { Button, ButtonGroup, Intent } from "@blueprintjs/core";
import SubFilterPlaces from "./_MainFilter/SubFilterPlaces";
import $ from "jquery";
import {get, exec_route} from "../layouts/routing";
import { NavLink } from 'react-router-dom'; 

class FreeHTMLWidget extends Component
{
	render()
	{ 
		return <div className={ this.props.container_class} dangerouslySetInnerHTML={{ __html: this.props.html}} >
			
		</div>
	}
}
export default FreeHTMLWidget;