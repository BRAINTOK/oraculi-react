import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import {sprintf} from "../layouts/utilities/sprintf";
import BasicState from "../layouts/BasicState";
import CourseTypeSelector from "../widgets/CourseTypeSelector";
import CourseFilesWidget from "../widgets/CourseFilesWidget";
import { 
	Icon, Tag, 
	Intent, Tooltip, 
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, 
	InputGroup, Dialog
} from "@blueprintjs/core";
import { NavLink, withRouter } from 'react-router-dom';


class SearchState extends BasicState
{
	addRender = () =>
	{
		console.log( this.props);
		return <div className="container">
			<div className="row">
				<div className="col-md-3 m-12 order-md-1 order-2">
					<CourseTypeSelector />
				</div>
				<div className="col-md-6 m-12 order-md-2 order-1">
					<div className="page-title text-center mb-3">
						{ sprintf(__("Результаты поиска по запросу: %s"), this.props.location.state.s)}
					</div>
				</div>
				<div className="col-md-3 m-12 order-3">
					<CourseFilesWidget />
				</div>
				<div className="col-12">
					
				</div>
			</div>
		</div>;
	}
	getRoute = () =>
	{
		return "search";
	}
}

export default withRouter(SearchState);

