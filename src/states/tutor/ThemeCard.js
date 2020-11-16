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

class ThemeCard extends Component
{
	render()
	{
		const quote = this.props.post_content
			.split(" ")
				.slice(0, 14)
					.join(" ")
						+ "...";
		return <div className="theme-card">
			{ 
				initArea( "theme-card-header", { ...this.props } ) 
			}
			<NavLink 
				to={"/theme-lessons/" + this.props.id}
			>
				<div className="theme-icon" style={{ backgroundImage:"url(" + this.props.icon + ")" }}>
					
				</div>
				<div className="theme-title">
					{ this.props.post_title }
				</div>
				{ 
					initArea( "theme-card-after-title", { ...this.props } ) 
				}
			</NavLink>
			<div className="theme-quote">
				{ quote }
			</div>
			<div className="">
				<div className="">
					{__("Articles") + ": " + this.props.articles.length}
				</div>
				<div className="">
					{__("Tests") + ": " + this.props.bio_test.length}
				</div>
			</div>
			{ 
				initArea( "theme-card-footer", { ...this.props } ) 
			}
			<NavLink 
				to={"/theme-lessons/" + this.props.id}
				className="theme-link"
			>
				{__("More")}
			</NavLink>
		</div>
	}
}

export default ThemeCard;