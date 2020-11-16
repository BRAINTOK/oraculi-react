import React, {Component} from "react";
import {__} from "../utilities/i18n";

export default class String extends Component
{
	state = {value:this.props.value}
	componentWillReceiveProps ( nextProps )
	{
		if(nextProps.isOpen !== this.props.isOpen)
		{
			this.init_map();
		}
	}
	componentDidMount() 
	{
		const el	= document.createElement('script');
		el.context	= this;
		if(document.getElementById('ymap-jssdk'))
		{
			el.onload 	= function() 
			{
				window.ymaps.ready( function()
				{
					el.context.init_map();
				} ); 
			}
		}
		else
		{
			el.type 	= 'text/javascript';
			el.src 		= 'https://api-maps.yandex.ru/2.1/?load=package.full&lang=ru_RU';
			el.async 	= true;
			el.id 		= 'ymap-jssdk';
			el.onload 	= function() 
			{
				window.ymaps.ready( function()
				{
					el.context.init_map();
				} ); 
			}
			document.getElementsByTagName('head')[0].appendChild(el);
		}
	}
	init_map()
	{
		console.log("map_" + this.props._id + "_" + this.props.field);
		console.log( this.props );
		if( !document.getElementById("map_" + this.props._id + "_" + this.props.field) ) return;
		if(this.myMap)	return;
		const cont = this;
		setTimeout(function()
		{
			cont.myMap = new window.ymaps.Map( 
				"map_" + cont.props._id + "_" + cont.props.field,
				{
					center: cont.state.value && (cont.state.value[0] || cont.state.value[1]) ? cont.state.value : [55.826479, 37.487208],
					zoom: 10
				}, 
				{
					searchControlProvider: 'yandex#search'
				}
			);
			cont.myMap.geoObjects
				.add(new window.ymaps.Placemark(
					cont.state.value, 
					{ }, 
					{
						preset: 'islands#governmentCircleIcon',
						iconColor: '#3b5998',
						draggable: true
					})
				);
			cont.myMap.events.add('click', function (e) 
			{
				cont.myMap.geoObjects.removeAll();
				cont.myMap.geoObjects
					.add(new window.ymaps.Placemark(
						e.get('coords'), 
						{ }, 
						{
							preset: 'islands#governmentCircleIcon',
							iconColor: '#3b5998',
							draggable: true
						})
					);
				cont.setState({value:e.get('coords')});
				cont.on(e.get('coords'));
			})
		}, 1000);
	}
	render()
	{
		const {field, title} = this.props;
		return <div className="row" key={field}>
			<div className="col-md-3 layout-label">
				{__( title )}
			</div>
			<div className="col-md-7 ">
				{			 
					this.props.editable 
					?
						<div id={"map_" + this.props._id + "_" + this.props.field} className="geo"/>
					:
						<div id={"map_" + this.props._id + "_" + this.props.field} className="geo"/>
				}
				<span className="small p-2">{this.state.value ? this.state.value[0] : 55.826479} </span>
				<span className="small p-2">{this.state.value ? this.state.value[1] : 37.487208} </span>
			</div>
		</div>
	}
	on = value =>
	{
		this.props.on( value, this.props.field, this.props.title );
	}
}
