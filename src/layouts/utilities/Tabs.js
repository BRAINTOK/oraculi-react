import React, {Component, Fragment} from "react";
import $ from "jquery";
import {NavLink} from "react-router-dom";
import {Route, Switch, Redirect, withRouter} from 'react-router';

class Tabs extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			current:this.props.current,
			left:$(window).width()/2,
			width:0
		}
	}
	slide()
	{
		const btn =  $(".tab-btn").filter((i,e) => 
		{
			return $(e).hasClass("active")
		})[0];
		if(btn)
		{
			this.setState( { left:$(btn).offset().left , width:$(btn).width() + 60 } );
		}
	}
	componentDidMount(prevProps, prevState, snapshot)
	{
		this.slide();
	}
	render()
	{
		let routes = [];
		const tab_buttons = this.props.tabs.map((e,i) =>
		{
			//console.log(e.content);
			routes.push(
				<Route
					
					path = { this.props.route + e.to }
					key={i}
					render={routeProps => (
						<div className="w-100 d-flex justify-content-center p-5">
							{e.content}
						</div>
					)}
					key={i + "_1"}
				/>
			);
			return <NavLink 
				className="tab-btn"
				activeClassName="active"
				key={i} 
				id={e.id}
				to={this.props.route + e.to}
			>
				{e.title}
			</NavLink>
		});
		return <div className="tab-cont">
			<div className="tab-header">
				{tab_buttons}
				<div 
					className="tab-selector"
					style={{left:this.state.left, width:this.state.width}}
				/>
			</div>
			<Switch>
				{routes}
			</Switch>
		</div>
	}
	onSwitch = evt =>
	{
		this.setState(
			{
				current: evt.currentTarget.getAttribute("id")
			},
			() => 
			{
				console.log(this.state.current);
				this.slide()
			}
		);
	}
}
export default withRouter(Tabs);