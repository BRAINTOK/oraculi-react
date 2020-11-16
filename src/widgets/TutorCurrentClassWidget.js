import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import { NavLink, Link } from 'react-router-dom'; 

class TutorCurrentClassWidget extends Component
{
	render()
	{
		if(!this.props.bio_class || this.props.bio_class.length == 0)
			return null;
		const courses = this.props.bio_class.map((e, i) =>
		{
			const cl = "tutor-course-widget-cont";
			return <div className="tutor-course-widget-container" key={i}>
				<NavLink
					className={cl} 
					to={"/class-lessons/" + e.id + "/" + this.props.prefix }					
				>
					<div className="tutor-course-widget-logo" style={{ backgroundImage:"url(" + e.logotype + ")" }} />
					<div>
						<div className="tutor-course-widget-title">
							{e.post_title + " " +  __("class")}
						</div>
					</div>
				</NavLink>
			</div>
		});
		return  <div className="course_category_select mb-5" >
			<div className="aside-widget-title">
				{__("Classes")}
			</div>
			<div>
				{courses}
			</div>
		</div>
	}
}
export default TutorCurrentClassWidget;