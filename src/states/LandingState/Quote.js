import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import { Icon } from "@blueprintjs/core";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import SectionContent from "./SectionContent";
import {components} from "./Section";

class Quote extends SectionContent
{
	
	is()
	{
		return this.props.data.text
	}
	renderContent()
	{
		const { type } = this.props;
		const { class_name, style, text, name, description } = this.props.data;
		return <div className={ "landing-quote " + class_name} style={style}>
			<div className="text">
				<span dangerouslySetInnerHTML={{ __html: text}} />
			</div>
			<div className="name">
				<span>
					{ name }					
				</span>
			</div>
			<div className="description">
				<span>
					{ description }
				</span>
			</div>
		</div>
	}
}
export default Quote;