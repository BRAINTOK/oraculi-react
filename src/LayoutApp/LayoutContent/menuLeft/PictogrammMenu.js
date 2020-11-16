import React, {Component, Fragment} from "react";
import {menu} from "../../../layouts/routing";
import LayoutIcon from "../../../layouts/LayoutIcon";
import { NavLink } from 'react-router-dom';
import {__} from "../../../layouts/utilities/i18n";
import {isCapability} from "../../../layouts/user";
import getWidget, { initArea } from "../../../layouts/utilities/getWidget";
import { withRouter } from "react-router"; 
import $ from "jquery";

class PictogrammMenu extends Component
{
	state = {
		current:this.props.current,
		hover:false
	}
	componentWillReceiveProps (nextProps )
	{
		this.setState({
			current: nextProps.current
		});
	}
	render()
	{
		const {children, route, icon, title, capability} = this.props;
		// const isRole = isCapability( capability);
		// if(isRole) return "";
		const arrow = children && children.length > 0 
			?
			<span className="arrow fas fa-caret-right">
			</span>
			:
			null
		return <div 
			className={
				"position-relative pictogramm-menu-element" + 
				( this.props.i == this.state.current ? " active" : "") 
			}
		>
			<NavLink
				to={"/" + route}
				exact={true}
				strict={true}
				className={"layout-left-btn " + (this.props.location.pathname == "/" + route ? "active" : "" )} 
				route={ route }
				isActive = {( match, location ) =>
				{
					setTimeout(() =>
					{
						const offset = $(".layout-left-btn.active").offset();
						$("#mobile-bar").offset({ top: offset ? offset.top : 65 });
					}, 50);
					if(match)
					{
						//console.log(match);
						//console.log(location);
						//console.log(this.props.location);
						//console.log(this.props.match);
					}
				}}
				activeClassName="active"
			>
				<div className={"layout-menu-icon"} 
					//onMouseOver={() => { this.toggleHover(); console.log("onMouseOver"); }} 
					//onMouseLeave={() => this.toggleHover()}		
				>
					<LayoutIcon
						src={ icon }
						className="left-menu-icon"
					/>
				</div>
				<div className={ "layout-menu-left-label " +( this.state.hover ? "hover" : null ) }>
					{__(title)}
				</div>
			</NavLink>
			{arrow}
			{
				initArea( 
					"menu-left-element", 
					{ 
						...this.props, 
						data : {...this.props}, 
						level : 0,
						pathname : "/" + route, 
						i : this.props.i, 
						state : this.state 
					},  
				)
			}
		</div>
	}
	
	toggleHover()
	{
		this.setState({hover: !this.state.hover})
	}
}
export default withRouter(PictogrammMenu);