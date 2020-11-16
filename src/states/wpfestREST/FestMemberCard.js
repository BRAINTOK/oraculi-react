import React, {Component, Fragmnent} from "react";
import $ from "jquery";
import _fetch from "./";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";
import getWidgets from "../../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing} from "../../layouts/routing";
import empty from '../../assets/img/empty.png';
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
import {AppToaster} from "../../layouts/utilities/blueUtils";
import GanreIcon from "./GanreIcon";
import {socialLikes} from "social-likes";
import WPFestSettings from "./utilities/WPFestSettings";


class FestMemberCard extends Component
{
	
	componentDidMount ()
	{
		$( '.share' ).socialLikes();
	}
	componentDidUpdate  (nextProps) 
	{
		$( '.share' ).socialLikes();
	}
	render()
	{
		const { id, o, e, img, ganre, title, content, ganres, r } = this.props;
		
		const _ganres = ganres.map((ganre, index) => 
		{
			return <GanreIcon ganre={ganre} key={ganre.id} />;
		});
		const __ganres = ganres.map((ganre, index) => 
		{
			return "<strong style='color:"+ganre.color+"'>"+ganre.name+"</strong>";
		});
		const _ganre = ganres[0];
		const gcolor = _ganre ? _ganre.color : "#111111";
		
		const url = [1, 2].filter(e => e == WPFestSettings.status).length > 0
			?
			this.props.route + "/member/" + id + "/rait"
			:
			this.props.route + "/member/" + id
		
		return <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12'>
			<div className="card" >
				<div 
					className="card-img" 
					style={{
						backgroundImage:"url(" +img + ")", 
						borderColor:gcolor
					}} 
					data-mid={id} 
					data-fmru_type='fmru_player'
					data-args={id} 
				>
					<div className="card-id">
						{o}
					</div>
				</div>
				<div className='card-icons'>
					{ _ganres }
				</div>
				<div 
					className="card-header" 
					title={title} 
					style={{
						height:"61px", 
						overflow:"hidden",
						padding:"0 1.25em", 
						position: "relative",
						display:"table"
					}} 
				>
					<h5 className="card-title" style={{ display:"table-cell", verticalAlign:"middle"}} >
						{title}
					</h5>
				</div>
				<ul className="list-group list-group-flush">
					<li 
						className='list-group-item' 
						style={{height:"42px", overflow:"hidden", padding:"0 1.25em", position: "relative", display:"table"}}
					>
						<span 
							className='data w-100' 
							style={{ 
								padding:"0 20px", 
								display:"table-cell", 
								verticalAlign:"middle", 
								textAlign:"center" 
							}}
						>
							<span className='hideColor'>.</span>
								<span dangerouslySetInnerHTML={{ __html : __ganres.join(", ") }} />
						</span>
					</li>
					<li className="list-group-item" style={{height:64, overflow: "hidden", texOverflow: "ellipsis"}}>
						<span className="discr">								
							{content}
						</span>
					</li>
					<li className="list-group-item">
						<span className="discr">
							{ __("Raiting:") }
						</span>
							<span className="data ">
								{ r }
							</span>
					</li>
					<li className="list-group-item">
						<span className="discr">
							{ __("Expert count:")}
						</span>
						<span className="data selected">
							{ e === 0 ? "-" : e }
						</span>
					</li>
					<li className="list-group-item">
						<div 
							className="social-likes share" 
							data-url={ url }
							data-title={title}
							style={{padding:"11px 20px"}}
						>
							<div className="facebook" title="Поделиться ссылкой на Фейсбуке"/>
							<div className="twitter" data-via="@Metaversitet" title="Поделиться ссылкой в Твиттере"/>
							<div className="mailru" title="Поделиться ссылкой в Моём мире"/>
							<div className="vkontakte" title="Поделиться ссылкой во Вконтакте"/>
							<div className="odnoklassniki" title="Поделиться ссылкой в Одноклассниках"/>
						</div>
					</li>
				</ul>
				<div className="card-body align-self-center">
					<Link className="fmRU_button " to={url}>
						<i className="fa fa-caret-right"/>
					</Link>
				</div>
			</div> 
		</div>
	}
}
export default FestMemberCard;