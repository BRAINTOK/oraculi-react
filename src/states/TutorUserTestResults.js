import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState"; 
import $ from "jquery";
import TestResultGroup from "./tutor/TestResultGroup"; 

import {withRouter} from "react-router"; 
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import { NavLink } from 'react-router-dom'; 
import Moment from 'react-moment';

import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';

class TutorUserTestResults extends BasicState
{
	getRoute = () =>
	{
		return "tests-tesult";
	}
	basic_state_data()
	{
		return {
			id: -1
		}
	}
	addRender()
	{
		if(!this.props.user)
		{
			return <div className="alert alert-danger p-5">
				{__("You must logg in!")}
			</div>
		}
		const id = this.props.user.id;
		const query = gql`query getBio_UserTest($id:String)  
		{
			getBio_UserTest(id:$id) 
			{				
				id
				test
				{
				  id 
				  post_title
				}
				credits
				right_count
				start_time
				end_time
				bio_test_category
				{
				  id
				  post_title
				}
			}
		}`;
		return <div className="layout-state p-0">
			<Query query={query} variables={{"id": id}} >
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <Loading/>;
					}
					if( data )
					{	
						console.log(data.getBio_UserTest)
						const results = data.getBio_UserTest || [];
						let testGroup = [];
						const ress = results.forEach((e, i) =>
						{
							if(!testGroup[e.test.id])
								testGroup[e.test.id] = [];
							testGroup[e.test.id].push(e);
						})
						console.log(testGroup);
						const groups = testGroup.map((e,i) =>
						{
							//console.log(e);
							return <TestResultGroup
								tests={e}
								key={i} 
								openId={this.state.id}
								onOpen={this.onOpen}
							/>
						});
						return <div className=" mt-5">
								<div className="tutor-row">
									<div className="tutor-left-aside-3 mobile-relatived">
										{ 
											initArea( 
												"user-test-results-left-aside", 
												{ ...this.props, results } 
											) 
										}
									</div>
									<div className="tutor-main-3">
										<div className="row test-result bg-secondary text-light">
											<div className="col-md-6">
												{__("Test")}
											</div>
											<div className="col-md-1">													
												{__("Times")}
											</div>
											<div className="col-md-1">
												{__("Credits")}
											</div>
											<div className="col-md-4">
												{__("duration")}
											</div>
										</div>
										{groups}
										{ 
											initArea( 
												"user-test-results", 
												{ ...this.props, results }
											) 
										} 
									</div>
									<div className="tutor-right-aside-3">
										{ initArea( "user-test-results-right-aside", 
												{ ...this.props, results }
											) 
										} 
									</div>
								</div>
							</div>
					}						
					if( error )
					{
						return error.toString();
					}
				}
			}
			</Query>
		</div>
	}
	onOpen = id =>
	{
		this.setState({id});
	}
}
export default compose(
	withApollo,
	withRouter
)(TutorUserTestResults)