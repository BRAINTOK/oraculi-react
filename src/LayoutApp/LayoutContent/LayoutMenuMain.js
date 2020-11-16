import React, {Component, Fragment} from "react";
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import {concatRouting} from "../../layouts/routing";
import {__} from "../../layouts/utilities/i18n";
import {isCapability} from "../../layouts/user";
import {template} from "../../layouts/template";
import getWidget, { initArea } from "../../layouts/utilities/getWidget";
import $ from "jquery";

class LayoutMenuMain extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			isOpen : this.props.isOpen, 
			current:this.props.current, 
			isMobile:false,
			isMobileOpen:false 
		};
	}
	
	componentDidMount()
	{
		const offset = $(".layout-left-btn.active").offset();
		this.setState({ 
			isMobile : window.innerWidth < 760, 
			isMobileOpen: false,
			offset: offset ? offset.top : 65
		});
	}
	componentWillReceiveProps (nextProps )
	{
		if(
				nextProps.current !== this.state.current 
			|| 	nextProps.isOpen !== this.state.isOpen 
		)
		{
			let state = {
				current: nextProps.current,
				isOpen: nextProps.isOpen
			}
			const offset = $(".layout-left-btn.active").offset();
			if(offset)
			{
				state.offset = offset.top;
			}
			this.setState( state );
		}
	}
	render()
	{
		//console.log(this.state.isMobile);
		let chldrn = [], grndchldrn = [], grnd = [], isOpen = false, openBtn;
		const firstRoute = this.getParent();
		const childrenss = this.getChildren();
		if(
			childrenss 
			&& !firstRoute[0].hide_slider
			&& template().left_menu == "pictogramm"
			&& ( this.state.isMobile ? this.state.isMobileOpen: true )
		)
		{
			if( this.state.isMobile && this.state.isMobileOpen )
			{
				openBtn = <div className="mobile-bar" onClick={this.onMobileOpenToggle}>
					<i className="fas fa-times" />
				</div>
			}
			chldrn = childrenss
				.filter(e =>
				{
					const isRole = isCapability(e.capability, this.props.user);
					const isLeft = e.is_left;
					return !isRole && isLeft;
				})
					.map((e, i) => 
					{
										
						grndchldrn = this.getGrandChildren( e );
						grnd = grndchldrn ?
							grndchldrn.map((element, ii) => 
							{
								return <div key={ii + element.route} className="left-cont-child-grnd">
									<NavLink 
										className="list-element-child grnd" 
										activeClassName="active"
										to={ "/" + this.getFirstRoute() + "/" + e.route + "/" + element.route }
										
									>
										{__(element.title)}
									</NavLink> 
									{
										initArea( 
											"menu-left-element", 
											{ 
												...this.props, 
												data: {...element}, 
												level:2,
												pathname: "/" + this.getFirstRoute() + "/" + e.route + "/" + element.route, 
												i:ii, 
												state:this.state 
											}
											
										) 
									}
								</div>
							})
							:
							null;		
						
						return <div className="list-element-nest">	  
							<NavLink
								className="list-element" 
								activeClassName="active"
								to={ "/" + this.getFirstRoute() + "/" + e.route }
								key={i}
							>			
								{__(e.title)}								
							</NavLink> 				
							{  	
								initArea( 
									"menu-left-element", 
									{ 
										...this.props, 
										data: {...e}, 
										level:1,
										pathname: "/" + this.getFirstRoute() + "/" + e.route, 
										i:i, 
										state:this.state 
									}
								) 
							}
							{grnd}
						</div>
					});
			isOpen = chldrn.length > 0;
		}	
		if(
			childrenss 
			&& !firstRoute[0].hide_slider
			&& template().left_menu == "pictogramm"
			&& (this.state.isMobile ? !this.state.isMobileOpen : false)
		)
		{
			if( this.state.isMobile && !this.state.isMobileOpen )
			{
				openBtn = <div 
					className="mobile-bar" 
					id="mobile-bar"
					onClick={this.onMobileOpenToggle} 
					style={{
						right:"auto", left:37, top:this.state.offset
					}}
				>
					<i className="fas fa-bars" />
				</div>
			}
		}
		
		return <Fragment>
			<div className={ "layout-menu-main" +( isOpen ? " open " : "" ) } >
				{chldrn}			
			</div> 
			{openBtn}
		</Fragment>
	}
	getFirstRoute()
	{
		const url = this.props.location.pathname.split("/")[1];
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
	onMobileOpenToggle = () =>
	{
		this.setState({ isMobileOpen:!this.state.isMobileOpen });
	}
}
export default withRouter(LayoutMenuMain);