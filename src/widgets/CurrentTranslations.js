import React, {Component, Fragment} from "react";
import { AnchorButton, Button, ButtonGroup, Classes, Dialog, Intent, Tooltip, Position } from "@blueprintjs/core";
import Loading from "../layouts/utilities/Loading";
import {__} from "../layouts/utilities/i18n";
import { graphql, compose, withApollo, Query } from 'react-apollo';
import {withRouter} from "react-router";
import { NavLink } from 'react-router-dom'; 

import {
	getChangeName,
	getInputTypeName,
	getMutationArgs,
	getQueryArgs,
	getQueryName, mutationEdit,
	queryCollection,
	queryCollectionFilter
} from "../layouts/schema";

import source from "../config/source.json";
const query_name = getQueryName("PE_Translation");
const query_args = getQueryArgs("PE_Translation");
const query_filter = "";
const getPE_Translations = queryCollection( "PE_Translation", query_name, query_args, query_filter );

class CurrentTranslations extends Component
{
	render()
	{
		if( this.props.loadingTranslations )
			return <Loading />;
		console.log(this.props.translations);
		const translations = this.props.translations; 
		return <div className="widget-translation-li">
		{
			this.props.translations
				?
				this.props.translations
					//.filter(e => new Date(e.start_date ) < new Date() && new Date(e.end_date ) > new Date() ) 
						.map((e, i) =>
						{ 
							return <Tooltip 
								popoverClassName="d-block w-100"								
								className="d-block w-100" 
								content={__("Join to ") + e.post_title}
								position={Position.RIGHT} 
							>
								<NavLink key={i}
								className="d-block w-100"
								to={"/translation/" + e.id}
							>
									<Button className="d-block w-100" rightIcon="play" minimal={true}>
										{e.post_title}
									</Button>
								</NavLink>
							</Tooltip>
						})
				:
				null
		}
		</div>
	}
}
export default compose(
	graphql(getPE_Translations,
	{
		options: ( props ) => ({
			variables: { },
			name: "getPE_Translations"
		}),
		props: ( p ) => {
			const data = p.data;
			console.log("getPE_Translations", data);
			return {
				loadingTranslations: data.loading, 
				translations: data.getPE_Translations, 
				fetchMorePlaces: data.fetchMore
			}
		},
	}),
	withApollo,
	withRouter
)(CurrentTranslations);