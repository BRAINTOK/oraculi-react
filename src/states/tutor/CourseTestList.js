import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import BasicState from "../../layouts/BasicState"; 
import $ from "jquery";
import TestQuote from "./TestQuote";  
import Feed from "../../layouts/BasicState/Feed"; 
import {withRouter} from "react-router";
import layouts from "../../layouts/layouts";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../../layouts/schema";
import Loading from "../../layouts/utilities/Loading";

import getWidget, { initArea } from "../../layouts/utilities/getWidget";
import gql from 'graphql-tag';

class CourseTestList  extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			numberposts:10,
			offset:0
		}
	}
	render()
	{
		const {id, articles} = this.props; 
		const data_type = "Bio_Test";
		const paging = 'taxonomies :{ tax_name : "' + this.props.type + '", term_ids : [ ' + id + ' ] }, order:"ASC"'; 
		
		
		return <Feed 
			component={TestQuote} 
			data_type={data_type}
			offset={0}
			paging={paging}
		/>;
	}
}

export default compose(
	withApollo,
	withRouter
)(CourseTestList);