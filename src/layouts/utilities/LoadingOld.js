import React, {Component} from "react";
import { Intent, Spinner } from "@blueprintjs/core";

export default class Loading extends Component
{
	constructor(props)
	{
		super(props);
		this.state={
			isHidden: this.props.interval !== 0,
			size: this.props.size ? this.props.size : 3,
			interval: this.props.interval ? this.props.interval : 1000
		}
	}
	componentDidMount() 
	{
		this.timer = setTimeout(() => 
		{
			this.setState({isHidden:false});
		}, this.state.interval);
	}
	componentWillUnmount() 
	{
		clearTimeout(this.timer);
	}
	render()
	{
		return this.state.isHidden ? "" : <Spinner intent={Intent.LIGHT} size={Spinner.SIZE_SMALL * this.state.size} />;
	}
	render2()
	{
		return "";//<i className="fas fa-redo-alt fa-spin"/>;
	}
}