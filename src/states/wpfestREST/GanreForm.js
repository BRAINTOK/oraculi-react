import React, {Component,Fragment} from "react";
import $ from "jquery";
import {compose} from "recompose";
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';
import LayoutIcon from "../../layouts/LayoutIcon";
import {__} from "../../layouts/utilities/i18n";
import {setCookie, getCookie, deleteCookie} from "./utilities/utils";
import _fetch from "./";
import Login from "./Login";
import GanreCheckBoxList from "./GanreCheckBoxList";
import User from "./utilities/User";
import kabuki from "../../assets/img/kabuki.svg";
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


class GanreForm extends Component
{
	state = {
		isDialogOpen: false,
		is:false,
		width:0,
		ganres: this.props.ganres || []
	} 
	componentDidMount()
	{
		//this.tick
	}
	componentWillUnmount()
	{
		clearTimeout(this.tick);
	}
	render()
	{
		console.log(this.state.ganres);
		
		
		const style ={width:50};
		return <Fragment>
			<div className="d-flex mt-auto">
				<div className="overflow-hidden transition-500" style={{ width: this.state.width, height:90}}>
					<GanreCheckBoxList
						ganres={ this.state.ganres }
						ignore={ [] }
						isLine={true}
						name="ganres"
						onGanre={this.onGanre}
					/>
				</div>
				<div className="indicator classic mt-auto" onClick={this.onCreateToggle}>			
					<div className="n1">
						{ __("Ganres") }
					</div>
					<div className="iconnn">
						<img src={ kabuki } alt='' style={style} />
					</div>
				</div>
			</div>
			<Dialog
				isOpen={this.state.isDialogOpen}
				title={__("Filter ganres")}
				onClose={this.onDialogToggle}
			>
				<div className="p-4">
					<GanreCheckBoxList
						ganres={ this.state.ganres }
						ignore={ [] }
						name="ganres"
						onGanre={this.onGanre}
					/>
				</div>
			</Dialog>
		</Fragment>
	}
	onGanre = ganres =>
	{
		this.props.onGanre(ganres);
		clearTimeout(this.tick);
		this.tick = setTimeout(() => {
			this.setState({width:0});
		}, 5000);  
	}	
	onSwitchToggle()
	{
		let width;
		clearTimeout(this.tick);
		if(this.state.width > 0 )
		{
			width = 0;
		}
		else
		{
			width = this.props.ganres.length * 92; 
			this.tick = setTimeout(() => {
				this.setState({width:0});
			}, 5000);
		} 
		this.setState({width});
	}	
	onDialogToggle=()=>
	{
		this.setState({ isDialogOpen: !this.state.isDialogOpen });
	}		
	onCreateToggle =() =>
	{
		if(window.innerWidth < 540)
		{
			this.onDialogToggle();
		}
		else
		{
			this.onSwitchToggle();
		}
	}
}
export default GanreForm;