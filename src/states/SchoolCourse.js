import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState";
import lessons from "../config/data/lessons.json";
import courses from "../config/data/courses.json";
import { NavLink, Link } from 'react-router-dom';
import {withRouter} from "react-router";
import CourseTab from "./Course/CourseTab";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";

class SchoolCourse extends BasicState
{
	constructor(props)
	{
		super(props);
		this.state = { };
	}
	
	//TODO курсы
	render()
	{
		const query_name = getQueryName("Bio_course");
		const query_args = getQueryArgs("Bio_course");
		const query = querySingle( "Bio_course", query_name, query_args );
		const id = this.props.match.params.id;

		return <Query query={query} variables={{"id": id}}>
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <div className="layout-state bg-white"><Loading/></div>;
					}
					if(data)
					{
						//console.log(data);
						const single = data[query_name][query_name][0] ? data[query_name][query_name][0] : [] ;
						const style_thrumbnail = single.thrumbnail ? {backgroundImage:"url(" + single.thrumbnail + ")"} : {backgroundColor: "#000000"};
						const style_icon = single.icon ? {backgroundImage:"url(" + single.icon + ")"} : {backgroundColor: "#ffffff"};
						return <div className="layout-state  bg-white">
							<div
								className="course_cover img_cover"
								style={style_thrumbnail}
							>
								<div className="container min-h-100">
									<div className="row min-h-100">
										<div className="course_top_title col-12">
											<div className="head">
												<div className="logo" style={style_icon}>

												</div>
												<div className="title">
													{__(single.post_title)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<CourseTab 
								{...single} 
								lessons={lessons} 
								last={lessons} 
								courses={courses}
							/>	
						</div>;
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
)(SchoolCourse)