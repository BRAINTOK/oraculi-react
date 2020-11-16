import React, {Component, Fragment} from "react";
import {__} from "../../utilities/i18n"
import ScalarField from "./ScalarField";
import {Tag, ButtonGroup, Button, Intent, ControlGroup, InputGroup} from "@blueprintjs/core";
import {Map, Marker, MarkerLayout} from "yandex-map-react";
import {yandex_map_api_key, geoPosition, zoom} from "../../map";

export default class Address extends ScalarField
{

    isDesabled()
    {
        window.currentAdress = this;
        return <Fragment>
            <div className="mt-2"/>
            <div>
                <ControlGroup fill={true} vertical={false}>
                    <InputGroup fill={true} value={this.state.value} onChange={this.onAddressChange}/>
                    <Button icon="geosearch" onClick={this.onAddressSearch}>{__("Search")}</Button>
                </ControlGroup>
            </div>
        </Fragment>
    }
    isEnabled()
    {
        window.currentAdress = this;
        return <Fragment>
            <div className="mt-2"/>
            <div>
                <ControlGroup fill={true} vertical={false}>
                    <InputGroup fill={true} value={this.state.value} onChange={this.onAddressChange}/>
                    <Button icon="geosearch" onClick={this.onAddressSearch}>{__("Search")}</Button>
                </ControlGroup>
            </div>
        </Fragment>
    }

    on = value =>
    {
        this.props.on( value, this.props.field, this.props.title );
    }

    onAddressChange = evt =>
    {
        const address = evt.currentTarget.value;

        // let address = await window.ymaps.geocode( this.state.geo, { results:1, kind:"house" });
        // let firstGeoObject = address.geoObjects.get(0);
        // if (firstGeoObject) {
        // 	this.state.address = firstGeoObject.getLocalities().length
        // 		? firstGeoObject.properties.get('metaDataProperty').GeocoderMetaData.AddressDetails.Country.AddressLine
        // 		: firstGeoObject.getAdministrativeAreas()
        // }


        this.on(address);

    }

    on = (value)=>{
        this.setState( { value: value } );
        this.props.on( value, this.props.field, this.props.title );
    }

    onAddressSearch = () =>
    {
        window.ymaps.geocode( this.state.value, { results:5, kind:"house" })
            .then(function (res)
            {
                const firstGeoObject = res.geoObjects.get(0);
                let array = firstGeoObject.geometry._coordinates;
                array[2] = zoom();
                window.currentGeo.setState({value: array }
                // , ()=>{delete window.currentGeo }
                    );
                window.currentGeo.on( firstGeoObject.geometry._coordinates );
            })

    }



}