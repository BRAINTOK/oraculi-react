import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import Video from "./Video";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";

class VideoPlayList extends Component
{
	state = {
		current:0,
		...this.props
	}
	render()
	{
		const {width, height, title} = this.props.data;
		const buttonList = this.props.data.video.map((e, i) =>
		{
			return <div 
				className={"landing-playlist-button " + (i == this.state.current ? " current " : "") } 
				key={i} 
				onClick={() => this.onChoose(i) }
			>
				{ e.title }
			</div>
		});
		return <div className="landing-playlist-container">
			<div className="landing-playlist-video">
				<Video
					data={{ ...this.props.data.video[this.state.current], height, width }}
				/>
			</div>
			<div className="landing-playlist-list" style={{ height: height }}>
				<div className="landing-playlist-button title">
					{ title }
					<span className="comment">
						{ buttonList.length  + " " + __( " videos" ) }
					</span>
				</div>
				{ buttonList }
			</div>
		</div>
	}
	onVimeoError = err => 
	{
		console.error(err);
	};
	onChoose = i =>
	{
		this.setState({ current : i });
	}
}
export default VideoPlayList;