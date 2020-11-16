import React, {Component} from 'react';

export default class GanreCheckBox extends Component
{	
	constructor(props) 
	{
		super(props);
		this.state = {
		  checked: props.ganre.check === 1 ? "checked" : ""
		};
		this.check = this.check.bind(this);
	}
	componentWillReceiveProps (nextProps) 
	{
		this.setState({
			//checked: nextProps.ganre.check===1 ? "checked" : ""
		});
	}
	render()
	{ 
		const {ganre} = this.props;
		const classNames = [this.state.checked, "ganre_checkbox"].join(" ");
		return (
			<div className="" style={{overflow:"hidden", padding:5}}>								
				<input 
					type="checkbox" 
					name={"ganre_" + this.props.name + ganre.id} 
					id={"ganre_" + this.props.name + ganre.id} 
					className={ classNames }
					onChange={this.check}
					defaultValue={ ganre.check }
				/>
				<label htmlFor={"ganre_" + this.props.name + ganre.id}>
					{ ganre.name }
					<img src={ganre.icon} alt={ganre.name} />
				</label>	
			</div>
		);
	}
	check = (event)=>
	{
		const target = event.currentTarget;
		const value = target.classList.contains("checked") ? "" : "checked";
		this.setState({
			checked: value
		});
		this.props.onClick(this.props.ganre.id, value==="checked" ? 1:0);
	}
}
