import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import SectionContent from "./SectionContent";
import Section, {components, getDefault} from "./Section"; 

class Columns extends SectionContent
{
	is()
	{
		const { sections } = this.state.data;
		return Array.isArray(sections) && sections.length > 0  
	}
	
	renderContent(style)
	{
		const { type } = this.props;
		const { class_name, sections, proportia, column_gap} = this.props.data;
		return <div 
			className={ 
				"landing-columns " + 
				( class_name ? class_name : "" ) + 
				" columns-" + this.props.composition.columns
			} 
			style={{ ...style, columnGap: column_gap + "px" }}
		>
		{
			sections.map((e, i) =>
			{
				const width = proportia && proportia[i] ? proportia[i] : 100 / sections.length;
				let estyle  = { ...e.style, width: width + "%" };
				return <div style={estyle} className={ " landing-single-column  " +e.className } key={i}>
					<Section
						{...e} 
						style={{ height : "100%", ...e.style }}
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
export default Columns;