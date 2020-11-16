import React, {Component} from "react";

export default class MRaitingLabel extends Component
{
	render()
	{
		const start = [0,1,2,3,4].map((e, i) =>
		{
			return <i
				key={i}
				className={ (i < this.props.raiting ? "fas fa-star mx-1 " : "far fa-star mx-1 " )}
			/> 
		});
		return <div className={" raiting-label " + this.props.className} >
			{start} <span className="text-dark">( {this.props.raiting}/5 )</span>
		</div>
	}
}