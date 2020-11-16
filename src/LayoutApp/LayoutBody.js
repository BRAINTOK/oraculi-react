import React, {Component, Fragment} from 'react';
import $ from "jquery";
import {cssStyle, loginPage} from "../layouts/template"
import {compose} from "recompose";
import { Query, graphql, withApollo} from "react-apollo";
import {withRouter} from "react-router";
import gql from 'graphql-tag';
import {loader} from "graphql.macro";
import {AppToaster} from "../layouts/utilities/blueUtils";
import {Intent} from "@blueprintjs/core";

import LayoutContent from "./LayoutContent";
import LayoutHeader from "./LayotHeader";
import LayoutFooter from "./LayoutFooter";

import {__} from "../layouts/utilities/i18n";
import layouts  from "../layouts";
import Loading from "../layouts/utilities/Loading";
import {title} from "../layouts/app";
import {queryUserInfo} from "../layouts/schema/wp";
import {template} from "../layouts/template";
import {isLoggedPage} from "../layouts/user";
import {assertion_token} from "../layouts/config";
import getWidget, { initArea, widgetAreas } from "../layouts/utilities/getWidget";

// const l_token = loader("../layouts/graphql/token.graphql");

class LayoutBody extends Component
{
	random;
	constructor(props)
	{
		super(props);
		this.random = Math.random();
		const fl = localStorage.getItem("fluid");
		const fluid = typeof fl !== "undefined" ? fl : 1;
		const style = {style: cssStyle(), fluid};
		//console.log(style, fl);
		document.title = title();
		const token = localStorage.getItem( 'token');
		if(!token && isLoggedPage(props.location.pathname))
		{
			this.props.history.push(loginPage());
		}
		this.state = {
			current : 100,
			style, 
			fluid
		}
	}


	renderContent()
	{
		const query = queryUserInfo();
		const queryMenu = gql`
			query
			{
			  getInit
			  {
				menu
				{
				  json
				}
			  }
			}`; 
		
		return <Query query={queryMenu}>
		{
			ret => 
			{
				if( ret.loading)
				{
					return <Loading/>;
				}
				if(ret.data) 
				{
					//console.log( JSON.parse( ret.data.getInit.menu.json.replace( /'/g, '"' ) ) );
					return <Query query={query} >
					{
						({ loading, error, data, refetch}) => 
						{
							if( loading)
							{
								return <Loading/>;
							}
							if(data) 
							{
								let user = null;
								if(data.userInfo)
								{
									if(data.userInfo.user)
									{
										user = data.userInfo.user;
									}
									else
									{
										user = data.userInfo
									}
								} 
								return <Fragment>
									<div className="layout block w-100">
									{  	
										template().header === 0
											? 
											null
											:
											initArea( 
												"layout-header", 
												{ 
													...this.props, 
													...this.state,
													user,
													refetchUser	: refetch, 
													onCurrent	: this.onCurrent 
												},  
												<LayoutHeader
													name={this.props.name}
													current={this.state.current}
													onCurrent={this.onCurrent}
													user={user}
													refetchUser={refetch}
												/>
											) 
									}
										<LayoutContent
											current={this.state.current}
											onCurrent={this.onCurrent}
											user={user}
											onChangeStyle2={ style => this.onChangeStyle( cssStyle() ) }
											onChangeStyle={ this.onChangeStyle }
											refetchUser={refetch}
										/>
										<LayoutFooter/>
									</div>
								</Fragment>;
							}
							if(error)
							{
								if (localStorage.getItem('token')) {
									localStorage.removeItem('token', null);
									window.location.reload();
								}
								console.log(error);
								return <div className="media w-100 lead  ">
									<div className="fatal-error" />
									<div className="fatal-text">
										{__("If you see this inscription, something wrong happened: critical errors occurred on our server. We dare to assure you that our experts have already pulled on their space suits and are already poking around in orbit. So soon everything will be OK!")}
									</div>
								</div>
							}
						}
					}
					</Query>
				}					
				if(ret.error)
				{ 
					return <div className="media w-100 lead  ">
						<div className="fatal-error" />
						<div className="fatal-text">
							{__("If you see this inscription, something wrong happened: critical errors occurred on our server. We dare to assure you that our experts have already pulled on their space suits and are already poking around in orbit. So soon everything will be OK!")}
						</div>
					</div>
				}
			}
		}
		</Query>
	}

	render()
	{
		const cl = this.props.location.pathname.split("/").splice(1 ).map(e => "route-" + e).join (" ");
		const clss = this.state.style && this.state.style.fluid ? "container-fluid  cont" : "container cont"; 
 
		return <div className={"full " + cl}>
			<header>
			</header>
			<main>
				<div className={ clss } >
					{this.renderContent()}
				</div>
			</main>
			<footer>
			</footer>
			<div id="under-footer">
				<link href={"/assets/css/style.css?" + this.random} rel="stylesheet" />
				<link rel="stylesheet" type="text/css" href={ cssStyle() + "?" + this.random } id="external-css"/>
			</div>
		</div>
		
	}
	onChangeStyle = style =>
	{
		//console.log( style );
		localStorage.setItem("css", style.style);
		localStorage.setItem("fluid", parseInt(style.fluid) ? 1 : 0);
		$("#external-css").detach();
		if( style.style )
		{
			//console.log( style.style, this.state.style );
			$("#under-footer").append('<link rel="stylesheet" type="text/css" href=' + style.style + '?' + this.random + ' id="external-css"/>')
		}
		else
		{
			
		}
		//this.setState( { style } );
		//console.log( localStorage.getItem("fluid"));
	}

	onCurrent = i =>
	{
		this.setState({current:i});
	}
}


export default compose(

	// graphql(l_token, {"name": "token"}),
	withApollo,
	withRouter
)(LayoutBody);