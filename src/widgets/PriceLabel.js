import React,{Component} from "react";
import {__} from "../layouts/utilities/i18n";
import {AppToaster} from "../layouts/utilities/blueUtils";
import { Intent } from "@blueprintjs/core";
import {sprintf} from "../layouts/utilities/sprintf";

import {Query, withApollo} from "react-apollo";
import {compose} from "recompose";
import gql from 'graphql-tag';
import Loading from "../layouts/utilities/Loading";
const query = gql`query getRobokassaRedirectUrl($course_id: Int) {
  getRobokassaRedirectUrl(course_id: $course_id)
}`;

class PriceLabel extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			currentPrice:0,
			selected:-1
		}
	}
	render()
	{
		const price = this.getPrice();
		const text = price ? sprintf(__("Купить за %s руб."), parseInt(price )): __("Бесплатно");
		const pay_descr =__( price ? "Купить" : "Пройти") 
		return this.props.is_closed
			?
			null
			:
			<div className="d-flex py-5">
				<div className="price-data">
					{ text } 
					<div className="btn btn-danger btn-lg ml-4" onClick={this.onPay}>
						{pay_descr}
					</div>
				</div>
			</div>
	}
	getPrice = () =>
	{
		if( typeof this.props.price == "object" )
		{
			for (var p in this.props.price )
			{
				return this.props.price[p];
			}
		}
		else
		{
			return this.props.price;
		}
	}
	getPriceChanger = () => 
	{
		
		if( typeof this.props.price == "object" )
		{
			let options = [];
			for (var p in this.props.price )
			{
				options.push(
					<option value={ this.props.price[p] } key={p} >
						{p}
					</option>
				);
			}
			return <select className="price-selector">{options}</select>
		}
		else
		{
			return null;
		}
		
		
	}
	onPay = evt =>
	{
		this.props.client.query({
			query: query,
			variables: {course_id: this.props.id}
		}).then(result =>
		{
			window.location.href = result.data.getRobokassaRedirectUrl;
		},
		error => 
		{
			AppToaster.show({  
				intent: Intent.DANGER,
				icon: "error", 
				message: __("Unkorrect message")		
			});
		});
	}
}
export default  withApollo(PriceLabel);