import React, {Component, Fragment} from "react";
import {__} from "../../utilities/i18n";
import ScalarField from "./ScalarField";
import { ControlGroup, InputGroup, Button} from "@blueprintjs/core";
import { Map, Marker, MarkerLayout } from 'yandex-map-react'; //https://github.com/effrenus/yandex-map-react

import {yandex_map_api_key, geoPosition, zoom} from "../../map";

export default class Geo extends ScalarField
{
	componentWillMount()
	{
		const ymap = window.ymap;
		const ymapReady = window.ymapReady;
		if(ymapReady || ymap)
		{
			this.setState({ready:true});
			return;
		}
		window.ymapReady = true;

		const el	= document.createElement('script');
		el.context	= this;
		el.type 	= 'text/javascript';
		el.src 		= 'https://api-maps.yandex.ru/2.1/?load=package.full&lang=ru_RU&apikey=' + yandex_map_api_key();
		el.async 	= true;
		el.id 		= 'ymap-jssdk';
		el.onload 	= function()
		{
			window.ymaps.ready( function()
			{
				el.context.setState({ready:true});
			} );
		}
		document.getElementsByTagName('head')[0].appendChild(el);
	}

	render()
	{
		if(!this.state.ready) return " ---- ";
		const {field, title} = this.props;
		const {value} = this.state;
		const col1 = this.props.vertical ? "col-12 layout-label-vert" : "col-md-3  layout-label";
		const col2 = this.props.vertical ? "col-12 layout-data-vert" : "col-md-9 layout-data";
		return <div className="row dat" >
			<div className={col1}>
				{__( title )}
			</div>
			<div className={col2} style={{ position : "relative" }}>
				{
					this.props.editable ? this.isEnabled() : this.isDesabled()

				}
			</div>
		</div>
	}

	isDesabled()
	{
		//TODO грязный хак. работает, почистить.
		window.currentGeo = this;
		const default_coords = geoPosition();
		let coords = this.state.value ? this.state.value : this.props.value
		const {field, title, value, extended_link, external_link_data } = this.props;
		return <Fragment>
			<div className="mt-2"/>
			<Map
				onAPIAvailable={function () { console.log('API loaded'); }}
				apiKey={yandex_map_api_key()}
				onClick={ this.props.editable ? this.onMapClick : null }
				center={[
					coords ? coords[0] : default_coords[0] ,
					coords ? coords[1] : default_coords[1]
				]}
				zoom={ coords[2] ? coords[2] : default_coords[2]}
				width="100%"
				height={250}
			>
				{
					this.state.value && Array.isArray(this.state.value)
						?
						<Marker
							lat={this.state.value[0]}
							lon={this.state.value[1]}
						>
							<MarkerLayout>
								<div style={{borderRadius: '50%', overflow: 'hidden', width: 22, height: 22, backgroundColor:"#FF0000", marginTop:-31 }}>

								</div>
							</MarkerLayout>
						</Marker>
						:
						null
				}
			</Map>
			<span className="small p-2">{this.state.value ? this.state.value[0] : null} </span>
			<span className="small p-2">{this.state.value ? this.state.value[1] : null} </span>
		</Fragment>
	}
	isEnabled()
	{
		//TODO грязный хак. работает, почистить.
		window.currentGeo = this;
		let coords = this.state.value ? this.state.value : this.props.value
		const default_coords = geoPosition();
		const {field, title, value, extended_link, external_link_data } = this.props;
		if (!this.state.rendered)
		{
			this.state.rendered = true;
			this.on(this.props.value);
			console.log(window.ymaps);

			window.ymaps.geocode( this.props.value, { results:1, kind:"house" })
				.then(function (res)
				{
					const firstGeoObject = res.geoObjects.get(0);
					const address =  firstGeoObject.getLocalities().length
						? firstGeoObject.properties.get('metaDataProperty').GeocoderMetaData.AddressDetails.Country.AddressLine
						: firstGeoObject.getAdministrativeAreas();
					//TODO еще более грязный хак
					window.currentAdress.on( address);
					console.log(address );

				})
			/*	*/
		}
		return <Fragment>
			<div className="mt-2"/>
			<Map
				apiKey={yandex_map_api_key()}
				onAPIAvailable={function () {  }}
				onClick={ this.props.editable ? this.onMapClick : null }
				center={[
					coords ? coords[0] : default_coords[0],
					coords ? coords[1] : default_coords[1]
				]}
				state = {{
					controls:[
						'zoomControl',
						//'searchControl', 
						'fullscreenControl'
					]
				}}
				zoom={ coords && coords[2] ? coords[2] : default_coords[2] }
				width="100%"
				height={250}
			>
				{
					this.state.value && Array.isArray(this.state.value)
						?
						<Marker
							lat={this.state.value[0]}
							lon={this.state.value[1]}
						>
							<MarkerLayout>
								<div style={{borderRadius: '50%', overflow: 'hidden', width: 22, height: 22, backgroundColor:"#FF0000", marginTop:-31 }}>

								</div>
							</MarkerLayout>
						</Marker>
						:
						null
				}
			</Map>
			<span className="small p-2">{this.state.value ? this.state.value[0] : null} </span>
			<span className="small p-2">{this.state.value ? this.state.value[1] : null} </span>
		</Fragment>
	}

	onMapClick = evt =>
	{
		this.setState({ value : evt.get("coords") });
		this.on(evt.get("coords"));
		window.ymaps.geocode( evt.get( "coords" ), { results:1, kind:"house" })
			.then(function (res)
			{
				const firstGeoObject = res.geoObjects.get(0);
				const address =  firstGeoObject.getLocalities().length
					? firstGeoObject.properties.get('metaDataProperty').GeocoderMetaData.AddressDetails.Country.AddressLine
					: firstGeoObject.getAdministrativeAreas();
				//TODO еще более грязный хак
				window.currentAdress.on( address);
				console.log(address );

			})
	}

	on = value =>
	{
		this.props.on( value, this.props.field, this.props.title );
	}
}

/*
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
render888()
{
    const {field, title} = this.props;
    const col1 = this.props.vertical ? "col-12 layout-label-vert" : "col-md-3  layout-label";
    const col2 = this.props.vertical ? "col-12 layout-data-vert" : "col-md-7 layout-data";
    return <div className="row  dat" key={field}>
        <div className={col1}>
            {__( title )}
        </div>
        <div className={col2}>
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
isEnabled()
{
    const {field, title, value, extended_link, external_link_data } = this.props;
    return <Fragment>
        <div id={"map_" + this.props._id + "_" + this.props.field} className="geo"/>
        <span className="small p-2">{this.state.value ? this.state.value[0] : 55.826479} </span>
        <span className="small p-2">{this.state.value ? this.state.value[1] : 37.487208} </span>
    </Fragment>
}
isDesabled()
{
    return this.isEnabled();
}
*/