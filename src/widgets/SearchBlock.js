import React, {Component} from "react";
import {__} from "../layouts/utilities/i18n";
import { NavLink, withRouter } from 'react-router-dom';

class SearchBlock extends Component
{
	state = {
		isOpen: false,
		search:""
	}
	render()
	{
		//console.log(this.props);
		return <div className="sb-container" >
			<div className={"sb-cont " + (this.state.isOpen ? "open" : "") } >
				<input 
					type="text"
					onChange={this.onSearch}
					onKeyPress={this.onKey}
					placeholder={__("Введите поисковый запрос")}
				/>
			</div>
			<div className="sb-icon-search " onClick={this.onToggle}/>
		</div>;
	}
	onToggle = () =>
	{
		console.log( this.state.isOpen );
		this.setState({isOpen:!this.state.isOpen})
	}
	onSearch = evt =>
	{
		this.setState({ search:evt.currentTarget.value })
	}
	onKey = evt =>
	{
		if(evt.key == 'Enter')
		{
			this.setState({isOpen:false})
			this.props.history.push("/search", {s:this.state.search} );
		}
	}
}
export default withRouter( SearchBlock)