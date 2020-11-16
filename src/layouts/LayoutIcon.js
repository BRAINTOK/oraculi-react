import React, {Component} from "react";
import axios from 'axios';
import Loading from "./utilities/Loading";

class LayoutIcon extends Component
{
	state = { ...this.props };
	componentDidMount()
	{
		const isSVG = this.props.src.split(".").length > 1;
		isSVG ? this.getSvg(this.props.src) : this.getStyle(this.props.src);
	}
	_shouldComponentUpdate(nextProps, nextState)
	{
		//console.log(nextProps, nextState);
		return nextProps.src != this.state.src;
	}
	componentWillReceiveProps ( nextProps )
	{
		if( nextProps.src !== this.state.src )
		{
			this.setState({src:nextProps.src});
			const isSVG = nextProps.src.split(".").length > 1 ? 1 : 0;
			//console.log(nextProps, isSVG);
			isSVG ? this.getSvg(nextProps.src) : this.getStyle(nextProps.src);
		}
	}
	render()
	{
		return <div 
			className = { this.props.className } 
			style = { this.props.style } 
			dangerouslySetInnerHTML={{ __html: this.state.icon }}
		/>
	}
	getSvg( src )
	{
		axios.get( src )
			.then( response => 
			{
				//console.log( this.props.className )
				this.setState({ icon: response.data });
			},
			error => console.error(error, this.state.src )
		);
			return ""; 
	}
	getStyle( src )
	{
		this.setState({ icon : "<span class='" + src + "'></span>" });
	}
}
export default LayoutIcon;