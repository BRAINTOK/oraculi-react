import React, {Component} from "react";
import { Intent, Spinner } from "@blueprintjs/core";

export default class SuperLoading extends Component
{
	render()
	{
		return <div className="bio-super-loading">
			<Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_LARGE} />
		</div>;
	}
	render2()
	{
		return <div className="bio-super-loading">
			<i className="fas fa-redo-alt fa-spin"/>
		</div>;
	}
}