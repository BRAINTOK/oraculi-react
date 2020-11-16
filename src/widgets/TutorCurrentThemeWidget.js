import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import { NavLink, Link } from 'react-router-dom'; 

class TutorCurrentThemeWidget  extends Component
{
	render()
	{
		if(!this.props.bio_biology_theme || this.props.bio_biology_theme.length == 0)
			return null;
		const courses = this.props.bio_biology_theme.map((e, i) =>
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
						return <NavLink 
							className="pl-4 tutor-course-widget-cont" 
							key={iii} 
							to={"/theme-lessons/" + eee.id + "/" + this.props.prefix }	
						>
							<div>
								<div className="tutor-course-widget-title2">
									{"-- " + eee.post_title}
								</div>
							</div>
						</NavLink>
					});
					return <div>
						<NavLink 
							className={cl1} 
							key={ii} 
							to={"/theme-lessons/" + ee.id + "/" + this.props.prefix }	
						>
							<div>
								<div className="tutor-course-widget-title2">
									{"- " + ee.post_title}
								</div>
							</div>
						</NavLink>
						{children2}
					</div>
				})
				: null;
			return <div className="tutor-course-widget-container" key={i}>
				<NavLink
					className={cl} 
					to={"/theme-lessons/" + e.id + "/" + this.props.prefix }					
				>
					<div className="tutor-course-widget-logo" style={{ backgroundImage:"url(" + e.icon + ")" }} />
					<div>
						<div className="tutor-course-widget-title">
							{e.post_title}
						</div>
					</div>
				</NavLink>
				{children}
			</div>
		});
		return  <div className="course_category_select mb-5" >
			<div className="aside-widget-title">
				{__("Themes")}
			</div>
			<div>
				{courses}
			</div>
		</div>
	}
}
export default TutorCurrentThemeWidget;