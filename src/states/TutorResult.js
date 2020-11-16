import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState";

import courses from "../config/data/courses";
import $ from "jquery";

import {withRouter} from "react-router";
import layouts from "../layouts/layouts";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, querySingleName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';


class TutorResult extends BasicState
{
	render()
	{
		const query_name 	= querySingleName("Bio_ImageResult"); 
		const query_args 	= getQueryArgs("Bio_ImageResult");
		const query 		= querySingle( "Bio_ImageResult", query_name, query_args );
		const id 			= this.props.match.params.id;
		return <div className="layout-state p-0">
			<div className="position-relative " >
				<Query query={query} variables={{"id": id}}>
				{
					({ loading, error, data, client}) =>
					{
						if( loading)
						{
							return <div className="layout-state bg-white"><Loading/></div>;
						}
						if(data)
						{	
							console.log(data.getBio_ImageResult);
							const result = data.getBio_ImageResult ? data.getBio_ImageResult : {} ;
							return <div className=" mt-5">
									<div className="tutor-row">
										<div className="tutor-left-aside  mobile-relatived">
											{ initArea( "single-result-left-aside", { ...result, user:this.props.user } ) }
										</div>
										<div className="tutor-main">
											<div className="sub-title text-center">
												{result.post_title}
											</div>	
											<div className="d-flex justify-content-center mb-4">
												<img 
													src={result.thumbnail}
													style={{maxWidth:"100%", maxHeight:500}}	
												/>
											</div>
											<div 
												className="r-course-underline"
												dangerouslySetInnerHTML={{ __html: result.post_content }}
											/> 
											{ initArea( "single_result", { ...result, user:this.props.user  } ) } 
										</div>
										<div className="tutor-right-aside">
											{ initArea( "single-result-right-aside", { ...result, user:this.props.user  } ) }
										</div>
									</div>
								</div>
						}
					}
				}
				</Query>
			</div>
		</div>							
	}
}

export default  compose(
	withApollo,
	withRouter
)(TutorResult);