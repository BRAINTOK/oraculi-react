import React, {Component, Fragment} from "react";
import {__} from "../../utilities/i18n";

//TODO extends ScalarField
export default class Radio extends Component
{
	state = {
		value : this.props.value,
		data : [
			{_id:11, title:"AAAA"},
			{_id:12, title:"BBBB"},
			{_id:13, title:"CCCC"},
			{_id:14, title:"DDDD"},
			{_id:15, title:"EEEE"},
		]}
	componentWillReceiveProps ( nextProps )
	{
		if(nextProps.value)
			this.setState({value:nextProps.value})
	}
	getComponent()
	{
		const { component, values } = this.props;
		const { value } = this.state;

		// console.log( value );
		let _component;
		if( typeof component == "String")
		{
			_component = this.state.data;
		}
		else if(component == "PlaceType")
		{

			const items = Array.isArray(values) ? values : Array.isArray(component) ? component : null;
			//console.log(items);
			_component = items ? items.map((e, i) =>
			{
				const elem = typeof e._id != "undefined" ? e : {_id:e._id, title: e.title};
				const id = "__" + this.props._id + "_" + elem._id;
				return <div className="pb-0 mb-1" key={ i }>
					<label className="_check_blue_">
						<input
							value={ elem._id }
							type="radio"
							checked={ elem._id == value }
							onChange={this.onChange}
						/>
						{ __(elem.title) }
					</label>
				</div>
			}) : null;
		}
		else
		{

			const items = Array.isArray(values) ? values : Array.isArray(component) ? component : [values];
			//console.log(items, values, value);
			
			_component = items ? items.map((e, i) =>
			{
				const elem = typeof e._id != "undefined" ? e : {_id:e, title:__(e)}; 
				const id = "__" + this.props._id + "_" + elem._id;
				//console.log(elem._id, value, elem._id == value);
				return <div className="pb-0 mb-1" key={ i }>
					<label className="_check_blue_" htmlFor={id}>
						<input 
							value={ elem._id } 
							type="radio"						
							checked={ elem._id == value } 
							onChange={this.onChange}
							onClick={this.onChange}
							id={id}
						/>
						{ __(elem.title) }
					</label>
				</div>
			}) : null;
		}

		return _component;
	}
	render()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		const selecting = this.getComponent();
		const col1 = this.props.vertical ? "col-12 layout-label-vert" : "col-md-3  layout-label";
		const col2 = this.props.vertical ? "col-12 layout-data-vert" : "col-md-7 layout-data";
		return <div className="row dat" key={field}>
			<div className={col1}>
				{__( title ) }
			</div>
			<div className={col2}>
			{
				this.props.editable 
				?
					<div className="my-2">{selecting}</div>
				:
					<div className="px-0 my-1">{ this.props.value }</div>
			}
			</div>
		</div>
	}
	onChange = evt =>
	{
		const value = evt.currentTarget.value;		
		this.setState({ value });
		this.on(value);
	}
	on = value =>
	{
		//console.log(value, this.props.field, this.props.title);
		this.props.on( value, this.props.field, this.props.title );
	}
}