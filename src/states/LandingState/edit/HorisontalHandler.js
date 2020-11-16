import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import $ from "jquery";

class HorisontalHandler extends Component
{
	
	static defaultProps = {
		onMouseMove: evt => { console.log(evt.screenX) },
	};
	constructor(props)
	{
		super(props);
		this.state = {
			...this.props,
			isClick : false,
			x : this.props.x,
			proportia:[0, 0]
		}
	}	
	componentWillUpdate(nextProps)
	{
		if(nextProps.is_edit != this.state.is_edit)
		{
			this.setState({is_edit: nextProps.is_edit});
		}
		if(nextProps.myX != this.state.myX)
		{
			console.log(this.state.myX);
			this.setState({myX: nextProps.myX});
		}
	}
	componentDidMount() 
	{ 
		document.body.addEventListener('click', this.onMouseLeaveHandler);
		document.body.addEventListener('mousemove', this.onMove);

	}
    componentWillUnmount() 
	{ 
		document.body.removeEventListener('click', this.onMouseLeaveHandler);
		document.body.removeEventListener('mousemove', this.onMove);
	}
	onMouseLeaveHandler = e =>
	{	
		const domNode = ReactDOM.findDOMNode(this);
		if (!domNode || !domNode.contains(e.target))	
		{
			this.setState({
				isClick: false
			}); 
		}
	}
	render()
	{
		const {is_right, is_edit} = this.state;
		const x = 0;
		return is_edit
			?
			<div
				id={"handler_" + this.state.id}
				className={"landing-hhandler " + (is_right ? " right " : " left ")}
				style={{ left: this.state.x}}
				onMouseDown={this.onDown}
				onClick={this.onClick}
			>
			{
				this.state.isClick
					?
					<Fragment>
						<div 
							className=""
							style={{
								position:"absolute",
								top:-10,
								right:10,
								padding:10,
								border:"1px solid #00000030",
								backgroundColor:"#FFFFFF",
								color:"#000000"
							}}
						>
							{this.state.proportia ? this.state.proportia [0] : ""}
						</div>
						<div 
							className=""
							style={{
								position:"absolute",
								top:-10,
								left:10,
								padding:10,
								border:"1px solid #00000030",
								backgroundColor:"#FFFFFF",
								color:"#000000"
							}}
						>
							{this.state.proportia ? this.state.proportia [1] : ""}
						</div>
					</Fragment>
					:
					null
			}
			</div>
			:
			null;
	}
	onDown = () =>
	{ 
		this.setState({ isClick: true });
	}
	onClick = () =>
	{ 
		this.setState({ isClick: false });
	}
	onMove = evt =>
	{  
		if(!this.state.isClick) return;
		const offsetX = $("#titled_" + this.state.id).position().left;
		const left = evt.x - 2 - offsetX;
		const proportia = parseInt( evt.x / window.screen.width * 1000 ) / 10;
		if( this.props.onProportia )
			this.props.onProportia( [ proportia, 100 - proportia ] );
		this.setState({ x: left, proportia: [ proportia, 100 - proportia ] });
	}
	
}
export default HorisontalHandler;