import React, {Component, Fragment} from "react";
import { NavLink } from 'react-router-dom';
import { Popover, Menu, MenuDivider, MenuItem,Button, Intent } from "@blueprintjs/core";
import {compose} from "recompose";
import {withRouter} from "react-router";

import {__} from "../../layouts/utilities/i18n";
import {mainMenu} from "../../layouts/routing";
import {isCapability} from "../../layouts/user";
import LayoutIcon from "../../layouts/LayoutIcon";

class LayoutHeaderMenu extends Component
{
	render()
	{
		const mainMenu1 = mainMenu().map((e, i) =>
		{
			const isRole = isCapability(e.capability, this.props.user);
			if(e.children && e.children.length > 0)
			{
				let podmenu = [];
				const children = e.children.map((ee, ii) =>
				{
					const rt = "/" + e.route + "/" + ee.route;
					//console.log( this.props.location.pathname, rt);
					podmenu.push( <div 
						className={ (this.props.location.pathname == rt ? "active " : "") + "podmenu" } 
						key={ii}
						route={ rt }
						onClick={this.onRoute}
					>
						{ __(ee.title) }
					</div>);
					return <MenuItem 
						key={ii}
						text={ __(ee.title) } 	
						route={ rt }
						onClick={this.onRoute}
						active={ this.props.location.pathname == rt }
					/>
				});
				if(isRole) return "";
				return <Fragment key={i + 1000}>
					<Popover
						popoverClassName="p-0 menu-popover"
						className="p-0"
						position={"bottom-left"}
						usePortal={false}
						enforceFocus={true}
						interactionKind={"hover"}
						content={<Menu key="menu">{children}</Menu>}
					> 
						<NavLink 
							to={{
								pathname: "/" + e.route
							}}
							exact 
							route={ e.route }
							onClick={this.onRoute}
							activeClassName={"active"}
						>
							<span>
								{__(e.title)}
								<span className="ml-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" x="0px" y="0px" viewBox="0 0 496.135 496.135" >
										<path fill="#FFFFFF" d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z" />
									</svg>
								</span>
							</span>
						</NavLink>
					</Popover>
					{podmenu}
				</Fragment>
			}
			else
			{
				if(isRole) return "";
				return <NavLink
					route={ e.route }
					onClick={this.onRoute}
					to={{
						pathname: "/" + e.route
					}}
					exact 
					activeClassName={"active"}
					key={i}
				>
				
					<div className="header-menu-element">						
						<LayoutIcon
							src={ e.icon }
							className="header-menu-icon"
						/>
						<span>
							{__(e.title)}
						</span>
					</div>
				</NavLink>
			}
		});
		return <div className="main-menu">
			{mainMenu1}
		</div>
	}
	onRoute = evt =>
	{
		const route = evt.currentTarget.getAttribute("route");
		this.props.history.push(route);
		this.props.onHumburger();
	}
	f()
	{
		
		return <div className="main-menu">
			<Popover
				popoverClassName="p-0"
				className="p-0"
				position={"bottom-left"}
				usePortal={false}
				enforceFocus={true}
				interactionKind={"hover"}
				content={<Menu key="menu">
					<MenuItem text="Мои события" />
					<MenuItem text="Поиск" />
					<MenuItem text="Архив событий" />
				</Menu>}
			> 
				<NavLink
					to={{
						pathname: "/affiche"
					}}
					exact 
					rightIcon="caret-down"
				>
					<span>
						{__("Афиша событий")}
					</span>
				</NavLink>
			</Popover>
			<NavLink 
				to={{
					pathname: "/map"
				}}
				exact 
				text="Карта" 
				activeClassName={"active"}
			>
				<span>
					{__("Map")}
				</span>
			</NavLink>
			<Button text="Мой кабинет" minimal={true} />
		 </div>
	}
}
export default compose(
	withRouter
)(LayoutHeaderMenu);
