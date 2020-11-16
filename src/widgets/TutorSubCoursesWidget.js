import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import { NavLink, Link } from 'react-router-dom'; 

class TutorSubCoursesWidget extends Component
{
	render()
	{
		if(!this.props.children || this.props.children.length == 0)
			return null;
		const courses = this.props.children.length > 0
			?
			this.props.children.map((e, i) =>
			{
				const cl = e.children && e.children.length > 0 
					?
					"tutor-course-widget-cont sub"
					:
					"tutor-course-widget-cont";
				const children = e.children 
					? 
					e.children.map((ee,ii) =>
					{
						const cl1 = ee.children.length > 0 
							?
							"tutor-course-widget-cont sub"
							:
							"tutor-course-widget-cont";
						const children2 = ee.children.map((eee,iii) =>
						{ 
							return <NavLink className="pl-4 tutor-course-widget-cont" key={iii} to={"/course-lessons/" + eee.id}	>
								<div>
									<div className="tutor-course-widget-title2">
										{"-- " + eee.post_title}
									</div>
								</div>
							</NavLink>
						});
						return <div>
							<NavLink className={cl1} key={ii} to={"/course-lessons/" + ee.id}	>
								<div>
									<div className="tutor-course-widget-title2">
										{"- " + ee.post_title}
									</div>
								</div>
							</NavLink>
							{children2}
						</div>
					})
					:
					null;
				return <div className="tutor-course-widget-container" key={i}>
					<NavLink
						className={cl} 
						to={"/course-lessons/" + e.id}					
					>
						<div className="tutor-course-widget-logo" style={{ backgroundImage:"url(" + e.logotype + ")" }} />
						<div>
							<div className="tutor-course-widget-title">
								{e.post_title}
							</div>
						</div>
					</NavLink>
					{children}
				</div>
			})
			:
			<div className="alert alert-secondary">
				{__("No sub-courses exists")}
			</div>;
		return  <div className="course_category_select mb-5" >
			<div className="title">
				{__("Sub Courses:")}
			</div>
			<div>
				{courses}
			</div>
		</div>
	}
}
export default TutorSubCoursesWidget;