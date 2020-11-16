import React, {Component} from "react";
import {__} from "../../layouts/utilities/i18n";
import $ from "jquery";
import {NavLink, Link} from "react-router-dom";

class CourseDescription extends Component
{
	state = {
		collapsed1: false,
		maxHeight:88
	}
	render()
	{
		const locked =  this.props.locked || false;
		const btn = locked
			?
			<NavLink to="/tarif" className="btn-faq">
				{__("Купить")}
			</NavLink>
			:
			<NavLink className="free_text_button pointer" to={"/course/" + this.props.id}>
				{__("Попробовать бесплатно")}

			</NavLink>;
		const thumbnail 	= this.props.thumbnail 		? this.props.thumbnail : "/assets/img/default.png";
		const post_content 	= this.props.post_content 	? this.props.post_content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim.";
		return <div className="row row_block course_block course_block_mobile" lesson_id={this.props.id}>
				<div 
					className="col-12 col-lg-3 img_cover img_cover_category h150" 
					style={{
						backgroundImage:"url(" + thumbnail + ")"
					}}
				/>
				<div className="col-12 col-lg-9 course_description">
					<div className="row">
						<div className="col-md-9 h6">
							{this.props.post_title}
						</div>
						<div className="col-md-3 text-right">
							{this.props.date}
						</div>
						<div 
							className={"text_short col-12 "+ (this.state.collapsed1 ? "showed" : "")}
							style={{maxHeight:this.state.maxHeight}}
						>
							<div className="p-0">
								{post_content}
							</div>
						</div>
						<div className="col-12 mt-5 ml-3">
							<span 
								className={ "title-collapsed showed pointer" }
								onClick={this.onCollapseToggle}
							>
								{__(this.state.collapsed1 ? "Cкрыть" : "Читать полностью")}
							</span>
							{btn}

						</div>

					</div>
				</div>
			</div>
	}
	onCollapseToggle = () =>
	{
		this.setState({
			collapsed1: !this.state.collapsed1, 
			maxHeight:this.state.maxHeight == 88 ? $("[lesson_id="+ this.props._id + "] .text_short > div").innerHeight() : 88 
		});
	}
	
}
export default CourseDescription;