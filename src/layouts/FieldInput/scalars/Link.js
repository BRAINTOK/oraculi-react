import React, {Component} from "react";
import {__} from "../../utilities/i18n";
import { Tag, ButtonGroup, Button, Intent, Icon } from "@blueprintjs/core";
import { NavLink } from 'react-router-dom';
import ScalarField from "./ScalarField";

export default class Link extends ScalarField
{
	isDesabled()
	{
		const {field, title, value, extended_link, external_link_data } = this.props;
		return <NavLink
			to={ "" + value }
			className="m-1 w-100"
		>
			<Icon icon="globe" /> { value }
		</NavLink>;
	}
}