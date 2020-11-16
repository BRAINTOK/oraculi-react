import React, {Component, Fragment} from "react";
import ReactDOM from 'react-dom';

export default class Popup extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			
		}
	}
	componentWillUnmount() 
	{
		if (this.defaultNode) {
			document.body.removeChild(this.defaultNode);
		}
		this.defaultNode = null;
	}
	
	render()
	{
		if (!this.props.node && !this.defaultNode) 
		{
			this.defaultNode = document.createElement('div');
			document.body.appendChild(this.defaultNode);
		}
		console.log(this.props.children);
		return ReactDOM.createPortal(
			<div className="card">AAAAAA</div>,
			this.props.node || this.defaultNode
		);
		//return this.state.isShow ? this.show() : this.hide()
	}
	show()
	{
		return <Fragment>
			<div className="bio_popup_back"/>
			<div className="bio_popup">
				{this.props.content}
			</div>		
		</Fragment>
	}
	hide()
	{
		return "";
	}
}