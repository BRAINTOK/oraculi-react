import React, {Component} from "react";
import {__} from "../../layouts/utilities/i18n";
import $ from "jquery";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class Gallery extends Component
{
	state = {
		photoIndex: 0,
		isOpen: false,
		collapsed1: false,
		col:8
	}
	render()
	{
		const { photoIndex, isOpen } = this.state;
		const gallery = this.props.gallery ? this.props.gallery : [];
		const images = gallery.filter((e,i) => i<this.state.col);
		const pics = images.map((e, i) =>
		{
			return <div className="col-md-3 p-0" key={i}>
				<div style={{
					height:250,
					width:"100%"
				}}>
					<div 
						className="gallery-ex" 
						style={{ backgroundImage: "url(" + e + ")" }}
						i={i}
						onClick={this.onOpen}
					/>
				</div>
			</div>
		});
		const more = gallery.length > this.state.col
			?
			<div className="col-12 mt-5 d-flex justify-content-center">
				<span className="pointer" onClick={this.onMore} >
					{__("Загрузить ещё работы")}
				</span>
			</div>
			: 
			null;
		const lb = isOpen 
			?
			<Lightbox
				mainSrc={images[photoIndex]}
				nextSrc={images[(photoIndex + 1) % images.length]}
				prevSrc={images[(photoIndex + images.length - 1) % images.length]}
				onCloseRequest={() => this.setState({ isOpen: false })}
				onMovePrevRequest={() =>
				  this.setState({
					photoIndex: (photoIndex + images.length - 1) % images.length,
				  })
				}
				onMoveNextRequest={() =>
				  this.setState({
					photoIndex: (photoIndex + 1) % images.length,
				  })
				}
			/>
			:
			null;
		return <div className="row" >
			{pics}
			{more}
			{lb}
		</div>
	}
	onMore = () =>
	{
		this.setState({col : this.state.col + 4});
	}
	onOpen = evt =>
	{
		const i = parseInt(evt.currentTarget.getAttribute("i"));
		this.setState({ photoIndex : i, isOpen:true });
	}
}
export default Gallery;