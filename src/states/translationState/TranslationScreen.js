import React, {Component, Fragment} from "react";
import Translation from "./Translation";

class TranslationScreen extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			currentID : this.props.currentID
		}
	}
	render()
	{
		return currentID
		?
		<Translation id={this.props.currentID} />
		:
		<div className="empty-translation">
		
		</div>
	}
}
export default TranslationScreen;