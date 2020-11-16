import React, {Component, Fragment} from "react";  
import BasicState from "../layouts/BasicState";
import Loading from "../layouts/utilities/Loading";
import { graphql, compose, withApollo, Query } from 'react-apollo';
import gql from "graphql-tag";
import {withRouter} from "react-router";
import TranslationContainer from "./translationState/TranslationContainer";
import source from "../config/source.json";


import {
	getChangeName,
	getInputTypeName,
	getMutationArgs,
	getQueryArgs,
	getQueryName, mutationEdit,
	queryCollection,
	queryCollectionFilter,
	querySingleName,
	querySingle
} from "../layouts/schema";

class SingleTranslationState extends BasicState
{
	/*
	constructor(props)
	{
		super(props);
		this.state = { } 
		console.log( (new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).getTime()/1000 );
	} 
	*/
	getRoute = () =>
	{
		return "translation";
	}
	addRender()
	{
		const getPE_Translation = gql`query getPE_Translation($id:String)
		{
			getPE_Translation(id:$id)
			{
				id 
				post_title 
				post_content 
				start_date 
				end_date 
				external_id 
				external_title 
				is_locked 				
				post_author
				{
					id
					display_name
					avatar
				}
				pe_room
				{
					id 
					post_title 
					post_content 
					external_id 
					is_locked 
					password 
					post_author
					{
						id
						display_name
						avatar
					}
				} 
			}
		}`;
		
		return <Query query={getPE_Translation} variables={{id:this.props.match.params.id}}>
				{
					({ loading, error, data, refetch}) => 
					{
						if( loading)
						{
							return <Loading/>;
						} 
						if(data) 
						{
							//console.log( data.getPE_Translation ); 
							let translation =  data.getPE_Translation || {} ; 
							return  <TranslationContainer
								{...this.props}
								translation={translation}
							/>
						}		
					}
				}
				</Query>;
	}
	
}

export default compose( 
	withApollo,
	withRouter
)(SingleTranslationState);

