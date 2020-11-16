import React, {Component, Fragment} from "react";
import { NavLink, Link  } from 'react-router-dom';
import {__} from "../../layouts/utilities/i18n";
import { Dialog } from "@blueprintjs/core"; 
import LayoutIcon from "../../layouts/LayoutIcon";
import ContentByRoute from "../../layouts/utilities/ContentByRoute";
import EditLabel from "./EditLabel";
import SectionContent from "./SectionContent";
import Section, {components, getDefault} from "./Section"; 

import __string from "../../assets/img/landing/string.svg";
import __image from "../../assets/img/landing/picture.svg";
import __button from "../../assets/img/landing/button.svg";
import __price from "../../assets/img/landing/price.svg";

class Card extends Component
{ 
	state = {};
	componentDidMount() 
	{
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}
    componentWillUnmount() 
	{
		window.removeEventListener('resize', this.updateWindowDimensions);
	}
	updateWindowDimensions = () =>
	{
		
		this.setState({ 
			width : document.body.clientWidth
			
		});
	}
	render()
	{
		const { 
			type, 
			columns, 
			class_name, 
			style, 
			fields, 
			height, 
			padding, 
			cardFields, 
			link_type,
			dialog_title,
			dialog_route_content,
			dialog_inner_route,
			dialog_btn_label
		} = this.props;
		
		// console.log( this.props );
		// console.log( this.state.dialogContent );
		
		const fieldsObjs = fields.map((e, i) =>
		{
			return this.field(e, i);
		});
		const fullHeight = height ? { height : height + "px" } : {};
		const fullPadding = padding ? { padding : padding + "px" } : {};
		
		// console.log(fullPadding, this.props);
		const mainClass = link_type && link_type !== "0"
			?
			"landing-card-cont pointer"
			:
			"landing-card-cont";
			
		return [
			<div className={mainClass}
					style={{ 
						width : this.state.width > 720 ? ( 100 / columns ) + "%" : "100%", 
						...fullPadding 
					}}
					onClick={this.onCardClick}
					key={1}
				>
				<div 
					className={ 
						"landing-card " + 
						( class_name ? class_name : "" ) 					
					}
					style={{ ...style, ...fullHeight }}				
				>
					<div className="landing-card-title hidden">
						{this.props.title}
					</div>
					{ fieldsObjs }
					{ this.linker() }
				</div>
			</div>,
			<Dialog
				title={dialog_title}
				isOpen={this.state.isDialogOpen}
				onClose={this.onDialogClose}
				key={2}
			>
			{
				typeof this.state.dialogContent == "string"
					?
					<div 
						className="p-5 "
						dangerouslySetInnerHTML={{ __html : this.state.dialogContent }}
					/>
					:
					<div className="p-5 " >
						{ this.state.dialogContent }
					</div>
			}
			</Dialog>
		]
	}
	field = (e, i) =>
	{
		const { fields, cardFields } = this.props;
		let dt, style={};
		// Если последующее или предыдущее поля - медаль
		if(cardFields[i-1] && cardFields[i-1].type == "media" && cardFields[i-1].variant == 1)
		{
			style = {...style, marginTop:30}
		}
		if( cardFields[i].height )
		{ 
			style = {...style, height: cardFields[i].height + "px" };
		}
		if(cardFields[i+1] && cardFields[i+1].type == "media" && cardFields[i+1].variant == 1)
		{
			style = {...style, marginBottom:30}
		}
		// console.log( i, style, cardFields[i].height );
		// console.log(cardFields[i].type)
		switch(cardFields[i].type)
		{
			case "media" : 
				dt = this.media(e, i, cardFields[i], style);
				break;
			case "navlink" :				
				dt = this.navlink(e, i, cardFields[i], style);
				break;
			case "price" :				
				dt = this.price(e, i, cardFields[i], style);
				break;
			case "string":
			default:	
				dt = this.string(e, i, cardFields[i], style);
				
		}
		return <div 
			className={ "landing-card-field " + cardFields[i].type + cardFields[i].variant } 
			key={ i }
		>
			{ dt }
		</div>
	}
	string(e, i, cardFieldsData, style )
	{
		return <div className=" string " style={style} >
			{ e.field }	
		</div>
	}
	media(e, i, cardFieldsData, style)
	{
		return <div 
			className=" media " 
			style={{ ...style, backgroundImage:"url(" + e.field + ")" }}
		>
		</div>
	}
	navlink(e, i, cardFieldsData, style)
	{
		return <div 
			className=" navlink " 
		>
			<NavLink
				className="btn btn-primary"
				to={ e.field }
			>
				{ e.field }
			</NavLink>
		</div>
	}
	price(e, i, cardFieldsData)
	{
		return <div className=" price ">
			{ e.field }	
		</div>
	}
	linker()
	{
		const {dialog_inner_route, dialog_btn_label} = this.props; 
		if(!dialog_inner_route) return;
		return <div className="card-linker">
			<Link 
				to={dialog_inner_route}
				className="btn "
			>
				{ __( dialog_btn_label ) }
			</Link>
		</div>
	}
	onCardClick = evt =>
	{
		const {
			type, 
			columns, 
			class_name, 
			style, 
			fields, 
			height, 
			padding,
			cardFields,
			link_type,
			dialog_title,
			dialog_route_content,
			dialog_content,
			dialog_content_type,
			dialog_inner_route,
			dialog_btn_label
		} = this.props;
		if( link_type )
		{
			switch( link_type )
			{
				case "1":
					this.setState({
						isDialogOpen : !this.state.isDialogOpen,
						dialogContent : dialog_content
					})

					break;
				case "2":
					
					break;
				case "3":
					let cntnt = ""; 
					switch(dialog_content_type)
					{
						case "inner_link":
							cntnt = <ContentByRoute 
								routing={dialog_route_content} 
							/>
							break;
						default:
						case "text_content":
							cntnt = dialog_content;						
					}
					this.setState({
						isDialogOpen : !this.state.isDialogOpen,
						dialogContent : cntnt,
						dialog_btn_label,
						dialog_inner_route
					})
					break;
				default:
				case "0":
					break;
			}
		}
	}
	onDialogClose = () =>
	{
		this.setState({
			isDialogOpen : !this.state.isDialogOpen 
		})
	}
}
export default Card;


export function CardFieldTypes()
{
	return [
		{
			type	: "string",
			title	: "String",
			icon	: __string,
			variants: [
				{
					title: "plain text"
				},
				{
					title: "title"
				},
				{
					title: "subtitle"
				},
				{
					title: "description"
				}
			],
			fields : [	
				{
					type:"string",
					name:"value"
				},	
			]
		},
		{
			type	: "media",
			title	: "Image",
			icon	: __image,
			variants: [
				{
					title: "full width thumbnail"
				},
				{
					title: "outline centered  rounded pictogramm"
				},
				{
					title: "inline centered squared pictogramm"
				}
			],
			fields : [	
				{
					type:"url",
					name:"url"
				},	
			]
		},
		{
			type	: "navlink",
			title	: "Inner site link button",
			icon	: __button,
			variants: [
				{
					title: "light color"
				},
				{
					title: "dark color"
				},
				{
					title: "danger color"
				}
			],
			fields : [	
				{
					type:"string",
					name:"label"
				}, 
				{
					type:"string",
					name:"route"
				}
			]
		},
		{
			type	: "price",
			title	: "Price",
			icon	: __price,
			variants: [
				{
					title: "plain price label"
				},
				{
					title: "bold nominal and mini carrence"
				},
				{
					title: "large nominal and mini carrence"
				}
			],
			fields : [	
				{
					type:"string",
					name:"nominal"
				},	
				{
					type:"string",
					name:"carrency"
				}
			]
		}
	]
}