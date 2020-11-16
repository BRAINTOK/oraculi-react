import React, {Component, Fragment} from "react"; 
import { NavLink, Link } from 'react-router-dom';
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";
import getWidgets from "../../layouts/utilities/getWidgets";
import {widgets} from "../../layouts/template";
import Scalars from "./Scalars";
import {concatRouting, mainPage, routeData, routing} from "../../layouts/routing";
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


class Widget extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			isOpen : false,
			...this.props
		}
	}
	componentWillReceiveProps ( nextProps )
	{ 
		 this.setState(nextProps)
	}
	render()
	{
		const {component} = this.state.item;
		const _widget = widgets()[component] || { title : component };
		const _fields = _widget.fields
			?
			_widget.fields.map((e, i) =>
			{
				return <Scalars {...this.state.item} {...e} key={i} onChange={this.onChange}/>
			})
			:
			null;
		return <div className="admin-widget-container min-width-400">
			<div className="admin-widget-header " onClick={this.onOpen}>
				{__(_widget.title)} 
				<div className="admin-widget-remove">
					<div className="btn btn-light  btn-sm mr-1">
						<i className={!this.state.isOpen ? "fas fa-caret-right" : "fas fa-caret-down"}></i>
					</div>
					
				</div>
			</div>
			<div className={this.state.isOpen ? "admin-widget-body" : "hidden" } >
				{_fields}	
				<div className="d-flex mt-2">
					<div className="btn btn-light btn-sm" onClick={this.onUpdate}>
						{__("Update")} 
					</div>
					<div className="btn btn-danger btn-sm" onClick={this.onRemoved}>
						{__("Remove")} 
					</div>
				</div>
			</div>
			<div className="admin-widget-footer">
			
			</div>
		</div>
	}
	onChange = (type, value) =>
	{
		console.log(type, value);
		let item = {...this.state.item};
		item[type] = value;
		this.setState({item});
	}
	onUpdate = () =>
	{
		this.props.onUpdate(this.state.item, this.state.n);
	}
	onOpen = () =>
	{
		this.setState({ isOpen:!this.state.isOpen });
	}
	onRemoved = () =>
	{
		this.props.onRemoved(this.props.item.component);
	}
}
export default Widget;