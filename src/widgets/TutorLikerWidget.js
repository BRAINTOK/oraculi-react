import React, {Fragment, Component} from "react";
import {__} from "../layouts/utilities/i18n";  
import $ from "jquery"; 
import {withRouter} from "react-router"; 
import {compose} from "recompose";
import {Mutation, Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading"; 
import {Callout, Classes, Button, Intent, Dialog} from "@blueprintjs/core";
import {AppToaster} from "../layouts/utilities/blueUtils";

import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';


class TutorLikerWidget extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			is_favorite: this.props.is_favorite
		};
	}
	render()
	{
		const mutation = gql`
		mutation changeBio_Article( $id:String, $input: Bio_ArticleInput)
		{
		  changeBio_Article( id:$id, input:$input )
		  {
			  is_favorite
		  }
		}
		`;
		return <Mutation mutation={mutation} >
		{
			(changeBio_Article, data) => (
				<div 
					className={" like " + (this.state.is_favorite ? " liked" : "") } 
					title={__("add to Favorites")}
					onClick={ evt => 
					{
						evt.preventDefault();
						this.onLike(evt, changeBio_Article);
					}} 
				/>
			)
		}
		</Mutation>
	}
	
	onLike = (evt, changeBio_Article) =>
	{
		changeBio_Article({
				variables:
				{
					id: this.props.id,
					input:{
						"is_favorite" : !this.state.is_favorite
					}
				},
				update: (store, data ) =>
				{
					console.log( data.data.changeBio_Article );
					this.setState({is_favorite : !this.state.is_favorite})
					if(data.data.changeBio_Article.is_favorite) 
						AppToaster.show({
							intent: Intent.SUCCESS,
							icon: "tick",
							message: __("Добавлено в избранное")
						});
					else
						AppToaster.show({
							intent: Intent.WARNING,
							icon: "tick",
							message: __("Удалено изи избранного")
						});
				}
			})
		//;
	}
}

export default  compose(
	withApollo,
	withRouter
)(TutorLikerWidget);