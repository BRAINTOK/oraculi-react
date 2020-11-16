import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";

class Testanomial extends Component
{
	render()
	{ 
		const { class_name, style } = this.props;
		const { text, name, avatar, description } = this.props ;
		return <div className={ "landing-testanomial " + class_name} style={style}>
			<div 
				className="text"
				dangerouslySetInnerHTML={{ __html: text}}
			/>
			<div className="d-flex">
				<div className="avatar" style={{ backgroundImage:"url(" + avatar + ")" }}>
			
				</div>
				<div className="ltest-cont">
					<div className="name">
						{name}
					</div>					
					<div 
						className=""
						dangerouslySetInnerHTML={{ __html: description}}
					/>
				</div>
			</div>
		</div>
	}
}
export default Testanomial;