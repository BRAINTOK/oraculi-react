import React, { Component, Fragment } from "react";
import { menu } from "../routing";
import { __ } from "../utilities/i18n";
import Loading from "../utilities/Loading";
import axios from 'axios';
import LayoutIcon from "../LayoutIcon";
import { concatRouting } from "../routing";
import { currentStyles, byId } from "../template";
import getWidget, { initArea } from "../utilities/getWidget";

class BasicState extends Component
{
	constructor(props)
	{
        super(props);
		// console.log(this.basic_state_data());
		const newStyle = byId( this.props.style_id );
		const isLeft = typeof this.props.is_left !== "undefined" ? this.props.is_left : null;
		//console.log( newStyle );
		if(newStyle || isLeft)
			this.props.onChangeStyle( { fluid:1, style: newStyle.url, isLeft } );
		this.state = { 
			...this.basic_state_data(),
			html:"",
			route: {
				variables:  this.props.variables  ? this.props.variables  : {}, 
				icon:  this.props.icon  ? this.props.icon  : "usercor-light", 
				title: this.props.title ? this.props.title : this.getTitle(),
				html:  this.props.html  ? this.props.html  : "",
				panel:  this.props.panel  ? this.props.panel  : "",
				html_sourse	: this.props.html_sourse  ? this.props.html_sourse  : "",
				data_type	: this.props.data_type  ? this.props.data_type  : "",
			},
			description: "",
			panelHtml: ""
		};
	}
	componentDidMount() 
	{
		this.setState({ 
			route	: this.layout( ),
			panelHtml: this.myPanelHtml( this.layout( ) ),
			html	: this.myState( this.layout( ) )
		});
		this.stateDidMount();
	}
	stateDidMount ()
	{
		
	}
	
	componentWillReceiveProps ( nextProps )
	{
		if( nextProps.html || nextProps.icon || nextProps.title || nextProps.html_sourse  || nextProps.data_type )
		{
			const route = this.state.route;
			//console.log(nextProps);
			this.setState({
				html: this.myState( nextProps ),
				panelHtml: this.myPanelHtml( nextProps ),
				route:{
					...route, 
					icon: nextProps.icon , 
					title: nextProps.title,
					html: nextProps.html,
					html_sourse: nextProps.html_sourse,
					panel: nextProps.panel,
					data_type: nextProps.data_type
				} 
			});
		}
	}
	alternateRender()
	{
		return null;
	}
	addRender()
	{
		return null;
	}
	beforeRender()
	{
		return null;
	}
	render()
	{		
		const alt = this.alternateRender();
		if(alt)
			return alt;
		this.beforeRender();
		return <div className="layout-state">
			<div className="layout-state-head">
				<LayoutIcon
					isSVG={ true } 
					src={ this.state.route.icon } 
					className="layout-state-logo "
				/>
				<div className="layout-state-title">
					{ __( this.state.route.title ) }
				</div>
				<div className="layout-state-heaader">
					{ this.rightPanel() }
					{ initArea( "layout_heaader_panel", this ) }
				</div>
			</div>
			{this.addRender()}
			{this.state.html}
		</div>
	}
	rightPanel()
	{
		return this.state.panelHtml;
	}
	getName = () =>
	{
		let name = menu().filter(e => e.route === this.state.route);
		if(!name) name = "404";
		return name;
	}
	getIcon = () =>
	{
		let icon = menu().filter(e => e.icon === this.state.icon);
		if(!icon) icon = "fas fa-user";
		return icon;
	}
	getRoute = () =>
	{
		return this.props.route;
	}
	
	myPanelHtml = route =>
	{
		if( route.panel)
			return <div dangerouslySetInnerHTML={{ __html: route.panel}} />;
		return this.state.panelHtml;
	}
	myState = route =>
	{
		if( route.html)
			return <div dangerouslySetInnerHTML={{ __html: route.html}} />;
		else if( route.html_sourse )
		{
			axios.get( route.html_sourse )
				.then( response => 
				{
					this.setState({html: <div dangerouslySetInnerHTML={{ __html: response.data }} />});
				});
			return ""; 
		}
		else if( route.data_type )
		{
			return "";//this.get_data( route.data_type);
		}
		else
			return "";
	}
	layout = () =>
	{
		let name = concatRouting()
					.filter( e => 
					{
						return e.route == this.getRoute();
					});
		
		return name.length > 0 ? name[0] : this.state.route;
	}
	getTitle()
	{
		
	}
	basic_state_data()
	{
		return {};
	}
}
export default BasicState;