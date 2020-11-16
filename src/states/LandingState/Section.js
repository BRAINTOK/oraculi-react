import React, {Component, Fragment} from "react";
import ReactDOM from 'react-dom';
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import DataContext from "./DataContext";
import $ from "jquery";

import ArchorsMenu from "./ArchorsMenu";
import Cards from "./Cards";
import Title from "./Title";
import Description from "./Description";
import Carousel from "./Carousel";
import Rows from "./Rows";
import Columns from "./Columns";
import InnerLink from "./InnerLink";
import Image from "./Image";
import Team from "./Team";
import Motivation from "./Motivation";
import Quote from "./Quote";
import Testanomials from "./Testanomials";
import SocialLikes from "./SocialLikes";
import HTML from "./HTML";
import PostFeed from "./PostFeed";
import PostCarousel from "./PostCarousel";
import YandexMap from "./YandexMap";
import Video from "./Video";
import VideoPlayList from "./VideoPlayList";
import ContactForm from "./ContactForm";
import Floats from "./Floats";
import HorisontalHandler from "./edit/HorisontalHandler";
import FloatDrawer from "./edit/FloatDrawer";

import FlaotDettingDialog from "./edit/FlaotDettingDialog";
import TypeDialog from "./edit/TypeDialog";
import {Button, ButtonGroup, Intent, Popover, Position, Dialog} from "@blueprintjs/core";

import __menu from "../../assets/img/landing/archor-menu.svg";
import __html from "../../assets/img/landing/html.svg";
import __calculator from "../../assets/img/landing/calculator.svg";
import __carousel from "../../assets/img/landing/carousel.svg";
import __merge from "../../assets/img/landing/merge.svg";
import __quote from "../../assets/img/landing/quote.svg";
import __eventsFeed from "../../assets/img/landing/events-feed.svg";
import __image from "../../assets/img/landing/picture.svg";
import __map from "../../assets/img/landing/map.svg";
import __motivation from "../../assets/img/landing/motivation.svg";
import __portfolio from "../../assets/img/landing/portfolio.svg";
import __postFeed from "../../assets/img/landing/post-feed.svg";
import __team from "../../assets/img/landing/team.svg";
import __testanomials from "../../assets/img/landing/testanomials.svg";
import __video from "../../assets/img/landing/video.svg";
import __inner_link from "../../assets/img/landing/008-mouse.svg";
import __likes from "../../assets/img/landing/likes.svg";
import __design from "../../assets/img/landing/section-growth.svg";
import __title from "../../assets/img/landing/title.svg";
import __description from "../../assets/img/landing/description.svg";
import __contact_form from "../../assets/img/landing/email.svg";
import __rows from "../../assets/img/landing/149-menu-1.svg";
import __columns from "../../assets/img/landing/150-menu-2.svg";
import __cards from "../../assets/img/landing/card.svg";

export const components = {
	html: {c: HTML, icon : __html, title:"Simple HTML" },
	archor_menu: {c: ArchorsMenu, icon : __menu, title:"Smart archors menu" },
	contact_form: {c: ContactForm, icon : __contact_form, title:"Constanc Form" },
	carousel : {c: Carousel, icon : __carousel, title:"Carousel" },
	rows : {c: Rows, icon : __rows, title:"Rows" },
	columns : {c: Columns, icon : __columns, title:"Columns" },
	image:{c: Image, icon : __image , title:"Image"},
	inner_link:{c: InnerLink, icon : __inner_link, title:"Inner Link"},
	team: {c: Team, icon : __team , title:"Team"},
	quote: {c: Quote, icon : __quote, title:"Quote" },
	motivation: {c: Motivation, icon : __motivation, title:"Motivation" },
	testanomials: {c: Testanomials, icon : __testanomials, title:"Testanomials" },
	social_likes: {c: SocialLikes, icon : __likes, title:"Social Likes" },
	yandex_map: {c: YandexMap, icon : __map, title:"Yandex Map" },
	video_play_list: {c: VideoPlayList, icon : __video, title:"Video Play List" },
	video: {c: Video, icon : __video, title:"Video" },
	post_feed: {c: PostFeed, icon : __postFeed, title:"Feed" },
	post_carousel: {c: PostCarousel, icon : __carousel, title:"Post carousel" },
	cards: {c: Cards, icon : __cards, title:"Cards" }
}

class Section extends Component
{
	constructor(props)
	{
		super(props);
		this.rp = React.createRef();
		this.ap = React.createRef(); 
		this.state = 
		{
			...this.props,
			isDialogOpen 	: false, 
			isRemPopover 	: false, 
			isAddPopover 	: false,  
			is_change_type_enbl : false, 
			current_type 	: this.props.type,
			myX				: 0
		} 
	}
	componentDidMount() 
	{  
		document.body.addEventListener( 'click', this.onMouseClickHandler );  
		if($("#handler_" + this.state.id).length == 0) return;
		this.setState({myX : $("#titled_" + this.state.id).offset().left - 100 });
	}
	componentWillUnmount() 
	{
		document.body.removeEventListener('click', this.onMouseClickHandler); 
	}
	onMouseClickHandler = e =>
	{
		const domNode = ReactDOM.findDOMNode(this.rp.current);
		if (!domNode || !domNode.contains(e.target))	
		{
			if( this.state.isRemPopover || this.state.isAddPopover || this.state.isAddFloat  )
			{
				//console.log( "LeaveHandler" )
				this.setState({
					isRemPopover: false,
					isAddPopover: false, 
					isAddFloat: false
				});
			}
		} 
	}
	componentWillUpdate(nextProps)
	{
		if(nextProps.is_edit != this.state.is_edit)
		{
			this.setState({is_edit: nextProps.is_edit});
		}
		if(nextProps.i != this.state.i)
		{
			this.setState({i: nextProps.i});
		}
		if(nextProps.id != this.state.id)
		{
			this.setState({id: nextProps.id});
		}
		if(nextProps.composition != this.state.composition)
		{
			this.setState({composition: nextProps.composition});
		}
		if(nextProps.background != this.state.background)
		{
			this.setState({background: nextProps.background});
		}
		if(nextProps.style != this.state.style)
		{
			this.setState({style: nextProps.style});
		}
		if(nextProps.class_name != this.state.class_name)
		{
			this.setState({class_name: nextProps.class_name});
		}
		if(nextProps.title != this.state.title)
		{
			this.setState({title: nextProps.title});
		}
		if(nextProps.descriptions != this.state.descriptions)
		{
			this.setState({descriptions: nextProps.descriptions});
		}
		if(nextProps.menu != this.state.menu)
		{
			this.setState({menu: nextProps.menu});
		}
		if(nextProps.type != this.state.type)
		{
			this.setState({type: nextProps.type});
		}
		if(nextProps.data != this.state.data)
		{
			this.setState({data: nextProps.data});
		}
		if(nextProps.floats != this.state.floats)
		{
			this.setState({floats: nextProps.floats});
		}
	}
	getID = () =>
	{
		return this.state.menu ? this.state.menu.id : this.state.i
	}
	render()
	{
		if( this.state.is_hidden )
		{
			if( this.state.is_edit )
			{
				return <div className={ "landing-section "}>
					<div 
						style={{
							position : "absolute",
							right:10,
							top:-15,
							zIndex:4
						}}
					>
						<Button	
							icon="eye-open" 
							title={__("Show hidden sector")}
							onClick={ () => this.setState({ is_hidden : !this.state.is_hidden }) } 
						>
							{__("Show hidden sector")}
						</Button>					
					</div>
				</div>;
			}
				else
			{
					return null;
			}
		}
		//console.log( this.state);
		const _Component = this.state.type && components[this.state.type] ? components[this.state.type].c : Title;
		return <div 
			id={ "section-" + this.getID() }
			className={ "landing-section " + this.state.class_name + (this.state.isAddFloat ? " add-float " : " ") } 
			style={{ ...this.state.style }}
		>
			{ this.getBackground( ) }
			<div 
				className={ this.getContainerClass( ) }
			> 
				<div 
					className={
						this.state.title && this.state.descriptions &&
						( this.state.title.text || this.state.descriptions.text )
							? 
							"landing-title-descr" 
							: 
							"hidden"
					}
					style={{ 
						minHeight: this.state.style ? this.state.style.minHeight : "auto",
						width: this.getProportia("title")	
					}}
					id={"titled_" + this.state.id}
				> 
					<Title 
						{...this.state.title} 
						id={this.state.id}
						type={this.state.type}
						is_edit={this.state.is_edit} 
						onEdit={ this.state.is_edit ? this.onEdit : null }
					/>
					<Description 
						{...this.state.descriptions} 
						id={this.state.id}
						type={this.state.type}
						is_edit={this.state.is_edit} 
						onEdit={ this.state.is_edit ? this.onEdit : null }
					/>
					{
						this.state.composition && this.state.composition.type < 2 
							?
							<HorisontalHandler
								{ ...this.state } 
								myX={this.state.myX}
								x={ 0 }
								is_right={ this.state.composition ? this.state.composition.type == 0 : false }
								onProportia={this.onProportia}
							/>
							:
							null
					}
				</div>
				<_Component 
					{ ...this.state } 
					data={{
						...this.state.data, 
						style : {
							...this.state.data.style,
							width: this.getProportia("content") 
						}
					}}
					columns={ this.getColumns() } 
					is_edit={this.state.is_edit} 
					level={this.state.level+1}
					section_id={this.props.i}
					onEdit={ this.onEdit }
				/>
				<Floats
					{ ...this.state } 
					is_edit={this.state.is_edit} 
					level={this.state.level+1}
					getID={this.getID()}
					onRemoveFloat={this.onRemoveFloat}
					onUpdate={this.onUpdateFloat}
				/>
				{
					this.props.is_hidden 
						? 
						<div 
							style={{
								position : "absolute",
								right:10,
								top:10,
								zIndex:4
							}}
						>
							<Button	
								icon="eye-open" 
								title={__("Hide hidden sector")}
								onClick={ () => this.setState({ is_hidden : !this.state.is_hidden }) } 
							>
								{__("Hide hidden sector")}
							</Button>					
						</div>
						:
						null
				}
			</div>
			{ this.is_edit() }
		</div>
	}
	onProportia = proportiaArr =>
	{
		if(!this.state.composition) return;
		let composition = this.state.composition;
		switch(this.state.composition.type)
		{
			case 2:
			case 3:
				
				break;
			default:
			case 0:
			case 1:
				composition.proportia = proportiaArr;
				break;
		}
		this.setState({ composition })
	}
	getColumns()
	{
		if(!this.state.composition) return;
		const { columns } = this.state.composition;
		return " lacol-" + parseInt(columns);
	}
	getContainerClass()
	{
		if(!this.state.composition) return;
		//if(this.state.id == 2) console.log(this.state.composition.type );
		const { type, columns, is_blocked } = this.state.composition;
		let cl = is_blocked ? "container " : "fluid-container ";
		switch(parseInt(type))
		{
			case 0:
				cl += " landing-container__horisontal ";
				break;
			case 1:
				cl += " landing-container__horisontal_reverse ";
				break;
			case 3:
				cl += " landing-container__vertical ";
				break;
			case 2:
			default:
				cl += " landing-container__vertical_reverse ";
				break
		} 
		return cl;
	}
	getProportia(targ)
	{
		if(!this.state.composition) return;
		const {type, proportia} = this.state.composition;
		//console.log( proportia[1] );
		let w;
		switch(type)
		{
			case 0:
				w = (targ == "title" ? proportia[0] : proportia[1]) ;
				break;
			case 1:
				w = (targ == "title" ? proportia[1] : proportia[0]) ;
				break;
			case 2:
				w = 100 ;
				break;
			case 2:
				w = 100 ;
				break;
		} 
		return w ? w + "%" : "100%";
	}
	getBackground()
	{ 
		if(!this.state.background) return;
		const { image, color, opacity } = this.state.background;
		if( image || color )
		{
			return <Fragment>
				<div 
					className={"landing-section__bg"} 
					style={{
						backgroundImage : "url(" + this.state.background.image + ")"
						//padding:40
					}}
				/>
				<div 
					className={"landing-section__bg"} 
					style={{
						backgroundColor:color ? color : "transparent", 
						opacity:opacity ? opacity : 0.7
					}}
				/>
			</Fragment>
		}
	}
	is_edit()
	{
		return this.state.is_edit
			?
			<Fragment>
				<FloatDrawer
					is_edit={this.state.is_edit}
					getID={this.getID()}
					isAddFloat={this.state.isAddFloat} 
					onUpdateFloat={this.onUpdateFloat}
				/>
				<div className="landing-sector__edit" style={{top: this.state.level * 21 + 3 }}>					
					<div className="landing-sector__edit-btn">						
						<Button 
							intent={Intent.SUCCESS} 
							icon="settings" 
							className="mr-1 my-1"
							onClick={this.onDialogOpen}
						/>  
						<Popover	
							isOpen={this.state.isRemPopover}
							content={  
									<div className="p-2 d-flex">
										<Button
											icon="cross"
											intent={Intent.DANGER} 
											onClick={this.onRnv}
										>
											{__("Remove Sector")}
										</Button> 
										<Button
											icon="eye-off"
											intent={Intent.NONE} 
											onClick={()=>this.props.onHide(this.state.id, this.props.is_hidden ? 0 : 1)}
										>
											{__(this.props.is_hidden ? "Show Sector for Users" : "Hide Sector for Users")}
										</Button> 
									</div> 
							}
						>
							<Button 
								ref={this.rp} 
								intent={Intent.DANGER} 
								icon="trash" 
								title={__("Remove Section")} 
								className="mr-1 my-1" 
								onClick={ this.onRemvPopover }
							/>
						</Popover>  
						<Popover	
							isOpen={this.state.isAddPopover}
							content={  
									<div className="p-2 d-flex">
										<Button
											intent={Intent.NONE} 
											onClick={this.onAdd}
										>
											{__("Add Secor after")}
										</Button>
										<Button
											intent={Intent.NONE} 
											onClick={this.onAddFloat}
										>
											{__("Add Float")}
										</Button> 
									</div> 
							}
						>
							<Button 
								ref={this.ap} 
								intent={Intent.NONE}
								icon="plus" 
								title={__("Add Secor after")} 
								className="mr-1 my-1"
								onClick={this.onAddPopover}										
							/> 
						</Popover>
						<Button
							intent={Intent.NONE} 
							icon="caret-up" 
							title={__("switch up")}
							className="mr-1 my-1"
							onClick={ () => this.props.onUp( this.state.i ) }
							disabled={ this.props.i == 0 }
						/>						
						<Button
							intent={Intent.NONE} 
							icon="caret-down" 
							title={__("switch down")}
							className="mr-1 my-1"
							onClick={ () => this.props.onDn( this.state.i ) }
							disabled={ this.props.i == DataContext.data.sections.length - 1 }
						/>
					</div>
					<div className="">						
						<Button
							intent={Intent.DANGER} 
							icon="cross" 
							title={__("close")}
							className="my-1 rounded-circle scale-60"
							onClick={ 
								() => {
									if( $(".landing-container").hasClass("closed"))
									{
										$(".landing-container").removeClass("closed");
									}
									else
									{
										$(".landing-container").addClass("closed");
									}
								}
							} 
						/>
					
					</div>
				</div>
				<Dialog
					isOpen={this.state.isDialogOpen}
					onClose={this.onDialogClose}
					className="little3 "
					title={ this.dialogTitle() }
				>
					{this.dialogContent()}
				</Dialog>
			</Fragment>
			:
			null
	}
	onRemvPopover = () =>
	{
		this.setState({
			isAddPopover : false,
			isRemPopover : !this.state.isRemPopover
		});
	}	
	onAddPopover = () =>
	{
		this.setState({
			isAddPopover : !this.state.isAddPopover,
			isRemPopover : false
		});
	}		
	onDialogOpen = evt =>
	{
		const dialogType = evt.currentTarget.getAttribute("type");
		this.setState( { isDialogOpen : !this.state.isDialogOpen, dialogType } );
	}
	onDialogClose = evt =>
	{
		const dialogType = evt ? evt.currentTarget.getAttribute("type") : null;
		this.setState( { isDialogOpen : false, dialogType, current_type: this.state.type } );
	}
	dialogContent = () =>
	{
		switch(this.state.dialogType)
		{
			case "menu":
				break;
			case "composition":
				break;
			case "floats":
				return <FlaotDettingDialog {...this.state} />
				break;
			case "title":
				break;
			case "component":
				break;
			default:
			case "type":
				return <TypeDialog 
					{ ...this.state } 
					onChange={ this.onSectorChange } 
					is_hidden={ this.props.is_hidden }
					onHide={this.props.onHide}
					onUpdateFloat={this.onUpdateFloat}
					onClose={this.onDialogClose}
				/>
				break;
		}
	}
	dialogTitle = () =>
	{  
	
		switch(this.state.dialogType)
		{
			case "menu":
				return "Main Menu button's parameters";
			case "composition":
				return "Composition of Sector";
			case "title":
				return "Title and Description of Sector";
			case "floats":
				return "Floats in Sector";
			case "type":
			default:
				return components[ this.state.type ] ? __(components[ this.state.type ].title) : "--";
		}
		
	}
	onSectorChange = (type, data) =>
	{
		//console.log("on Sector Change", type, data, this.state.i);
			
		//console.log( DataContext.data );
		this.setState({ isDialogOpen : false });
		this.props.onEdit({ ...data, type:type });
	}
	onType = (type, data) =>
	{
		console.log(data, type, this.state.i);
	}
	onTypeSwitch = evt =>
	{
		const current_type = evt.currentTarget.getAttribute("type");
		//console.log( this.state.data );
		this.setState({current_type, is_change_type_enbl : current_type != this.state.type });
	}
	onEdit2 = (data, id) =>
	{
		console.log(data, id);
	}
	onEdit = data =>
	{
		this.props.onEdit({...data, id:this.state.id})
	}
	onRnv = () =>
	{		
		this.setState({ isRemPopover: false })
		this.props.onRnv(this.state.i)
	}
	onUpd = () =>
	{
		let sections = [...DataContext.data.sections];
		
	}
	onAdd = () =>
	{
		if( this.props.onAdd )
			this.props.onAdd( this.state.i )
	}
	onAddFloat = () =>
	{
		this.setState({ isAddFloat : true })
	}
	onRemoveFloat = float_id =>
	{
		this.props.onRemoveFloat(float_id);
	}
	onUpdateFloat = (data, float_id, section_id) =>
	{
		this.setState({isAddFloat : false});
		this.props.onUpdateFloat( data, float_id, section_id );
		
	}
}
export default Section;

export function getStyle(styleObj)
{
	let style = [];
	// console.log( styleObj );
	if(typeof styleObj == "undefined") return  style;
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
	
export function getDefault()
	{
		const id = DataContext.getMaxSectionID( true )
		return {
			id : id,
			composition	: 
			{
				columns: 1,
				type:3,
				is_blocked:0,
				proportia : [50, 50],
				text_before:"",
				text_after:""
			},
			background : 
			{
				image: "",
				color : "#FF000000",
				is_parallax : 0,
				parallax_speed: 0
			},
			class_name : "",
			style : { },
			title : 
			{
				text : "",
				text_src: "",
				lasy_load_type : "",
				lasy_load_delay: 0,
				class_name : "text-center",
				style : {  },				
				composition	: 
				{
					columns: 1,
					type:0,
					is_blocked:0,
					proportia : [50, 50],
					text_before:"",
					text_after:""
				}
			},
			descriptions : 
			{
				text : "",
				lasy_load_type : "",
				lasy_load_delay: 0,
				class_name : "text-center",
				style : {
						
				}
			},
			menu : 
			{
				label : "",
				id : "section-" + id,
				is_enabled : 0
			},	
			type : "image",
			data :
			{
				height:400
			},
			floats : []
		}
	}