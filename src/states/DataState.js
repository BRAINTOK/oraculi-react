import React, {Fragment, Component} from "react"; 
import {
	getQueryArgs, 
	querySingleName, 
	querySingle, 
	apolloFields, 
	getChangeName, 
	getInputTypeName, 
	getMutationArgs,
	mutationEdit, 
	mutationDelete,
	getInput, 
	getVisibleValue
} from "../layouts/schema";
 
import BasicState from "../layouts/BasicState";
import CategoryForm from "./SchoolDataTable/CategoryForm";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, 
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";

import { compose, mapProps } from "recompose";
import {Query, withApollo} from 'react-apollo';
import {withRouter} from "react-router";
import gql from 'graphql-tag';

import layouts from "../layouts/layouts";
import {AppToaster} from "../layouts/utilities/blueUtils";
import {__} from "../layouts/utilities/i18n";
import {sprintf} from "../layouts/utilities/sprintf";
import Loading from "../layouts/utilities/Loading";
import Pagi from "../layouts/utilities/Pagi";


class DataState extends BasicState
{
	basic_state_data()
	{
		return {
			loading	: true,
			data	: []
		}
	}
	stateDidMount ()
	{
		this.onRefresh();
	}
	addRender()
	{
		let id = parseInt(this.props.match.params.id) ;
		let { data_type } 	= this.props; 
		console.log( id );
		const { loading, data } = this.state;
		const query_name 		= querySingleName(data_type);
		const query_args 		= getQueryArgs(data_type);
		const query = querySingle(data_type, query_name, query_args, id);
		console.log( data );
		
		const mutation_name = getChangeName( data_type );
		const input_type_name = getInputTypeName( data_type );
		const mutation_args = getMutationArgs( data_type );
		const m_change = mutationEdit( data_type, mutation_name, input_type_name, mutation_args );
		const m_delete = mutationDelete( data_type );
		
		if( this.state.loading )
		{
			return <Loading/>;
		}
		return <div>
			<CategoryForm
				{...data }
				ID={ id }
				data={ data }	
				data_type={ data_type }						
				onChange={this.onChange}
				onRefresh={this.onRefresh}
				onSave={(state, id) => this.onSave(m_change, state, id)}
				onDelete={ id => this.onDelete(m_delete, id)}
				onClose={ this.onClose }
				saveLabel={this.props.isNew ? __("Save") :__("Update")}
				isNew={this.props.isNew}
				isOpen={ true } // for Yandex Maps
				ref={(node) => {this.card = node }}
			/> 
		</div>
	}
	onRefresh = () =>
	{
		const id = parseInt(this.props.match.params.id);
		const {data_type} = this.props;
		const query_name = querySingleName(data_type);
		const query_args = getQueryArgs(data_type);
		const query = querySingle(data_type, query_name, query_args, id);
		this.setState(
			{ loading	: true },
			() => this.props.client.query( { query: query, variables:{id : id } })
				.then( result  => 
					{
						console.log( result.data[query_name], query_name );
						this.setState({
							data	: result.data[query_name],
							loading	: false 
						});
					}
				)
		);
	}
	
	onChange = () =>
	{
		console.log("onChange");
	}
	onSave = (m_change, state, id) =>
	{
		const {data_type} = this.props;
		console.log("onSave");
		let input = getInput(state, data_type);		
		if (this.props.custom_variables) {
			input = {...input, ...this.props.custom_variables}
		}
		console.log( input );
		
		const mutation_name = getChangeName( data_type );
		const input_type_name = getInputTypeName( data_type );
		const mutation_args = getMutationArgs( data_type );
		const mutation_change = mutationEdit( data_type, mutation_name, input_type_name, mutation_args );
		const mutation_delete = mutationDelete( data_type );
		
		
		this.props.client.mutate({
			mutation: mutation_change,
			variables:
			{
				"id": id.toString(),
				"input": input
			},
			update: (store, { data: data }) =>
			{
				console.log( data, getChangeName( this.props.data_type ) );
				const respData = data[getChangeName( this.props.data_type )];
				if(respData)
				{
					console.log(state);
					console.log(respData);
					let _state = {};
					for(let e in respData)
					{
						_state[e] = respData[e];
					}
					//console.log(_state);
					/*
					this.setState( _state );
					
					const data1 = store.readQuery({query: this.props.query, variables: {}  });
					const new_state = { ...input, ..._state, id: respData.id};
					data1[ this.props.query_name ][ this.props.i ] = new_state;
					//console.log("data1:", data1);
					//console.log(new_state)
					store.writeQuery({ query: this.props.query, variables: {}, data: data1 });					
					this.props.onOpen(-1);
					*/
				}
					
				AppToaster.show({  
					intent: Intent.SUCCESS,
					icon: "tick", 
					message: __("Element updated successful.")
				});
			},
			//refetchQueries: [ { query: this.props.query, variables: {}}]
		});
	}
	onDelete = (m_delete, id) =>
	{
		console.log("onDelete");
	}
}

export default compose (
	withRouter,
	withApollo
)(DataState)