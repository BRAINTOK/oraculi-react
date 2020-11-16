import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import {socialLikes} from "social-likes"; // http://social-likes.js.org/ru/
import $ from "jquery";
import { Icon } from "@blueprintjs/core";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";
import SectionContent from "./SectionContent";

const __socials = [
	{
		id : "facebook",
		title: "Поделиться ссылкой на Фейсбуке",
		data_via: null
	},
	{
		id : "twitter",
		title: "Поделиться ссылкой в Твиттере",
		data_via: "@Metaversitet"
	},
	{
		id : "vkontakte",
		title: "Поделиться ссылкой во Вконтакте",
		data_via: null
	},
	{
		id : "odnoklassniki",
		title: "Поделиться ссылкой в Одноклассниках",
		data_via: null
	},
	{
		id : "mailru",
		title: "Поделиться ссылкой в Моём мире",
		data_via: null
	},
	{
		id : "youtube",
		title: "Поделиться ссылкой в YouTube",
		data_via: null
	}
]
class SocialLikes extends SectionContent
{
	componentDidMount()
	{
		$('#share').socialLikes();
	}
	is()
	{
		const { data, type} = this.props;
		return Array.isArray(data.socials) && data.socials.length > 0
	}
	renderContent(style)
	{
		//console.log(this.props);
		const { data, type} = this.props;
		const { class_name } = data;
		//console.log( data.socials.map( e  => __socials.filter(ee => ee.id == e) ) );
		const labels = Array.isArray(data.socials) 
			?
			data.socials.map((e, i) =>
			{
				const dd = __socials
					.filter(ee => ee.id == e)
						.map((ee, i) =>
						{
							return <div key={i} className={ee.id + " " + data.type } data-via={e.data_via} title={e.title} />
						});
				return dd;
			})
			:
			null;
		return <div className={ "landing-social-likes "+ class_name} style={style}>
				<div className="landing-social-likes ml-3" id="share" data-title="Landscapists of Russia">
					{labels} 
					{
						this.props.is_edit
							?
							<div className="l-inline-edit-btn">
								<Icon icon="annotation" />
							</div>
							:
							null
					}
				</div> 
			</div>
	}
}
export default SocialLikes;