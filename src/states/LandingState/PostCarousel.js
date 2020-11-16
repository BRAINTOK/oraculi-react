import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
import LayoutIcon from "../../layouts/LayoutIcon";
import PostFeedCard from "./PostFeedCard";
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css'; //Allows for server-side rendering.
import gql from 'graphql-tag';
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {withRouter} from "react-router";
import {getQueryArgs, getQueryName, querySingle} from "../../layouts/schema";
import EditLabel from "./EditLabel";
import {components} from "./Section";

class PostCarousel extends Component
{
	constructor(props)
	{
		super(props);		
		this.car = React.createRef();
	}
	render()
	{
		const { class_name, style, composition, type } = this.props;
		const { items, dots, nav, autoplay, loop, sliders, data_type, offset, count } = this.props.data;
		
		
		let html;
		if( data_type )
		{
			const options = {
				dots: typeof dots != "undefined" ? dots ? true : false : true,
				items: typeof composition.columns != "undefined" ? composition.columns : 1,
				nav: typeof nav != "undefined" ? nav ? true : false : false,
				rewind: true,
				autoplay: typeof autoplay != "undefined" ? autoplay ? true : false : true,
				loop: typeof loop != "undefined" ? loop ? true : false : true,
				responsive:
				{
					0:{
						items:1
					},
					760:{
						items: typeof composition.columns != "undefined" ? composition.columns : 1
					}
				}
			}; 
			
			const name = "get" + data_type + "s";
			const paging = this.props.paging; 
			const fields = getQueryArgs( data_type );  
			const query = gql`
				query ${name} 
				{
					${name}( paging:{ count:${count}, offset:${offset} })
					{
						${fields}
					}
				}
			`;
			html = <Query query={ query } >
				{
					({ loading, error, data, client}) =>
					{
						if( loading)
						{
							return <Loading/>;
						}
						if(data)
						{	
							//console.log(data[name]);
							const __sliders = data[name].map((e,i) =>
								{
									return <PostFeedCard  {...e} key={i}  i={i}/> 
								});
							return <div className={ "landing-post-carousel landing-element" + class_name} style={style} >
								<OwlCarousel
									ref={this.car} 
									options={options} 
								>
									{__sliders}
								</OwlCarousel>
							</div>
						}
					}
				}
				</Query>
		}
		else
		{
			html = this.no();
		}
		return html;
	}
	no()
	{
		const { class_name, style, composition, type } = this.props;
		return <div 
				className={ " landing-empty " + class_name} 
				style={{ ...style, height:  300 }}
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
					source={ type}
					onEdit={ this.props.onEdit }
					isBtn={ true }
				/> 
			</div>
	}
}
export default compose(
	withApollo
)(PostCarousel);