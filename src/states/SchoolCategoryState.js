import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState";
import LessonDescription from "./Course/LessonDescription";
import Gallery from "./Course/Gallery";
import ContactForm from "./ContactForm";
import $ from "jquery";
import student_works from "../config/data/student_works.json";
import {  
	Tab, Tabs, 
	Icon, 
	Intent, 
	InputGroup,
	Card, 
	Elevation, 
	Button, 
	ButtonGroup, 
	TextArea, 
	Tooltip,
	Position,
	PopoverInteractionKind, 
	Popover,
	MenuItem, FormGroup
} from "@blueprintjs/core";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {withRouter} from "react-router";
import {getQueryArgs, getQueryName, queryCollection} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import {NavLink} from "react-router-dom";
import StudentWorks from "./Course/StudentWorks";
import Advantages from "./Course/Advantages";
import CategoryTab from "./Course/CategoryTab";


//TODO необходим рефакторинг
class SchoolCategoryState extends BasicState
{	
	constructor(props)
	{
		super(props);
		this.state = {
			navbarTabId : "course" + this.props.match.params.id 
		};
	}

	render()
	{
		const id = this.props.match.params.id;

		const query_name = getQueryName("Bio_course");
		const query_args = getQueryArgs("Bio_course");
		const query = queryCollection( "Bio_course", query_name, query_args );

		return <div className="layout-state  bg-white">
				<div className="row">
					<div className="col-12 d-flex justify-content-center">
						<Query query={query}>
							{
								({ loading, error, data, client}) =>
								{
									if( loading)
									{
										return <Loading/>;
									}
									if(data)
									{
										//console.log(data[query_name][query_name]);
										const categories = data[query_name][query_name].filter(e => e.parent === 0);
										return <Tabs
											id="TabsExample"
											onChange={this.onTabs}
											selectedTabId={this.state.navbarTabId}
											animate={true}
											vartical={false}
										>
											{categories.map((e,i) => {
												return <Tab
													key={i}
													id={ "course" + e.id }
													title={e.post_title}
													panel={<CategoryTab category={e} i={i}/>}
												/>
											})};
										</Tabs>;
									}
									if(error)
									{
										return error.toString();
									}
								}
							}
						</Query>
					</div>
				</div> 
		</div>
	}

	onTabs = navbarTabId =>
	{
		const courseId = navbarTabId.replace("course", "");
		this.setState( { navbarTabId } );
		this.props.history.replace( "/category/" + courseId )
	}

}
export default compose(
	withApollo,
	withRouter
)(SchoolCategoryState);