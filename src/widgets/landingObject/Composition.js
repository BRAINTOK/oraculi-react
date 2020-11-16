import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import matrix from "../../states/LandingState/data/matrix";
import { Button, Intent, Icon, Dialog, Tag } from "@blueprintjs/core";
import LayoutIcon from "../../layouts/LayoutIcon"; 

import composition1 from "../../assets/img/landing/composition1.svg";
import composition2 from "../../assets/img/landing/composition2.svg";
import composition3 from "../../assets/img/landing/composition3.svg";
import composition4 from "../../assets/img/landing/composition4.svg";

class Composition extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...this.props
		}
	}
	render()
	{
		//console.log(this.state);
		let btns = [];
		[
			{ id: 0, 	icon: composition1, title: "title by left and content by right" },
			{ id: 1, 	icon: composition2, title: "content by left and title by right" },
			{ id: 3, 	icon: composition3, title: "title and content are full width" },
			{ id: 2, 	icon: composition4, title: "content and title are full width" }
		]
			.map((e, i) =>
			{
				let ccl = e.id == this.state.value ? " active " : " " ; 
				btns.push( <div 
					key={i} 
					type={e.id}
					className={"l-icon-gian border-dark " + ccl} 
					onClick={this.onTypeSwitch}
				> 
					<div>
						<LayoutIcon
							src={ e.icon }
							className="layout-icon-giant grey "
						/>
						<div >
							{ __( e.title ) }
						</div>
					</div>
				</div> ) 
			})
		return <div className="p-4">
			{ btns } 
		</div>
	}
	onTypeSwitch = evt =>
	{
		const type = evt.currentTarget.getAttribute("type");
		this.setState({ value : type });
		this.props.onChange( type, "type" );
	}
}
export default Composition;