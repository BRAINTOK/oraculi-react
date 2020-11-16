import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import SectionContent from "./SectionContent";
import Section, {components, getDefault} from "./Section"; 

class Rows extends SectionContent
{
	state = {
		...this.props,
		is_edit 	: false
	}
	componentWillUpdate(nextProps)
	{
		if(nextProps.is_edit != this.state.is_edit)
		{
			this.setState({is_edit: nextProps.is_edit});
		}
	}
	
	is()
	{
		const { sections } = this.state.data;
		return Array.isArray(sections) && sections.length > 0 
	}
	
	renderContent(style)
	{
		const { type } = this.props;
		const { class_name, sections, proportia} = this.props.data;
		return <div 
				className={ 
					"landing-rows " + 
					this.props.data.class_name 
				} 
				style={ this.getStyle(style) }
			>
			{
				sections.map((e, i) =>
				{
					let estyle= { ...this.getStyle(e.style), width: "100%" };
					return <div style={estyle} className={ e.className } key={i}>
						<Section
							{...e} 
							style={{ height : "100%", ...this.getStyle(e.style) }}
							i={i}
							user={this.props.user} 
							is_edit={this.state.is_edit}
							level={this.props.level + 1}
							onEdit={this.onEdit}
							onUp={this.onUp}
							onDn={this.onDn}
							onAdd={this.onAdd}
							onRnv={this.onRnv}
						/>
					</div>
				})
			}
			</div>
	}
	onEdit = (data, id) => 
	{
		console.log("onEdit", id, data, this.state );
		let sections = [ ...this.state.data.sections ];
		let secs = [];
		sections.forEach(e =>
		{
			if(e.id == data.id)
			{
				secs.push(data);
			}
			else
			{
				secs.push(e);
			}
		});
		this.setState({ data:{ ...this.state.data, sections:secs } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, sections:secs }}, 
			this.props.id
		);
	}
	onUp = data =>
	{
		console.log("onUp", data, this.state );
		let sections = [ ...this.state.data.sections ];
		const sec = { ...sections[ data ] };
		sections.splice( data, 1 );
		sections.splice( data - 1, 0, sec );
		console.log(sections);
		this.setState({ data:{ ...this.state.data, sections } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, sections }}, 
			this.props.id
		);
		
	}
	onDn = data =>
	{
		console.log("onDn", data, this.state );let sections = [ ...this.state.data.sections ];
		const sec = { ...sections[ data ] };
		sections.splice( data, 1 );
		sections.splice( data + 1, 0, sec );
		console.log(sections);
		this.setState({ data:{ ...this.state.data, sections } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, sections }}, 
			this.props.id
		);
		
	}
	onAdd = data =>
	{
		console.log("onAdd", data, this.state );
		let sections = [ ...this.state.data.sections ];
		const sec = getDefault();
		sections.splice( data + 1, 0, sec );
		console.log(sections);
		this.setState({ data:{ ...this.state.data, sections } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, sections }}, 
			this.props.id
		);
		
	}
	onRnv = data =>
	{
		console.log("onRnv", data, this.state.data.sections );
		let sections = [ ...this.state.data.sections ];
		sections.splice(data, 1);
		console.log(sections);
		this.setState({ data:{ ...this.state.data, sections } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, sections }}, 
			this.props.id
		); 
	}
	onHide = (id, is_hide) =>
	{
		console.log("HIDE", id, is_hide); 
		
	}
	onRemoveFloat = float_id =>
	{
		
	}
	onUpdateFloat = (data, float_id, section_id) =>
	{
		
	}
	
	
	
}
export default Rows;