import React, {Component, Fragment} from "react";
import {menu} from "../../../layouts/routing";
import LayoutIcon from "../../../layouts/LayoutIcon";
import { NavLink, withRouter } from 'react-router-dom';
import {__} from "../../../layouts/utilities/i18n";
import {isCapability} from "../../../layouts/user";
import {concatRouting} from "../../../layouts/routing";

const injectTapEventPlugin = require("react-tap-event-plugin");

class HierarhicalMenu extends Component
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
		const {children, parent_route, route, icon, title, capability, level, razdel} = this.props;
		const myRoute = parent_route + "/" + route;
		const parents = children && children.length > 0 ? children.map((e, i) =>
		{
			return <HierarhicalMenu 
				level={level+1}
				parent_route={myRoute}
				{...e} 
				razdel={razdel} 
				i={i} 
				key={i} 
			/>
		})
		:
		null;
		const btn = this.props.is_hidden
			?
			null
			:
			<NavLink
				to={ myRoute }
				exact
				className={"layout-left-btn " } 
				activeClassName="active"
				i={this.props.current} 
			>
				<div 
					className={ "layout-menu-left-label " +( this.state.hover ? "hover" : null ) }
					style={{
						paddingLeft: level * 20
					}}
				>
					{ __(title) }
				</div>	
			
			</NavLink>
		return <div 
			className={"layout-left-group " + route }
			
		>
			{btn}
			{parents}
		</div>
	}
	getRoutes ()
	{
		return this.props.razdel ? this.props.razdel : [];
	}
	
	insertRoute(level=1, n=0)
	{
		const urls = this.getRoutes();
		return this.props.parent_route + "/" + this.props.route;
		/*
		let route = "";
		for(let i = 0; i < level ; i++)
		{
			console.log( urls );
			if( urls[i] )
			{
				//route = urls[i] ? route + "/" + urls[i].route : route;
				route = route + "/" + urls[i].route;
			}
			else
			{
				route = route;
			}
		}
		//console.log( route );
		return route;
		*/
	}
	getFirstRoute()
	{
		const url = this.getRoutes()[1];
		return url ? url : "";
	}
	getParent()
	{
		const rts = this.getFirstRoute();
		//console.log(rts);

		let routing = [];
		routing = concatRouting();

		return routing.filter( e => e.route === rts);
	}
	getGrandChildren( chldrn )
	{
		if(!chldrn) return false;
		//console.log(chldrn);
		if( chldrn.children && chldrn.children.length > 0 )
		{
			return chldrn.children;
		}
		else
			return false;
	}
	getChildren()
	{
		const chldrn = this.getParent();
		if(chldrn.length > 0)
		{
			//console.log( chldrn[0].children );
			if( chldrn[0].children && chldrn[0].children.length > 0 )
			{
				return chldrn[0].children;
			}
			else
				return false;
		}
		else
		{
			return false;
		}
	}
}
export default withRouter(HierarhicalMenu);