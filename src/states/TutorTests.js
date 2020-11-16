import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState"; 
import $ from "jquery";
import TestQuote from "./tutor/TestQuote"; 
import Feed from "../layouts/BasicState/Feed"; 

import {withRouter} from "react-router"; 
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import { NavLink } from 'react-router-dom'; 

import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';

class TutorTests extends BasicState
{
	getRoute = () =>
	{
		return "all-tests";
	}
	addRender()
	{
		const {id, articles} = this.props; 
		const data_type = "Bio_Test";
		const paging = '';
		return <div className=" mt-5">
			<div className="tutor-row">
				<div className="tutor-left-aside-2  mobile-relatived">
					{ 
						initArea( 
							"tutor-tests-left-aside", 
							{ ...this.props } 
						) 
					}
				</div>
				<div className="tutor-main-2">
					<Feed 
						component={TestQuote} 
						data_type={data_type}
						offset={0}
						paging={paging}
					/>
					{ 
						initArea( 
							"tutor-tests", 
							{ ...this.props }
						) 
					} 
				</div>
				<div className="tutor-right-aside-2">
					{ initArea( "tutor-tests-right-aside", 
							{ ...this.props }
						) 
					} 
				</div>
			</div>
		</div>
	}
}
export default compose(
	withApollo,
	withRouter
)(TutorTests)