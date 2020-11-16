import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import {__} from "../layouts/utilities/i18n";
import Loading from "../layouts/utilities/Loading";
import { graphql, compose, withApollo, Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Moment from 'react-moment';
import moment from 'moment';
import $ from "jquery";
import {withRouter} from "react-router";
import { NavLink } from 'react-router-dom'; 
import { AnchorButton, Button, Classes, Dialog, Intent, Tooltip, Position, Callout } from "@blueprintjs/core";
import {getQuery, getQueryArgs, getQueryName, queryCollection} from "../layouts/schema";
import getWidget, { initArea } from "../layouts/utilities/getWidget";
import Translation from "./translationState/Translation";

import source from "../config/source.json"; 

class TranslationsState extends BasicState
{ 
	transls;
	render()
	{

		const data_type = "PE_Translation";
		/*
		const query_name = getQueryName(data_type)
		const query_args = getQueryArgs(data_type)

		const query = queryCollection( data_type, query_name, query_args );

		this.props.client.query({
			query: query,
			variables: {},
		}).then(result => {
			//console.log(result);
		})
		//console.log(this.props);
		*/
		const translations = source.Translation || [];
		console.log(this.props);
		return <Fragment>
			<div className="layout-state p-0">
				<div className="container joppa position-relative">
					<div className="row mt-4">					
						<div className="col-md-3">
							<h1>
								{__("Translations")}
							</h1>
							{
								initArea(
									"aside-left",
									{
										...this.props, 
										translations: translations, 
										onStart:this.onStart,
										route:this.props.location.pathname
									}
								)
							}
						</div>
						<div className="col-md-9 m-main pt-5">
							<Callout >
								{__("Вы можете начать новую трансляцию, нажав кнопку «Начать трансляцию». Вы можете присоединиться к трансляциям, список которых указаны на виджете. Чтобы создавать или  участвовать в трансляциях не надо иметь учётной записи на нашем портале.")}
							</Callout>
							<div className="mt-4"> 
								{this.list( data_type )}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	}
	list( data_type )
	{
		const query_name = getQueryName(data_type)
		const query_args = getQueryArgs(data_type)
		const query = queryCollection( data_type, query_name, query_args );

		return	<Query query={query} >
		{
			({ loading, error, data, client}) =>
			{
				if( loading)
				{
					return <Loading/>;
				}
				if(data)
				{
					this.transls = data[query_name] || [];
					//console.log(this.transls);
					const translations = this.transls.length > 0 
						?
						this.transls
							.map((e, i)=>
							{
								const start_date = e.start_date
									?
									moment( e.start_date ).format('D.MM.YYYY HH:mm')
									:
									null
								const end_date = e.end_date
									?
									moment( e.end_date ).format('D.MM.YYYY HH:mm')
									:
									null
								return <div className="row mb-1 border" key={i}> 
									<div className="col-4 p-3">
										<div className="title">
											{e.post_title}			
										</div>
										<div className="date">
											<div>
												{ start_date }
											</div>
											<div>
												{ end_date }
											</div>
										</div>
									</div>
									<div 
										className="col-7 p-3 d-flex align-items-center"  
										dangerouslySetInnerHTML={{ __html: e.post_content }}
									/>
									<div className="col-1 d-flex p-1 flex-column justify-content-end hidden">
										<Tooltip 
											content={__("follow")} 
											position={Position.LEFT} 
											className="d-flex justify-content-end"
										>
											<Button 
												fill={true}
												className="mb-1"
												icon="follower"
												minimal={true}
											/>
										 </Tooltip>
										 <Tooltip
											content={__("favorite")}											
											position={Position.LEFT} 
											className="d-flex justify-content-end"
										>
											<Button 
												fill={true}
												className="mb-0"
												icon="heart"
												minimal={true}
											/>
										 </Tooltip>
									</div>
								</div>
							}) 
						:
						<Callout intent={Intent.WAITING}>
							{__("No items")}
						</Callout>
					return <div className="w-100 px-3">
						{translations}
					</div>
				}
				if(error)
				{
					return error.toString();
				}
			}
		}
		</Query>
	}
	onStart = id =>
	{
		this.props.history.push("/translation/" + id);
	}
}

export default compose(
	withApollo,
	withRouter
)(TranslationsState);

