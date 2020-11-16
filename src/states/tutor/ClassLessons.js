import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import CurrentCourse from "./CurrentCourse"; 
import CourseArticleList from "./CourseArticleList"; 
import CourseTestList from "./CourseTestList"; 
import CourseEventList from "./CourseEventList"; 
import CourseTalkRoom from "./CourseTalkRoom"; 
import $ from "jquery"; 
import {Router, Route, Switch, Redirect, withRouter} from "react-router"; 
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo"; 
import Loading from "../../layouts/utilities/Loading";
import { NavLink } from 'react-router-dom';
import getWidget, { initArea } from "../../layouts/utilities/getWidget";
 

class ClassLessons extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			tab:"articles"
		};
	}
	render()
	{
		const {id, course, tabs, route, onLeave, user} = this.props;
		console.log( course );
		const url = "/" + route + "/" + id ; 
		return <div className=" mt-5">
				<div className="tutor-row">
					<div className="tutor-left-aside  mobile-relatived">
						 <div className="course_category_select mb-5" >
							<div>
							{
								this.props.tabs.map((e,i) =>
								{ 
									return <NavLink 
										className="tutor-tab d-block "
										activeClassName=" active "
										exact
										to={ url + "/" + e.name }  
										key={i}
									>
										{ __(e.title) }
									</NavLink>
								})
							}
							</div>
						</div>
						{ 
							initArea( 
								"single-course-lessons-left-aside", 
								{ ...course, user : user } 
							) 
						}
					</div>
					<div className="tutor-main">									
						<Switch>
							<Route   
								path={ url } 
								exact={true} 
								component = { routeProps => (
									<div> 
										{course.post_content}
									</div>
								)} 
							/>
						{		
							tabs.map((e,i) =>
								{	
									const _Tab = e.component ;
									return <Route   
										path={ url + "/" + e.name }
										key={i}
										exact={false} 
										component = { routeProps => (
											<_Tab
												{ ...course } 
												user={ user } 
												onLeave={ onLeave} 
												type={this.props.type || "bio_class"}
											/>
										)} 
									/>
								}
							)
						}
						</Switch>					
						
						{ 
							initArea( 
								"single-course-lessons", 
								{ 
									...course, 
									user : this.props.user,
									type:"course" 
								}
							) 
						} 
					</div>
					<div className="tutor-right-aside">
						{ 
							initArea( 
								"single-course-lessons-right-aside", 
								{ 
									...course, 
									user : this.props.user,
									type:"course" 
								}
							) 
						} 
					</div>
				</div>
			</div>
		
			
	}
}
export default compose(
	withRouter
)(ClassLessons) 