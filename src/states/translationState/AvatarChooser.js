import React, {Component, Fragment} from "react";
import {app_url} from "../../layouts/config";

class AvatarChooser extends Component
{
	constructor(props)
	{
		super(props);
		this.state={
			current:this.props.current || 0
		}	
	}	
	componentDidMount()
	{
		this.props.onChoose( this.avatars[ 0 ] )
	}
	avatars = [
		app_url() + "/assets/img/avatar/iconfinder-3-avatar-2754579_120516.png",
		app_url() + "/assets/img/avatar/iconfinder-7-avatar-2754582_120519.png",
		app_url() + "/assets/img/avatar/iconfinder-4-avatar-2754580_120522.png",
		app_url() + "/assets/img/avatar/iconfinder-11-avatar-2754576_120520.png",
		app_url() + "/assets/img/avatar/iconfinder-10-avatar-2754575_120521.png",
		app_url() + "/assets/img/avatar/iconfinder-8-avatar-2754583_120515.png",
		app_url() + "/assets/img/avatar/iconfinder-9-avatar-2754584_120518.png",
		app_url() + "/assets/img/avatar/iconfinder-1-avatar-2754574_120513.png",
		app_url() + "/assets/img/avatar/iconfinder-2-avatar-2754578_120514.png",
		app_url() + "/assets/img/avatar/iconfinder-12-avatar-2754577_120517.png",
		app_url() + "/assets/img/avatar/iconfinder-5-avatar-2754581_120512.png",
		app_url() + "/assets/img/avatar/woman_icon-icons.com_55031.png",
	]
	render()
	{
		const avas = this.avatars.map((e, i) =>
		{
			return <div 
				key={i}
				i={i}
				className={ "avatar pointer " + (this.state.current == i ? " active" : " noactive") }
				style={{backgroundImage:"url(" + e + ")"}}
				onClick={this.onClick}
			/>
		});
		return <div style={{display:"flex", flexWrap:"wrap" }}>
			{avas}
		</div>
	}
	onClick = evt =>
	{
		//console.log( parseInt(evt.currentTarget.getAttribute("i") ) )
		this.setState(
			{ current:parseInt( evt.currentTarget.getAttribute("i") ) },
			this.props.onChoose( this.avatars[ parseInt( evt.currentTarget.getAttribute("i")) ] )
		)
	}
}
export default AvatarChooser;