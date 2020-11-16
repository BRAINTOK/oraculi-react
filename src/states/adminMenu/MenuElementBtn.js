import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import FieldInput from "../../layouts/FieldInput";

class MenuElementBtn extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			current : this.props.current
		}
	}
	componentWillReceiveProps ( nextProps )
	{
		if(nextProps.current!=this.state.current)
			this.setState({ current: nextProps.current })
	}
	render()
	{
		const e = this.props;
		const children = Array.isArray(this.props.children) && this.props.children.length > 0
			?
				this.props.children.map((ee, ii) =>
				{
					return <MenuElementBtn 
						{...ee} 
						i={ii} 
						key={ii} 
						level={ this.props.level + 1 }
						current={this.state.current}
						onCurBtn={this.props.onCurBtn} 
					/>
				})
			:
			null;
		const className = this.props.route == this.state.current ? " active " : ""; 
		return <div className="d-flex flex-column">
			<div 
				onClick={this.onClick}
				className={ className + "menu-elem level_" + this.props.level }  
			>
				{__(e.title)}
			</div>
			{children}
		</div>
	}
	onClick = evt =>
	{
		this.props.onCurBtn( this.props.route );
	}
	
}
export default MenuElementBtn;