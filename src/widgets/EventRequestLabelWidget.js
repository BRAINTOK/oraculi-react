import React, {Component, Fragment} from "react";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../layouts/utilities/i18n";
import Loading from "../layouts/utilities/Loading";
import {compose} from "recompose";
import { Query, withApollo } from "react-apollo"; 
import gql from "graphql-tag";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, 
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";

class EventRequestLabelWidget extends Component
{
	render()
	{
		console.log(this.props.elem.request_count);
		return this.props.data_type == "Bio_Event" && this.props.data[0] == "edit"
		?
		<div className="position-relative">
			{ this.props.defArea }
			{
				this.props.elem.request_count > 0
				?
				<div className="labla" title="Requests">
					{this.props.elem.request_count}
				</div>
				:
				null
			}
		</div>
		:
		this.props.defArea;
	}
}
export default compose(
	withApollo,
	withRouter
)(EventRequestLabelWidget);
