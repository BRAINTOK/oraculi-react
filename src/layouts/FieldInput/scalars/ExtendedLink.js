import React, {Component} from "react";
import {__} from "../../utilities/i18n";
import { Tag, ButtonGroup, Button, Intent } from "@blueprintjs/core";
import { NavLink } from 'react-router-dom';
import ScalarField from "./ScalarField";

export default class ExtendedLink extends ScalarField
{	
	isEnabled()
	{
		const {field, title, value, extended_link, external_link_data } = this.props;
		return <NavLink
			to={{
				pathname: "/" + extended_link,
				state:external_link_data
			}}
			className="m-1 mb-2"
		>
			{ value }
		</NavLink>;
	}
	isDesabled()
	{
		return this.isEnabled();
	}
}