import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import $ from "jquery";
import { NavLink, Link } from 'react-router-dom';
import {getQueryArgs, getQueryName, queryCollection} from "../../layouts/schema";
import {Query, withApollo} from "react-apollo";
import Loading from "../../layouts/utilities/Loading";
import {compose} from "recompose";
import {withRouter} from "react-router";

class CourseTypeSelector extends Component
{
	state = {
		is_open:false
	}

	courseTypeSelector = (collection, id) =>{

		let {course} = this.props;

		let category = {};


		if(course){
			category = collection.filter( (e)=>{
				return e.id === course.parent ;
			});
		}else{
			category = collection[0];
			course = collection[0];
		}

		const list = collection.map((e, i) =>
		{
			const children = (e.children && e.children.length > 0) ? e.children[0]: [];
			if(children.id){
				return <li key={i} className="list-elem">
					<NavLink
						to={"/course/" + children.id}
					>
						{e.post_title}
					</NavLink>
				</li>
			}else{
				return <li key={i} className="list-elem ">
					<a>
						{e.post_title}
					</a>
				</li>
			}

		})

		console.log(category);

		const children = (category && category.children && category.children.length > 0)  ? category.children: [];
		const _courses = children.map((e, i) => {

			return <div className={ "col-6 p-2 course-select-item " + (e.id == course.id ? "active" : "") } course_id={e.id}>
				<NavLink to={"/course/" + e.id} className="course-item-alt ">
					<div className="thrumb" style={{backgroundImage:"url(" + e.thumbnail + ")"}} />
					<div className="title">
						{e.post_title}
					</div>
				</NavLink>
			</div>
		});

		return <Fragment>
			<div className="course_category_select pointer" onClick={this.openToggle}>
				<div className="filter category">
					{__(category.post_title)}
				</div>
				<div className={!this.state.is_open ? "_arrow closed" : "_arrow opened"} >

				</div>
			</div>
			<div className="d-block">
				<div
					className="courses_list"
					id={"sel_"+category.id}
					style={{height: this.state.is_open ?  this.state.height : 0 }}
				>
					<ul className="list">
						{list}
					</ul>
				</div>
			</div>
			<div className="col-12 borded">
				<div className="row">
					{_courses}
				</div>
			</div>
		</Fragment>
	}

	render()
	{
		const query_name = getQueryName("Bio_course");
		const query_args = getQueryArgs("Bio_course");

		const query = queryCollection( "Bio_course", query_name, query_args );

		const id = this.props.match.params.id;

		return <Query query={query}>
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <Loading/>;
					}
					if(data)
					{
						console.log(data[query_name][query_name]);
						const courses = data[query_name][query_name].filter(e => e.parent === 0);

						return this.courseTypeSelector(courses, id);
					}
					if(error)
					{
						return error.toString();
					}
				}
			}
		</Query>;
	}
	openToggle = evt =>
	{
		this.setState({
			is_open:!this.state.is_open,
			// height:$("#sel_"+this.props.course_group._id + " ul.list").height() + 15
		});
	}
}
export default compose(
	withApollo,
	withRouter
)(CourseTypeSelector);