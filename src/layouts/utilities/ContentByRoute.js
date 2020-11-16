import React, {Component, Fragment} from "react";
import { getByRoute } from "../routing";

export default class ContentByRoute extends Component 
{
	render()
	{
		const cont = getByRoute( this.props.routing );
		return <div className="">
			{ cont }
		</div>
	}
}	