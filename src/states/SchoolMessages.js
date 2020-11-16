import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {Route, Switch, withRouter} from "react-router";
import layouts from "../layouts/layouts";
import CourseTypeSelector from "./Course/CourseTypeSelector";
import comments from "../config/data/comments.json";
import courses from "../config/data/courses.json";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, queryCollection, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import RightPanel from "./Course/RightPanel";
import Message from "./Course/Message";
import CourseFilesWidget from "../widgets/CourseFilesWidget";
import lessons from "../config/data/lessons";
import LessonLikedFeed from "./Course/LessonLikedFeed";

class SchoolCourse extends BasicState
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


	messages = () =>
	{

		// const course = this.props;
		// const {courses} = categories;
		let routes = [];
		let my_messages = [];
		console.log(courses);
		const course = courses[0];
		const _courses = courses.map((e,i) =>
		{
			e.messages.forEach((eee, iii) =>
			{
				my_messages.push(
					<div className="message-label" key={ i  + "" + iii }>
						<div className="message-label-ava-cont">
							<div className="message-label-ava">

							</div>
						</div>
						<div className="message-label-title">
							<div className="message-label-name">
								{eee.author.display_name}
							</div>
							<div className="message-label-content">
								{eee.message}
							</div>
							<div className="message-label-menu">
								<span className="p-1 pointer">
									{__("Удалить")}
								</span>
								<span className="p-1 pointer">
									{__("Скачать файл")}
								</span>
							</div>
						</div>
						<div className="message-label-date">
							{eee.date}
						</div>

					</div>
				);
			})

			routes.push(
				<Route
					exact
					path = { "/messages/" + course.id +"/message/" + e._id }
					key={i}
					render={routeProps => (
						<div className="card" >
							<ul className="list-group list-group-flush">
								<li className="list-group-item p-0 d-flex justify-content-between " >
									<NavLink
										to={ "/course/" + course.id +"/message/" }
										className="px-4 py-3 no-a font-weight-bold"
									>
										{__("Назад")}
									</NavLink>
									<span className="px-4 py-3 font-weight-bold">
									{e.title}
								</span>
								</li>
								<li className="list-group-item p-0" >
									<div className="">
										{my_messages}
									</div>
								</li>
							</ul>
						</div>
					)}
					key={i }
				/>
			);
			return <li className="list-group-item p-0" key={i}>
				<NavLink
					// to={"/messages/" + course.id +"/message/" + e._id}
					to={"/messages/" }
					className="w-100 p-3 d-flex justify-content-between no-a"
				>
					<div>
						{e.title}
					</div>
					<div className="text-danger small">
						<span className="mr-2">
							{__("непрочитанных сообщений")}
						</span>
						<span className="mess-count">
							{14}
						</span>
					</div>
				</NavLink>
			</li>
		});
		routes.push(
			<Route
				exact
				path = { "/messages/" + course.id +"/message/"  }
				key={ courses.length }
				render={routeProps => (
					<div className="card" >
						<ul className="list-group list-group-flush">
							{_courses}
						</ul>
					</div>
				)}
			/>
		);

		return <div className="container">
			<div className="row">
				<div className="col-lg-3">
					<CourseTypeSelector course={course}/>
				</div>
				<div className="col-lg-6">
					<Switch>
						{routes}
					</Switch>
				</div>
				<div className="col-lg-3">
					<CourseFilesWidget course={course}/>
				</div>
			</div>
		</div>
	}


	//TODO курсы
	coursePanel = (course, _id)=>{

		const _comments = comments.comments
			.map((e, i) =>
			{
				return <Message {...e} key={i} level={0} />
			});


		const style_thrumbnail = course.thrumbnail ? {backgroundImage:"url(" + course.thrumbnail + ")"} : {backgroundColor: "#000000"};
		const style_icon = course.icon ? {backgroundImage:"url(" + course.icon + ")"} : {backgroundColor: "#ffffff"};

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
									{__(course.post_title)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{this.messages()}
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
)(SchoolCourse)