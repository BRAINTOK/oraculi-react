import React, {Component, Fragment} from "react";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../../layouts/utilities/i18n";
import {sprintf} from "../../layouts/utilities/sprintf";
import LazyLoading from "../../layouts/utilities/LazyLoading";
import {AppToaster} from "../../layouts/utilities/blueUtils";
import { Intent } from "@blueprintjs/core";

import {Query, withApollo} from "react-apollo";
import {compose} from "recompose";
import gql from 'graphql-tag';
import Loading from "../../layouts/utilities/Loading";

import ReviewDialog from "../MLanding/ReviewDialog";

const query = gql`query getRobokassaRedirectUrl($course_id: Int) {
  getRobokassaRedirectUrl(course_id: $course_id)
}`;

class CourseCard extends Component
{
	state = { 
		isQuestion: false, 
		is_waiting_review: this.props.user ? this.props.user.is_waiting_review : false 
	}
	
	render()
	{
		const {date, underline, id, thumbnail, post_title, price, i} = this.props;
		const pic = thumbnail != "false" ? thumbnail : "" ;
		const dates = ".";//date.split(".");
		const delay = i%3 === 0 ? "" : i%3;
		const dataLabel = dates[2] ?
			<div className="courses-slider__item-date">
				<div className="courses-slider__item-day">
					{ dates[0] + "." + dates[1] }
				</div>
				<div className="courses-slider__item-year">
					{ dates[2] }
				</div>
			</div>
			:
			null;
		const _underline = "";// underline.split( " " ).slice(0, 30).join( " " );
		const more = "";//underline.length <= underline ? "" : "...";

		return <div 
				className=" col-md-4 col-sm-6 col-12">
					<div className="courses-slider__item">
						<NavLink 
							to={ "/courses/" + id }
							className="courses-slider__item-img"
							style={{backgroundImage:"url("+ pic + ")"}}
						>
						{ dataLabel }
						</NavLink>
						<div className="courses-slider__item-content">
							<div 
								className="courses-slider__item-descriptions" 
								dangerouslySetInnerHTML={{ __html: _underline + more }}
							/>
							<NavLink 
								to={ "/courses/" + id }
								className="courses-slider__item-btn hidden"
							>
								<svg width="18" height="17" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg" >
									<path fill="#FFF" d="M8.99992 0C13.8934 0 17.7248 5.40371 17.8856 5.6338C18.0381 5.85186 18.0381 6.14814 17.8856 6.36638C17.7248 6.59625 13.8934 12 8.99992 12C4.10647 12 0.274852 6.59629 0.114223 6.3662C-0.0380743 6.14792 -0.0380743 5.85186 0.114223 5.63358C0.274852 5.40371 4.10647 0 8.99992 0ZM6.62631 6.00002C6.62631 7.36903 7.69105 8.48276 8.99992 8.48276C10.3088 8.48276 11.3735 7.36903 11.3735 6.00002C11.3735 4.63101 10.3088 3.51727 8.99992 3.51727C7.69108 3.51727 6.62631 4.63101 6.62631 6.00002Z" />
								</svg>
							</NavLink>
								{
									this.props.user ? 
									<div className="btn w-100" onClick={ this.onPay }>
										{price ? sprintf(__("Купить за %s руб."), parseInt(price )): __("Бесплатно")}
									</div> : 
									<Link to="/login">
										<div className="btn w-100">
											{price ? sprintf(__("Купить за %s руб."), parseInt(price )): __("Бесплатно")}
										</div>
									</Link>
								}
						</div>
					</div>
					
					<ReviewDialog 
						isQuestion={this.state.isQuestion}
						user ={this.props.user}
						onClose={this.onQuestionHandler}
					/>
					
					
				</div>
	}
	onQuestionHandler = () => 
	{
		this.setState(
			{ isQuestion: !this.state.isQuestion, alert:false, is_waiting_review:false }, 
			() => {
				if(false == this.state.isQuestion && this.state.is_waiting_review == false)
				{
					this.onPay();
				}
			}
		);
	};
	onPay = () =>
	{
		if( this.state.is_waiting_review )
		{
			this.onQuestionHandler();
			
			return;
		}
		else
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
}
export default withApollo(CourseCard);