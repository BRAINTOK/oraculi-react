import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import { Button, Intent, Icon, Dialog, Tag, Card } from "@blueprintjs/core";
import LayoutIcon from "../../layouts/LayoutIcon";
import {CardFieldTypes} from "../../states/LandingState/Card";
import matrix from "../../states/LandingState/data/matrix"; 
import __cards from "../../assets/img/landing/card.svg";

class CardButton extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...this.props		
		}
		this.ref = React.createRef();
	}
	render()
	{	
		// console.log( this.props.object ); 
		return <div className=" square2 bg-secondary m-1 btn-item" onClick={this.onClick}>			
			<div>
				<LayoutIcon
					src={ __cards }
					className=" layout-icon white"
				/>
				<div className="small text-white ">
					{ this.props.object.title }
				</div>
			</div>
		</div>;
	}
	onClick = () =>
	{
		this.props.onClick( this.props.object );
	}
}
export default CardButton;
