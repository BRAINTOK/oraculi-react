import React, {Component} from "react";
import ExpertCheck from "./ExpertCheck";
import WPFestSettings from "./utilities/WPFestSettings";
import {__} from "../../layouts/utilities/i18n";

class ExpertCheckList extends Component
{
	render()
	{
		const{ data, member_id, max_raiting} = this.props;
		let checks = [];
		for(var i=0; i< max_raiting + 1; i++)
		{
			checks.push(
				<ExpertCheck 
					id={data.id} 
					name={data.title} 
					val={data.rating}
					index={i} 
					member_id={member_id} 
					key={data.id +"_"+ i}
					old={ parseInt(data.rating, 10) }
					onCheck={this.props.onCheck}
				/>
			);
		}
		const classrs = ["fmRU_button hint hint--left"];
		if(WPFestSettings.is_comment) 
			classrs.push("hidden");
		return <div className="d-flex">
			<div>
				{checks}
			</div>
			<div 
				className={classrs.join(" ")} 
				data-hint={__("Comment this")}
				style={{minWidth: 50}} 
				onClick={this.onEdit}
			>
				<i className="fas fa-microphone-alt"></i>					
			</div>
		</div>
	}
	onEdit = () =>
	{
		this.props.onEdit();
	}
}
export default ExpertCheckList;