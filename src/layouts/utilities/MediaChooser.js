import React, {Component} from 'react';
import {__} from "./i18n"
import $ from "jquery";
import in_array from "in_array";

export default class MediaChooser extends Component
{	
	constructor(props)
	{
		super(props);
		this.state = {
			id: props.id,
			//name: props.name,
			prefix: props.prefix,
			url:props.url
		};
	}
	componentWillReceiveProps (nextProps) 
	{
		let state = {
			id: nextProps.id,
			prefix: nextProps.prefix
		};
		if(nextProps.name)
		{
			state.name = nextProps.name;
		}
		if(typeof nextProps.url == "string")
		{
			state.url = nextProps.url;
		}
		this.setState();
	}
	componentDidUpdate()
	{
		let elem = document.getElementById( this.props.prefix + "imagex" );
		if(elem)
			elem.setAttribute("src",this.state.url);
		
	}
	render()
	{
		return this.form1();	
	}
	form1()
	{
		const { id, prefix, url, bg } = this.state;
		let ext;
		let image;
		//const ext =  url && typeof url == "string" ? url.substring( url.lastIndexOf(".") + 1 ) : "";
		if( url )
		{
			if( typeof url == "string" )
			{
				ext 	= url.substring( url.lastIndexOf(".") + 1 );
				image 	= url;
			}
			else if (typeof url == "object" )
			{
				
			}
			else
			{
				ext = "";
				image = "";
			}
		}
		else
		{
			ext = "";
			image = "";
		}
		const { height, padding } = this.props;
		const _height = height ? height : 70;
		const _padding = padding ? padding : 20;
		const bstyle = { 
			height:_height + _padding*2, 
			margin:"3px 3px 3px 0", 
			minWidth:_height + _padding * 2, 
			backgroundColor:this.props.bg, 
			padding:_padding 
		};
		//console.log(bstyle);
		const istyle 	= { 
			position:"relative", 
			display: "inline-flex", 
			justifyContent: "center", 
			alignItems: "center", 
			minWidth:_height, 
			height:_height, 
			overflow:"hidden"
		};
		const delbtn 	= url != "" && url != undefined ? <div 
					className="btn btn-link"
					style={{ alignSelf: "start", padding: "3px 6px", marginTop: 4, lineHeight: "3px"}} 
					onClick={this.onClear}
				>
					<i className="fas fa-times" />
				</div> : null;
		
		const cont = in_array( ext, ["jpg", "gif", "svg", "png", "bmp"] ) || (url ?  url.indexOf("data:image/") != -1 : false)
			? <img 
				height={_height} 
				id={this.props.prefix + "imagex"} 
				src={image} 
				alt="" 
				style={{height:_height}}
			/>
			: <div>
				<div className={'fi fi-' + ext + ' fi-size-xs'}>
					<div className='fi-content'>{ext}</div>
				</div>
			</div>;
		const descr = this.props.isDescr || true
			? 
			<span className="media-chooser-descr">
				{this.state.name}
			</span> 
			: null;
		return (
			<div className="media-chooser-cont" style={{display: "flex", flexDirection: "row" }}>
				<div className='media_button my_image_upload' style={bstyle} image_id={id}  prefix={prefix}>
					<div className='pictogramm ' id={prefix + id.toString()} style={istyle}>
						{url ? cont : null}
						<input type="file" 
							name="image_input_name" 
							style={{opacity:0, width:"100%", height:"100%", position:"absolute", top:0, left:0}}
							onChange={this.onImageChange}
						/>
					</div>				
				</div>
				<div className="media-chooser-ext">
					{ delbtn }
					{ descr }
				</div>
			</div>
		);
	}
	onClear = () =>
	{
		this.setState({url:"", id:-1, name:""});
		this.props.onChange( "", -1, this.props.ID );
	}
	onImageChange = (evt) =>
	{
		const _height = this.state.height ? this.state.height : 70;
		var file	= evt.target.files[0];
		if(!file)	return;
		if( $("#" + this.props.prefix + "imagex").length )
			$("#" + this.props.prefix + "imagex").detach();
		let elem = document.getElementById("#" + this.props.prefix + "imagex");
		if(elem)
		{
			elem.parentNode.removeChild(elem);
		}
		/**/
		var img 	= document.createElement("img");
		img.height	= _height;
		img.id 		= this.props.prefix + 'imagex';
		img.style	= "height:" + _height + "px";
		img.alt 	= '';
		img.file 	= file;
		img.files	= evt.target.files;
		var reader = new FileReader();
		reader.g = this;
		
		reader.onload = (function(aImg) 
		{ 
			return function(e) 
			{ 
				//console.log(e);
				//console.log(aImg.file);
				
				aImg.src = e.target.result; 
				reader.g.setState( {url:aImg.src, name:aImg.file.name } );
				reader.g.props.onChange( aImg.src, aImg.file, reader.g.props.ID );
			}; 
		})(img);
		reader.readAsDataURL(file);
		
		//
	}
}