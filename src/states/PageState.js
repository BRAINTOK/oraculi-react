import React, {Component, Fragment} from "react";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {NavLink, Link, withRouter} from 'react-router-dom';

import BasicState from "../layouts/BasicState";
import Loading from "../layouts/utilities/Loading";
import {
	getQueryArgs,
	getQueryName,
	querySingle
} from "../layouts/schema";

class PageState extends BasicState
{

	basic_state_data()
	{
		return { }
	}
	myState = route =>
	{
		return this.get_data( route.data_type, route.variables);
	}
	getRoute = () =>
	{
		return "page";
	}

	get_data(data_type, variables)
	{
		//TODO query list, single mutation add, delete, update

		const query_name = data_type.toString().toLowerCase()
		const query_args = getQueryArgs(data_type)

		const query = querySingle( data_type, query_name, query_args );
console.log(query);
		// see: https://www.apollographql.com/docs/react/v2.4/essentials/mutations/
		//const fills = dt ? dt.admin_data.fill : ["#4580E6","#1F4B99"];
		//const fills = ["#3f586b", "#293742"];
		const fills = ["transparent", "transparent"];

		return <Query query={query} variables={variables}>
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <Loading/>;
					}
					if(data)
					{
						console.log(data);
						const collection_name = query_name + "s"
						const single = data[query_name][query_name][0] ? data[query_name][query_name][0] : data[query_name][collection_name][0] ;

						return <div>
							<p>{single.post_title}</p>
							<div dangerouslySetInnerHTML={{ __html: single.post_content}} />
						</div>
					}
					if(error)
					{
						return error.toString();
					}
				}
			}
		</Query>;

	}


}

export default compose(
	withApollo,
	withRouter
)(PageState);