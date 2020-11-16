import React, {Fragment, Component} from "react";
import {__} from "../layouts/utilities/i18n";
import { AnchorButton, ButtonGroup, Button, Classes, Dialog, Intent, Tooltip, Callout } from "@blueprintjs/core";
import md5 from "md5";
import getJitsiExternalId from "../states/translationState/getJitsiExternalId";


import {
    getChangeName,
    getInputTypeName,
    getMutationArgs,
    getQueryArgs,
    getQueryName, mutationEdit,
    queryCollectionFilter
} from "../layouts/schema";
import gql from "graphql-tag";
import { graphql, compose, withApollo } from 'react-apollo';
import TextEditor from "../layouts/utilities/TextEditor";

import CategoryForm from "../states/SchoolDataTable/CategoryForm";

class StartTranslation extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			post_title		: __("New Translation"),
			external_title	: __("NewTranslation"),
			post_content	: __("this is Translation"),
			external_id		: __("thisisTranslation"),
			//geo				: [55.76, 37.64],
			is_locked		: false,
			isOpen			: false
		}
	}
	render()
	{
		//console.log(this.props);
		return <Fragment>
			<div className="btn btn-danger btn-large btn-block" onClick={this.onOpenDialog} >
				{__("Start new Translation")}
			</div>
			<Dialog	
				isOpen={this.state.isOpen}
				title={__("Settings of Translation")}
				onClose={this.onOpenDialog}
				style={{zIndex:-1}}
				className="booo"
			>
				<div className="d-flex flex-column justify-content-center p-5">
				{/*
					<input
						type="text"
						value={ this.state.post_titletitle }
						placeholder={__("Title")}
						className="form-control text-center mb-2"
						onChange={ this.onTitle }
					/>
					<TextEditor 
						onChange={this.onDescrText} 
						text={this.state.description}
					/>
				*/}
					
					<CategoryForm
						ID={null}
						data={ this.state }
						data_type={ "PE_Translation" }
						on={this.onChange}
						onChange={this.onChange}
						vertical={false}
						isHiddenSave={true}
						isHiddenClose={true}
						isHiddenDelete={true}
						isOpen={ true }
					/>
					<Button onClick={this.onStart} className="mt-2" >
						{__("Create")}
					</Button>
				</div>
			</Dialog>
		</Fragment>
	}
	
	
	onChange=(field, value, id) =>
	{
		let state = {...this.state};
		state[value] = field;
		this.setState( state, function()
		{
			console.log( this.state );
			//this.props.on(field, value);
		});
	}
	
	onDelete = () =>
	{
		
	}
	onClose =() =>
	{
		
	}
	onTitle = evt =>
	{
		this.setState({ 
			post_titletitle	: evt.currentTarget.value,
			external_title	: (evt.currentTarget.value).split(" ").join("") 
		});
	}
	onDescr = evt =>
	{
		console.log( evt.currentTarget.value.split(" ").join("") );
		this.setState({ 
			post_content 	: evt.currentTarget.value, 
			external_id		: (evt.currentTarget.value).split(" ").join("") 
		});
	}
	onDescrText = text =>
	{ 
		this.setState({ 
			post_content 	: text, 
			external_id		: (text).split(" ").join("") 
		});
	}
	onOpenDialog = () =>
	{
		this.setState({isOpen:!this.state.isOpen});
	}
	onStart = () =>
	{
		/*
		const mutation_name = getChangeName( "PE_Translation" );
		const input_type_name = getInputTypeName( "PE_Translation" );
		const mutation_args = getMutationArgs( "PE_Translation" );
		const changePE_Translation = mutationEdit( "PE_Translation", mutation_name, input_type_name, mutation_args );
		*/
		const changePE_Translation = gql`mutation changePE_Translation( $input: PE_TranslationInput ) 
		{
			changePE_Translation( input: $input ) 
			{
				id
				post_title
				__typename
			}
		}`;
		
		let pr = {...this.state};
		pr.external_id	= getJitsiExternalId( pr.post_title ); 
		pr.start_date 	= parseInt( new Date(pr.start_date).getTime() / 1000 ) ;
		pr.end_date 	= parseInt( new Date(pr.end_date).getTime() / 1000 ) ;
		delete pr.isOpen;
		
		this.props.client.mutate({
			mutation: changePE_Translation,
			variables: {input:pr},
			update: (store, { data: { changePE_Translation } }) =>
			{
				//console.log( changePE_Translation.id );
				this.props.onStart( changePE_Translation.id );
			}
		});
		/*
		const date = ( new Date() ).toString();
		const md = md5( date );
		const id = ( md ).substring( 0, 5 );
		const roomId = (md5( "rand" + date )).substring( 0, 5 );
		this.props.onStart( id );
		*/
	}
}
export default compose(
	withApollo
)(StartTranslation);