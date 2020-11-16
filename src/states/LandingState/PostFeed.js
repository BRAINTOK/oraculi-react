import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import Feed from "../../layouts/BasicState/Feed";
import LayoutIcon from "../../layouts/LayoutIcon";
import PostFeedCard from "./PostFeedCard";
import EditLabel from "./EditLabel";
import {components} from "./Section";
import SectionContent from "./SectionContent";

class PostFeed extends SectionContent
{
	getState()
	{	
		this.car = React.createRef();
		return { dwidth:1200 };
	}
	componentDidMount()
	{
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}
	componentWillUnmount() 
	{
		window.removeEventListener('resize', this.updateWindowDimensions);
	}
	updateWindowDimensions = () =>
	{		
		this.setState({ 
			dwidth : document.body.clientWidth, 
			dheight: document.body.clientHeight 
		});
	}
	renderContent(style)
	{
		const { type } = this.props;
		const { class_name, data_type, offset, count, paging, is_row, is_show_paginamtion } = this.props.data;
		const { columns } = this.props.composition;
		
		return <div className={ "landing-post-feed " + class_name} style={style}>
			<Feed 
				component={ PostFeedCard } 
				data_type={ data_type }
				is_hide_pagi={ !is_show_paginamtion }
				offset={ offset ? offset : 0 }
				count={ count }
				paging={ paging ? paging : "" }
				class_name={ " d-flex flex-wrap justify-content-around " + ( is_row ? " flex-row " : "flex-column " ) }
				params={{
					style:{ width: is_row && this.state.dwidth > 760 ? ( 100 / columns ) + "%" : "100%" }
				}}
			/>
		</div>
	}
	
	is()
	{
		const { data_type } = this.state.data;
		return data_type;
	}
}
export default PostFeed;