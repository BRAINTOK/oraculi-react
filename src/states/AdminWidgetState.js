import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";
import LayoutIcon from "../layouts/LayoutIcon";
import getWidget, { initArea, widgetAreas } from "../layouts/utilities/getWidget";
import getWidgets from "../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing} from "../layouts/routing";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
import {AppToaster} from "../layouts/utilities/blueUtils";
import Widgets from "./adminWidget/Widgets";

class AdminWidgetState extends BasicState
{
	basic_state_data()
	{  
		return {
			widgetAreas: widgetAreas(), 
			currArea : "layout-left",
			curBtn	: null,
			isLeftClosed: window.innerWidth < 760
		}
	}
	getRoute = () =>
	{
		return "admin-widgets";
	}
	onCurrArea = evt =>
	{
		const currArea = evt.currentTarget.getAttribute("area");
		this.setState({ currArea, collapseIsOpen: false });
	}
	onCollapseOpen = () =>
	{
		this.setState({ collapseIsOpen: !this.state.collapseIsOpen });
	}
	onUpdate = area =>
	{
		let widgetAreas = {...this.state.widgetAreas};
		widgetAreas[this.state.currArea].area = area;
		this.setState({ widgetAreas },
			() => {
				console.log(JSON.stringify( widgetAreas ));
				AppToaster.show({  
					intent: Intent.SUCCESS,
					icon: "tick", 
					message: "Success saved widget areas" 
				});
			}
		);
	}
	render()
	{
		let i = 0, menus_selector = [];
		const curWidgets = this.state.widgetAreas[this.state.currArea]; 
		for( var widget in this.state.widgetAreas )
		{ 
			const className = widget == this.state.currArea ? "menu-elem active" : "menu-elem";
			menus_selector.push(
				<div key={i} area={widget} onClick={this.onCurrArea} className={className} >
					{ __( this.state.widgetAreas[widget].title ) }
					<span className="small ml-4 opacity_75">
						{ __( this.state.widgetAreas[widget].description ) }  
					</span>
					<div className="members-col">
						{ this.state.widgetAreas[widget].area.length }
					</div>
				</div>
			);
			i++;
		} 
		const leftClass = this.state.isLeftClosed
			?
			"tutor-left-aside-2 menu-aside closed"
			:
			"tutor-left-aside-2 menu-aside"
		const mainClass = this.state.isLeftClosed
			?
			"tutor-main-2 pr-0 opened"
			:
			"tutor-main-2 pr-0";
		const canClass = this.state.canUpdate
			?
			"btn btn-danger"
			:
			"hidden"
			
		return <div className="layout-state p-0">
			<div className="tutor-row menu-row">
				<div className={leftClass}>	
					<div>
						<div className="layout-state-head menu-header-22">
							<LayoutIcon
								isSVG={ true } 
								src={ this.state.route.icon } 
								className="layout-state-logo "
							/>
							<div className="layout-state-title">
								{ __( this.state.route.title ) }
							</div>
						</div>
						<div className="small mx-3 mb-3 text-secondary">					
							{this.props.description}
						</div>
						<div className="tutor-menu">
							<div className={canClass} onClick={this.onSave}>
								{ __( "Update all widget areas" ) }
							</div>
						</div>
						{
								initArea( "admin-widget-left-aside", 
								{ ...this.props } 
							) 
						}
						
					</div>
				</div>
				<div className={mainClass}> 
					<div className="clapan-left" onClick={()=>this.setState({isLeftClosed:!this.state.isLeftClosed})}>
						<div className={"fas fa-caret-" + (!this.state.isLeftClosed ? "left" : "right")} />
					</div>
					<div className="menu-header-22 flex-centered pointer arrow-down" onClick={this.onCollapseOpen}>
						 <div className="w-100">
							<div className="title lead my-2 text-center ">
								<span className="menu-header-22-comment">
									{__("Current area: ")}
								</span>
								<span>
									{this.state.widgetAreas[ this.state.currArea ].title}
								</span>
							</div>
							<div className=" text-center small">
								{this.state.widgetAreas[ this.state.currArea ].description}
							</div>
						</div>
					</div>
					<Collapse 
						isOpen={this.state.collapseIsOpen} 
						transitionDuration={400} 
						className="w-100 tutor-menu px-3 pb-3"
					>
						{menus_selector}
					</Collapse>
					<div className="layout-center w-100">
						<Widgets 
							{...curWidgets} 
							currArea={this.state.currArea}
							onUpdate={this.onUpdate}
						/>
					</div>
				</div>
				<div className="tutor-right-aside-2">
					{ 	
						initArea( 
							"admin-menu-widget-aside", 
							{ ...this.props } 
						) 
					}
				</div>
			</div>
		</div>
	}
}
export default AdminWidgetState;