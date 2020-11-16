import React, {Component, Fragmnent} from "react";
import _fetch from "./";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";
import getWidgets from "../../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing} from "../../layouts/routing";
import empty from '../../assets/img/empty.png';
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
import {AppToaster} from "../../layouts/utilities/blueUtils";
import WPFestSettings from "./utilities/WPFestSettings";


class FestMemberBtn extends Component
{
	render()
	{
		const {id, o, e, img, cl} = this.props;
		const url = [1, 2].filter(e => e == WPFestSettings.status).length > 0
			?
			this.props.route + "/member/" + id + "/rait"
			:
			this.props.route + "/member/" + id
		return <div className='col-xl-1_8 col-lg-2 col-md-3 col-sm-4 col-6' key={id}>
			<Link to={url}>
				<div className={ 'member ' +cl }>
					<img src={empty} className='empty' alt=""/>
					<div className='member_title'>
						{o}
					</div>
					<div className='xperts ' data-cl={ e===0 ? 'hidden' : ''}>
						{e}
					</div>
				</div>
			</Link>
		</div>
	}
}
export default FestMemberBtn;