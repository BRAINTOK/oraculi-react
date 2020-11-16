import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import {__} from "../layouts/utilities/i18n";
import {withRouter} from "react-router";
import gql from 'graphql-tag';
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import Loading from "../layouts/utilities/Loading";
import Settings from "./MAdminSettingsState/Settings";

import LayoutIcon from "../layouts/LayoutIcon";
import getWidget, { initArea } from "../layouts/utilities/getWidget";

class MAdminSettingsState extends BasicState
{
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
		return  <div className="layout-state p-0">
			<div className="tutor-row menu-row">
				<div className={leftClass}>	
					<div>
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
							
						</div>
						{
								initArea( "admin-options-left-aside", 
								{ ...this.props } 
							) 
						}
						
					</div>
				</div>
				<div className={mainClass}> 
					<div className="clapan-left" onClick={()=>this.setState({isLeftClosed:!this.state.isLeftClosed})}>
						<div className={"fas fa-caret-" + (!this.state.isLeftClosed ? "left" : "right")} />
					</div>				
					<div className="menu-header-22 flex-centered"> 
					
					</div>
					
					<Query query={gql`query getOptions {
						getOptions{
							goods_type
							robocassa_key
							robocassa_password_1
							robocassa_password_2
							default_course
							{
							  post_title
							  id
							}
						}
					}`}>
						{
							({ loading, error, data, client}) =>
							{
								if (loading) 
								{
									return <Loading/>;
								}
								if(data)
								{	
									console.log(data.getOptions);
									return <Fragment>
										<Settings {...data.getOptions}/>
										
									</Fragment>
								}
							}
						}
					</Query>
				</div>
			</div>
		</div>
	}
	getRoute = () =>
	{
		return "admin/settings";
	}
}

export default compose(
	withApollo,
	withRouter
)(MAdminSettingsState);