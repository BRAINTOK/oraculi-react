import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";
import {concatRouting, mainPage, routeData, routing, default_menu} from "../layouts/routing";
import getWidget, { initArea } from "../layouts/utilities/getWidget";
import translitterate from "../layouts/utilities/translitterate";
import LayoutIcon from "../layouts/LayoutIcon";
import MenuElementBtn from "./adminMenu/MenuElementBtn";
import MenuElementBtnGroup from "./adminMenu/MenuElementBtnGroup";
import MenuElementForm from "./adminMenu/MenuElementForm";
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


class AdminMenuState extends BasicState
{
	basic_state_data()
	{
		const menuDatas = routing();
		return {
			menuDatas, 
			current : "profile",
			curBtn	: menuDatas["profile"].length > 0 ? menuDatas["profile"][0].route : null,
			isLeftClosed: window.innerWidth < 760
		}
	}
	getRoute = () =>
	{
		return "admin-menu";
	}
	getContext(current, curBtn)
	{
		const menuDatas = this.state.menuDatas;
		// console.log(this.state.menuDatas);
		let boo;
		const currentContext = menuDatas[ current ].filter(e =>
		{
			if(e.children && Array.isArray(e.children) && e.children.length > 0)
			{
				let child = e.children.filter(ee => 
				{					
					if(ee.children && Array.isArray(ee.children) && ee.children.length > 0)
					{
						let grandChild = ee.children.filter(eee => 
						{
							return eee.route == curBtn;
						})[0];
						if(grandChild)	boo = grandChild;
					} 
					return ee.route == curBtn;
				})[0];
				if(child)	boo = child;
			}
			return e.route == curBtn;
		})[0] || {};
		return boo ? boo : currentContext;
	}
	render()
	{ 
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
		let i = 0, menus_selector = [], menuDatas = this.state.menuDatas;
		for( var route in menuDatas)
		{ 
			const def = default_menu().filter(e => e.id == route)[0];
			if("extended_routes" != route)
			{
				menus_selector.push(
					<option key={i} value={route}>
						{ (def ? def.title : route) + " | " + menuDatas[route].length }
					</option>
				);
			}
			i++;
		}
		const currentContext = this.getContext( this.state.current, this.state.curBtn );
		//console.log( menuDatas[this.state.current], this.state.curBtn );
		//console.log(currentContext);
		const currentMenu = menuDatas[this.state.current].length > 0
			?
			<MenuElementBtnGroup 
				items={ [ ...menuDatas[ this.state.current ] ] }
				curBtn={this.state.curBtn}
				onCurBtn={this.onCurBtn} 
				onNewBtn={this.onNewBtn}
			/>
			:
			<div className="alert alert-secondary">
				{__("No elements exist")}
			</div>
		return <div className="layout-state p-0">
			<div className="tutor-row menu-row">
				<div className={leftClass}>					
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
						{currentMenu}
					</div>
					{
							initArea( "admin-menu-left-aside", 
							{ ...this.props } 
						) 
					}
				</div>
				<div className={mainClass}>
					<div className="clapan-left" onClick={()=>this.setState({isLeftClosed:!this.state.isLeftClosed})}>
						<div className={"fas fa-caret-" + (!this.state.isLeftClosed ? "left" : "right")} />
					</div>
					<div className="menu-header-22 flex-centered">
						 <div className="input-group mb-3">
							<select className="form-control" onChange={this.onCurrentMenu}>
								{menus_selector}
							</select>
							<div className="input-group-append">
								<div className="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									{__("Actions")}
								</div>
								<div className="dropdown-menu p-0">
									<div className="dropdown-item p-3" onClick={this.onNewOpen} >
										{__("Insert new Menu")}
									</div> 
									<div className="dropdown-item p-3" onClick={this.onSaveMenus} >
										{__("Save all Menus")}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className=" p-4 "> 
						<MenuElementForm 
							{...currentContext} 							
							onChangeField={this.onChangeField}
							setContentType={this.setContentType}
							deleteRoute={this.deleteRoute}
						/>
					</div>
				</div>
				<div className="tutor-right-aside-2">
					{ 	
						initArea( 
							"admin-menu-right-aside", 
							{ ...this.props } 
						) 
					}
				</div>
			</div>
			
			
			<Dialog
				isOpen={this.state.isCreateOpen}
				onClose={this.onNewMenu} 
				title={__("Set child's title")}
			> 
				<div className="p-3">
					<div> 
						<input 
							type="text"
							value={this.state.childName}
							onChange={ evt => this.setState({childName:evt.currentTarget.value}) }
							className="form-control mt-2 mb-4"
							placeholder={__("Title")}
						/> 
						
						<div className="bp3-dialog-footer">
							<div className="bp3-dialog-footer-actions">
								<Button className="bp3-button" onClick={this.onCreateChild}>
									{__("Insert child")}
								</Button>
								<Button className="bp3-button bp3-intent-danger" icon="cross"  onClick={this.onNewOpen}>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
			
		</div>
	}
	onNewMenu = () =>
	{
		this.setState({isCreateOpen: !this.state.isCreateOpen});
	}
	onCurrentMenu = evt =>
	{
		const menuDatas = this.state.menuDatas; 
		const curBtn = menuDatas[evt.currentTarget.value][0];
		this.setState({ 
			current	: evt.currentTarget.value, 
			curBtn	: curBtn ? curBtn.route : null
		});
	}
	onCurBtn = id =>
	{
		//console.log(id);
		this.setState({ curBtn : id });
	}
	onNewBtn = data =>
	{
		let menuDatas = {...this.state.menuDatas};
		const route = translitterate("ru")
				.transform( data )
					.toLowerCase(); 
		menuDatas[this.state.current].push({
			title: data,
			route, 
			icon: "",
			html:"sample text"
		});
		this.setState({
			menuDatas,
			curBtn: route
		})
	}
	onNewOpen = () =>
	{
		this.setState({isCreateOpen:!this.state.isCreateOpen});
	}
	onCreateChild = () =>
	{
		if( !this.state.childName )
		{
			AppToaster.show({  
				intent: Intent.DANGER,
				icon: "tick", 
				message: "Insert not empty title" 
			});
			return;
		}
		let menuDatas = {...this.state.menuDatas};
		menuDatas[this.state.childName] = [];
		this.setState({
			isCreateOpen:false,
			menuDatas,
			current : this.state.childName
		});
	}
	onChangeField = data =>
	{
		console.log(data);
		let menuDatas = {...this.state.menuDatas}; 
		menuDatas[this.state.current].forEach(e =>
		{
			if(e.route == this.state.curBtn)
			{
				e[data.title] = data.field;
			}
		});
		let state = {menuDatas};
		if(data.title == "route")
			state.curBtn = data.field;
		this.setState(state);
	}
	setContentType = data =>
	{
		let menuDatas = {...this.state.menuDatas}; 
		menuDatas[this.state.current].forEach(e =>
		{
			if(e.route == this.state.curBtn)
			{
				delete e["component"];
				delete e["data_type"];
				delete e["html_source"];
				delete e["html"];
				e[data] = "--";
			}
		});
		let state = {menuDatas}; 
		this.setState(state);
	}
	deleteRoute = route =>
	{
		let menuDatas = {...this.state.menuDatas}; 
		let n;
		menuDatas[this.state.current].forEach((e,i) =>
		{
			if(e.route == route)
			{
				n = i;
			}
		});
		if(typeof n != "undefined")
		{
			menuDatas[this.state.current].splice(n, 1);
		}
		let state = {menuDatas}; 
		this.setState(state);
	}
	onSaveMenus = () =>
	{
		console.log(JSON.stringify( this.state.menuDatas ));
		AppToaster.show({  
			intent: Intent.SUCCESS,
			icon: "tick", 
			message: "Success saved menus" 
		});
	}
}

export default AdminMenuState;