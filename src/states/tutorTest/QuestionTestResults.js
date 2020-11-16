import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";

class QuestionTestResults extends Component
{
	render()
	{
		console.log(this.props);
		const {result, origin} = this.props;
		if(!result)
		{
			return null;
		}
		const is_right = result && result.answers.filter(e =>
		{ 
			return result.right.filter(ee => 
			{
				return ee == e;
			}).length > 0;
		}).length > 0;
		const rights = result.right.map((e, i) =>
		{
			const text = origin.answers.filter(ee => 
			{
				return ee.id == e
			})
			//console.log(text)
			return <div key={i}>
				<div className="small text-success">
					<span>
						{__("right answer")} :
					</span>
					<span className="text-bold">
						{text[0] ? text[0].post_content : "---"}
					</span>
				</div>
			</div>
		});
		const your = !is_right 
			?
			 result.answers.map((e, i) =>
			{
				const text = origin.answers.filter(ee => 
				{
					return ee.id == e
				})
				//console.log(text)
				return <div key={i}>
					<div className="small text-danger">
						<span>
							{__("Your answer")} :
						</span>
						<span className="text-bold">
							{text[0] ? text[0].post_content : "---"}
						</span>
					</div>
				</div>
			})
			:
			null;
		
		
		const sign = is_right
			?
			<Icon icon="tick" intent={Intent.SUCCESS} />
			:
			<Icon icon="cross" intent={Intent.DANGER} />
		
		return <div className="my-2 row dat2">
			<div className="col-md-11 p-3">
				<div>
					{origin.post_title}
				</div>
				{rights}
				{your}
			</div>
			<div className="col-md-1 p-3">
				{sign}
			</div>
		</div>;
	}
}
export default QuestionTestResults;