import React from "react";
import DataTable from "./SchoolDataTable";
import BasicState from "../layouts/BasicState";
import {
	getQueryName, getQueryArgs,
	queryCollection, querySingle,
	getChangeName, getInputTypeName, getMutationArgs,
	mutationAdd, mutationEdit, mutationDelete
} from "../layouts/schema";
import { compose, mapProps } from "recompose";
import {Query, withApollo} from 'react-apollo';
import {withRouter} from "react-router";


class DataTableState extends BasicState
{
	basic_state_data() 
	{
		return { }
	}
	myState = route =>
	{
		//console.log( route );
		return this.get_data( route.data_type, route.query);
	}
	getRoute = () =>
	{
		return "data-table";
	}
	
	get_data(data_type)
	{
		//TODO query list, single mutation add, delete, update

		const query_name = getQueryName(data_type)
		const query_args = getQueryArgs(data_type)
		const query = queryCollection( data_type, query_name, query_args);

		const mutation_name = getChangeName( data_type );
		const input_type_name = getInputTypeName( data_type );
		const mutation_args = getMutationArgs( data_type );
		const change_mutation = mutationEdit( data_type, mutation_name, input_type_name, mutation_args );

		const delete_mutation = mutationDelete( data_type );

		// see: https://www.apollographql.com/docs/react/v2.4/essentials/mutations/
		const fills = ["transparent", "transparent"];

		console.log(this.props);
		return <DataTable
			theadColor = {fills[0]}
			trColor = {fills[1]}
			data_type = { data_type }
			query_name = {query_name}
			query = {query}
			mutation_name={mutation_name}
			change_mutation = {change_mutation}
			mutation_delete = {delete_mutation}
			route={this.props.route}
			isList={this.props.is_list}
		/>;

		// return "";

	}

}

export default compose(
	withApollo,
	withRouter
)(DataTableState);