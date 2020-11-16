import React, {Component} from "react";
import BasicState from "../../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../../layouts/utilities/i18n";
import {sprintf} from "../../layouts/utilities/sprintf";
import {Query} from "react-apollo";
import Loading from "../../layouts/utilities/Loading";
import LazyLoading from "../../layouts/utilities/LazyLoading";
import {getQueryArgs, getQueryName, queryCollection} from "../../layouts/schema"; 
import {Dialog, Classes, Button, Intent} from "@blueprintjs/core"; 
import getWidget, { initArea } from "../../layouts/utilities/getWidget";

class FacultetCard extends Component
{
	render()
	{
		const quote = this.props.post_content
			.split(" ")
				.slice(0, 14)
					.join(" ")
						+ "...";
		return <div className="course-card">
			<div className="course-thumb" style={{ backgroundImage:"url(" + this.props.thumbnail + ")" }}>
				
			</div>
			{ 
				initArea( "facultet-card-header", { ...this.props } ) 
			}
			<div className="course-title">
				{ this.props.post_title }
			</div>
			{ 
				initArea( "facultet-card-after-title", { ...this.props } ) 
			}
			<div className="course-quote">
				{ quote }
			</div>
			{ 
				initArea( "facultet-card-footer", { ...this.props } ) 
			}
			<NavLink 
				to={"/facultet/" + this.props.id}
				className="course-link"
			>
				{__("More")}
			</NavLink>
		</div>
	}
}

export default FacultetCard;