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
import GanreIcon from "./GanreIcon";
import WPFestSettings from "./utilities/WPFestSettings";


class FestMemberStroke extends Component
{
	render()
	{
		const { id, o, e, img, ganre, title, content, ganres } = this.props;
		
		const _ganres = ganres.map((ganre, index) => 
		{
			return <GanreIcon ganre={ganre} key={ganre.id} />;
		});
		const table = {height:"105px", overflow:"hidden",position:"relative",display:"table", padding:"5px 30px"};
		const cell = { display:"table-cell", verticalAlign:"middle"};
		const url = [1, 2].filter(e => e == WPFestSettings.status).length > 0
			?
			this.props.route + "/member/" + id + "/rait"
			:
			this.props.route + "/member/" + id
		return <div className="w-100 grey2"  
			>
				<div className="row">
					<div className='col-lg-3 col-md-5 col-sm-6 col-12' >
						<div 
							className="card-img" 
							style={{
								backgroundImage:"url(" + img + ")",
								backgroundColor:"transparent", 
								border:"0",	
								height:"100%"
							}} 
							data-mid={ id } 
						>
							<div className="card-id">{ o}</div>
							<div className='card-icons'>{ _ganres }</div>
						</div>							
					</div>
					<div 
						className='col-lg-4 col-md-3 col-sm-6 col-12' 
						style={table}
					>
						<Link to={url}>
							<h5 
								className="card-title" 
								style={cell} 
							>
								{title}
							</h5>
						</Link>			
					</div>	
					<div className='col-lg-5 col-md-4 col-sm-12 col-12' style={table}>
						<div style={cell} dangerouslySetInnerHTML={{ __html :content }} />
					</div>
				</div>
			</div>
	}
}
export default FestMemberStroke;