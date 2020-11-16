import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import BasicState from "../../layouts/BasicState"; 
import $ from "jquery";
import LessonQuote from "./LessonQuote"; 
import {withRouter} from "react-router";
import layouts from "../../layouts/layouts";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../../layouts/schema";
import Loading from "../../layouts/utilities/Loading";
import Feed from "../../layouts/BasicState/Feed"; 

import getWidget, { initArea } from "../../layouts/utilities/getWidget";
import gql from 'graphql-tag';

class CourseArticleList extends Component
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
		const data_type = "Bio_Article";
		const paging = 'taxonomies :{ tax_name : "' + this.props.type + '", term_ids : [ ' + id + ' ] }, order_by_meta:"order", order:"ASC"'; 
		
		
		return <Feed 
			component={LessonQuote} 
			data_type={data_type}
			offset={0}
			paging={paging}
		/>;
	}
}

export default compose(
	withApollo,
	withRouter
)(CourseArticleList);