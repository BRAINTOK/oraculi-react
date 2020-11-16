import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import Loading from "../../layouts/utilities/Loading"; 
import Moment from 'react-moment';
import moment from 'moment';
import $ from "jquery";
import {withRouter} from "react-router";
import { compose } from 'react-apollo';
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";

class YandexMap extends Component
{
	constructor(props)
	{
		super(props); 
		this.state = {
			hideMarker : false,
			places:	this.props.data.places,
			position: this.props.data.position ? this.props.data.position : [ 55.76, 37.64, 10 ]
		};
		const el	= document.createElement('script');
		el.context	= this;
		el.type 	= 'text/javascript';
		el.src 		= 'https://api-maps.yandex.ru/2.1/?load=package.full&lang=ru_RU&apikey=' + this.props.data.yandex_map_api_key;
		el.async 	= true;
		el.id 		= 'ymap-jssdk';
		el.onload 	= function() 
		{
			window.ymaps.ready( function()
			{
				el.context.init_map();//setState({loadYmap:1});
			} ); 
		}
		document.getElementsByTagName('head')[0].appendChild(el);
		window.mapState = this.props.context;
		window.yandex_map_state = this;
		window.mapData = {};
		window.getPlaceLink = function (n)
		{
			window.mapState.getPlaceLink( n );
		}
		window.getPlaceDialog = function (n)
		{
			window.mapState.getPlaceDialog( n );
		}
	}
	componentWillUnmount() 
	{
		delete window.getPlaceLink;
		delete window.getPlaceDialog;
		delete window.yandex_map_state;
		delete window.mapState;
	}
	/*
	componentWillReceiveProps ( nextProps )
	{
		if(nextProps.places && nextProps.places !== this.props.data.places)
		{
			newState.places = nextProps.places;
			boo = true;
		}
		if(boo)
		{
			this.setState(newState, function()
			{
				$("#map").empty();
				this.loaded = false;
				this.init_map();
			});
		}
	}
	*/
	render()
	{
		return this.props.data.position
		?
		<div 
			className={"landing-yandex-map " + this.props.data.class_name } 
			 style={{ ...this.props.data.style }}
		>
			<div 
				className="map "
				id="map" 
				style={{height: this.props.data.height ? this.props.data.height : 400}}
			/>	
		</div>
		:
		<div 
			className={ " landing-empty " + this.state.class_name} 
			style={{ ...this.props.data.style, height:  300 }}
		>
			<LayoutIcon
				src={ components[this.props.type].icon }
				className=" layout-icon-giant "
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
	
	init_map()
	{	
		if( this.loaded ) return;
		this.loaded = true;
		if( !document.getElementById("map") ) return;
		this.myMap = new window.ymaps.Map( 
			"map",
			{
				center: this.state.position,
				zoom: this.state.position[2] ? this.state.position[2] : 12,
				controls:[ 'zoomControl' ],
				margin:20
			}, 
			{
				searchControlProvider: 'yandex#search'
			}
		);
		this.myMap.behaviors.disable('scrollZoom');
		
		const places = this.props.data.places || [];
		 
		var customItemContentLayout2 = window.ymaps.templateLayoutFactory.createClass(
			// Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
			'<div  class="ballon_header lead text-center font-weight-light">{{ properties.balloonContentHeader|raw }}</div>' +
			'<div class="ballon_body text-center">{{ properties.balloonContentBody|raw }}</div>'
		);
			
		this.clusterer = new window.ymaps.Clusterer(
			{
				//// Зададим макет метки кластера.
				clusterIconLayout: window.ymaps.templateLayoutFactory.createClass(
					'<div class="clusterIcon"><div class="place_flag"></div>{{ properties.geoObjects.length }}</div>'
				),
				preset: 'islands#invertedVioletClusterIcons',
				//groupByCoordinates: true,
				clusterDisableClickZoom: true,
				clusterOpenBalloonOnClick: false,
				clusterBalloonContentLayout: 'cluster#balloonCarousel',
				clusterBalloonItemContentLayout: customItemContentLayout2,
				clusterBalloonContentLayoutWidth: 230,
				clusterBalloonContentLayoutHeight: 110,
				// Макет метки кластера pieChart.
				clusterIconLayout: 'default#pieChart',
				// Радиус диаграммы в пикселях.
				clusterIconPieChartRadius: 35,
				// Радиус центральной части макета.
				clusterIconPieChartCoreRadius: 15,
				// Ширина линий-разделителей секторов и внешней обводки диаграммы.
				clusterIconPieChartStrokeWidth: 3,
				clusterHideIconOnBalloonOpen: false,
				geoObjectHideIconOnBalloonOpen: false,
				gridSize:128
			},
			{
				gridSize:128
			}
		);
		
		places.forEach((el, i) => {
			// console.log(el);
			 // Создаём макет содержимого.
			const type = el.types && el.types.length > 0 ? el.types[0] : {};
			let width		=  type.width ? type.width 			: 36;
			let height		=  type.height ? type.height		: 36;
			let offset_x	=  type.offset_x ? -type.offset_x	: -18;
			let offset_y	=  type.offset_y ? -type.offset_y	: -36;
			const pfill = type.color;
			let MyIconContentLayout;
			let iconImageHref;
			let iconContent;			
			switch(type.type)
			{
				case "oval":
					iconImageHref = "/assets/img/circle.svg";
					MyIconContentLayout = window.ymaps.templateLayoutFactory.createClass(
						'<div style="width:' + width + 'px; height:' + height + 'px; border:8px solid ' + pfill + '; -webkit-border-radius:100%;border-radius:100%;">$[properties.iconContent]</div>'
					);
					iconContent = "<div style='background-image:url(" + type.icon + "); width:" + ( width )+"px; height:" + ( height )+"px; margin-top:4px; margin-left:4px; background-size:cover; fill:" + pfill + ";'></div>";
					break;
				default: 
					break;
			}
			
			const place = new window.ymaps.Placemark(
				el.geo ? [ el.geo[0], el.geo[1] ] : [ 0, 0 ], 
				{
					data_id: el._id,
					data_type:"place",
					hintContent: __( type.title ) + " " + el.title,
					balloonContentHeader: "getPlaceHeader(el)",
					iconContent: iconContent
				}, 
				{
					 // Необходимо указать данный тип макета.
					iconLayout: 'default#imageWithContent',
					// Своё изображение иконки метки.
					iconImageHref: iconImageHref,
					// Размеры метки.
					iconImageSize: [width, height],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [offset_x, offset_y],
					iconImageFill: "#FFFFFF",
					// Смещение слоя с содержимым относительно слоя с картинкой.
					iconContentOffset: [0,0],
					// Макет содержимого.
					iconContentLayout: MyIconContentLayout,
			
					hasBalloon: false,
					hasHint: true,
					//preset: 'islands#governmentCircleIcon',
					iconColor: pfill
				}
			);
			//place.events.add("click", evt => window.getPlaceDialog( el._id  ));
			this.clusterer.add(place);
		});	
		this.myMap.geoObjects.add(this.clusterer);
		if(this.props.onInit)
			this.props.onInit( this.myMap );
		/*
		
		*/
	}
}
export default compose(
	withRouter
)(YandexMap);