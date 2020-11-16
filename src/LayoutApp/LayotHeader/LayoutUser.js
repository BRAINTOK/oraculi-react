import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';

import { NavLink } from 'react-router-dom';
import { Position, Toast, Toaster, Intent } from "@blueprintjs/core";
import { compose} from "recompose";
import { Query, withApollo } from "react-apollo";
import {withRouter} from "react-router";
import gql from "graphql-tag";

import {sourse_url} from "../../layouts/config";
import {profile} from "../../layouts/routing";
import {__} from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
import LayoutIcon from "../../layouts/LayoutIcon";
import {isCapability} from "../../layouts/user";
import {login, template} from "../../layouts/template";
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";


const components = {};
function importAll (r) 
{
	// console.log(r)
	r.keys().forEach(key => 
	{
		const key1 = key.replace("./", "").split(".").slice(0, -1).join(".");
		components[key1] = r(key)
	});
}
importAll(require.context('../../widgets/', false, /\.js$/));


class LayoutUser extends Component
{
	state = { isOpen:this.props.isOpen, height:0, current:this.props.current }
	
	componentWillReceiveProps (nextProps )
	{
		if(
				nextProps.current !== this.state.current 
			|| 	nextProps.isOpen !== this.state.isOpen 
		)
		{
			this.setState({
				current: nextProps.current,
				isOpen: nextProps.isOpen,
				height: nextProps.isOpen ? 230 : 0 
			});
		}
	}
	componentDidMount() 
	{
		document.body.addEventListener('click', this.onMouseLeaveHandler);
	}
    componentWillUnmount() 
	{
		document.body.removeEventListener('click', this.onMouseLeaveHandler);
	}
	onMouseLeaveHandler = e =>
	{	
		const domNode = ReactDOM.findDOMNode(this);
		if (!domNode || !domNode.contains(e.target))	
		{
			this.setState({
				isOpen: this.props.isOpen, 
				height: 0
			});
		}
	}
	
	render()
	{
		//console.log(this.props.user);
		return <Fragment>
			{
				initArea( 
					"before-profile", 
					{ ...this.props } 
				) 
			}
			{this.props.user ? this.logined() : this.unLogined()}
		</Fragment>
	}
	unLogined()
	{
		//console.log(template());
		return <Fragment>			
			{
				initArea( 
					"unlogin_panel", 
					{ ...this.props },
					<NavLink className="icon-unlogined" to={ login } >
						<div > {__("Enter")} </div>
					</NavLink>
				) 
			} 
			
			
		</Fragment>;
	}
	logined()
	{
		const avatar = this.props.avatar;
		const user = this.props.user; 
		const profile_routing = profile();
		let profile_menu;
		if(profile_routing.length > 0)
		{
			profile_menu = profile_routing.map((e,i) =>
			{
				const isRole = isCapability(e.capability, this.props.user);
				if(isRole) return "";
				return <NavLink
					className={ "" }
					activeClassName="active"
					to={ "/" + e.route }
					key={ i }
				>
					<LayoutIcon
						isSVG={ true }
						src={ e.icon }
						className="personal-menu__icon mr-3"
					/>
					{ __(e.title) }
				</NavLink>
			})
		}
		else
		{
			profile_menu =	<NavLink
				className={ "" }
				activeClassName="active"
				to={"/profile" }
			>
				<LayoutIcon
					isSVG={ true }
					src={"/assets/img/user.svg" }
					className="personal-menu__icon mr-3"
				/>
				{__("edit profile")}
			</NavLink>
		}
		
		const login_panel = template().login_panel && Array.isArray(template().login_panel) ? 
			template().login_panel.map((e,i) =>
			{
				switch(e.component)
				{
					case "NavLink":
						return <NavLink 
							key={i}
							className={ "btn " + e.routing } 
							to={ "/" + e.routing } 
						>
							{__(e.title)}
						</NavLink>;
						break;
					default:
						const _WidgetL = components[e.component].default;
						return <_WidgetL key={i} {...e} user={this.props.user} logout={this.logout}/>;
				}
			})
			: 
			<div
				className={"icon-logined " + (this.state.isOpen ? " active44" : "")}
				onClick={this.onToggle}
			>
				<LayoutIcon
					isSVG={ !( user.avatar && user.avatar.length > 0 ) }
					src={ user.avatar ? user.avatar : "/assets/img/user1.svg" }
					style={ user.avatar ? { backgroundImage: "url(" + user.avatar + ")", backgroundSize:"cover" } : {} }
					className="user-ava"
				/>

				<div className="user-name">
				{
					user ? user.display_name : " "
				}
				</div>
				<div className="chevron-down-light ml-3 mt-1 pointer"></div>
				<div
					className="logined-menu"
					style={{ height: this.state.height }}
				>
					<ul id="person_menu">
						{profile_menu}
						<li onClick={this.logout} >
							<LayoutIcon
								isSVG={ true }
								src={"/assets/img/logout.svg" }
								className="personal-menu__icon mr-3"
							/>
							{__("logout")}
						</li>
					</ul>
				</div>
			</div>;
		
		return <Fragment>						
			{
				initArea( 
					"login_panel", 
					{ ...this.props },
					login_panel
				) 
			}			
		</Fragment>
	}
	onToggle = evt =>
	{
		//console.log( document.getElementById("person_menu").clientHeight );
		this.setState({
			isOpen: !this.state.isOpen, 
			height: !this.state.isOpen ? document.getElementById("person_menu").clientHeight : 0 
		});
	}
	logout = () =>
	{
		localStorage.removeItem('token');
		this.props.refetchUser();
	}
}
export default compose(
	withApollo,
	withRouter
)(LayoutUser);