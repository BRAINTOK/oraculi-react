import React, {Component, Fragment} from "react";
import ReactPaginate from 'react-paginate';
import getWidget, { initArea } from "./getWidget";
import { NumericInput } from "@blueprintjs/core";

export default class Pagi extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			all		: props.all,
			current	: props.current
		};
	}
	componentWillReceiveProps ( nextProps )
	{
		//console.log( nextProps );
		this.setState({
			all		: nextProps.all,
			current	: nextProps.current
		});
	}
	render()
	{
		const {all, current} = this.state;
		return <Fragment>
			<ReactPaginate
				previousLabel={''}
				nextLabel={''}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={all+1}
				marginPagesDisplayed={2}
				pageRangeDisplayed={2}
				onPageChange={data => this.props.onChoose( data.selected )}
				containerClassName={'pagination pagination-sm'}
				pageClassName={"page-item"}
				pageLinkClassName={"page-link"}
				previousClassName={"page-item"}
				previousLinkClassName={"page-link"}
				nextClassName={" page-item"}
				nextLinkClassName={"page-link"}
				breakClassName={"page-item desabled"}
				breakLinkClassName={"page-link"}
				activeClassName={'active'}
				forcePage={current}
			>
				adadf
			</ReactPaginate>	
			<NumericInput 
				value={current + 1}
				className="input dark"
				onValueChange={this.onChooseValue} 
			/>
			{ 
				initArea( 
					"pagination", 
					{ ...this.props,  ...this.state }
				) 
			}
		</Fragment>
	}
	render2()
	{
		const {all, current} = this.state;
		let btns = [];
		for(let i=0; i<all ; i++)
		{
			let ii = i+1;
			const cls = i == current ? " page-item active " : " page-item ";
			// console.log(cls);
			btns.push(   <li className={cls} key={i}>
					<div className="page-link" onClick={this.onChoose} data-i={i}>{ii} </div>
				</li>
			);
		}
		return <ul className="pagination pagination-sm">
			{btns}
		</ul>
	}
	onChoose = evt =>
	{
		const i = parseInt(evt.currentTarget.getAttribute("data-i"));
		this.setState({current: i});
		this.props.onChoose(i);
	}
	onChooseValue = valueAsNumber =>
	{
		const i = valueAsNumber - 1;
		this.setState({current: i});
		this.props.onChoose(i);
	}
}
//https://github.com/AdeleD/react-paginate/blob/master/demo/js/demo.js