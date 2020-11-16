import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";
import matrix from "./data/matrix";

class SectionContent extends Component
{
	constructor(props)
	{
		super(props);		
		this.state = {
			is_edit:this.props.is_edit,
			...props,
			...this.getState()
		}
	}
	getState()
	{
		return {}
	}
	componentWillUpdate(nextProps, nextState)
	{
		if(nextProps.is_edit != this.state.is_edit)
		{
			this.setState({is_edit: nextProps.is_edit});
		}
		if(nextState.is_edit != this.state.is_edit)
		{
			this.setState({is_edit: nextState.is_edit});
		}
		// if( !this.state.is_edit )	return;
		let state = {};
		let mt    = matrix[ this.state.type ];
		let obj   = { };
		Object.keys( mt )
			.filter( e => !mt[e].hidden )
				.forEach( ( e, i ) =>
				{					
					if(nextProps[e] != this.state[e])
					{
						state[e] = nextProps[e];
					}				
					if(nextState[e] != this.state[e])
					{
						state[e] = nextState[e];
					}					
				} );
		if( Object.keys( state ).length > 0 )
		{
			this.setState(state);
		}			
	}
	
	render()
	{
		const { type } = this.props;
		const { class_name, text, height } = this.props.data;
		const style = this.getStyle(this.props.data.style);
		// console.log( this.props.data.style, style );
		return this.is()
			?
			this.renderContent( style )
			:
			this.getEmpty(style)
	}
	
	renderContent(style)
	{ 
		const { class_name, text, height } = this.props.data;
		return <div 
			className={ 
				"landing-html " + 
				(class_name ? class_name : "") + 
				" columns-" + this.props.composition.columns
			} 
			style={{...style, height:height, overflowX:"hidden", overflowY:"auto"}}
		>
			<div dangerouslySetInnerHTML={{ __html: text}}  className="w-100"/>
		</div>
	}
	is()
	{
		return this.props.data.text;
	}
	getStyle = styleObj =>
	{
		let style = [];
		//console.log( styleObj );
		Object.entries(styleObj)
			.filter(e =>
			{
				//console.log( e );
				return e[1] && e[1].field != "";
			})
				.forEach((e, i) =>
				{
					//console.log( e );
					if( e[1] && e[1].field )
					{
						let attr = {};
						style[e.field] = e.value; 
					}
					else
					{
						style[e[0]] = e[1]; 
					}
				});
		//console.log( style );
		return style;
	}
	getEmpty( style )
	{
		const { class_name, text, height } = this.props.data;
		return <div 
				className={ " landing-empty " + (class_name ? class_name : "")} 
				style={{ height: "auto", ...style }}
			>
				<LayoutIcon
					src={ components[this.props.type].icon }
					className=" layout-icon white "
				/>
				<div className="lead text-white">
					{ components[this.props.type].title }
				</div>
				<EditLabel 
					{ ...this.props } 
					source={ this.props.type }
					onEdit={ this.props.onEdit }
					isBtn={ true }
				/> 
			</div>
	}
}
export default SectionContent;