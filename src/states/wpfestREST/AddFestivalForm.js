import React, {Component, Fragmnent} from "react";
import _fetch from "./";
import $ from "jquery";
import User from "./utilities/User";
import {setCookie, getCookie} from "./utilities/utils"; 
import {compose} from "recompose";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";   
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
import {AppToaster} from "../../layouts/utilities/blueUtils";

class AddFestivalForm extends Component
{
	render()
	{
		return <Button className="" minimal={true}>
			{__("add")}
		</Button>
	}
}
export default AddFestivalForm;
