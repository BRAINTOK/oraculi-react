import React, {Component, Fragment} from "react";
import LayoutMenuLeft from "./LayoutMenuLeft";
import LayoutMain from "./LayoutMain";
import LayoutMenuMain from "./LayoutMenuMain";
import {isMenuLeft} from "../../layouts/template";

class LayoutContent extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			current:this.props.current,
			isLeft: isMenuLeft()
		}
	}


	componentWillReceiveProps (nextProps )
	{
		if(nextProps.current !== this.state.current )
			this.setState({
				current: nextProps.current
			});
	}
	render()
	{		
		//console.log(this.state.current);
		const menu_left = this.state.isLeft
			?
			<LayoutMenuLeft 
				current={this.state.current} 
				onCurrent={this.props.onCurrent} 
				user={this.props.user}
			/>
			:
			null;
		return <div className="layout-content">
			{menu_left}
			<LayoutMenuMain current={this.state.current} onCurrent={this.props.onCurrent} user={this.props.user}/>
			<LayoutMain
				current={this.state.current} 
				onChangeStyle={ this.onChangeStyle } 
				user={this.props.user}
			/>
		</div>
	}

	onChangeStyle = style =>
	{
		if( 
			typeof style.isLeft != "undefined" 
			&& style.isLeft !== this.state.isLeft 
		)
		{
			//console.log(style.isLeft)
			this.setState({isLeft:style.isLeft});
		}
		//console.log( style );
		this.props.onChangeStyle( style );
	}
}
export default LayoutContent;