import React, {Component, Fragment} from "react";
import $ from "jquery";
import LayoutLinks from "./LayoutLinks";
import LayoutHelp from "./LayoutHelp";
import LayoutBells from "./LayoutBells";
import LayoutComments from "./LayoutComments";
import LayoutHeaderMenu from "./LayoutHeaderMenu";
import LayoutUser from "./LayoutUser";

import { NavLink } from 'react-router-dom';
import { Popover, Menu, MenuDivider, MenuItem,Button, Intent } from "@blueprintjs/core";

import {__} from "../../layouts/utilities/i18n";
import {existRouting} from "../../layouts/routing";
import {name} from "../../layouts/app";
import LayoutIcon from "../../layouts/LayoutIcon";
import {avatar, iconHeight, iconUrl, iconWidth, template} from "../../layouts/template";

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

class LayoutHeader extends Component
{
	state = {
		isOpen:false,
		height:0,
		current:this.props.current,
		user:this.props.user,
		isHumburger:false,
		fixed:false
	}

	componentDidMount() 
	{
		window.layoutHeader = this;
		window.addEventListener('scroll', this.onscrollHandler);
	}
    componentWillUnmount() 
	{
		window.removeEventListener('scroll', this.onscrollHandler);
	}
	onscrollHandler(e)
	{
		return;
		//console.log( window.scrollY );
		window.layoutHeader.setState(
			{ fixed: window.scrollY > 86 && window.height > 540 },
			() =>
			{
				if( window.layoutHeader.state.fixed )
				{
					$("body").css("margin-top", 86);
				}
				else
				{
					$("body").css("margin-top", 0);
				}
			}
		);
		
	}
	componentWillReceiveProps (nextProps )
	{
		if(nextProps.current !== this.state.current || nextProps.user !== this.state.user )
			this.setState({
				current: nextProps.current,
				user: nextProps.user
			});
	}
	render()
	{		
		const fixedClass = this.state.fixed ? "layout-header fixed animation-opened animated2" : 'layout-header'; 
		const widgets = template().layout_header && Array.isArray(template().layout_header) ? 
			template().layout_header.map((e,i) =>
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
						const _Widget = components[e.component].default;
						return <_Widget {...e} key={i} />
				}
			})
			: 
			null;
		return <div className={fixedClass} >
			<div className="layout-header-left">			
			{
				initArea( 
					"layout-left", 
					{ ...this.props } ,
					<Fragment>
						<NavLink to="/" style={{ display:"flex" }} className="mainLink">
							<div 
								className="layout-header-icon " 
								style={{ 
									backgroundImage:iconUrl(),
									height: iconHeight(),
									width: iconWidth(),
								}}
							/>
							<div className="layout-header-title">
								{name()}
							</div>
						</NavLink>
						<div className="humburger" onClick={this.onHumburger}>
							<i className={"fas " + (this.state.isHumburger ? "fa-times" : "fa-bars")} />
						</div>
					</Fragment>
				) 
			}
			</div> 
			{
				initArea( 
					"layout-header-center", 
					{ ...this.props },
					<div className={ "d-flex-menu " + (this.state.isHumburger ? "open": "" ) }>
						<LayoutHeaderMenu onHumburger={this.onHumburger} user={ this.state.user }/>
					</div>						
				) 
			} 
			<div 
				className={ "layout-menu-right " + (this.state.isHumburger ? "open": "" ) } 
				id="layout-menu-right"
			>  			
				{
					initArea( 
						"layout-header-right", 
						{ ...this.props },
						<LayoutUser
							current={ this.state.current }
							onCurrent={ this.props.onCurrent }	
							user={ this.state.user }
							refetchUser = {this.props.refetchUser}
							avatar={ avatar() }
							isOpen={ false }
							//isOpen={ window.screen.width < 600 }
						/>
					)
				}
			</div>
		</div>
	}
	onHumburger = () =>
	{
		var totalHeight = 0;
		$("#layout-menu-right").children().each(function(){
			totalHeight += $(this).outerHeight(true); // true = include margins
		});
		console.log( totalHeight );
		this.setState({isHumburger:!this.state.isHumburger, totalHeight: this.state.isHumburger ? totalHeight : 0 });
	}
}
export default LayoutHeader;