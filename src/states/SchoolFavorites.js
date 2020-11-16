import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {withRouter} from "react-router";
import CourseTypeSelector from "./Course/CourseTypeSelector";
import Lesson from "./Course/Lesson";
import lessons from "../config/data/lessons.json";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import RightPanel from "./Course/RightPanel";
import LessonLikedFeed from "./Course/LessonLikedFeed";

class SchoolFavorites extends BasicState
{

	constructor(props)
	{
		super(props);
		this.state = {
			name:"",
			title:"",
			email:"",
			content:""
		};
	}

	//TODO курсы
	coursePanel = (course, _id)=>{

		const _last = lessons.filter(lesson => lesson.liked === 1).map((e,i) =>
		{
			return <LessonLikedFeed key={i} lesson={e} />
		});

		return <div className="layout-state  bg-white">
			<div
				className="course_cover img_cover"
				style={{backgroundImage:"url(" + course.icon + ")"}}
			>
				<div className="container min-h-100">
					<div className="row min-h-100">
						<div className="course_top_title col-12">
							<div className="head">
								<div className="logo" style={{backgroundImage:"url(" + course.icon + ")"}}>

								</div>
								<div className="title">
									{__(course.post_title)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="center-head">
				<div className="butn">
					{__("Новые записи")}
				</div>
			</div>
			<div className="container mt-3">
				<div className="row">
					<div className="col-lg-3">
						<CourseTypeSelector course={course}/>
					</div>
					<div className="col-lg-6">
						{_last}
					</div>
					<div className="col-lg-3">
						<RightPanel course={course}/>
					</div>
				</div>
			</div>
		</div>;
	}

	render()
	{
		const query_name = getQueryName("Bio_course")
		const query_args = getQueryArgs("Bio_course")

		const query = querySingle( "Bio_course", query_name, query_args );

		const id = this.props.match.params.id;

		return <Query query={query} variables={{"id": id}}>
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
						const single = data[query_name][query_name][0] ? data[query_name][query_name][0] : [] ;

						return this.coursePanel(single, id);
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
)(SchoolFavorites)